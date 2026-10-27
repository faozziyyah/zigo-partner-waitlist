"use client";

import React, { useState } from "react";
import { SubmissionRecord } from "@/lib/validation";
import { LAGOS_JETTIES } from "@/config/jetties";

interface SubmissionsTableProps {
  submissions: SubmissionRecord[];
  onStatusChange: (id: string, newStatus: "New" | "Contacted" | "Verified" | "Live") => Promise<void>;
  search: string;
  setSearch: (v: string) => void;
  boatTypeFilter: string;
  setBoatTypeFilter: (v: string) => void;
  jettyFilter: string;
  setJettyFilter: (v: string) => void;
  dayFilter: string;
  setDayFilter: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  isLoading: boolean;
}

export default function SubmissionsTable({
  submissions,
  onStatusChange,
  search,
  setSearch,
  boatTypeFilter,
  setBoatTypeFilter,
  jettyFilter,
  setJettyFilter,
  dayFilter,
  setDayFilter,
  statusFilter,
  setStatusFilter,
  isLoading,
}: SubmissionsTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // CSV Export handler
  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const headers = [
      "Reference Code",
      "Captain Name",
      "WhatsApp (E.164)",
      "Referred By",
      "Boats Count",
      "Boat Types",
      "Other Boat Type",
      "Preferred Jetty",
      "Custom Jetty",
      "Available Days",
      "Rates Breakdown",
      "Status",
      "Registered At",
    ];

    const rows = submissions.map((s) => {
      const pricingStr = s.pricing
        .map((p) => `${p.boat_type}: Rate ₦${p.rate_ngn} / Last ₦${p.last_price_ngn}`)
        .join(" | ");

      return [
        `"${s.reference_code}"`,
        `"${s.captain_name.replace(/"/g, '""')}"`,
        `"${s.whatsapp_e164}"`,
        `"${(s.referred_by || "").replace(/"/g, '""')}"`,
        s.boats_count,
        `"${s.boat_types.join(", ")}"`,
        `"${(s.boat_type_other || "").replace(/"/g, '""')}"`,
        `"${s.preferred_jetty}"`,
        `"${(s.jetty_other || "").replace(/"/g, '""')}"`,
        `"${s.available_days.join(", ")}"`,
        `"${pricingStr}"`,
        `"${s.status}"`,
        `"${new Date(s.created_at).toLocaleString()}"`,
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zigo-boat-partners-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusSelect = async (id: string, newStatus: any) => {
    setUpdatingId(id);
    try {
      await onStatusChange(id, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "Contacted":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "Verified":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Live":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      default:
        return "bg-white/10 text-white/70 border-white/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="p-6 rounded-3xl bg-[#0E1D42] border border-white/15 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by captain, phone, ZP code, or referrer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/15 pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#19A7CE] focus:outline-none"
            />
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={exportToCSV}
            disabled={submissions.length === 0}
            className="btn-primary-dark text-xs sm:text-sm px-5 py-2.5 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
          >
            <svg className="w-4 h-4 text-[#0A1633]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Export CSV ({submissions.length})</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Boat Type Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
              Boat Type
            </label>
            <select
              value={boatTypeFilter}
              onChange={(e) => setBoatTypeFilter(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all" className="bg-[#0A1633]">All Boat Types</option>
              <option value="Yacht" className="bg-[#0A1633]">Yacht</option>
              <option value="30-seater" className="bg-[#0A1633]">30-seater</option>
              <option value="20-seater" className="bg-[#0A1633]">20-seater</option>
              <option value="15-seater" className="bg-[#0A1633]">15-seater</option>
              <option value="Other" className="bg-[#0A1633]">Other</option>
            </select>
          </div>

          {/* Jetty Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
              Jetty Hub
            </label>
            <select
              value={jettyFilter}
              onChange={(e) => setJettyFilter(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all" className="bg-[#0A1633]">All Jetties</option>
              {LAGOS_JETTIES.map((j) => (
                <option key={j.id} value={j.id} className="bg-[#0A1633]">
                  {j.name}
                </option>
              ))}
            </select>
          </div>

          {/* Day Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
              Available Day
            </label>
            <select
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all" className="bg-[#0A1633]">Any Day</option>
              <option value="Friday" className="bg-[#0A1633]">Friday</option>
              <option value="Saturday" className="bg-[#0A1633]">Saturday</option>
              <option value="Sunday" className="bg-[#0A1633]">Sunday</option>
              <option value="Monday" className="bg-[#0A1633]">Monday</option>
              <option value="Tuesday" className="bg-[#0A1633]">Tuesday</option>
              <option value="Wednesday" className="bg-[#0A1633]">Wednesday</option>
              <option value="Thursday" className="bg-[#0A1633]">Thursday</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
              Verification Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl bg-white/10 border border-white/15 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="all" className="bg-[#0A1633]">All Statuses</option>
              <option value="New" className="bg-[#0A1633]">New</option>
              <option value="Contacted" className="bg-[#0A1633]">Contacted</option>
              <option value="Verified" className="bg-[#0A1633]">Verified</option>
              <option value="Live" className="bg-[#0A1633]">Live</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table Card */}
      <div className="rounded-3xl bg-[#0E1D42] border border-white/15 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-white/80">
            <thead className="bg-white/5 border-b border-white/10 text-white/60 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-6">Reference / Date</th>
                <th className="py-4 px-6">Captain & Phone</th>
                <th className="py-4 px-6">Fleet & Boats</th>
                <th className="py-4 px-6">Jetty & Days</th>
                <th className="py-4 px-6">Pricing (Rate / Last)</th>
                <th className="py-4 px-6">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/50">
                    Loading partner submissions...
                  </td>
                </tr>
              ) : submissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/50">
                    No partner submissions found matching the criteria.
                  </td>
                </tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-white/[0.03] transition-colors">
                    {/* Reference & Date */}
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-white block">
                        {sub.reference_code}
                      </span>
                      <span className="text-[11px] text-white/50 block">
                        {new Date(sub.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {sub.referred_by && (
                        <span className="text-[10px] text-[#8FB4FF] block mt-0.5">
                          Ref by: {sub.referred_by}
                        </span>
                      )}
                    </td>

                    {/* Captain & Phone */}
                    <td className="py-4 px-6">
                      <span className="font-medium text-white block">
                        {sub.captain_name}
                      </span>
                      <a
                        href={`https://wa.me/${sub.whatsapp_e164.replace(/\+/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#19A7CE] hover:underline flex items-center gap-1 font-mono mt-0.5"
                      >
                        <span>{sub.whatsapp_e164}</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </td>

                    {/* Fleet */}
                    <td className="py-4 px-6">
                      <span className="font-semibold text-white block">
                        {sub.boats_count} {sub.boats_count === 1 ? "boat" : "boats"}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sub.boat_types.map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/90"
                          >
                            {t === "Other" && sub.boat_type_other ? sub.boat_type_other : t}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Jetty & Days */}
                    <td className="py-4 px-6">
                      <span className="text-white block font-medium">
                        {sub.preferred_jetty === "other"
                          ? sub.jetty_other || "Custom Jetty"
                          : LAGOS_JETTIES.find((j) => j.id === sub.preferred_jetty)?.name || sub.preferred_jetty}
                      </span>
                      <span className="text-[11px] text-white/50 block mt-0.5">
                        {sub.available_days.length === 7
                          ? "Every day"
                          : sub.available_days.join(", ")}
                      </span>
                    </td>

                    {/* Pricing */}
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        {sub.pricing.map((pr) => (
                          <div key={pr.boat_type} className="text-xs">
                            <span className="text-white/60">{pr.boat_type}: </span>
                            <span className="font-semibold text-white">₦{pr.rate_ngn.toLocaleString()}</span>
                            <span className="text-[11px] text-white/40"> (min ₦{pr.last_price_ngn.toLocaleString()})</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Status Action */}
                    <td className="py-4 px-6">
                      <select
                        value={sub.status}
                        disabled={updatingId === sub.id}
                        onChange={(e) => handleStatusSelect(sub.id, e.target.value)}
                        className={`rounded-xl border px-3 py-1.5 text-xs font-semibold focus:outline-none transition-all ${getStatusColor(
                          sub.status
                        )} bg-[#0A1633] cursor-pointer`}
                      >
                        <option value="New" className="bg-[#0A1633] text-blue-300">New</option>
                        <option value="Contacted" className="bg-[#0A1633] text-amber-300">Contacted</option>
                        <option value="Verified" className="bg-[#0A1633] text-purple-300">Verified</option>
                        <option value="Live" className="bg-[#0A1633] text-emerald-300">Live</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
