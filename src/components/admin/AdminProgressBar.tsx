"use client";

import React, { useState, useEffect } from "react";

interface AdminProgressBarProps {
  totalBoats: number;
  totalSubmissions: number;
}

export default function AdminProgressBar({
  totalBoats,
  totalSubmissions,
}: AdminProgressBarProps) {
  const TARGET_BOATS = 50;
  const [daysRemaining, setDaysRemaining] = useState<number>(21);

  useEffect(() => {
    const TARGET_DATE = new Date("2026-11-17T00:00:00Z");
    const diffTime = TARGET_DATE.getTime() - Date.now();
    setDaysRemaining(Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24))));
  }, []);

  const percentage = Math.min(100, Math.round((totalBoats / TARGET_BOATS) * 100));

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0E1D42] border border-white/15 text-white shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#19A7CE]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#19A7CE] font-bold block mb-1">
            Launch Fleet Target
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif">
            Progress to <em className="text-[#8FB4FF] not-italic italic font-normal">50 boats</em>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Official Lagos launch target deadline: 17 November 2026
          </p>
        </div>

        {/* Counter Stats */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#19A7CE]">
              {totalBoats}
            </span>
            <span className="text-white/40 text-lg"> / {TARGET_BOATS}</span>
            <p className="text-[11px] uppercase tracking-wider text-white/60 font-semibold">
              Registered Boats (Summed)
            </p>
          </div>

          <div className="h-10 w-[1px] bg-white/15" />

          <div>
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#8FB4FF]">
              {daysRemaining}
            </span>
            <span className="text-xs text-white/60 block">Days remaining</span>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-white/10 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#012DB3] via-[#19A7CE] to-[#8FB4FF] transition-all duration-700 shadow-[0_0_12px_rgba(25,167,206,0.5)]"
          style={{ width: `${Math.max(4, percentage)}%` }}
        />
      </div>

      {/* Micro Status Indicators */}
      <div className="flex flex-wrap items-center justify-between text-xs text-white/60 mt-4 pt-2">
        <span>{percentage}% of fleet registered</span>
        <span className="flex items-center gap-2">
          <span>{totalSubmissions} total partner submissions</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#19A7CE]" />
          <span>{TARGET_BOATS - totalBoats > 0 ? `${TARGET_BOATS - totalBoats} more boats needed` : "Launch fleet secured!"}</span>
        </span>
      </div>
    </div>
  );
}
