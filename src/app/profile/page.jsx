"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Phone, FileText, Save, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [profile, setProfile] = useState({ name: "", email: "", contact: "", nid: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (res.ok && data.user) {
        setProfile({
          name: data.user.name || "",
          email: data.user.email || "",
          contact: data.user.contact || "",
          nid: data.user.nid || "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          contact: profile.contact,
          nid: profile.nid,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to update profile." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
        <div className="bg-surface-container-low rounded-[3rem] p-8 md:p-12 shadow-sm border border-outline-variant/10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <UserIcon size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-headline font-black text-primary tracking-tighter">
                My Profile
              </h1>
              <p className="text-on-surface-variant font-medium">Manage your personal information</p>
            </div>
          </div>

          {message.text && (
            <div className={`p-4 rounded-xl mb-8 font-medium ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1 block">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
                    <UserIcon size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors font-medium text-on-surface"
                    required
                  />
                </div>
              </div>

              {/* Email (Readonly usually for auth, or editable if you support email changes) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1 block">Email Address (Read-only)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
                    <UserIcon size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface-container border-2 border-transparent text-on-surface-variant font-medium cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1 block">Contact Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
                    <Phone size={20} />
                  </div>
                  <input
                    type="text"
                    name="contact"
                    value={profile.contact}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors font-medium text-on-surface"
                    placeholder="e.g. 01700000000"
                  />
                </div>
              </div>

              {/* NID */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-on-surface ml-1 block">NID Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant/50">
                    <FileText size={20} />
                  </div>
                  <input
                    type="text"
                    name="nid"
                    value={profile.nid}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-surface border-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors font-medium text-on-surface"
                    placeholder="National ID Number"
                  />
                </div>
              </div>

            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm hover:opacity-90 hover:-translate-y-1 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

        </div>
      </main>
      <Footer />
    </>
  );
}
