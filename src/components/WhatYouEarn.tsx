"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function WhatYouEarn() {
  const [sliderRate, setSliderRate] = useState<number>(700000);

  const zigoFee = Math.round(sliderRate * 0.1);
  const customerTotal = sliderRate + zigoFee;

  return (
    <section className="py-24 sm:py-32 bg-[#EEF2FB] text-[#0B1220] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Explanatory copy & portrait */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#012DB3] font-bold">
              Transparent Economics
            </p>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#0B1220] tracking-tight leading-tight">
              Your rate stays yours. <br />
              Zero commission <em className="text-[#012DB3] not-italic italic font-normal">deductions.</em>
            </h2>

            <p className="text-base sm:text-lg text-[#5B6478] leading-relaxed">
              We never cut into your charter earnings. You tell us how much your boat costs to run, and that is exactly what hits your account the same day.
            </p>

            <div className="p-6 rounded-2xl bg-white border border-[#E2E6EF] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#19A7CE]/15 text-[#19A7CE] flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-lg text-[#0B1220]">
                  How the 10% works
                </h3>
              </div>
              <p className="text-sm text-[#5B6478] leading-relaxed">
                Zigo simply adds a 10% service charge on top of your agreed boat rate to cover security coordination, guest verification, and 24/7 water protocol.
              </p>
              <div className="pt-2 border-t border-[#E2E6EF] text-xs font-semibold text-[#012DB3]">
                Paid into your approved bank account the same day.
              </div>
            </div>

            {/* Captain portrait preview */}
            <div className="flex items-center gap-4 pt-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                <Image
                  src="/images/captain-portrait.jpg"
                  alt="Lagos Boat Captain and Fleet Partner"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0B1220]">
                  Captain Tunde Adebayo
                </p>
                <p className="text-xs text-[#5B6478]">
                  Fleet Owner · 3 Commercial Boats & 1 Yacht (Five Cowries Hub)
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Pricing Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white p-8 sm:p-10 shadow-xl border border-[#E2E6EF] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#19A7CE]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#EEF2FB] text-[#012DB3]">
                  Illustrative Example
                </span>
                <span className="text-xs text-[#5B6478]">Same-day payout</span>
              </div>

              {/* Slider Controls */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="rate-slider" className="text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
                    Adjust Boat Charter Rate
                  </label>
                  <span className="text-xl sm:text-2xl font-serif text-[#012DB3] font-bold">
                    ₦{sliderRate.toLocaleString()}
                  </span>
                </div>
                <input
                  id="rate-slider"
                  type="range"
                  min={200000}
                  max={2500000}
                  step={50000}
                  value={sliderRate}
                  onChange={(e) => setSliderRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#EEF2FB] rounded-lg appearance-none cursor-pointer accent-[#012DB3]"
                />
                <div className="flex justify-between text-[11px] text-[#5B6478]">
                  <span>₦200,000 (Small craft)</span>
                  <span>₦700,000 (Standard)</span>
                  <span>₦2,500,000+ (Luxury Yacht)</span>
                </div>
              </div>

              {/* Breakdown Matrix */}
              <div className="space-y-4 rounded-2xl bg-[#EEF2FB] p-6 border border-[#E2E6EF]">
                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-[#5B6478]">Your Agreed Boat Rate</span>
                  <span className="font-semibold text-[#0B1220]">
                    ₦{sliderRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base">
                  <span className="text-[#5B6478] flex items-center gap-1.5">
                    <span>Zigo Service Charge (10%)</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white text-[#19A7CE] font-semibold border border-[#19A7CE]/30">
                      Added on top
                    </span>
                  </span>
                  <span className="font-semibold text-[#19A7CE]">
                    + ₦{zigoFee.toLocaleString()}
                  </span>
                </div>

                <div className="pt-4 border-t border-[#0B1220]/10 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#5B6478] block">
                      Customer Pays In Total
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-[#0B1220]">
                      ₦{customerTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider text-[#012DB3] font-bold block">
                      You Receive
                    </span>
                    <span className="text-xl sm:text-2xl font-serif font-bold text-[#012DB3]">
                      ₦{sliderRate.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Note callout */}
              <p className="mt-6 text-xs text-[#5B6478] italic leading-normal">
                * Illustrative calculation based on agreed boat rate. 100% of your rate goes directly to your bank account with zero platform commission deductions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
