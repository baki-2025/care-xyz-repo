"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const PricingBanner = () => {
  return (
    <section className="bg-primary p-12 lg:p-20 rounded-[3rem] text-on-primary overflow-hidden relative shadow-3xl shadow-primary/20">
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold mb-4 font-headline uppercase leading-[1.1]">
            Pricing Tailored <br/> to Your Needs
          </h2>
          <p className="text-on-primary-container mb-10 text-lg font-medium opacity-90 max-w-sm">
            Transparent rates with no hidden fees. Choose a plan that fits your family's specific requirements.
          </p>
          <div className="space-y-4">
            {[
              { type: "Day-time Care (8 hrs)", price: "$45/hr" },
              { type: "Full-time Live-in Care", price: "Contact Us" },
              { type: "Short-term Respite", price: "$55/hr" },
            ].map((plan) => (
              <div
                key={plan.type}
                className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/5"
              >
                <span className="font-bold text-md">{plan.type}</span>
                <span className="font-extrabold text-[#9fe2ff]">{plan.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center md:items-end text-center md:text-right">
          <div className="mb-10 lg:mb-16">
            <div className="text-7xl font-black mb-2 font-headline tracking-tighter">$45</div>
            <div className="text-on-primary-container text-xl font-bold opacity-80 uppercase tracking-widest">
              Starting Hourly Rate
            </div>
          </div>
          <Link href="/book">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto px-12 py-6 bg-surface text-primary rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-surface-bright transition-all transform"
            >
              Book Service
            </motion.button>
          </Link>
        </div>
      </div>
      {/* Decorative Blur */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-container rounded-full opacity-40 blur-[120px]"></div>
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-tertiary-container rounded-full opacity-30 blur-[120px]"></div>
    </section>
  );
};

export default PricingBanner;
