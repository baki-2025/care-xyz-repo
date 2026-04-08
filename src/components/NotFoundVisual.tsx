"use client";

import React from "react";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

const NotFoundVisual = () => (
  <div className="relative order-2 lg:order-1">
    <div className="aspect-square rounded-[3rem] overflow-hidden bg-surface-container-low flex items-center justify-center p-8 relative shadow-inner">
      {/* Layered gradient for depth */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ background: "linear-gradient(135deg, #004e63 0%, #006782 100%)" }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center">
        {/* Ghost 404 text */}
        <div className="text-[12rem] font-extrabold text-primary/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none font-headline pointer-events-none">
          404
        </div>

        <LottiePlayer
          src="/animations/error.json"
          className="w-full h-full object-contain relative z-10"
        />

        {/* Floating glass badge */}
        <div className="absolute -bottom-6 right-4 md:right-8 bg-surface/80 backdrop-blur-xl p-6 rounded-[2rem] border border-outline-variant/15 max-w-xs shadow-xl">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center shrink-0">
              <span className="text-primary text-xl">🧠</span>
            </div>
            <span className="font-black text-primary uppercase tracking-widest text-[10px]">
              Wellness Note
            </span>
          </div>
          <p className="text-sm text-on-surface-variant italic font-medium leading-relaxed">
            "Sometimes taking a wrong turn leads us to exactly where we need to rest."
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default NotFoundVisual;
