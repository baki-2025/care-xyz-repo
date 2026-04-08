"use client";

import React from "react";
import { Filter, Search, Plus, Eye, XCircle, CheckCircle2, Clock, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const bookings = [
  {
    service: "Senior Home Assistance",
    provider: "Maria Jenkins",
    duration: "4 Hours",
    location: "Madison Ave, WA",
    cost: "$120.00",
    status: "Confirmed",
    icon: "elderly",
    color: "bg-secondary-container text-primary",
  },
  {
    service: "Nursing Check-up",
    provider: "Dr. Aris Thorne",
    duration: "1.5 Hours",
    location: "Clinic Central",
    cost: "$85.00",
    status: "Pending",
    icon: "medical",
    color: "bg-tertiary-fixed text-tertiary",
  },
  {
    service: "Weekend Respite Care",
    provider: "Sarah L.",
    duration: "8 Hours",
    location: "Madison Ave, WA",
    cost: "$240.00",
    status: "Completed",
    icon: "child",
    color: "bg-surface-container text-on-surface-variant",
  },
  {
    service: "Physical Therapy",
    provider: "Kevin Zhang",
    duration: "1 Hour",
    location: "Therapy Loft",
    cost: "$95.00",
    status: "Cancelled",
    icon: "injury",
    color: "bg-error-container/30 text-error",
  },
];

const BookingList = () => {
  return (
    <section>
      <div className="flex flex-col xl:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter uppercase leading-none">
            Booking Schedule
          </h2>
          <p className="text-on-surface-variant font-medium text-lg font-body max-w-lg">
            Your history of care services and upcoming sessions, tailored for
            your family's sanctuary.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-surface-container-high px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-on-surface hover:bg-surface-dim transition-all flex items-center gap-3 border border-outline-variant/10 shadow-sm active:scale-95">
            <Filter size={18} /> Filter
          </button>
          <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_15px_30px_-5px_rgba(0,78,99,0.3)] hover:opacity-90 transition-all flex items-center gap-3 active:scale-95">
            <Plus size={20} /> New Booking
          </button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-lowest rounded-[3.5rem] overflow-hidden shadow-3xl shadow-primary/5 border border-outline-variant/5"
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/40 backdrop-blur-md">
                {[
                  "Service Name",
                  "Duration",
                  "Location",
                  "Total Cost",
                  "Status",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-10 py-8 font-black text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-headline opacity-60"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low font-body">
              {bookings.map((booking, i) => (
                <tr
                  key={i}
                  className="hover:bg-surface-bright transition-all group cursor-default"
                >
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-6">
                      <div className={cn("w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-inner", booking.color)}>
                        <h1 className="text-2xl font-black">
                           {booking.icon === "elderly" ? "E" : booking.icon === "medical" ? "M" : booking.icon === "child" ? "C" : "P"}
                        </h1>
                      </div>
                      <div>
                        <div className="font-extrabold text-on-surface text-lg font-headline tracking-tight">{booking.service}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mt-1">
                          Provider: {booking.provider}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-on-surface font-black text-sm uppercase tracking-widest">{booking.duration}</td>
                  <td className="px-10 py-8 text-on-surface-variant">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <span className="opacity-40">Madison Ave, WA</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-primary font-black text-xl tracking-tighter">{booking.cost}</td>
                  <td className="px-10 py-8">
                    <span className={cn(
                        "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-2 border shadow-sm",
                        booking.status === "Confirmed" && "bg-primary/5 text-primary border-primary/10",
                        booking.status === "Pending" && "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/10",
                        booking.status === "Completed" && "bg-surface-container-high text-on-surface-variant border-outline-variant/10",
                        booking.status === "Cancelled" && "bg-error-container/20 text-error border-error/10"
                    )}>
                      {booking.status === "Confirmed" && <CheckCircle2 size={12} />}
                      {booking.status === "Pending" && <Clock size={12} />}
                      {booking.status === "Completed" && <CheckSquare size={12} />}
                      {booking.status === "Cancelled" && <XCircle size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex gap-4">
                      <button className="p-3 text-primary bg-primary/5 hover:bg-primary hover:text-on-primary rounded-2xl transition-all shadow-sm">
                        <Eye size={20} />
                      </button>
                      <button className={cn(
                          "p-3 rounded-2xl transition-all shadow-sm",
                          booking.status === "Completed" || booking.status === "Cancelled" 
                          ? "text-outline/40 bg-surface-container cursor-not-allowed" 
                          : "text-error bg-error-container/20 hover:bg-error hover:text-on-error"
                      )}>
                        <XCircle size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingList;
