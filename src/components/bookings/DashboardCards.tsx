"use client";

import React from "react";
import { TrendingUp, Headset, HeartHandshake, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const DashboardCards = () => {
  return (
    <section className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <motion.div
        whileHover={{ y: -8 }}
        className="lg:col-span-2 bg-primary text-on-primary p-12 lg:p-14 rounded-[4rem] relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-2xl shadow-primary/20 group"
      >
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <HeartHandshake size={28} className="text-on-primary-container" />
             </div>
             <h3 className="text-3xl font-black font-headline uppercase tracking-tighter">Care Continuity</h3>
          </div>
          <p className="max-w-md opacity-80 text-xl font-medium font-body leading-relaxed">
            You've successfully maintained your care schedule for 12 consecutive
            weeks. Consistency leads to better outcomes and deeper connections.
          </p>
        </div>
        <div className="mt-10 lg:mt-0 z-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-surface-container-lowest text-primary px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-xs transition-all inline-flex items-center gap-4 shadow-xl hover:bg-surface active:scale-95"
          >
            View Wellness Report <TrendingUp size={20} />
          </motion.button>
        </div>
        
        {/* Abstract Design Element */}
        <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px] pointer-events-none transition-transform group-hover:scale-110 duration-700" />
      </motion.div>

      <motion.div
        whileHover={{ y: -8 }}
        className="bg-secondary-fixed p-12 lg:p-14 rounded-[4rem] flex flex-col justify-between text-center items-center shadow-xl shadow-secondary/5 border border-primary/5"
      >
        <div className="space-y-6 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
               <Headset size={40} />
            </div>
            <div className="space-y-3">
               <h3 className="text-2xl font-black font-headline uppercase tracking-tighter text-on-secondary-fixed">Need Help?</h3>
               <p className="text-sm font-bold text-on-secondary-fixed-variant max-w-[200px] leading-relaxed opacity-70">
                 Our 24/7 priority support team is here for your family.
               </p>
            </div>
        </div>
        <div className="mt-8 space-y-4 w-full">
           <button className="w-full bg-primary text-on-primary py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              <PhoneCall size={16} /> Contact Support
           </button>
           <a className="text-primary font-black uppercase tracking-widest text-[10px] hover:underline decoration-2 underline-offset-8 transition-all pointer-events-none block cursor-pointer">
              Knowledge Base
           </a>
        </div>
      </motion.div>
    </section>
  );
};

export default DashboardCards;
