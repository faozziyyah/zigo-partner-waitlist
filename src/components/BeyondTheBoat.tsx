import React from "react";
import Image from "next/image";

export default function BeyondTheBoat() {
  const perks = [
    {
      title: "Ilashe & Tarkwa Waterfront Clubs",
      description:
        "Direct partnership agreements with top beach houses and private island resorts for scheduled and VIP charter drop-offs.",
      tag: "Destinations",
    },
    {
      title: "Curated Lagos Private Events",
      description:
        "Access exclusive high-value bookings during Detty December, corporate regattas, and private celebrations across Lagos waters.",
      tag: "Seasonal Charters",
    },
    {
      title: "Free Launch Promotions for Founding Partners",
      description:
        "We are offering free promotions for founding boat partners at launch to put your fleet directly in front of vetted Lagos members.",
      tag: "Founding Perk",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#0A1633] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative group">
            <div className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src="/images/lagos-beachhouse.jpg"
                alt="Luxury beach club jetty with boat in Lagos"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1633] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0A1633]/85 backdrop-blur-md border border-white/15">
                <span className="text-xs uppercase tracking-[0.2em] text-[#19A7CE] font-semibold block mb-1">
                  Waterfront Ecosystem
                </span>
                <p className="font-serif text-lg sm:text-xl text-white">
                  Connecting your boat with premier beach houses and private islands.
                </p>
              </div>
            </div>
          </div>

          {/* Copy and Perk List */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8FB4FF] font-semibold mb-3">
                Beyond The Boat
              </p>
              <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
                Beach houses, membership clubs, <em className="text-[#8FB4FF] not-italic italic font-normal">celebrations.</em>
              </h2>
              <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
                Zigo Water is more than a booking engine. We integrate your boat into the wider luxury rhythm of Lagos.
              </p>
            </div>

            <div className="space-y-4">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/25 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-lg text-white font-medium">
                      {perk.title}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/10 text-[#8FB4FF]">
                      {perk.tag}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Ecosystem glimpse (small mention per prompt rules) */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-white/50">
              
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="w-2 h-2 rounded-full bg-[#F2923C]" />
                  Ride
                </span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <span className="w-2 h-2 rounded-full bg-[#8B7BF0]" />
                  Concierge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
