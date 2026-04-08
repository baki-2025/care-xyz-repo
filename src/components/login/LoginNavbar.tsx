"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LoginNavbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md px-8 py-4 border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tight text-primary font-headline cursor-pointer"
          >
            Care.IO
          </motion.span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <span className="text-on-surface-variant font-medium font-headline text-sm">
            New to our sanctuary?
          </span>
          <Link
            href="/register"
            className="text-primary font-bold underline decoration-2 underline-offset-8 transition-all hover:text-primary-container"
          >
            Register here
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LoginNavbar;
