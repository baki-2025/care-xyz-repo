import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingHeader from "@/components/book/BookingHeader";
import BookingSteps from "@/components/book/BookingSteps";
import BookingSummary from "@/components/book/BookingSummary";

export const metadata = {
  title: "Book Professional Care | Care.IO",
  description: "Secure your personalized care in three simple steps. We'll match you with a vetted professional within 24 hours.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Form Journey Column */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-12">
            <BookingHeader />
            <BookingSteps />
          </div>

          {/* Summary Sidebar Column */}
          <BookingSummary />
        </div>
      </main>
      <Footer />
    </>
  );
}
