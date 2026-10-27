"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import AdminProgressBar from "@/components/admin/AdminProgressBar";
import SubmissionsTable from "@/components/admin/SubmissionsTable";
import { SubmissionRecord } from "@/lib/validation";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [totalBoats, setTotalBoats] = useState<number>(0);
  const [totalSubmissions, setTotalSubmissions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [boatTypeFilter, setBoatTypeFilter] = useState("all");
  const [jettyFilter, setJettyFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchSubmissions = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (boatTypeFilter !== "all") params.set("boat_type", boatTypeFilter);
      if (jettyFilter !== "all") params.set("jetty", jettyFilter);
      if (dayFilter !== "all") params.set("day", dayFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }
      const data = await res.json();
      setSubmissions(data.submissions || []);
      setTotalBoats(data.totalBoats || 0);
      setTotalSubmissions(data.totalSubmissions || 0);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setIsLoading(false);
    }
  }, [search, boatTypeFilter, jettyFilter, dayFilter, statusFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error || "Invalid password");
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      fetchSubmissions();
    } catch (err) {
      setLoginError("Login connection error");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setIsAuthenticated(false);
      setSubmissions([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "New" | "Contacted" | "Verified" | "Live"
  ) => {
    try {
      const res = await fetch(`/api/admin/submissions/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
      }
    } catch (e) {
      console.error("Status update error:", e);
    }
  };

  // 1. Loading initial auth check
  if (isAuthenticated === null && isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1633] text-white flex items-center justify-center">
        <p className="text-sm text-white/60">Verifying admin session...</p>
      </div>
    );
  }

  // 2. Unauthenticated: Show Password Login Form
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#0A1633] text-white flex flex-col justify-center items-center px-5 py-12 relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#012DB3]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full rounded-3xl bg-[#0E1D42] border border-white/15 p-8 sm:p-10 shadow-2xl relative z-10 text-center">
          {/* Brand Wordmark */}
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="relative h-8 w-24">
              <Image
                src="/brand/zigo-logo-white.svg"
                alt="Zigo"
                fill
                className="object-contain"
              />
            </div>
            <span className="h-5 w-[1px] bg-white/30" />
            <span className="text-[#19A7CE] font-sans font-medium text-base">
              Water
            </span>
          </div>

          <h1 className="text-2xl font-serif text-white mb-2">Partner Admin</h1>
          <p className="text-xs sm:text-sm text-white/60 mb-8">
            Enter administrative password to view founding boat registrations and target metrics.
          </p>

          {loginError && (
            <div className="p-3 mb-6 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label
                htmlFor="admin_password"
                className="block text-xs font-semibold uppercase tracking-wider text-white/60 mb-2"
              >
                Admin Password
              </label>
              <input
                id="admin_password"
                type="password"
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-[#19A7CE] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full btn-primary-dark py-3.5 flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
            >
              {isLoggingIn ? "Verifying..." : "Access Admin Dashboard"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              ← Back to Waitlist Landing Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0A1633] text-white flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-white/10 bg-[#0A1633]/90 backdrop-blur-md sticky top-0 z-40 px-5 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-7 w-20">
                <Image
                  src="/brand/zigo-logo-white.svg"
                  alt="Zigo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="h-4 w-[1px] bg-white/30" />
              <span className="text-[#19A7CE] font-sans font-medium text-sm">
                Water Admin
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-white/70 hover:text-white transition-colors hidden sm:inline"
            >
              View Landing Page
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs px-4 py-2 rounded-full border border-white/20 text-white/80 hover:bg-white/10 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12 flex-1 space-y-8">
        {/* Progress Bar towards 50 boats by 17 Nov 2026 */}
        <AdminProgressBar
          totalBoats={totalBoats}
          totalSubmissions={totalSubmissions}
        />

        {/* Submissions Management Table */}
        <SubmissionsTable
          submissions={submissions}
          onStatusChange={handleStatusChange}
          search={search}
          setSearch={setSearch}
          boatTypeFilter={boatTypeFilter}
          setBoatTypeFilter={setBoatTypeFilter}
          jettyFilter={jettyFilter}
          setJettyFilter={setJettyFilter}
          dayFilter={dayFilter}
          setDayFilter={setDayFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isLoading={isLoading}
        />
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/50">
        © 2026 Zigo Technologies Limited · Lagos Fleet Operations Console
      </footer>
    </div>
  );
}
