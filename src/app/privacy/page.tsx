import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A1633] text-white py-12 px-5 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="relative h-7 w-20">
            <Image
              src="/brand/zigo-logo-white.svg"
              alt="Zigo"
              fill
              className="object-contain"
            />
          </div>
          <span className="h-4 w-[1px] bg-white/30" />
          <span className="text-[#19A7CE] font-sans text-sm">Water</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-serif">Privacy Policy (Boat Partners)</h1>
        <p className="text-sm text-white/60">Effective Date: October 2026 · Zigo Technologies Limited</p>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed rounded-3xl bg-white/[0.04] p-8 border border-white/10">
          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">1. Information We Collect</h2>
            <p>
              We collect information provided directly by founding boat captains and fleet owners during waitlist registration, including your name, Nigerian WhatsApp phone number, fleet count, boat types, mooring jetties, and pricing preferences.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">2. Purpose of Processing</h2>
            <p>
              We use your contact details solely for onboarding your boat into the Zigo Water service, coordinating vessel seaworthiness verifications, verifying captain credentials, and notifying you of confirmed customer charters.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">3. WhatsApp Communications &amp; Data Security</h2>
            <p>
              Your phone number is kept confidential and is never sold, publicly listed, or shared with third-party advertisers. All data is protected with transport encryption and parameterised access control.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">4. Contact</h2>
            <p>
              For data access or modification inquiries, contact:{" "}
              <span className="text-[#8FB4FF]">partners@zigo.ng</span>.
            </p>
          </section>
        </div>

        <div>
          <Link href="/" className="btn-primary-dark text-xs px-6 py-3 inline-flex items-center gap-2">
            ← Return to Zigo Water
          </Link>
        </div>
      </div>
    </div>
  );
}
