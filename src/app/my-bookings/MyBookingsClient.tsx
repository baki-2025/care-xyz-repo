"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Search, XCircle, Eye } from "lucide-react";
import Link from "next/link";
import { IBooking } from "@/models/Booking";

export default function MyBookingsClient() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);

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
    } catch (err) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
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
    } catch (error) {
      alert("An error occurred");
    } finally {
      setCancelling(null);
    }
  };

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col space-y-4">
        <div className="h-10 w-48 bg-surface-container rounded-lg"></div>
        <div className="h-64 bg-surface-container rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-black text-primary tracking-tighter">
            My Bookings
          </h1>
          <p className="text-on-surface-variant font-medium mt-2">
            Track and manage your care service appointments.
          </p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-surface-container-low p-12 rounded-[3rem] text-center border border-outline-variant/10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-primary w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black font-headline mb-2">No bookings found</h3>
          <p className="text-on-surface-variant mb-8 max-w-sm mx-auto">
            You haven't requested any care services yet. Explore our services and book your first appointment!
          </p>
          <Link
            href="/"
            className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:opacity-90 transition-opacity"
          >
            Explore Services
          </Link>
        </div>
      ) : (
        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[2rem] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead className="bg-surface-container-low/50 text-on-surface border-b border-outline-variant/10">
                <tr>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest opacity-70">Service</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest opacity-70">Location</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest opacity-70">Date & Cost</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest opacity-70">Status</th>
                  <th className="px-6 py-5 text-xs font-black uppercase tracking-widest opacity-70 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    
                    <td className="px-6 py-6">
                      <div className="font-bold text-lg text-primary">{booking.serviceName}</div>
                      <div className="text-sm font-medium text-on-surface-variant">{booking.durationValue} {booking.durationPlan}(s)</div>
                    </td>

                    <td className="px-6 py-6 max-w-[250px]">
                      <div className="flex items-start space-x-2">
                        <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-bold text-on-surface">{booking.location.area}, {booking.location.district}</p>
                          <p className="text-xs text-on-surface-variant line-clamp-1">{booking.location.address}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar size={16} className="text-on-surface-variant" />
                        <span className="text-sm font-medium text-on-surface-variant">
                          {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      </div>
                      <div className="font-black text-lg">৳{booking.totalPrice.toLocaleString()}</div>
                    </td>

                    <td className="px-6 py-6">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        booking.status === "pending" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                        booking.status === "confirmed" ? "bg-blue-100 text-blue-800 border border-blue-200" :
                        booking.status === "completed" ? "bg-green-100 text-green-800 border border-green-200" :
                        "bg-red-100 text-red-800 border border-red-200"
                      }`}>
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <Link 
                           href={`/service/${booking.serviceId}`}
                           className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-full"
                           title="View Service"
                        >
                          <Eye size={18} />
                        </Link>
                        {booking.status === "pending" && (
                          <button
                            onClick={() => handleCancel(booking._id)}
                            disabled={cancelling === booking._id}
                            className="p-2 text-error/70 hover:text-error hover:bg-error/10 transition-colors bg-error/5 rounded-full"
                            title="Cancel Booking"
                          >
                            <XCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
