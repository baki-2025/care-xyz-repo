import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundVisual from "@/components/NotFoundVisual";
import { Home, Headset, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Page Not Found | Care.IO",
  description:
    "The page you are looking for could not be found. Return home or contact our support team.",
};

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface overflow-x-hidden min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-28 pb-12 px-6">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: Animated Visual ── */}
          <NotFoundVisual />

          {/* ── Right: Content Side ── */}
          <div className="order-1 lg:order-2 flex flex-col space-y-10">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-black uppercase tracking-widest">
                <span>🧭</span> Pathway Unclear
              </span>

              <h1 className="text-6xl lg:text-7xl font-headline font-black text-primary leading-none tracking-tighter">
                Page Not<br />Found
              </h1>

              <p className="text-xl text-on-surface-variant leading-relaxed font-body max-w-md">
                Even the best caregivers lose their way sometimes. We can't seem
                to find the destination you're looking for, but we're here to
                help you get back on track.
              </p>
            </div>

            {/* Recovery Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Link
                href="/"
                className="group flex flex-col p-8 rounded-[2rem] bg-surface-container-lowest hover:bg-surface-bright transition-all duration-300 border border-outline-variant/10 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <Home size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-black text-on-surface font-headline text-lg uppercase tracking-tight">
                  Return to Home
                </span>
                <span className="text-sm text-on-surface-variant mt-2 font-medium leading-relaxed">
                  Start fresh from the beginning.
                </span>
              </Link>

              <Link
                href="#"
                className="group flex flex-col p-8 rounded-[2rem] bg-surface-container-lowest hover:bg-surface-bright transition-all duration-300 border border-outline-variant/10 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <Headset size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                <span className="font-black text-on-surface font-headline text-lg uppercase tracking-tight">
                  Contact Support
                </span>
                <span className="text-sm text-on-surface-variant mt-2 font-medium leading-relaxed">
                  We're here to guide you.
                </span>
              </Link>
            </div>

            {/* Primary CTA */}
            <div className="flex items-center pt-2">
              <Link href="/">
                <button className="px-10 py-5 bg-primary text-on-primary rounded-[2rem] font-black text-xl shadow-2xl shadow-primary/20 hover:opacity-90 active:scale-95 transition-all flex items-center gap-4 uppercase tracking-tight">
                  Return to Home
                  <ArrowRight size={24} />
                </button>
              </Link>
            </div>

            {/* Trust Metadata */}
            <div className="pt-8 border-t border-outline-variant/15">
              <div className="flex flex-wrap gap-8">
                {["Verified Care Network", "24/7 Emotional Support"].map((label) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0">
                      <Check size={12} className="text-on-primary" strokeWidth={4} />
                    </div>
                    <span className="text-sm font-bold text-on-surface-variant">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
