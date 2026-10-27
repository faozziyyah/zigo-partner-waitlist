"use client";

import React from "react";
import Image from "next/image";

export default function Hero() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-[#0A1633] text-white flex items-center justify-center pt-24 pb-16 px-5 sm:px-8 overflow-hidden">
      {/* Background authentic Lagos Lagoon visual with radial gradient vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-water.jpg"
          alt="Luxury yacht cruising across Lagos lagoon at golden hour"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-radial-[circle_at_50%_30%] from-transparent via-[#0A1633]/70 to-[#0A1633]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1633]/60 via-transparent to-[#0A1633]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">

        {/* Primary Headline with one italic Playfair accent word */}
        <h1 className="text-4xl sm:text-6xl md:text-[100px] font-serif tracking-tight leading-[1.08] max-w-4xl mb-6">
          Bring your boat to Zigo Water. <br className="hidden sm:inline" />
        </h1>

        {/* Required Sub-line */}
        <p className="text-lg sm:text-2xl text-white/80 font-light tracking-wide mb-10 max-w-2xl">
          Yachts. Private boats. Commercial boats.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={scrollToForm}
            className="w-full sm:w-auto btn-primary-dark text-base sm:text-lg px-8 py-4 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-98 transition-all"
          >
            <span>Join as a founding partner</span>
            <svg
              className="w-5 h-5 text-[#0A1633]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto btn-outline-dark text-sm sm:text-base px-6 py-4 flex items-center justify-center gap-2 text-white/80 hover:text-white"
          >
            <span>How it works</span>
          </a>
        </div>

        {/* Key Partner Guarantees Badges */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 mt-16 sm:mt-20 pt-8 border-t border-white/10 w-full max-w-3xl text-left">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#19A7CE]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Your Rate Stays Yours</p>
              <p className="text-xs text-white/60">Zigo adds 10% on top</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#19A7CE]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Same-Day Payouts</p>
              <p className="text-xs text-white/60">Direct to approved account</p>
            </div>
          </div>

          <div className="flex items-start gap-3 col-span-2 md:col-span-1 justify-center md:justify-start">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#19A7CE]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm text-white">Free Launch Promo</p>
              <p className="text-xs text-white/60">Clubs, events & beach houses</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
