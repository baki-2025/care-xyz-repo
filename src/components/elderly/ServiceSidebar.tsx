"use client";

import React from "react";
import { HandHelping, BadgeCheck, CalendarDays, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const highLights = [
  {
    title: "24/7 Support",
    content: "Round-the-clock emergency assistance and family updates.",
    icon: HandHelping,
    color: "bg-secondary-container text-primary",
  },
  {
    title: "Certified Staff",
    content: "All caregivers are background-checked and medically certified.",
    icon: BadgeCheck,
    color: "bg-tertiary-container text-primary",
  },
  {
    title: "Flexible Scheduling",
    content: "From few hours a week to 24/7 care. Scale as needed.",
    icon: CalendarDays,
    color: "bg-secondary-container text-primary",
  },
];

const ServiceSidebar = () => {
  return (
    <aside className="lg:col-span-4 space-y-10">
      {/* Quick Highlights */}
      <div className="p-8 lg:p-10 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
        <h3 className="text-2xl font-black text-primary mb-10 font-headline uppercase leading-none">
          Quick <br/> Highlights
        </h3>
        <ul className="space-y-10">
          {highLights.map((hl, i) => (
            <motion.li
              key={hl.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-5 group"
            >
              <div className={`w-12 h-12 rounded-2xl ${hl.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <hl.icon size={26} />
              </div>
              <div>
                <h4 className="font-bold text-on-surface font-headline text-lg">{hl.title}</h4>
                <p className="text-sm text-on-surface-variant font-medium leading-relaxed font-body">{hl.content}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Trust Badge */}
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-surface-container-lowest p-10 rounded-[2.5rem] text-center space-y-6 border border-outline-variant/10 shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>
        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/10">
          <ShieldCheck size={36} strokeWidth={2.5} />
        </div>
        <h4 className="text-xl font-black font-headline text-primary">Licensed & Bonded</h4>
        <p className="text-sm text-on-surface-variant leading-relaxed font-body font-medium">
          Care.IO is a state-licensed agency committed to the highest standards of elder care protocols and safety measures.
        </p>
        <a
          className="inline-block text-primary font-black underline decoration-2 underline-offset-8 text-sm uppercase tracking-widest hover:text-primary-container transition-colors"
          href="#"
        >
          Safety Protocols
        </a>
      </motion.div>
    </aside>
  );
};

export default ServiceSidebar;
