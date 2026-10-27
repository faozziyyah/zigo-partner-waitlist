import { z } from "zod";

export const BOAT_TYPES = [
  "Yacht",
  "30-seater",
  "20-seater",
  "15-seater",
  "Other",
] as const;

export type BoatType = (typeof BOAT_TYPES)[number];

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

/**
 * Normalises Nigerian phone numbers to E.164 (+234...) format.
 * Accepts:
 * - 08031234567 -> +2348031234567
 * - 8031234567  -> +2348031234567
 * - 2348031234567 -> +2348031234567
 * - +2348031234567 -> +2348031234567
 */
export function normaliseNigerianPhone(input: string): string | null {
  if (!input) return null;
  // Strip spaces, dashes, parentheses
  const cleaned = input.trim().replace(/[\s\-\(\)\.]/g, "");

  // Starts with +234
  if (/^\+234[789][01]\d{8}$/.test(cleaned)) {
    return cleaned;
  }

  // Starts with 234 without plus
  if (/^234[789][01]\d{8}$/.test(cleaned)) {
    return `+${cleaned}`;
  }

  // Starts with 0 (e.g. 08031234567)
  if (/^0[789][01]\d{8}$/.test(cleaned)) {
    return `+234${cleaned.slice(1)}`;
  }

  // Starts without leading 0 (e.g. 8031234567)
  if (/^[789][01]\d{8}$/.test(cleaned)) {
    return `+234${cleaned}`;
  }

  return null;
}

export const PricingItemSchema = z
  .object({
    boat_type: z.string().min(1, "Boat type is required"),
    rate_ngn: z
      .number({ message: "Please enter your rate in Naira" })
      .positive("Rate must be greater than ₦0"),
    last_price_ngn: z
      .number({ message: "Please enter your lowest acceptable price" })
      .positive("Last price must be greater than ₦0"),
  })
  .refine((data) => data.last_price_ngn <= data.rate_ngn, {
    message: "Last price cannot be higher than your standard rate",
    path: ["last_price_ngn"],
  });

export type PricingItem = z.infer<typeof PricingItemSchema>;

export const PartnerFormSchema = z
  .object({
    captain_name: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters)"),
    whatsapp_number: z
      .string()
      .trim()
      .min(1, "WhatsApp number is required")
      .refine((val) => normaliseNigerianPhone(val) !== null, {
        message: "Please enter a valid Nigerian WhatsApp number (e.g., 0803 123 4567)",
      }),
    referred_by: z.string().trim().optional(),
    boats_count: z.coerce
      .number({ message: "Please specify number of boats" })
      .int("Number of boats must be a whole number")
      .min(1, "You must register at least 1 boat"),
    boat_types: z
      .array(z.string())
      .min(1, "Select at least one boat type"),
    boat_type_other: z.string().trim().optional(),
    preferred_jetty: z
      .string()
      .trim()
      .min(1, "Please select your preferred primary jetty"),
    jetty_other: z.string().trim().optional(),
    available_days: z
      .array(z.string())
      .min(1, "Select at least one available day"),
    pricing: z.array(PricingItemSchema).min(1, "Please specify rates for your boat(s)"),
    consent: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to be contacted on WhatsApp and to the Privacy Policy",
      }),
    // Honeypot field
    website_hp: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // If "Other" boat type selected, require description
    if (data.boat_types.includes("Other") && (!data.boat_type_other || data.boat_type_other.trim().length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify your boat type",
        path: ["boat_type_other"],
      });
    }

    // If "other" jetty selected, require custom jetty name
    if (data.preferred_jetty === "other" && (!data.jetty_other || data.jetty_other.trim().length === 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify your preferred jetty or mooring pontoon",
        path: ["jetty_other"],
      });
    }

    // Ensure every selected boat type has a pricing entry
    for (const bType of data.boat_types) {
      const match = data.pricing.find((p) => p.boat_type === bType);
      if (!match) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Please provide pricing for ${bType}`,
          path: ["pricing"],
        });
      }
    }
  });

export type PartnerFormData = z.infer<typeof PartnerFormSchema>;

export interface SubmissionRecord {
  id: string;
  created_at: string;
  reference_code: string;
  captain_name: string;
  whatsapp_e164: string;
  referred_by: string | null;
  boats_count: number;
  boat_types: string[];
  boat_type_other: string | null;
  preferred_jetty: string;
  jetty_other: string | null;
  available_days: string[];
  pricing: PricingItem[];
  consent: boolean;
  status: "New" | "Contacted" | "Verified" | "Live";
  utm?: Record<string, string> | null;
  user_agent?: string | null;
}
