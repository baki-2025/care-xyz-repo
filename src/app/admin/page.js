"use client";

import React, { useEffect, useState } from "react";
import { Shield, BarChart3, CreditCard, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Admin Dashboard | Care.xyz",
  description: "Manage booking and payment histories for Care.xyz from the admin panel.",
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    fetch("/api/admin/bookings", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          if (res.status === 403) {
            setUnauthorized(true);
          }
          return;
        }
        if (data.bookings) setBookings(data.bookings);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: BarChart3, color: "text-primary" },
    { label: "Confirmed", value: bookings.filter(b => b.status === "confirmed").length, icon: Clock, color: "text-blue-500" },
    { label: "Payments", value: `৳${bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}`, icon: CreditCard, color: "text-green-500" },
  ];

  if (loading) {
    return <div className="p-20 text-center animate-pulse">Loading Admin Overview...</div>;
  }

  if (unauthorized) {
    return (
      <>
        <Navbar />
        <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-center">
          <div className="rounded-[3rem] border border-outline-variant/10 bg-surface-container-low p-12 shadow-sm">
            <Shield size={48} className="mx-auto mb-6 text-amber-500" />
            <h1 className="text-3xl font-black text-primary mb-4">Admin Access Required</h1>
            <p className="text-on-surface-variant leading-relaxed">
              You do not have permission to view this page. Please sign in with an admin account or contact support.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

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
            <p className="text-on-surface-variant font-medium">Platform-wide management and payment history overview</p>
          </div>
        </div>

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

        <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-[3rem] overflow-hidden shadow-sm">
          <div className="p-8 border-b border-outline-variant/10 bg-surface-container-low/30">
            <h2 className="text-xl font-black text-primary uppercase tracking-tight">Payment History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/20 text-on-surface-variant">
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">User ID</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Service</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Payment</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest">Transaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-8 py-6 font-mono text-xs opacity-50">{booking.user}</td>
                    <td className="px-8 py-6 font-bold text-on-surface">{booking.serviceName}</td>
                    <td className="px-8 py-6 font-black">৳{booking.totalPrice?.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${booking.paymentStatus === 'paid' ? 'text-green-600' : 'text-amber-600'}`}>
                        {booking.paymentStatus || 'pending'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-xs text-on-surface-variant italic">{booking.transactionId || 'N/A'}</td>
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
