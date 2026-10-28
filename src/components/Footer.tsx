import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0A1633] text-white/80 border-t border-white/10 pt-16 pb-12 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
        {/* Brand Lockup */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
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
          </div>
          <p className="text-xs text-white/60 max-w-sm">
            Premium boat and yacht charters connecting captains with Lagos’s most discerning passengers.
          </p>
        </div>

        {/* Navigation & Legal Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/70">
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#register-form" className="hover:text-white transition-colors">
            Partner Registration
          </a>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          {/*<Link
            href="/admin"
            className="text-[#8FB4FF] hover:underline font-medium"
          >
            Partner Admin View →
          </Link>*/}
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
        <p>© 2026 Zigo Technologies Limited · Lagos</p>
        <p>Lagos, handled.</p>
      </div>
    </footer>
  );
}
