import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ElderlyHero from "@/components/elderly/ElderlyHero";
import PhilosophyGrid from "@/components/elderly/PhilosophyGrid";
import PricingBanner from "@/components/elderly/PricingBanner";
import ServiceSidebar from "@/components/elderly/ServiceSidebar";

export const metadata = {
  title: "Elderly Care & Companionship | Care.IO",
  description: "Specialized, empathetic care for seniors. We provide professional medical assistance and genuine companionship.",
};

export default function ElderlyCarePage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <ElderlyHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-20">
            <PhilosophyGrid />
            <PricingBanner />
          </div>

          {/* Sidebar */}
          <ServiceSidebar />
        </div>
      </main>
      <Footer />
    </>
  );
}
