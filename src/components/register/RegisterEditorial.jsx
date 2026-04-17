"use client";

import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

const RegisterEditorial = () => {
  return (
    <div className="relative hidden lg:block bg-primary overflow-hidden h-full min-h-[700px]">
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        alt="Compassionate healthcare professional"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl1Ho-xmKyyYQRU6KE8UxOPYUVIhGPRcxE0uCjqrp-P-qQjDUbflvI9PKhjHAsU40yKTIb2BFYhV11qlwTy7IC_q0HKyVPNt_6mkcRcH8tPY2XWBpGA0DfYijZgUrxm4oyvfvIQa623Tcv8BfwEYYgIne--1rq5nQs1yVAAUp5VU2fb8D2Zpm-SU_eLvTh9FmZ-kv86hyTOLSwFEnKfUT7FPtG6mQLMsQCDLqaqrkKHE5p81MtohII81BRP-MhyM41L-3bbwFPHQ"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-container/40 to-transparent"></div>
      <div className="relative h-full flex flex-col justify-between p-12 text-on-primary">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black tracking-tight font-headline uppercase leading-none">
            Care.IO
          </span>
        </div>
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold leading-[1.1] tracking-tight font-headline"
          >
            Begin your journey <br /> to better care.
          </motion.h1>
          <p className="text-xl text-on-primary-container font-medium max-w-sm font-body opacity-90">
            Join over 10,000 families finding peace of mind through our curated
            sanctuary of professional caregivers.
          </p>
          <div className="flex justify-center pt-4">
            <LottiePlayer
              src="/animations/register.json"
              className="w-52 h-52 opacity-90"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-primary bg-secondary-container flex items-center justify-center font-bold text-primary"
              >
                {i}
              </div>
            ))}
          </div>
          <span className="text-sm font-black uppercase tracking-widest leading-none opacity-80">
            Trusted by thousands
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterEditorial;
