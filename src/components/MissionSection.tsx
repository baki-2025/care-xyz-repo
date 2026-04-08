"use client";

import React from "react";
import { ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const MissionSection = () => {
  return (
    <section id="about" className="py-24 bg-surface-container-low px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-extrabold text-primary leading-tight mb-4 font-headline"
            >
              Reliable and trusted care for your loved ones.
            </motion.h2>
            <div className="h-1.5 w-20 bg-tertiary-container rounded-full"></div>
          </div>
          <div className="md:w-2/3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-on-surface-variant leading-relaxed mb-10 font-body"
            >
              At Care.IO, we believe that quality care starts with deep empathy. Our platform was built to bridge the gap between families in need and professionals who view caregiving as a calling, not just a career. Every caretaker on our platform undergoes a rigorous multi-stage vetting process.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0 text-primary">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 font-headline">Vetted Professionals</h4>
                  <p className="text-sm text-on-surface-variant font-medium">Background checks, certification verification, and personality assessment for all staff.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0 text-primary">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 font-headline">24/7 Availability</h4>
                  <p className="text-sm text-on-surface-variant font-medium">Round-the-clock support for emergencies and long-term care planning whenever you need it.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
