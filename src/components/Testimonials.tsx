"use client";

import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import reviews from "@/data/reviews.json";

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-surface px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-extrabold text-primary mb-2 font-headline">
              Voices of Trust
            </h2>
            <p className="text-on-surface-variant font-medium">
              Real stories from the families we serve.
            </p>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-all shadow-sm">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto no-scrollbar pb-8 snap-x">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="min-w-[350px] md:min-w-[420px] bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-outline-variant/10 snap-center hover:shadow-md transition-shadow relative overflow-hidden flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 text-tertiary mb-6">
                {[...Array(5)].map((_, starIdx) => (
                  <Star
                    key={starIdx}
                    size={14}
                    fill={starIdx < Math.round(review.ratings) ? "currentColor" : "none"}
                    className={starIdx < Math.round(review.ratings) ? "text-tertiary" : "text-outline-variant"}
                  />
                ))}
                <span className="ml-2 text-xs font-black text-on-surface-variant opacity-60 uppercase tracking-widest">
                  {review.ratings.toFixed(1)}
                </span>
              </div>

              <p className="text-on-surface text-lg font-medium italic mb-10 leading-relaxed font-body flex-1">
                "{review.review}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full bg-secondary-container overflow-hidden border-2 border-primary/10 shrink-0">
                  <img
                    src={review.user_photoURL}
                    alt={review.userName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="font-bold text-primary font-headline">{review.userName}</h5>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                    {new Date(review.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
