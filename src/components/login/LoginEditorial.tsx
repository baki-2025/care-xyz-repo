"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

const caregivers = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDOJTNQdVog5xDi6Fc9zX83LoHo41IENWEjoWGaQLJmLq75jdszkoEeJvEcAWq2tqzjNkLyOgEv6-pz_7O2ymPHHaa6CpMm0f47U3AqY0gOKUGFzaJaoej6vxBLs_Sa5hTjp8ZRuU58HioPkSPzmmJOeiNlxN_QFuA2er3CewWgoaRPs3twJQduFjIX7plAx7AIekXzWgAGHfQMemoQRlQ-TSmOjtRB2wbZtHNOh7TUZQYJPKvBmNYPXjBOL72xHdM1dUm6kx_mXw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDqRmPd5DkqSJyozdIvSpT4FLLHObCX4tpmyrufAajqSVde2AiA2jlGDq2VSfEVERFbG3PnS6pUqOfrH5Vr3V2noXbGrvhwTlFCXcB-ZeCjzjxtRqaKwBRkw-F1-rSeJJLHoU39RlEDGNtTb-Eo9k_HHXEBlJXO9H9fjp7pi_hQTCn93Iz0Cmhy89EI02b6S6hJbYtfTWec-nW4qbw4BiEkT0URoCorVCvdKb8PDUp528jqa2puQNet7qvriGseOwHsrBV0dCZIAw",
];

const LoginEditorial = () => {
  return (
    <div className="hidden md:flex flex-col justify-between w-1/2 p-12 lg:p-16 bg-primary relative overflow-hidden h-full min-h-[700px]">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 opacity-20 transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB05ZDoYUVXnRbTxKKaeK2G2dpYNnzJmJ6PGM-9TbRbFYgXRsUfHQJoT0ax5A5VK-3SIRjYgvZkk-vTo7NnBsHJ0rWT4VoID4uB2qOw5TiPVJT9w0XvtYUD4w3je0fSqyEf14jabtAlBfLxXgMSvus69n8fBezYi58Gtxn1h3dbMU400aOCawPMTMtWMiGjVHxV0PvDO8PljfZf9IEmVmoeIfad6I3DGt7KiFQjDWe4meEMf2n4OUbRaYBQGDA28RpvNvPizQxbRw')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary-container"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 self-start"
      >
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-on-primary text-xs font-black uppercase tracking-widest border border-white/5">
          <ShieldCheck size={14} className="text-on-primary" />
          Your Trusted Care Network
        </div>
      </motion.div>

      {/* Lottie Animation */}
      <div className="relative z-10 flex justify-center">
        <LottiePlayer
          src="/animations/login.json"
          className="w-64 h-64 opacity-90 drop-shadow-2xl"
        />
      </div>

      <div className="relative z-10 max-w-md">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-on-primary leading-none tracking-tighter mb-8 font-headline">
          Return to <br /> your <span className="italic font-normal opacity-80">Sanctuary.</span>
        </h1>
        <p className="text-on-primary-container text-lg leading-relaxed font-body font-medium opacity-90">
          Managing care should be as calming as receiving it. Log in to
          continue your journey with the world's most empathetic care
          community.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 flex gap-4 items-center"
      >
        <div className="flex -space-x-4">
          {caregivers.map((src, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shadow-lg"
            >
              <img src={src} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <span className="text-on-primary/80 text-sm font-black uppercase tracking-widest leading-none">
          Join 50k+ active caregivers
        </span>
      </motion.div>
    </div>
  );
};

export default LoginEditorial;
