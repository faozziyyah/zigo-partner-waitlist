"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

function ThanksContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "ZP-FOUNDER";
  const captainName = searchParams.get("name") || "Captain";
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#19A7CE", "#8FB4FF", "#012DB3", "#FFFFFF"],
      });
    }
  }, []);

  const referralLink = origin ? `${origin}/?ref=${refCode}` : `/?ref=${refCode}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just registered as a founding boat partner on Zigo Water. Register your boat or fleet before the Lagos launch: ${referralLink}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0A1633] text-white flex flex-col justify-between py-12 px-5 sm:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#012DB3]/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Brand */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-8 border-b border-white/10 relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-7 w-20 sm:h-8 sm:w-24">
            <Image
              src="/brand/zigo-logo-white.svg"
              alt="Zigo"
              fill
              className="object-contain"
            />
          </div>
          <span className="h-5 w-[1px] bg-white/30" aria-hidden="true" />
          <span className="text-[#19A7CE] font-sans font-medium text-sm sm:text-base tracking-wide">
            Water
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors"
        >
          ← Return to site
        </Link>
      </div>

      {/* Main Confirmation Card */}
      <main className="max-w-xl mx-auto w-full my-auto py-12 relative z-10 text-center">
        {/* Verification Icon Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#19A7CE]/20 border border-[#19A7CE]/40 text-[#19A7CE] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(25,167,206,0.3)]">
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-serif tracking-tight text-white mb-4">
          Welcome aboard, <em className="text-[#8FB4FF] not-italic italic font-normal">{captainName}.</em>
        </h1>

        <p className="text-base sm:text-lg text-white/80 max-w-md mx-auto mb-8 leading-relaxed">
          You&apos;re on the founding partners list. We&apos;ll message you on WhatsApp.
        </p>

        {/* Reference Code Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.05] border border-white/15 backdrop-blur-md mb-8 text-left shadow-2xl relative">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8FB4FF] block mb-2">
            Your Founding Reference Code
          </span>
          <div className="flex items-center justify-between gap-4">
            <span className="text-2xl sm:text-4xl font-mono font-bold tracking-wider text-white">
              {refCode}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#19A7CE]/20 text-[#19A7CE] border border-[#19A7CE]/30">
              Verified Partner
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
            <p className="text-xs text-white/60">
              Share your personal founding partner link with other captains and boat owners:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                readOnly
                value={referralLink}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-xs sm:text-sm text-white font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="btn-primary-dark text-xs sm:text-sm px-6 py-3 whitespace-nowrap flex items-center justify-center gap-2"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-[#0A1633] font-semibold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.111-.059-.413-.136-.957-.315-1.636-.615-1.464-.648-2.42-2.129-2.493-2.227-.074-.099-.607-.808-.607-1.543 0-.735.385-1.097.522-1.246.137-.149.3-.186.4-.186.1 0 .2 0 .287.005.093.004.218-.035.342.261.127.304.435 1.059.473 1.137.038.078.063.169.012.269-.051.1-.077.163-.153.251-.076.088-.161.196-.23.264-.077.076-.157.159-.067.314.089.155.396.653.85 1.058.584.521 1.077.682 1.229.758.152.076.241.063.33-.038.089-.101.381-.444.482-.596.101-.152.203-.127.342-.076.139.051.889.419 1.042.495.152.076.253.114.291.177.038.064.038.368-.106.773z" />
            </svg>
            <span>Share via WhatsApp</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto btn-outline-dark text-xs sm:text-sm px-6 py-3.5 flex items-center justify-center gap-2"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="max-w-4xl mx-auto w-full pt-8 border-t border-white/10 text-center text-xs text-white/50 relative z-10">
        © 2026 Zigo Technologies Limited · Lagos Water Operations
      </footer>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A1633] text-white flex items-center justify-center">
          Loading partner confirmation...
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
