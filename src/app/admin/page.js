"use client";

import React, { useEffect, useState } from "react";
import { Shield, Users, BarChart3, CreditCard, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then(res => res.json())
      .then(data => {
        if (data.bookings) setBookings(data.bookings);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: BarChart3, color: "text-primary" },
    { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, icon: Clock, color: "text-blue-500" },
    { label: "Payments", value: `৳${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}`, icon: CreditCard, color: "text-green-500" },
  ];

  if (loading) return <div className="p-20 text-center animate-pulse">Loading Admin Overview...</div>;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="flex items-center space-x-4 mb-12">
          <div className="p-4 bg-primary text-on-primary rounded-3xl shadow-xl shadow-primary/20">
            <Shield size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-headline font-black text-primary uppercase tracking-tighter">
              Admin Dashboard
            </h1>
            <p className="text-on-surface-variant font-medium">Platform-wide management and analytics</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/10 shadow-sm flex items-center space-x-6">
              <div className={`p-4 rounded-2xl bg-surface-container ${stat.color}`}>
                <stat.icon size={32} />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant opacity-60">{stat.label}</p>
                <p className="text-3xl font-black text-on-surface">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[3rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-outline-variant/10 bg-surface-container-low/30">
            <h2 className="text-xl font-black text-primary uppercase tracking-tight">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/20 text-on-surface-variant">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">User ID</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Service</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Transaction ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {bookings.map(booking => (
                  <tr key={booking._id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-8 py-6 font-mono text-xs opacity-50">{booking.user}</td>
                    <td className="px-8 py-6 font-bold text-on-surface">{booking.serviceName}</td>
                    <td className="px-8 py-6 font-black">৳{booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-8 py-6 space-y-2">
                      <div className="flex flex-col gap-1">
                        <span className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                           booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {booking.status}
                        </span>
                        <span className={`w-fit px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {booking.paymentStatus || 'pending'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs text-on-surface-variant italic">
                      {booking.transactionId || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
