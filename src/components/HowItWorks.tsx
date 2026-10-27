import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register your interest",
      description:
        "Tell us about your fleet, preferred jetty hub, and available operating days in under three minutes.",
      badge: "Step 1",
    },
    {
      number: "02",
      title: "Complete verification",
      description:
        "Our marine operations team checks safety gear, boat seaworthiness, and captain certification quietly and smoothly.",
      badge: "Step 2",
    },
    {
      number: "03",
      title: "Agree rates and availability",
      description:
        "You lock in your guaranteed take-home rate. You decide when your boat sails and when it rests.",
      badge: "Step 3",
    },
    {
      number: "04",
      title: "Go live on Zigo",
      description:
        "Receive verified premium bookings via WhatsApp, charter requests from top Lagos venues, and instant daily payouts.",
      badge: "Step 4",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-[#0A1633] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <p className="text-xs uppercase tracking-[0.25em] text-[#19A7CE] font-semibold mb-3">
            Simple & Effortless
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-white leading-tight">
            Four quiet steps to <em className="text-[#8FB4FF] not-italic italic font-normal">embark.</em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            No endless paperwork. We meet you at your home jetty and take care of the setup.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative rounded-2xl bg-white/[0.04] border border-white/10 p-8 flex flex-col justify-between hover:border-[#19A7CE]/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl sm:text-4xl font-serif text-white/30 group-hover:text-[#19A7CE] transition-colors">
                    {step.number}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#8FB4FF]">
                    {step.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#19A7CE]">
                <span>Stage {idx + 1} of 4</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#19A7CE]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
