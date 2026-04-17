"use client";

import React, { useState, useMemo } from "react";
import { Clock, MapPin, BadgeCheck, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import warehouses from "@/data/warehouses.json";
import divisions from "@/data/division.json";

const BookingSteps = () => {
  const [durationPlan, setDurationPlan] = useState("Hourly");
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Filter districts based on selected division
  const districts = useMemo(
    () =>
      warehouses
        .filter((w) => w.region === selectedDivision)
        .map((w) => w.district),
    [selectedDivision]
  );

  // Filter covered areas based on selected district
  const areas = useMemo(
    () =>
      warehouses.find(
        (w) => w.region === selectedDivision && w.district === selectedDistrict
      )?.covered_area ?? [],
    [selectedDivision, selectedDistrict]
  );

  const handleDivisionChange = (div) => {
    setSelectedDivision(div);
    setSelectedDistrict("");
    setSelectedArea("");
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedArea("");
  };

  return (
    <div className="space-y-12">
      {/* STEP 1: DURATION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 lg:p-12 bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 relative overflow-hidden"
      >
        <div className="flex items-center space-x-5 mb-10">
          <div className="p-4 bg-secondary-container rounded-2xl text-primary">
            <Clock size={28} />
          </div>
          <h2 className="text-3xl font-headline font-black text-primary uppercase tracking-tighter">
            Service Duration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Duration Type Toggle */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-3">
              Plan Type
            </label>
            <div className="flex p-1.5 bg-surface-container-highest rounded-2xl">
              {["Hourly", "Daily"].map((plan) => (
                <button
                  key={plan}
                  className={`flex-1 py-4 px-6 rounded-xl font-black text-sm transition-all ${
                    durationPlan === plan
                      ? "bg-surface shadow-md text-primary"
                      : "text-on-surface-variant hover:bg-surface-bright"
                  }`}
                  onClick={() => setDurationPlan(plan)}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-3">
              {durationPlan === "Hourly" ? "Number of Hours" : "Number of Days"}
            </label>
            <div className="relative group">
              <select className="w-full h-16 bg-surface-container-highest/50 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer group-hover:bg-surface-container-highest">
                {durationPlan === "Hourly" ? (
                  <>
                    <option>2 Hours</option>
                    <option>4 Hours (Recommended)</option>
                    <option>8 Hours</option>
                    <option>Full Shift (12h)</option>
                  </>
                ) : (
                  <>
                    <option>1 Day</option>
                    <option>3 Days</option>
                    <option>7 Days</option>
                    <option>30 Days (Monthly)</option>
                  </>
                )}
              </select>
              <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-outline-variant/10 flex items-center">
          <div className="flex items-center text-primary font-black uppercase tracking-widest text-[10px] bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            <BadgeCheck size={14} className="mr-2" />
            Vetted caregivers only
          </div>
        </div>
      </motion.section>

      {/* STEP 2: LOCATION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 lg:p-12 bg-surface-container-low rounded-[3rem] border border-outline-variant/5 shadow-inner"
      >
        <div className="flex items-center space-x-5 mb-10">
          <div className="p-4 bg-tertiary-container rounded-2xl text-on-tertiary-container shadow-lg">
            <MapPin size={28} />
          </div>
          <h2 className="text-3xl font-headline font-black text-primary uppercase tracking-tighter">
            Service Location
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Division */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              Division
            </label>
            <div className="relative group">
              <select
                value={selectedDivision}
                onChange={(e) => handleDivisionChange(e.target.value)}
                className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer"
              >
                {divisions.map((div) => (
                  <option key={div} value={div}>{div}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
            </div>
          </div>

          {/* District */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              District
            </label>
            <div className="relative group">
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
            </div>
          </div>

          {/* Area */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              City / Area
            </label>
            <div className="relative group">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                disabled={!selectedDistrict}
                className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Select Area</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
              <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-primary/50 pointer-events-none" />
            </div>
          </div>

          {/* Post Code */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              Post Code
            </label>
            <input
              className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all font-bold text-on-surface placeholder-on-surface-variant/30"
              placeholder="1212"
              type="text"
            />
          </div>

          {/* Full Address */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              Full Street Address
            </label>
            <textarea
              className="w-full bg-surface-container-lowest/80 border border-outline-variant/10 rounded-[2rem] p-6 focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all font-bold text-on-surface placeholder-on-surface-variant/30"
              placeholder="House no, Street name, Landmark..."
              rows={4}
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default BookingSteps;
