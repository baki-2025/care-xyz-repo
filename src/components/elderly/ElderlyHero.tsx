"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Heart } from "lucide-react";

const ElderlyHero = () => {
  return (
    <header className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-center">
      <div className="md:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full mb-6 ring-1 ring-primary/5">
            <BadgeCheck size={16} fill="currentColor" className="text-primary" />
            <span className="text-[0.75rem] font-bold tracking-wide uppercase font-headline">
              Certified Specialist Care
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight font-headline">
            Empathetic Elderly Care & Companionship
          </h1>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-xl font-body font-medium">
            Tailored support designed to maintain independence and dignity. We
            provide professional medical assistance alongside warm, genuine
            companionship for your loved ones.
          </p>
        </motion.div>
      </div>
      <div className="md:col-span-5 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-surface-container-low shadow-2xl relative z-10"
        >
          <img
            alt="Elderly Care"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV3FIonBDzhnhZFQxXBDrXV7Peh0FNJ459E5p5Gu2j8G3mevS-Um7tWsp8rBIuAvBNthJKC50KqirnpY4A8rdHHo_pAZYfEhfluhf_4e2vfrgrZHhXRume_-Zn7qttN_DF4dnffCesyclYAjigEg7bS4qkIohx7pP-FJx0OSj5ofsmXJNT8H6bSxWJPasim1Hnu6FXIcSEU8pT8fU07wFHPDxo4c9zoARKS9bRxVSovY4wyO-pjj9GxnpgzioZwuxzl9XEQUjs6Q"
          />
        </motion.div>
        
        {/* Floating Card */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-[2rem] shadow-xl shadow-primary/5 flex items-center gap-4 max-w-[260px] z-20 border border-outline-variant/10"
        >
          <div className="w-12 h-12 bg-tertiary-container flex items-center justify-center rounded-full text-on-tertiary-container">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <div className="text-sm font-black text-on-surface font-headline">500+ Families</div>
            <div className="text-xs text-on-surface-variant font-bold">Trust our specialized care</div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default ElderlyHero;
