"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BOAT_TYPES,
  DAYS_OF_WEEK,
  PricingItem,
} from "@/lib/validation";
import { LAGOS_JETTIES } from "@/config/jetties";
import FormPricingRow from "./FormPricingRow";

const STORAGE_KEY = "zigo_partner_form_draft_v1";

export default function PartnerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mobile multi-step state (1, 2, 3)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [captainName, setCaptainName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [boatsCount, setBoatsCount] = useState<number | "">(1);
  const [boatTypes, setBoatTypes] = useState<string[]>(["Yacht"]);
  const [boatTypeOther, setBoatTypeOther] = useState("");
  const [preferredJetty, setPreferredJetty] = useState("five-cowries");
  const [jettyOther, setJettyOther] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([
    "Friday",
    "Saturday",
    "Sunday",
  ]);
  const [pricing, setPricing] = useState<PricingItem[]>([
    { boat_type: "Yacht", rate_ngn: 700000, last_price_ngn: 600000 },
  ]);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // 1. Load referred_by from URL param (?ref=ZP-XXXXXX)
  useEffect(() => {
    const refParam = searchParams.get("ref");
    if (refParam && !referredBy) {
      setReferredBy(refParam.toUpperCase());
    }
  }, [searchParams, referredBy]);

  // 2. Autosave / Restore from sessionStorage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.captainName) setCaptainName(parsed.captainName);
        if (parsed.whatsappNumber) setWhatsappNumber(parsed.whatsappNumber);
        if (parsed.referredBy && !searchParams.get("ref")) setReferredBy(parsed.referredBy);
        if (parsed.boatsCount) setBoatsCount(parsed.boatsCount);
        if (parsed.boatTypes) setBoatTypes(parsed.boatTypes);
        if (parsed.boatTypeOther) setBoatTypeOther(parsed.boatTypeOther);
        if (parsed.preferredJetty) setPreferredJetty(parsed.preferredJetty);
        if (parsed.jettyOther) setJettyOther(parsed.jettyOther);
        if (parsed.availableDays) setAvailableDays(parsed.availableDays);
        if (parsed.pricing) setPricing(parsed.pricing);
        if (parsed.consent !== undefined) setConsent(parsed.consent);
      }
    } catch (e) {
      console.warn("Could not restore session draft", e);
    }
  }, [searchParams]);

  const saveToSession = () => {
    try {
      const draft = {
        captainName,
        whatsappNumber,
        referredBy,
        boatsCount,
        boatTypes,
        boatTypeOther,
        preferredJetty,
        jettyOther,
        availableDays,
        pricing,
        consent,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    saveToSession();
  }, [
    captainName,
    whatsappNumber,
    referredBy,
    boatsCount,
    boatTypes,
    boatTypeOther,
    preferredJetty,
    jettyOther,
    availableDays,
    pricing,
    consent,
  ]);

  // Synchronise pricing array whenever boatTypes change
  const handleBoatTypeToggle = (type: string) => {
    let nextTypes: string[];
    if (boatTypes.includes(type)) {
      if (boatTypes.length === 1) return; // Must keep at least one
      nextTypes = boatTypes.filter((t) => t !== type);
    } else {
      nextTypes = [...boatTypes, type];
    }
    setBoatTypes(nextTypes);

    // Keep pricing rows aligned
    const updatedPricing = nextTypes.map((t) => {
      const existing = pricing.find((p) => p.boat_type === t);
      if (existing) return existing;
      return { boat_type: t, rate_ngn: 500000, last_price_ngn: 450000 };
    });
    setPricing(updatedPricing);
  };

  // Quick day toggles
  const handleAllDays = () => {
    setAvailableDays([...DAYS_OF_WEEK]);
  };

  const handleWeekendsOnly = () => {
    setAvailableDays(["Saturday", "Sunday"]);
  };

  const handleDayToggle = (day: string) => {
    if (availableDays.includes(day)) {
      if (availableDays.length === 1) return;
      setAvailableDays(availableDays.filter((d) => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const handlePricingRowChange = (index: number, updated: PricingItem) => {
    const next = [...pricing];
    next[index] = updated;
    setPricing(next);
  };

  // Step 1 validation
  const validateStep1 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!captainName.trim() || captainName.trim().length < 2) {
      errors.captainName = "Please enter your full name";
    }
    if (!whatsappNumber.trim()) {
      errors.whatsappNumber = "WhatsApp number is required";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 2 validation
  const validateStep2 = (): boolean => {
    const errors: Record<string, string> = {};
    if (!boatsCount || Number(boatsCount) < 1) {
      errors.boatsCount = "Must be at least 1 boat";
    }
    if (boatTypes.length === 0) {
      errors.boatTypes = "Select at least one boat type";
    }
    if (boatTypes.includes("Other") && !boatTypeOther.trim()) {
      errors.boatTypeOther = "Please specify your boat type";
    }
    if (!preferredJetty) {
      errors.preferredJetty = "Please choose a primary jetty";
    }
    if (preferredJetty === "other" && !jettyOther.trim()) {
      errors.jettyOther = "Please specify your jetty location";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Step 3 & Final Submission validation
  const validateAll = (): boolean => {
    const step1Ok = validateStep1();
    const step2Ok = validateStep2();
    const errors: Record<string, string> = {};

    if (availableDays.length === 0) {
      errors.availableDays = "Please select at least one available day";
    }

    for (const p of pricing) {
      if (!p.rate_ngn || p.rate_ngn <= 0) {
        errors[`pricing_${p.boat_type}`] = `Please enter a valid rate for ${p.boat_type}`;
      }
      if (!p.last_price_ngn || p.last_price_ngn <= 0) {
        errors[`pricing_${p.boat_type}`] = `Please enter a last price for ${p.boat_type}`;
      }
      if (p.last_price_ngn > p.rate_ngn) {
        errors[`pricing_${p.boat_type}`] = `Last price cannot exceed standard rate for ${p.boat_type}`;
      }
    }

    if (!consent) {
      errors.consent = "You must agree to be contacted on WhatsApp";
    }

    setFieldErrors((prev) => ({ ...prev, ...errors }));
    return step1Ok && step2Ok && Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture UTM params from URL
      const utmObj: Record<string, string> = {};
      ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((param) => {
        const val = searchParams.get(param);
        if (val) utmObj[param] = val;
      });

      const payload = {
        captain_name: captainName.trim(),
        whatsapp_number: whatsappNumber.trim(),
        referred_by: referredBy.trim() || undefined,
        boats_count: Number(boatsCount),
        boat_types: boatTypes,
        boat_type_other: boatTypes.includes("Other") ? boatTypeOther.trim() : undefined,
        preferred_jetty: preferredJetty,
        jetty_other: preferredJetty === "other" ? jettyOther.trim() : undefined,
        available_days: availableDays,
        pricing,
        consent,
        website_hp: honeypot,
        utm: Object.keys(utmObj).length > 0 ? utmObj : null,
      };

      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setServerError("This number is already on the list.");
        } else {
          setServerError(data.error || "Could not register boat partner. Please check details.");
        }
        setIsSubmitting(false);
        return;
      }

      // Clear draft on successful submission
      sessionStorage.removeItem(STORAGE_KEY);

      // Redirect to /thanks with ref code and captain name
      router.push(`/thanks?ref=${data.reference_code}&name=${encodeURIComponent(captainName.trim())}`);
    } catch (err: any) {
      setServerError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register-form" className="py-24 sm:py-32 bg-[#0A1633] relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#19A7CE] font-bold mb-3">
            Founding Partner Registration
          </p>
          <h2 className="text-3xl sm:text-7xl font-serif text-white tracking-tight leading-tight">
            Register your boat for <em className="text-[#8FB4FF] not-italic font-normal">Zigo Water.</em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Join the founding circle before 17 November 2026. Zero platform commission on your charter rates.
          </p>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-red-950/80 border border-red-500/50 text-red-200 text-sm flex items-start gap-3 shadow-lg"
          >
            <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="font-semibold text-white">Registration Notice</p>
              <p>{serverError}</p>
            </div>
          </div>
        )}

        {/* Main Card (Mist/White card echoing rounded Zigo identity) */}
        <div className="rounded-3xl bg-white text-[#0B1220] p-6 sm:p-10 shadow-2xl border border-white/20 relative">
          {/* Mobile Step Indicator (Hidden on Desktop) */}
          <div className="md:hidden mb-8 pb-6 border-b border-[#E2E6EF]">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
              <span>Step {currentStep} of 3</span>
              <span className="text-[#012DB3]">
                {currentStep === 1 && "Captain Info"}
                {currentStep === 2 && "Your Fleet"}
                {currentStep === 3 && "Rates & Availability"}
              </span>
            </div>
            <div className="w-full bg-[#EEF2FB] h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-[#012DB3] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* Hidden Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_hp">Leave this empty</label>
              <input
                id="website_hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* STEP 1: Captain Information */}
            <div className={`space-y-6 ${currentStep !== 1 ? "hidden md:block" : ""}`}>
              <div className="border-b border-[#E2E6EF] pb-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B1220] font-semibold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#012DB3] text-white text-xs flex items-center justify-center font-sans font-bold">
                    1
                  </span>
                  Captain & Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Captain Name */}
                <div>
                  <label htmlFor="captain_name" className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    Captain or Fleet Owner Name <span className="text-[#012DB3]">*</span>
                  </label>
                  <input
                    id="captain_name"
                    type="text"
                    required
                    placeholder="e.g. Captain Folarin Gomez"
                    value={captainName}
                    onChange={(e) => {
                      setCaptainName(e.target.value);
                      if (fieldErrors.captainName) {
                        setFieldErrors((prev) => ({ ...prev, captainName: "" }));
                      }
                    }}
                    className={`block w-full rounded-xl bg-[#EEF2FB] border ${
                      fieldErrors.captainName ? "border-red-500" : "border-[#E2E6EF]"
                    } py-3 px-4 text-sm font-medium text-[#0B1220] placeholder-[#5B6478]/60 focus:bg-white focus:border-[#012DB3] focus:outline-none focus:ring-2 focus:ring-[#012DB3]/20 transition-all`}
                  />
                  {fieldErrors.captainName && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.captainName}</p>
                  )}
                </div>

                {/* 2. WhatsApp Number */}
                <div>
                  <label htmlFor="whatsapp_number" className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    WhatsApp Number (Nigerian) <span className="text-[#012DB3]">*</span>
                  </label>
                  <input
                    id="whatsapp_number"
                    type="tel"
                    required
                    placeholder="0803 123 4567 or +234..."
                    value={whatsappNumber}
                    onChange={(e) => {
                      setWhatsappNumber(e.target.value);
                      if (fieldErrors.whatsappNumber) {
                        setFieldErrors((prev) => ({ ...prev, whatsappNumber: "" }));
                      }
                      if (serverError) setServerError(null);
                    }}
                    className={`block w-full rounded-xl bg-[#EEF2FB] border ${
                      fieldErrors.whatsappNumber ? "border-red-500" : "border-[#E2E6EF]"
                    } py-3 px-4 text-sm font-medium text-[#0B1220] placeholder-[#5B6478]/60 focus:bg-white focus:border-[#012DB3] focus:outline-none focus:ring-2 focus:ring-[#012DB3]/20 transition-all`}
                  />
                  <p className="mt-1 text-[11px] text-[#5B6478]">
                    Accepts 0803..., 803..., or +234...
                  </p>
                  {fieldErrors.whatsappNumber && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.whatsappNumber}</p>
                  )}
                </div>

                {/* 3. Referred By */}
                <div className="sm:col-span-2">
                  <label htmlFor="referred_by" className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    Referred By <span className="text-xs font-normal text-[#5B6478]">(Optional)</span>
                  </label>
                  <input
                    id="referred_by"
                    type="text"
                    placeholder="Partner name or referral code (e.g. ZP-ABC123)"
                    value={referredBy}
                    onChange={(e) => setReferredBy(e.target.value)}
                    className="block w-full rounded-xl bg-[#EEF2FB] border border-[#E2E6EF] py-3 px-4 text-sm font-medium text-[#0B1220] placeholder-[#5B6478]/60 focus:bg-white focus:border-[#012DB3] focus:outline-none focus:ring-2 focus:ring-[#012DB3]/20 transition-all"
                  />
                </div>
              </div>

              {/* Mobile Next button for Step 1 */}
              <div className="md:hidden pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setCurrentStep(2);
                  }}
                  className="w-full btn-primary-light py-3.5 flex items-center justify-center gap-2"
                >
                  <span>Continue to Fleet Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* STEP 2: Fleet & Jetty */}
            <div className={`space-y-6 ${currentStep !== 2 ? "hidden md:block" : ""}`}>
              <div className="border-b border-[#E2E6EF] pb-3 pt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B1220] font-semibold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#012DB3] text-white text-xs flex items-center justify-center font-sans font-bold">
                    2
                  </span>
                  Your Fleet & Preferred Jetty
                </h3>
              </div>

              <div className="space-y-6">
                {/* 4. Number of boats */}
                <div className="w-full sm:w-1/2">
                  <label htmlFor="boats_count" className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    Total Number of Boats <span className="text-[#012DB3]">*</span>
                  </label>
                  <input
                    id="boats_count"
                    type="number"
                    min={1}
                    required
                    value={boatsCount}
                    onChange={(e) => {
                      const val = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                      setBoatsCount(val);
                      if (fieldErrors.boatsCount) {
                        setFieldErrors((prev) => ({ ...prev, boatsCount: "" }));
                      }
                    }}
                    className={`block w-full rounded-xl bg-[#EEF2FB] border ${
                      fieldErrors.boatsCount ? "border-red-500" : "border-[#E2E6EF]"
                    } py-3 px-4 text-sm font-medium text-[#0B1220] focus:bg-white focus:border-[#012DB3] focus:outline-none focus:ring-2 focus:ring-[#012DB3]/20`}
                  />
                  {fieldErrors.boatsCount && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.boatsCount}</p>
                  )}
                </div>

                {/* 5. Types of boat (Multi-select) */}
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    Types of Boat (Select all that apply) <span className="text-[#012DB3]">*</span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BOAT_TYPES.map((type) => {
                      const isChecked = boatTypes.includes(type);
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleBoatTypeToggle(type)}
                          className={`p-3 rounded-xl border text-left text-sm font-medium flex items-center justify-between transition-all ${
                            isChecked
                              ? "bg-[#012DB3] text-white border-[#012DB3] shadow-md"
                              : "bg-[#EEF2FB] text-[#0B1220] border-[#E2E6EF] hover:border-[#012DB3]/40"
                          }`}
                        >
                          <span>{type}</span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                              isChecked ? "bg-white text-[#012DB3]" : "border border-[#5B6478]"
                            }`}
                          >
                            {isChecked ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {fieldErrors.boatTypes && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">{fieldErrors.boatTypes}</p>
                  )}

                  {/* If "Other" selected, show text box */}
                  {boatTypes.includes("Other") && (
                    <div className="mt-3">
                      <label htmlFor="boat_type_other" className="block text-xs text-[#5B6478] mb-1 font-medium">
                        Please specify your other boat type:
                      </label>
                      <input
                        id="boat_type_other"
                        type="text"
                        placeholder="e.g. Jet Ski, Pontoon Boat, Catamaran"
                        value={boatTypeOther}
                        onChange={(e) => setBoatTypeOther(e.target.value)}
                        className="block w-full rounded-xl bg-[#EEF2FB] border border-[#E2E6EF] py-2.5 px-4 text-sm font-medium text-[#0B1220] focus:bg-white focus:border-[#012DB3] focus:outline-none"
                      />
                      {fieldErrors.boatTypeOther && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.boatTypeOther}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* 6. Preferred Jetty */}
                <div>
                  <label htmlFor="preferred_jetty" className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478] mb-2">
                    Preferred Jetty Hub <span className="text-[#012DB3]">*</span>
                  </label>
                  <select
                    id="preferred_jetty"
                    value={preferredJetty}
                    onChange={(e) => {
                      setPreferredJetty(e.target.value);
                      if (fieldErrors.preferredJetty) {
                        setFieldErrors((prev) => ({ ...prev, preferredJetty: "" }));
                      }
                    }}
                    className="block w-full rounded-xl bg-[#EEF2FB] border border-[#E2E6EF] py-3 px-4 text-sm font-medium text-[#0B1220] focus:bg-white focus:border-[#012DB3] focus:outline-none"
                  >
                    {LAGOS_JETTIES.map((j) => (
                      <option key={j.id} value={j.id}>
                        {j.name} ({j.location})
                      </option>
                    ))}
                  </select>

                  {/* If "other" selected, show text box */}
                  {preferredJetty === "other" && (
                    <div className="mt-3">
                      <label htmlFor="jetty_other" className="block text-xs text-[#5B6478] mb-1 font-medium">
                        Specify your jetty or mooring pontoon:
                      </label>
                      <input
                        id="jetty_other"
                        type="text"
                        placeholder="e.g. Private dock in Banana Island"
                        value={jettyOther}
                        onChange={(e) => setJettyOther(e.target.value)}
                        className="block w-full rounded-xl bg-[#EEF2FB] border border-[#E2E6EF] py-2.5 px-4 text-sm font-medium text-[#0B1220] focus:bg-white focus:border-[#012DB3] focus:outline-none"
                      />
                      {fieldErrors.jettyOther && (
                        <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.jettyOther}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile controls for Step 2 */}
              <div className="md:hidden flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 py-3 border border-[#E2E6EF] rounded-xl text-sm font-medium text-[#5B6478]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep2()) setCurrentStep(3);
                  }}
                  className="w-2/3 btn-primary-light py-3.5 flex items-center justify-center gap-2"
                >
                  <span>Continue to Pricing</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* STEP 3: Pricing, Available Days & Consent */}
            <div className={`space-y-6 ${currentStep !== 3 ? "hidden md:block" : ""}`}>
              <div className="border-b border-[#E2E6EF] pb-3 pt-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#0B1220] font-semibold flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#012DB3] text-white text-xs flex items-center justify-center font-sans font-bold">
                    3
                  </span>
                  Availability, Rates & Consent
                </h3>
              </div>

              {/* 7. Available Days */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
                    Available Operating Days <span className="text-[#012DB3]">*</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAllDays}
                      className="text-xs text-[#012DB3] hover:underline font-semibold"
                    >
                      Every day
                    </button>
                    <span className="text-[#5B6478] text-xs">·</span>
                    <button
                      type="button"
                      onClick={handleWeekendsOnly}
                      className="text-xs text-[#012DB3] hover:underline font-semibold"
                    >
                      Weekends only
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {DAYS_OF_WEEK.map((day) => {
                    const isSelected = availableDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#012DB3] text-white border-[#012DB3]"
                            : "bg-[#EEF2FB] text-[#0B1220] border-[#E2E6EF] hover:border-[#012DB3]/40"
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.availableDays && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{fieldErrors.availableDays}</p>
                )}
              </div>

              {/* 8. Pricing Rows (One row per checked boat type) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-[#5B6478]">
                    Pricing Breakdown Per Boat Type <span className="text-[#012DB3]">*</span>
                  </span>
                  <span className="text-xs text-[#19A7CE] font-semibold">
                    Same-day payment guarantee
                  </span>
                </div>

                <div className="space-y-4">
                  {pricing.map((pItem, idx) => (
                    <FormPricingRow
                      key={pItem.boat_type}
                      boatType={pItem.boat_type}
                      item={pItem}
                      onChange={(updated) => handlePricingRowChange(idx, updated)}
                      error={fieldErrors[`pricing_${pItem.boat_type}`]}
                    />
                  ))}
                </div>
              </div>

              {/* 9. Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (fieldErrors.consent) {
                        setFieldErrors((prev) => ({ ...prev, consent: "" }));
                      }
                    }}
                    className="w-5 h-5 mt-0.5 rounded border-[#E2E6EF] text-[#012DB3] focus:ring-[#012DB3] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-[#5B6478] leading-relaxed">
                    I agree to be contacted by Zigo on WhatsApp about my boat and to the{" "}
                    <a href="/privacy" target="_blank" className="text-[#012DB3] underline font-semibold">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {fieldErrors.consent && (
                  <p className="mt-1.5 text-xs text-red-600 font-medium pl-8">{fieldErrors.consent}</p>
                )}
              </div>

              {/* Submission Controls */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                {currentStep === 3 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="md:hidden w-full sm:w-auto py-3 px-6 border border-[#E2E6EF] rounded-xl text-sm font-medium text-[#5B6478]"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary-light text-base sm:text-lg py-4 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-98 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Securing Your Partner Reference...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Founding Partner Registration</span>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
