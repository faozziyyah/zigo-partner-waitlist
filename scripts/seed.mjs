/**
 * Seed Script: 5 Realistic Lagos Boat Partner Submissions
 * Run with: node scripts/seed.mjs
 */

import fs from "fs";
import path from "path";

const SEED_SUBMISSIONS = [
  {
    id: "3e527d28-090c-48c9-8d76-59196d24f001",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    reference_code: "ZP-ADE782",
    captain_name: "Captain Tunde Adebayo",
    whatsapp_e164: "+2348035551234",
    referred_by: "Folarin (Civic)",
    boats_count: 3,
    boat_types: ["Yacht", "30-seater"],
    boat_type_other: null,
    preferred_jetty: "five-cowries",
    jetty_other: null,
    available_days: ["Friday", "Saturday", "Sunday"],
    pricing: [
      { boat_type: "Yacht", rate_ngn: 900000, last_price_ngn: 800000 },
      { boat_type: "30-seater", rate_ngn: 550000, last_price_ngn: 500000 },
    ],
    consent: true,
    status: "Verified",
    utm: { utm_source: "whatsapp", utm_campaign: "founding_partners" },
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4)",
  },
  {
    id: "7a892b11-4f10-4bc3-9562-81729a65f002",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    reference_code: "ZP-OKA914",
    captain_name: "Captain Emeka Okafor",
    whatsapp_e164: "+2348123334455",
    referred_by: "ZP-ADE782",
    boats_count: 2,
    boat_types: ["20-seater", "15-seater"],
    boat_type_other: null,
    preferred_jetty: "maroko-jetty",
    jetty_other: null,
    available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    pricing: [
      { boat_type: "20-seater", rate_ngn: 350000, last_price_ngn: 300000 },
      { boat_type: "15-seater", rate_ngn: 250000, last_price_ngn: 220000 },
    ],
    consent: true,
    status: "Contacted",
    utm: { utm_source: "referral" },
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  },
  {
    id: "9c124e88-66d1-419a-9e12-38411c52f003",
    created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    reference_code: "ZP-SAN450",
    captain_name: "Captain Babatunde Sanusi",
    whatsapp_e164: "+2349098887766",
    referred_by: null,
    boats_count: 1,
    boat_types: ["Yacht"],
    boat_type_other: null,
    preferred_jetty: "civic-centre-jetty",
    jetty_other: null,
    available_days: ["Saturday", "Sunday"],
    pricing: [
      { boat_type: "Yacht", rate_ngn: 1400000, last_price_ngn: 1200000 },
    ],
    consent: true,
    status: "Live",
    utm: { utm_source: "direct" },
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
  },
  {
    id: "1f335b77-88e2-45c1-9011-72991a44f004",
    created_at: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
    reference_code: "ZP-ALA671",
    captain_name: "Captain David Alabi",
    whatsapp_e164: "+2347081112233",
    referred_by: "Marina Union",
    boats_count: 4,
    boat_types: ["30-seater", "20-seater"],
    boat_type_other: null,
    preferred_jetty: "laswa-marina",
    jetty_other: null,
    available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    pricing: [
      { boat_type: "30-seater", rate_ngn: 500000, last_price_ngn: 450000 },
      { boat_type: "20-seater", rate_ngn: 350000, last_price_ngn: 300000 },
    ],
    consent: true,
    status: "New",
    utm: { utm_source: "instagram" },
    user_agent: "Mozilla/5.0 (Android 14; Mobile)",
  },
  {
    id: "5d446a99-11c3-42e7-8899-19224b33f005",
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    reference_code: "ZP-BAL830",
    captain_name: "Captain Folake Balogun",
    whatsapp_e164: "+2348029998811",
    referred_by: "ZP-ADE782",
    boats_count: 2,
    boat_types: ["Yacht", "Other"],
    boat_type_other: "Luxury Island Pontoon",
    preferred_jetty: "ilashe-private",
    jetty_other: null,
    available_days: ["Friday", "Saturday", "Sunday"],
    pricing: [
      { boat_type: "Yacht", rate_ngn: 1100000, last_price_ngn: 1000000 },
      { boat_type: "Other", rate_ngn: 600000, last_price_ngn: 500000 },
    ],
    consent: true,
    status: "Verified",
    utm: { utm_source: "whatsapp" },
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5)",
  },
];

async function seed() {
  console.log("Seeding 5 realistic Lagos boat partner submissions...");

  const dataDir = path.join(process.cwd(), ".data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const filePath = path.join(dataDir, "submissions.json");
  fs.writeFileSync(filePath, JSON.stringify(SEED_SUBMISSIONS, null, 2), "utf-8");

  const totalBoats = SEED_SUBMISSIONS.reduce((sum, s) => sum + s.boats_count, 0);
  console.log(`✓ Successfully seeded ${SEED_SUBMISSIONS.length} submissions representing ${totalBoats} registered boats.`);
  console.log(`Saved locally to: ${filePath}`);
}

seed().catch(console.error);
