"use client";

import React, { useState, useEffect } from "react";
import { Filter, Search, Plus, Eye, XCircle, CheckCircle2, Clock, CheckSquare } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/my-bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings);
      }
    } catch {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancelling(id);
    try {
      const res = await fetch("/api/my-bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: id, action: "cancel" }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b))
        );
      } else {
        const err = await res.json();
        alert(err.error || "Failed to cancel");
      }
    } catch {
      alert("An error occurred");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-12 animate-pulse">
        <div className="h-20 bg-surface-container-low rounded-[2rem] w-full"></div>
        <div className="h-64 bg-surface-container-low rounded-[3.5rem] w-full"></div>
      </div>
    );
  }

  return (
    <section>
      <div className="flex flex-col xl:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tighter uppercase leading-none">
            Booking Schedule
          </h2>
          <p className="text-on-surface-variant font-medium text-lg font-body max-w-lg">
            Your history of care services and upcoming sessions, tailored for
            your family&apos;s sanctuary.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-surface-container-high px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-on-surface hover:bg-surface-dim transition-all flex items-center gap-3 border border-outline-variant/10 shadow-sm active:scale-95">
            <Filter size={18} /> Filter
          </button>
          <Link href="/" className="bg-primary text-on-primary px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-[0_15px_30px_-5px_rgba(0,78,99,0.3)] hover:opacity-90 transition-all flex items-center gap-3 active:scale-95">
            <Plus size={20} /> New Booking
          </Link>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface-container-lowest p-20 rounded-[4rem] text-center border border-outline-variant/5 shadow-xl">
           <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="text-primary w-10 h-10 opacity-40" />
           </div>
           <h3 className="text-3xl font-black font-headline mb-4 uppercase tracking-tighter">No Bookings Yet</h3>
           <p className="text-on-surface-variant font-medium text-lg max-w-md mx-auto mb-10 leading-relaxed">
             You haven&apos;t scheduled any care services. Start your journey by exploring our specialized care options.
           </p>
           <Link href="/" className="inline-flex bg-primary text-on-primary px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:opacity-90 transition-all shadow-xl">
             Explore Services
           </Link>
        </div>
      ) : (
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
                    "Plan",
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
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-surface-bright transition-all group cursor-default"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-6">
                        <div className={cn("w-14 h-14 rounded-[1.25rem] flex items-center justify-center shadow-inner", 
                          booking.serviceName?.toLowerCase()?.includes("senior") ? "bg-secondary-container text-primary" : 
                          booking.serviceName?.toLowerCase()?.includes("child") ? "bg-surface-container text-on-surface-variant" : 
                          "bg-tertiary-fixed text-tertiary")}>
                          <h1 className="text-2xl font-black">
                             {booking.serviceName?.[0]}
                          </h1>
                        </div>
                        <div>
                          <div className="font-extrabold text-on-surface text-lg font-headline tracking-tight">{booking.serviceName}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50 mt-1">
                            Ref: {booking._id?.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-on-surface font-black text-sm uppercase tracking-widest">
                       {booking.durationValue} {booking.durationPlan}(s)
                    </td>
                    <td className="px-10 py-8 text-on-surface-variant">
                      <div className="flex flex-col gap-1 font-bold text-sm">
                        <span className="text-on-surface line-clamp-1">{booking.location.area}, {booking.location.district}</span>
                        <span className="text-[10px] opacity-60 line-clamp-1">{booking.location.address}</span>
                      </div>
                    </td>
                    <td className="px-10 py-8 text-primary font-black text-xl tracking-tighter">৳{booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-10 py-8">
                      <div className="flex flex-col gap-2">
                        <span className={cn(
                            "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-2 border shadow-sm",
                            booking.status === "confirmed" && "bg-primary/5 text-primary border-primary/10",
                            booking.status === "pending" && "bg-tertiary-fixed text-on-tertiary-fixed-variant border-tertiary/10",
                            booking.status === "completed" && "bg-surface-container-high text-on-surface-variant border-outline-variant/10",
                            booking.status === "cancelled" && "bg-error-container/20 text-error border-error/10"
                        )}>
                          {booking.status === "confirmed" && <CheckCircle2 size={12} />}
                          {booking.status === "pending" && <Clock size={12} />}
                          {booking.status === "completed" && <CheckSquare size={12} />}
                          {booking.status === "cancelled" && <XCircle size={12} />}
                          {booking.status}
                        </span>
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border w-fit",
                          booking.paymentStatus === "paid" ? "bg-green-50 text-green-600 border-green-100" : "bg-surface-container text-on-surface-variant border-outline-variant/20"
                        )}>
                          {booking.paymentStatus || 'pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <div className="flex gap-4">
                        <Link 
                          href={`/service/${booking.serviceId}`}
                          className="p-3 text-primary bg-primary/5 hover:bg-primary hover:text-on-primary rounded-2xl transition-all shadow-sm"
                        >
                          <Eye size={20} />
                        </Link>
                        {booking.status === "pending" && (
                          <button 
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelling === booking._id}
                            className={cn(
                                "p-3 rounded-2xl transition-all shadow-sm",
                                "text-error bg-error-container/20 hover:bg-error hover:text-on-error"
                            )}
                          >
                            <XCircle size={20} className={cancelling === booking._id ? "animate-spin" : ""} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default BookingList;
