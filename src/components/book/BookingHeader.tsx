"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, label: "Duration" },
  { id: 2, label: "Location" },
  { id: 3, label: "Confirm" },
];

const BookingHeader = () => {
  return (
    <header className="space-y-8 mb-12">
      <div className="space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-primary leading-tight"
        >
          Secure Your <br /> Personalized Care
        </motion.h1>
        <p className="text-on-surface-variant text-lg max-w-xl font-body font-medium">
          Complete your booking in three simple steps. We'll match you with a
          vetted professional within 24 hours.
        </p>
      </div>

      {/* Custom Progress Bar */}
      <nav className="flex items-center space-x-6 py-4 overflow-x-auto no-scrollbar">
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            <div className={`flex items-center space-x-3 shrink-0 ${step.id === 1 ? "opacity-100" : "opacity-40"}`}>
              <span className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-black font-headline ${step.id === 1 ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface-variant"}`}>
                {step.id}
              </span>
              <span className={`font-headline font-bold uppercase tracking-widest text-xs ${step.id === 1 ? "text-primary" : "text-on-surface-variant"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="h-px w-10 bg-outline-variant/30 shrink-0"></div>
            )}
          </React.Fragment>
        ))}
      </nav>
    </header>
  );
};

export default BookingHeader;
