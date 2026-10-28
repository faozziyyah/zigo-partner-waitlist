"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  todoComment?: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Does it cost anything to register?",
    answer:
      "No. Registering your boat as a founding partner is completely free. There are no signup fees, listing charges, or recurring subscriptions.",
  },
  {
    question: "What happens after I submit?",
    answer:
      "You receive a unique founding partner reference code (ZP-XXXXXX). Our operations team reviews your fleet specifications and messages you directly on WhatsApp to coordinate a simple verification visit at your preferred jetty, agree on your availability calendar, and prepare your boat for launch.",
  },
  {
    question: "How does Zigo get paid?",
    answer:
      "Your agreed boat rate stays 100% yours. Zigo adds a 10% service charge on top of your rate, paid by the charter customer. For example, if your boat rate is ₦700,000, we add ₦70,000 for a customer total of ₦770,000. Your full ₦700,000 is settled into your approved Nigerian bank account the same day.",
  },
  {
    question: "Which boats can join?",
    answer:
      "Yachts, private leisure boats, and commercial passenger boats (including 30-seater, 20-seater, and 15-seater craft) operating along Lagos waterways such as Five Cowries Creek, Victoria Island, Ikoyi, Lekki, and Ilashe.",
  },
  {
    question: "Is my WhatsApp number shared?",
    answer:
      "No. Your WhatsApp number is strictly protected and never shared publicly or displayed to guests. It is used exclusively by the Zigo team to notify you of confirmed bookings, dispatch updates, and captain payouts.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0A1633] text-white border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#19A7CE] font-bold mb-3">
            Common Inquiries
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            Frequently asked <em className="text-[#8FB4FF] not-italic italic font-normal">questions.</em>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Straightforward answers for captains and fleet operators.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#19A7CE]"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-white font-medium">
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#8FB4FF] flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-white/10" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 sm:px-7 text-sm sm:text-base text-white/75 leading-relaxed border-t border-white/5 pt-4">
                    <p>{item.answer}</p>
                    {item.todoComment && (
                      <p className="mt-3 text-xs text-[#8FB4FF]/60 italic font-mono bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                        {item.todoComment}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
