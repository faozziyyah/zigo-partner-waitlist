import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function TermsPage() {
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

        <h1 className="text-3xl sm:text-4xl font-serif">Terms of Service (Boat Partners)</h1>
        <p className="text-sm text-white/60">Effective Date: October 2026 · Zigo Technologies Limited · Lagos</p>

        <div className="space-y-6 text-sm text-white/80 leading-relaxed rounded-3xl bg-white/[0.04] p-8 border border-white/10">
          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">1. Founding Partner Program</h2>
            <p>
              Registering interest establishes your place in the Zigo Water founding circle. Registration does not constitute an exclusive carrier contract until mutual verification is finalized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">2. Rate Guarantee &amp; Payouts</h2>
            <p>
              Your agreed boat rate stays yours. Zigo adds a 10% platform service fee on top of your agreed rate for customer payment. You receive 100% of your agreed boat rate settled directly into your approved account the same day.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-serif text-white">3. Seaworthiness &amp; Maritime Compliance</h2>
            <p>
              Partners agree that registered boats must maintain standard Lagos State Waterways Authority (LASWA) and NIMASA safety certifications, working life vests, and properly credentialed captains before commercial voyages commence.
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
