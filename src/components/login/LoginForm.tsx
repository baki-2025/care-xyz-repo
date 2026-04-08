"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isStaySignedIn, setIsStaySignedIn] = useState(false);

  return (
    <div className="w-full md:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-surface-container-lowest h-full overflow-y-auto">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-extrabold text-on-surface mb-3 font-headline leading-none uppercase tracking-tighter">
          Welcome Back
        </h2>
        <p className="text-on-surface-variant font-medium font-body text-lg">
          Enter your credentials to access your account
        </p>
      </div>

      {/* Google Social Login */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-surface rounded-2xl border border-outline-variant/30 hover:bg-surface-container-low transition-all duration-200 group shadow-sm hover:shadow-md"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          ></path>
        </svg>
        <span className="text-on-surface font-extrabold text-lg">Sign in with Google</span>
      </motion.button>

      <div className="relative my-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline-variant/20"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-6 bg-surface-container-lowest text-on-surface-variant font-black uppercase tracking-widest text-[10px]">
            or use email
          </span>
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-3">
          <label
            className="block text-xs font-black uppercase tracking-widest text-on-surface-variant ml-2 leading-none"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className="w-full px-6 py-5 bg-surface-container-highest/50 border border-outline-variant/10 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all text-on-surface placeholder-on-surface-variant/40 font-medium"
            id="email"
            name="email"
            placeholder="name@example.com"
            required
            type="email"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center ml-2 leading-none">
            <label
              className="block text-xs font-black uppercase tracking-widest text-on-surface-variant"
              htmlFor="password"
            >
              Password
            </label>
            <a
              className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-container transition-colors"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <input
              className="w-full px-6 py-5 bg-surface-container-highest/50 border border-outline-variant/10 rounded-2xl focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all text-on-surface placeholder-on-surface-variant/40 font-medium"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-2 group cursor-pointer" onClick={() => setIsStaySignedIn(!isStaySignedIn)}>
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isStaySignedIn ? "bg-primary border-primary" : "border-outline-variant grupo-hover:border-primary"}`}>
             <AnimatePresence>
                {isStaySignedIn && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={16} className="text-on-primary" strokeWidth={4} />
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
          <span className="text-sm font-bold text-on-surface-variant group-hover:text-on-surface transition-colors select-none">
            Stay signed in for 30 days
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-on-primary py-5 px-8 rounded-2xl font-black text-xl hover:bg-primary-container transition-all shadow-xl shadow-primary/10 mt-6 flex items-center justify-center gap-3 group"
          type="submit"
        >
          Sign In <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </form>

      <div className="mt-12 text-center md:hidden">
        <p className="text-on-surface-variant font-bold text-sm">
          New to Care.IO?
          <Link className="text-primary font-black ml-2 underline decoration-2 underline-offset-4" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
