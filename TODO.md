# Pre-Launch Checklist & TODO Items for Zigo Water
*Generated: October 2026 for Zigo Water Launch (Target: 17 November 2026)*

The following items are marked with `TODO` throughout the codebase and require operational or partner confirmation before going live:

---

### 1. Jetties & Dockage Agreements (`src/config/jetties.ts`)
- [x] **Five Cowries Creek Terminal**: Confirmed as primary hub (LASWA Terminal, Falomo round-about).
- [ ] **Tarzan Jetty (Victoria Island)**: Confirm partnership agreement and berthing slots with Tarzan Marine.
- [ ] **Civic Centre Jetty (Ozumba Mbadiwe)**: Finalise guest reception access and security boarding protocol with Civic Centre management.
- [ ] **Maroko Jetty (Lekki Phase 1)**: Confirm dedicated security post setup and passenger parking space.
- [ ] **Fiki Marine Jetty**: Confirm fueling arrangements and overnight dockage terms.
- [ ] **CMS / Marina Central Jetty**: Confirm commercial passenger boarding slots during morning peak commute.
- [ ] **Badore Ferry Terminal (Ajah)**: Check low-tide draft depth for speed craft docking.
- [ ] **Ilashe Waterfront Jetties**: Finalise private island club and beach house drop-off permits.

---

### 2. WhatsApp Integration & Operations (`src/lib/verification.ts` & `src/lib/notifications.ts`)
- [ ] **WhatsApp Business API Account**: Register verified Zigo Water business profile on Meta Business Manager.
- [ ] **Automated OTP Templates**: Submit 6-digit verification message template to Meta for approval (`VERIFY_WHATSAPP=true`).
- [ ] **Dispatch & Alert Webhooks**: Connect `notifyNewPartnerSubmission()` to Zigo Slack `#water-operations` channel or direct WhatsApp dispatch group.
- [ ] **Customer Privacy Masking**: Verify virtual number proxy protocol so captains' private numbers remain hidden from riders.

---

### 3. Marine Safety & Seaworthiness (`src/components/FAQSection.tsx`)
- [ ] **Safety Checklist**: Establish standard marine safety gear checklist (working life vests count per passenger class, fire extinguishers, VHF radios).
- [ ] **Captain Verification**: Confirm protocol for validating LASWA captain licenses and commercial boat certifications.

---

### 4. Production Database & Hosting
- [ ] **Run Supabase Migration**: Apply `supabase/migrations/0001_partner_submissions.sql` on production Postgres instance.
- [ ] **Environment Variables on Vercel**:
  - `ADMIN_PASSWORD` (set to high-entropy secure phrase)
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `VERIFY_WHATSAPP`
- [ ] **Swap Placeholder Images**: Replace placeholder photos in `/public/images/` with real high-resolution Zigo photography if desired.
