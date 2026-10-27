# Zigo Water — Founding Boat Partner Waitlist

A production-ready web application for recruiting founding boat partners (captains and fleet owners) for **Zigo Water**, the premium boat and yacht service for Lagos.

Launch Target: **At least 50 registered boats by 17 November 2026**.

---

## 🎨 Visual Identity & Brand Compliance

Designed according to the **Zigo Visual Identity Guidelines (October 2026)** and styled as the sibling of the customer waitlist at [zigo-waitlist.vercel.app](https://zigo-waitlist.vercel.app/):

- **Brand Tokens**: Defined in `/brand/tokens.css` and Tailwind theme:
  - `--zigo-blue: #012DB3` (signature primary brand colour)
  - `--midnight: #0A1633` (signature dark backgrounds)
  - `--sky: #8FB4FF` (soft accents on dark)
  - `--mist: #EEF2FB` (calm light cards & backgrounds)
  - `--ink: #0B1220` (body text on light)
  - `--water: #19A7CE`, tints `#98D7E9` and `#E3F4F9` (Zigo Water service accent)
- **Typography**: Headings in `Playfair Display` serif pairing one italic accent word per headline; UI in `DM Sans`.
- **Logos**: Official SVG assets at `/public/brand/zigo-logo-white.svg`, `/public/brand/zigo-logo-blue.svg`, `/public/brand/zigo-mark.svg`, and header lockup `Zigo | Water`.
- **Authentic Lagos Imagery**: Real Lagos lagoon settings with warm golden hour tones.

---

## 🚀 Key Features

1. **High-Converting Partner Landing Page (`/`)**:
   - **Hero on Midnight**: Confident headline, lagoon dusk visual, *"Yachts. Private boats. Commercial boats."*, and scroll CTA.
   - **How It Works**: 4 clear steps (Register $\to$ Verification $\to$ Agree Rates $\to$ Go Live).
   - **What You Earn**: Transparent rate calculator highlighting *"Your rate stays yours"* + 10% Zigo service charge (illustrative ₦700k + ₦70k = ₦770k same-day payout).
   - **Beyond The Boat**: Beach houses (Ilashe, Tarkwa), exclusive seasonal events, and free launch promotions.
   - **Partner Form**: 3 short steps on mobile with progress indicator, unified view on desktop, live thousands separator formatting, Nigerian E.164 normalisation (`0803...` $\to$ `+234...`), duplicate rejection, honeypot protection, and `sessionStorage` autosave.
   - **Honest FAQ**: Accordion answering real questions with explicit TODO markers for launch items.
2. **Confirmation Page (`/thanks`)**:
   - Reference code generator (`ZP-XXXXXX`).
   - WhatsApp onboarding alert.
   - Personal referral link (`/?ref=ZP-XXXXXX`) with one-click copy and WhatsApp share button.
3. **Protected Admin Dashboard (`/admin`)**:
   - Password gated via `ADMIN_PASSWORD` and httpOnly secure cookies.
   - Dynamic fleet progress bar summing `boats_count` towards 50 by 17 November 2026, with days remaining countdown.
   - Multi-criteria filter (boat type, jetty, day, status) and live search.
   - Status updates (`New`, `Contacted`, `Verified`, `Live`).
   - One-click CSV export.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + `/brand/tokens.css`
- **Validation**: React Hook Form + Zod
- **Database**: PostgreSQL / Supabase with Row Level Security (RLS) + Resilient Local Fallback
- **Security**: Honeypot field, in-memory IP rate limiting (5 req / 10 min), sanitised parameters, no raw phone logging

---

## 💻 Getting Started Locally

### 1. Prerequisites
Ensure you have **Node.js 18+** installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Default credentials:
- `ADMIN_PASSWORD=zigo2026water`
- `VERIFY_WHATSAPP=false` (Phase 2 stub)

### 4. Seed Realistic Submissions
Pre-populate the database with 5 realistic Lagos boat partner submissions:
```bash
npm run seed
```

### 5. Start the Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Migration (Supabase)

The full PostgreSQL migration file is located at `supabase/migrations/0001_partner_submissions.sql`.

To apply it in Supabase:
1. Open your Supabase project dashboard.
2. Go to the **SQL Editor**.
3. Paste the contents of `supabase/migrations/0001_partner_submissions.sql` and click **Run**.
4. Retrieve your `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from **Project Settings > API** and add them to your `.env.local` or Vercel environment.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Root Directory to `zigo-boat-partners` if deploying from a monorepo or subfolder.
4. Add the following Environment Variables in Vercel:
   - `ADMIN_PASSWORD`: A secure password of your choice
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key
   - `VERIFY_WHATSAPP`: `false`
5. Deploy!
