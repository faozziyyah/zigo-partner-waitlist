import React, { Suspense } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhatYouEarn from "@/components/WhatYouEarn";
import BeyondTheBoat from "@/components/BeyondTheBoat";
import PartnerForm from "@/components/PartnerForm";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A1633] selection:bg-[#19A7CE] selection:text-[#0A1633]">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhatYouEarn />
        <BeyondTheBoat />
        <Suspense
          fallback={
            <div className="py-24 text-center text-white/60">
              Loading partner registration form...
            </div>
          }
        >
          <PartnerForm />
        </Suspense>
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
