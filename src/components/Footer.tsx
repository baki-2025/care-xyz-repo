"use client";

import React from "react";
import { Share2, Globe, CheckCircle2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 lg:px-8 bg-surface-container-low dark:bg-slate-950 border-t border-outline-variant/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
        <div className="lg:col-span-4">
          <span className="text-2xl font-bold text-primary font-headline mb-4 block">
            Care.IO
          </span>
          <p className="font-body text-on-surface-variant max-w-sm mb-10 leading-relaxed text-lg">
            Providing compassionate, professional caregiving services for
            families across the nation. Your trust is our priority.
          </p>
          <div className="flex gap-6">
            {[Share2, Globe, CheckCircle2].map((Icon, i) => (
              <Icon
                key={i}
                size={22}
                className="text-primary hover:text-primary/70 cursor-pointer transition-colors"
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-primary text-sm mb-6 uppercase tracking-wider font-headline">
              Quick Links
            </h5>
            <ul className="space-y-4 font-body text-md font-medium">
              {[
                "Help Center",
                "Contact Support",
                "Join as a Caregiver",
                "Our Locations",
              ].map((link) => (
                <li key={link}>
                  <a
                    className="text-on-surface-variant hover:text-primary underline decoration-primary/0 hover:decoration-primary/50 underline-offset-4 transition-all"
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-primary text-sm mb-6 uppercase tracking-wider font-headline">
              Legal
            </h5>
            <ul className="space-y-4 font-body text-md font-medium">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      className="text-on-surface-variant hover:text-primary underline decoration-primary/0 hover:decoration-primary/50 underline-offset-4 transition-all"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-body text-sm font-semibold text-on-surface-variant">
          © 2024 Care.IO. All rights reserved.
        </span>
        <div className="flex gap-10">
          <a
            className="font-body text-sm text-primary font-bold hover:opacity-80 transition-opacity"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="font-body text-sm text-primary font-bold hover:opacity-80 transition-opacity"
            href="#"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
