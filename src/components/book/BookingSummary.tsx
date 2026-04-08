"use client";

import React from "react";
import { Lock, Heart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const BookingSummary = () => {
  return (
    <aside className="lg:col-span-5 sticky top-28 space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary text-on-primary rounded-[3rem] p-10 shadow-3xl shadow-primary/20 space-y-10"
      >
        <div>
          <h3 className="text-3xl font-headline font-black mb-2 uppercase tracking-tighter">
            Booking Summary
          </h3>
          <p className="text-on-primary-container text-sm font-bold opacity-70 uppercase tracking-widest">
            Review your selection before confirmation
          </p>
        </div>

        <div className="space-y-6">
          {[
            { label: "Care Type", value: "Elderly Assistant" },
            { label: "Duration (4 Hours)", value: "$25.00 / hr" },
            { label: "Convenience Fee", value: "$10.00" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center py-4 border-b border-white/10"
            >
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">{item.label}</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Cost Display */}
        <div className="bg-primary-container/20 p-8 rounded-[2.5rem] flex justify-between items-end border border-white/5">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-on-primary-container opacity-60">
              Total Estimate
            </span>
            <div className="text-6xl font-headline font-black mt-2 tracking-tighter">
              $110.00
            </div>
          </div>
          <div className="text-right pb-2">
            <span className="text-[9px] uppercase font-black text-on-primary-container block opacity-60">
              Next billing
            </span>
            <span className="text-xs font-bold text-[#9fe2ff]">Post Service</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-surface-container-lowest text-primary py-6 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-surface transition-all transform active:scale-95"
        >
          Confirm Booking
        </motion.button>

        <div className="flex items-center justify-center space-x-3 text-on-primary/60 text-[10px] font-black uppercase tracking-widest leading-none">
          <Lock size={14} className="text-on-primary/40" />
          <span>Secure SSL Encrypted Transaction</span>
        </div>
      </motion.div>

      {/* Trust Card */}
      <motion.div
        whileHover={{ y: -5 }}
        className="p-8 bg-secondary-container/30 rounded-[3rem] flex items-start space-x-6 border border-primary/5 shadow-sm"
      >
        <img
          className="w-20 h-20 rounded-full object-cover shadow-xl border-4 border-white/20"
          alt="Caregiver"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC-qtIFRkOkZEWy-2xCEmePLFfhXzPcsjnFuJvlLK7bo4K0h76YQrsvMdAWa_hILOXZD-sdH0GKjvf8DSZC6zanfdPNiVwWT79-OUEgKfh678ywwknjmWOACi_XVMz3bSTYsj-55royNdMBlUVB1USXzH4nPoHEQqVGxSHzxmQs_C5foNAgNXjQkiH2U9z9MIXD7eiPPEKtz-VWrMlh92uaxGsGkvcERHV1hN73QzHfxQ7b3siVRd6CHvZZiRsv4iH6IKHKSLKwQ"
        />
        <div>
          <h4 className="font-headline font-black text-primary text-xl leading-tight">
            Your Happiness, <br/> Guaranteed
          </h4>
          <p className="text-sm text-on-secondary-container mt-3 font-medium leading-relaxed font-body">
            If you are not satisfied with your caregiver in the first hour, we
            will replace them at no extra cost.
          </p>
        </div>
      </motion.div>
    </aside>
  );
};

export default BookingSummary;
