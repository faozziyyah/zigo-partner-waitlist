import { createClient } from "@supabase/supabase-js";
import { SubmissionRecord, PricingItem } from "./validation";
import fs from "fs";
import path from "path";

// Initialize Supabase if credentials are provided
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// Persistent local JSON fallback storage for development & testing
const LOCAL_STORAGE_FILE = path.join(process.cwd(), ".data", "submissions.json");

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function loadLocalSubmissions(): SubmissionRecord[] {
  try {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
      const data = fs.readFileSync(LOCAL_STORAGE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error loading local submissions fallback:", err);
  }
  return [];
}

function saveLocalSubmissions(records: SubmissionRecord[]): void {
  try {
    ensureDirectoryExistence(LOCAL_STORAGE_FILE);
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local submissions fallback:", err);
  }
}

export function generateReferenceCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ZP-${result}`;
}

export async function checkWhatsAppExists(whatsappE164: string): Promise<boolean> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("partner_submissions")
        .select("id")
        .eq("whatsapp_e164", whatsappE164)
        .maybeSingle();

      if (!error && data) return true;
    } catch (e) {
      console.warn("Supabase check failed, checking fallback store", e);
    }
  }

  const local = loadLocalSubmissions();
  return local.some((s) => s.whatsapp_e164 === whatsappE164);
}

export async function insertSubmission(entry: {
  captain_name: string;
  whatsapp_e164: string;
  referred_by?: string | null;
  boats_count: number;
  boat_types: string[];
  boat_type_other?: string | null;
  preferred_jetty: string;
  jetty_other?: string | null;
  available_days: string[];
  pricing: PricingItem[];
  consent: boolean;
  utm?: Record<string, string> | null;
  user_agent?: string | null;
}): Promise<SubmissionRecord> {
  // Check duplicate
  const exists = await checkWhatsAppExists(entry.whatsapp_e164);
  if (exists) {
    throw new Error("This number is already on the list.");
  }

  const reference_code = generateReferenceCode();
  const id = crypto.randomUUID();
  const created_at = new Date().toISOString();

  const record: SubmissionRecord = {
    id,
    created_at,
    reference_code,
    captain_name: entry.captain_name.trim(),
    whatsapp_e164: entry.whatsapp_e164,
    referred_by: entry.referred_by?.trim() || null,
    boats_count: entry.boats_count,
    boat_types: entry.boat_types,
    boat_type_other: entry.boat_type_other?.trim() || null,
    preferred_jetty: entry.preferred_jetty,
    jetty_other: entry.jetty_other?.trim() || null,
    available_days: entry.available_days,
    pricing: entry.pricing,
    consent: entry.consent,
    status: "New",
    utm: entry.utm || null,
    user_agent: entry.user_agent || null,
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("partner_submissions")
        .insert([record])
        .select()
        .single();

      if (!error && data) {
        return data as SubmissionRecord;
      }
      console.warn("Supabase insert error, persisting to local store fallback:", error);
    } catch (err) {
      console.warn("Supabase insert exception, writing to fallback store:", err);
    }
  }

  // Fallback local save
  const current = loadLocalSubmissions();
  current.unshift(record);
  saveLocalSubmissions(current);

  return record;
}

export async function getAllSubmissions(): Promise<SubmissionRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("partner_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return data as SubmissionRecord[];
      }
    } catch (e) {
      console.warn("Supabase query error, reading from local fallback:", e);
    }
  }

  return loadLocalSubmissions();
}

export async function updateSubmissionStatus(
  id: string,
  status: "New" | "Contacted" | "Verified" | "Live"
): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("partner_submissions")
        .update({ status })
        .eq("id", id);

      if (!error) return true;
    } catch (e) {
      console.warn("Supabase update error, applying to local store:", e);
    }
  }

  const current = loadLocalSubmissions();
  const match = current.find((s) => s.id === id);
  if (match) {
    match.status = status;
    saveLocalSubmissions(current);
    return true;
  }
  return false;
}

export function seedInitialSubmissions(records: SubmissionRecord[]): void {
  saveLocalSubmissions(records);
}
