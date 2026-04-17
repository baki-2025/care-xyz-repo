"use client";

import React from "react";
import { Stethoscope, HeartPulse, Utensils, Car } from "lucide-react";
import { motion } from "framer-motion";

const philosophyItems = [
  {
    title: "Medical Support",
    content: "Expert medication management, vitals monitoring, and specialized post-operative or chronic condition support by certified professionals.",
    icon: Stethoscope,
  },
  {
    title: "Deep Companionship",
    content: "Mental stimulation through conversation, hobbies, and social activities. We match caregivers based on personality and interests.",
    icon: HeartPulse,
  },
  {
    title: "Daily Assistance",
    content: "Help with nutritious meal preparation, light housekeeping, and personal grooming to ensure a comfortable home environment.",
    icon: Utensils,
  },
  {
    title: "Mobility & Transport",
    content: "Safe accompaniment to medical appointments, grocery shopping, or community events with specialized mobility assistance.",
    icon: Car,
  },
];

const PhilosophyGrid = () => {
  return (
    <section className="mb-20">
      <h2 className="text-2xl font-black text-primary mb-10 flex items-center gap-4 font-headline">
        <span className="w-12 h-1.5 bg-primary rounded-full"></span>
        Our Care Philosophy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {philosophyItems.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-surface-container-lowest rounded-[2rem] space-y-4 hover:bg-surface-bright transition-all duration-300 border border-outline-variant/10 hover:shadow-lg shadow-sm group"
          >
            <div className="w-14 h-14 bg-secondary-container rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
              <item.icon size={32} />
            </div>
            <h3 className="text-xl font-extrabold text-on-surface font-headline">
              {item.title}
            </h3>
            <p className="text-md text-on-surface-variant leading-relaxed font-body font-medium">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhilosophyGrid;
