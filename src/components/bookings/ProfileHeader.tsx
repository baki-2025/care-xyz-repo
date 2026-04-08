"use client";

import React from "react";
import { BadgeCheck, Home, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const ProfileHeader = () => {
  return (
    <header className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-low rounded-[3.5rem] p-10 lg:p-14 flex flex-col md:flex-row items-center md:items-start gap-10 border border-outline-variant/5 shadow-inner"
      >
        <div className="relative group">
          <motion.img
            whileHover={{ scale: 1.05 }}
            alt="Profile Picture"
            className="w-40 h-40 rounded-full object-cover shadow-2xl border-8 border-surface-container-lowest transition-transform"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Ktbav3uyQI9GLsR_Ogbqmmr6Mm1W-xwiXAK9dnVGJmsiHac9k68q9gpbcmEvE1zz-WSfkmJP2Sy5wKyvzlfSEl58-dqX3CAjiNoYF-1L3HDJbm_zBFuZe1SxAMwwZYavVEW0UAECmc_wzPXysas9EzZPbbqMMGAzDjs7cvgBitcg1zv4Wa8jO4blWGQ6GUtKuHk0UCYGheSoQpwwMQyuWsA8Sb-g5Llpw6abt4bsfd2XpM8MePabboehh67WGG5hGrJji4RZTA"
          />
          <div className="absolute bottom-2 right-2 bg-primary p-2.5 rounded-full border-4 border-surface-container-low shadow-lg">
            <BadgeCheck size={20} className="text-white fill-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 tracking-tighter font-headline">
                Welcome back, Sarah
              </h1>
              <p className="text-on-surface-variant font-medium text-lg font-body max-w-xl">
                Manage your personalized care journey and upcoming visits with
                your dedicated professionals.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="bg-surface-container-lowest px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 text-center min-w-[100px]">
                <span className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                  Active
                </span>
                <span className="text-3xl font-black text-primary font-headline">04</span>
              </div>
              <div className="bg-surface-container-lowest px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 text-center min-w-[100px]">
                <span className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                  Points
                </span>
                <span className="text-3xl font-black text-primary font-headline">1.2k</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="bg-primary/5 text-primary px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-primary/10">
              <Home size={14} /> Home Care Premium
            </span>
            <span className="bg-surface-container-highest text-on-surface-variant px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-outline-variant/10">
              <MapPin size={14} /> Seattle, WA
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default ProfileHeader;
