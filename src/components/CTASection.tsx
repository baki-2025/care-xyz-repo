"use client";

import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-24 px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto bg-primary-container rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center shadow-3xl shadow-primary/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-95"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-on-primary mb-8 leading-tight font-headline">
            Ready to find the perfect care for your family?
          </h2>
          <p className="text-on-primary/80 text-lg mb-12 font-medium font-body">
            Join thousands of families who trust Care.IO for their daily peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-primary rounded-2xl text-xl font-bold shadow-lg hover:bg-surface transition-all"
            >
              Get Started Today
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent border-2 border-white/30 text-on-primary rounded-2xl text-xl font-bold hover:bg-white/10 transition-all hover:border-white/50"
            >
              Schedule a Call
            </motion.button>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-tertiary-container/10 rounded-full blur-3xl"></div>
      </motion.div>
    </section>
  );
};

export default CTASection;
