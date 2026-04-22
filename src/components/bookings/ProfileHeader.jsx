"use client";

import React from "react";
import { BadgeCheck, Home } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const ProfileHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-low rounded-[3.5rem] p-10 lg:p-14 flex flex-col md:flex-row items-center md:items-start gap-10 border border-outline-variant/5 shadow-inner"
      >
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-40 h-40 rounded-full bg-primary/10 flex items-center justify-center text-primary text-5xl font-black border-8 border-surface-container-lowest shadow-2xl transition-transform"
          >
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </motion.div>
          <div className="absolute bottom-2 right-2 bg-primary p-2.5 rounded-full border-4 border-surface-container-low shadow-lg">
            <BadgeCheck size={20} className="text-white fill-white" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-8">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-3 tracking-tighter font-headline">
                Welcome back, {session?.user?.name?.split(" ")[0] || "User"}
              </h1>
              <p className="text-on-surface-variant font-medium text-lg font-body max-w-xl">
                Manage your personalized care journey and upcoming visits with
                your dedicated professionals.
              </p>
            </div>
            
            <div className="flex gap-4 justify-center md:justify-start">
              <div className="bg-surface-container-lowest px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 text-center min-w-[100px]">
                <span className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                  Status
                </span>
                <span className="text-2xl font-black text-primary font-headline uppercase">Member</span>
              </div>
              <div className="bg-surface-container-lowest px-6 py-4 rounded-3xl shadow-sm border border-outline-variant/10 text-center min-w-[100px]">
                <span className="block text-[10px] font-black text-outline uppercase tracking-widest mb-1">
                  Role
                </span>
                <span className="text-2xl font-black text-primary font-headline">Care</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <span className="bg-primary/5 text-primary px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-primary/10">
              <Home size={14} /> Home Care Premium
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default ProfileHeader;
