"use client";

import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const ServicesBento = () => {
  return (
    <section id="services" className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-primary mb-4 font-headline"
        >
          Tailored Care Services
        </motion.h2>
        <p className="text-on-surface-variant max-w-2xl mx-auto font-medium">
          We provide specialized care solutions designed to meet the unique
          physical and emotional needs of every family member.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto lg:h-[700px]">
        {/* Baby Care */}
        <motion.div
          whileHover={{ y: -10 }}
          className="md:col-span-7 bg-surface-container-lowest rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden relative group border border-outline-variant/10 shadow-sm"
        >
          <div className="z-10 relative">
            <span className="px-4 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-wider">
              Most Requested
            </span>
            <h3 className="text-4xl font-bold text-primary mt-6 mb-4 font-headline">
              Baby Care
            </h3>
            <p className="text-on-surface-variant max-w-md text-lg leading-relaxed font-body">
              Specialized neonatal and early childhood care for your little
              ones, ensuring safety and developmental growth while you work.
            </p>
            <ul className="mt-8 space-y-4">
              {["Newborn Specialists", "Educational Playtime"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-on-surface font-semibold">
                  <CheckCircle2 size={20} className="text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="absolute bottom-0 right-0 w-[60%] h-[75%] group-hover:scale-105 transition-transform duration-700 ease-out">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmD6GqHQ0-htTQkvxrokevINej0bkRn6iZqUp-Wu6nl7rcxQLOasResetObHTJFUkJmxBgu-k1Fp2O823iePJEbG8rRkfU71u5sTCNPCuSAOMD7xvZMnSoUNtlm0y-gJA0_72UbOoZapLLwyN2ynwhytMl5tbDr-Ie1o77lJAF-ZQp282gPRgSzxTmXoqHDlDEEgiukxb9J1oz54i3VkTf0Xh8sSsfws3gc83IJQmtrFu3aRxeLv2cOsJEj5G_uQOFLWw8T6gBRg"
              alt="Baby playing"
              className="w-full h-full object-cover rounded-tl-[4rem]"
            />
          </div>
        </motion.div>

        {/* Elderly Service */}
        <motion.div
           whileHover={{ y: -10 }}
           className="md:col-span-5 bg-primary text-on-primary rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden relative"
        >
          <div className="z-10">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
              <ArrowRight size={32} className="rotate-[-45deg]" />
            </div>
            <h3 className="text-3xl font-bold mb-4 font-headline">Elderly Service</h3>
            <p className="text-on-primary/80 leading-relaxed font-body">
              Dignified companionship and medical assistance for seniors,
              focusing on mobility, nutrition, and mental well-being.
            </p>
          </div>
          <div className="mt-12 group">
            <Link href="/services/elderly">
              <button className="flex items-center gap-2 font-bold text-lg group-hover:gap-4 transition-all py-2 border-b-2 border-white/30 hover:border-white">
                Learn More <ArrowRight size={20} />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Sick People Service */}
        <motion.div
          whileHover={{ y: -10 }}
          className="md:col-span-5 bg-secondary-container rounded-[2.5rem] p-10 flex flex-col justify-between group border border-outline-variant/10 shadow-sm"
        >
          <div>
            <h3 className="text-3xl font-bold text-primary mb-4 font-headline uppercase leading-none">
              Health <br/> Support
            </h3>
            <p className="text-on-secondary-container leading-relaxed font-body">
              Professional nursing and post-operative care at home. We help manage recovery with clinical precision and emotional support.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["In-home Nursing", "Post-op Support", "Recovery"].map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white/50 rounded-full text-sm font-bold text-primary">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          whileHover={{ y: -10 }}
          className="md:col-span-7 bg-surface-container-high rounded-[2.5rem] p-10 grid grid-cols-2 gap-x-8 gap-y-12 items-center border border-outline-variant/10 shadow-sm"
        >
          {[
            { value: "98%", label: "Satisfaction" },
            { value: "15k+", label: "Families Helped" },
            { value: "450+", label: "Partners" },
            { value: "24/7", label: "Support" },
          ].map((metric) => (
            <div key={metric.label} className="text-center group">
              <div className="text-5xl font-black text-primary mb-2 font-headline group-hover:scale-110 transition-all duration-300">
                {metric.value}
              </div>
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest leading-none">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesBento;
