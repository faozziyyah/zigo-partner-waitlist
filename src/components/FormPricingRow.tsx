"use client";

import React from "react";
import { PricingItem } from "@/lib/validation";

interface FormPricingRowProps {
  boatType: string;
  item?: PricingItem;
  onChange: (updated: PricingItem) => void;
  error?: string;
}

export default function FormPricingRow({
  boatType,
  item = { boat_type: boatType, rate_ngn: 0, last_price_ngn: 0 },
  onChange,
  error,
}: FormPricingRowProps) {
  // Format raw number to comma string (e.g. 700000 -> 700,000)
  const formatComma = (val: number) => {
    if (!val || isNaN(val) || val === 0) return "";
    return val.toLocaleString("en-US");
  };

  // Parse comma string to raw number
  const parseRawNumber = (str: string): number => {
    const clean = str.replace(/[^0-9]/g, "");
    return clean ? parseInt(clean, 10) : 0;
  };

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRawNumber(e.target.value);
    onChange({
      ...item,
      boat_type: boatType,
      rate_ngn: raw,
    });
  };

  const handleLastPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = parseRawNumber(e.target.value);
    onChange({
      ...item,
      boat_type: boatType,
      last_price_ngn: raw,
    });
  };

  const hasMismatch =
    item.rate_ngn > 0 &&
    item.last_price_ngn > 0 &&
    item.last_price_ngn > item.rate_ngn;

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#EEF2FB] border border-[#E2E6EF] space-y-3 transition-all">
      <div className="flex items-center justify-between">
        <span className="font-serif font-semibold text-base sm:text-lg text-[#0B1220] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#19A7CE]" />
          {boatType}
        </span>
        <span className="text-xs text-[#5B6478]">
          Zigo adds 10% on top of your rate
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Your Rate Input */}
        <div>
          <label
            htmlFor={`rate-${boatType}`}
            className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-1.5"
          >
            Your Rate (₦) <span className="text-[#012DB3]">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5B6478] font-medium text-sm">
              ₦
            </div>
            <input
              id={`rate-${boatType}`}
              type="text"
              inputMode="numeric"
              placeholder="e.g. 700,000"
              value={formatComma(item.rate_ngn)}
              onChange={handleRateChange}
              className="block w-full rounded-xl bg-white border border-[#E2E6EF] py-2.5 pl-8 pr-3 text-sm font-medium text-[#0B1220] placeholder-[#5B6478]/50 focus:border-[#19A7CE] focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/20"
            />
          </div>
          <p className="mt-1 text-[11px] text-[#5B6478]">
            Standard charter fee for this boat
          </p>
        </div>

        {/* Last Price Input */}
        <div>
          <label
            htmlFor={`last-price-${boatType}`}
            className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-1.5"
          >
            Last Price (₦) <span className="text-[#012DB3]">*</span>
          </label>
          <div className="relative rounded-xl shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#5B6478] font-medium text-sm">
              ₦
            </div>
            <input
              id={`last-price-${boatType}`}
              type="text"
              inputMode="numeric"
              placeholder="e.g. 600,000"
              value={formatComma(item.last_price_ngn)}
              onChange={handleLastPriceChange}
              className={`block w-full rounded-xl bg-white border ${
                hasMismatch ? "border-red-500" : "border-[#E2E6EF]"
              } py-2.5 pl-8 pr-3 text-sm font-medium text-[#0B1220] placeholder-[#5B6478]/50 focus:border-[#19A7CE] focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/20`}
            />
          </div>
          <p className="mt-1 text-[11px] text-[#5B6478]">
            Lowest price you would accept
          </p>
        </div>
      </div>

      {hasMismatch && (
        <p className="text-xs font-medium text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          Last price cannot be higher than your standard rate.
        </p>
      )}

      {error && (
        <p className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
