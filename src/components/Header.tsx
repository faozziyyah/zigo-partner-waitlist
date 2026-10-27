"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("register-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A1633]/90 backdrop-blur-md py-3 shadow-lg border-b border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Lockup: Zigo | Water */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19A7CE] rounded-lg p-1"
          aria-label="Zigo Water Home"
        >
          {/* Master Wordmark */}
          <div className="relative h-7 w-20 sm:h-8 sm:w-24">
            <Image
              src="/brand/zigo-logo-white.svg"
              alt="Zigo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Thin Divider conforming to brand specs */}
          <span className="h-5 w-[1px] bg-white/30" aria-hidden="true" />

          {/* Service Accent Lockup */}
          <span className="text-[#19A7CE] font-sans font-medium text-sm sm:text-base tracking-wide">
            Water
          </span>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors hidden md:inline-flex"
          >
            Partner Admin
          </Link>
          <button
            onClick={scrollToForm}
            className="btn-primary-dark text-xs sm:text-sm px-5 py-2.5 sm:px-6 sm:py-3 transition-transform active:scale-95 inline-flex items-center gap-2 shadow-sm"
          >
            <span>Founding Partner</span>
            <svg
              className="w-3.5 h-3.5 text-[#0A1633]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
