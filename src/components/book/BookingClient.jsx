"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, BadgeCheck, ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import warehouses from "@/data/warehouses.json";
import divisions from "@/data/division.json";

export default function BookingClient({ service }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [durationPlan, setDurationPlan] = useState("Hourly");
  const [durationValue, setDurationValue] = useState("4 Hours (Recommended)");
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usePayment, setUsePayment] = useState(false);

  // Filter districts based on selected division
  const districts = useMemo(
    () =>
      [...new Set(warehouses
        .filter((w) => w.region === selectedDivision)
        .map((w) => w.district))],
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

  // Calculate total cost
  const calculateTotalCost = () => {
    const pricePerUnit = service.price || 500; // Default price in BDT
    let unitCount = 1;

    if (durationPlan === "Hourly") {
      const hourOptions = { "2 Hours": 2, "4 Hours (Recommended)": 4, "8 Hours": 8, "Full Shift (12h)": 12 };
      unitCount = hourOptions[durationValue] || 4;
    } else {
      const dayOptions = { "1 Day": 1, "3 Days": 3, "7 Days": 7, "30 Days (Monthly)": 30 };
      unitCount = dayOptions[durationValue] || 1;
    }

    return (pricePerUnit * unitCount) + 100; // Add convenience fee
  };

  const totalCost = calculateTotalCost();

  const handleDivisionChange = (div) => {
    setSelectedDivision(div);
    setSelectedDistrict("");
    setSelectedArea("");
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    setSelectedArea("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedDivision || !selectedDistrict || !selectedArea || !address) {
      setError("Please fill in all location fields");
      setLoading(false);
      return;
    }

    const bookingData = {
      serviceId: service.id,
      serviceName: service.title,
      durationPlan,
      durationValue,
      location: {
        division: selectedDivision,
        district: selectedDistrict,
        area: selectedArea,
        address,
      },
      totalPrice: totalCost,
      paymentStatus: usePayment ? "pending" : "unpaid",
    };

    try {
      if (usePayment) {
        // Stripe checkout flow
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingData }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to create checkout session");
        }

        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        // Direct booking without payment
        const response = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to create booking");
        }

        // Success - redirect to bookings page
        router.push("/my-bookings?booking=success");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-12">
      <div className="lg:col-span-4 space-y-12">
        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-error/10 border border-error/30 rounded-2xl flex items-start gap-4"
          >
            <AlertCircle size={24} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-error font-bold">{error}</p>
          </motion.div>
        )}

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
                    type="button"
                    className={`flex-1 py-4 px-6 rounded-xl font-black text-sm transition-all ${
                      durationPlan === plan
                        ? "bg-surface shadow-md text-primary"
                        : "text-on-surface-variant hover:bg-surface-bright"
                    }`}
                    onClick={() => {
                      setDurationPlan(plan);
                      setDurationValue(plan === "Hourly" ? "4 Hours (Recommended)" : "1 Day");
                    }}
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
                <select
                  value={durationValue}
                  onChange={(e) => setDurationValue(e.target.value)}
                  className="w-full h-16 bg-surface-container-highest/50 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer group-hover:bg-surface-container-highest"
                >
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
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary" />
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
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary" />
              </div>
            </div>

            {/* Area */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
                Area / Coverage Zone
              </label>
              <div className="relative group">
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer"
                >
                  <option value="">Select Area</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-primary" />
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
                Detailed Address
              </label>
              <input
                type="text"
                placeholder="Enter your full address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface placeholder:text-on-surface-variant/50"
              />
            </div>
          </div>
        </motion.section>

        {/* STEP 3: PAYMENT METHOD */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 lg:p-12 bg-surface-container-lowest rounded-[3rem] border border-outline-variant/10"
        >
          <div className="flex items-center space-x-5 mb-10">
            <div className="p-4 bg-success-container rounded-2xl text-on-success-container">
              <CheckCircle2 size={28} />
            </div>
            <h2 className="text-3xl font-headline font-black text-primary uppercase tracking-tighter">
              Payment Method
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="direct_booking"
                name="payment"
                value="direct"
                checked={!usePayment}
                onChange={() => setUsePayment(false)}
                className="w-6 h-6 cursor-pointer"
              />
              <label htmlFor="direct_booking" className="cursor-pointer">
                <span className="font-bold text-on-surface">Direct Booking (Pay Later)</span>
                <p className="text-sm text-on-surface-variant">Pay after service completion</p>
              </label>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="radio"
                id="stripe_payment"
                name="payment"
                value="stripe"
                checked={usePayment}
                onChange={() => setUsePayment(true)}
                className="w-6 h-6 cursor-pointer"
              />
              <label htmlFor="stripe_payment" className="cursor-pointer">
                <span className="font-bold text-on-surface">Pay Now with Stripe</span>
                <p className="text-sm text-on-surface-variant">Secure online payment</p>
              </label>
            </div>
          </div>
        </motion.section>
      </div>

      {/* SUMMARY SIDEBAR */}
      <aside className="lg:col-span-3 sticky top-28 h-fit space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary text-on-primary rounded-[3rem] p-10 shadow-3xl shadow-primary/20 space-y-10"
        >
          <div>
            <h3 className="text-3xl font-headline font-black mb-2 uppercase tracking-tighter">
              Booking Summary
            </h3>
            <p className="text-on-primary-container text-sm font-bold opacity-70 uppercase tracking-widest">
              Review your selection before confirmation
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Care Type</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">{service.title}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Duration</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">{durationValue}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Location</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">{selectedArea || "N/A"}</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Convenience Fee</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">৳100</span>
            </div>
          </div>

          {/* Dynamic Cost Display */}
          <div className="bg-primary-container/20 p-8 rounded-[2.5rem] flex justify-between items-end border border-white/5">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-on-primary-container opacity-60">
                Total Cost
              </span>
              <div className="text-6xl font-headline font-black mt-2 tracking-tighter">
                ৳{totalCost.toLocaleString()}
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-surface-container-lowest text-primary py-6 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-surface transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : usePayment ? "Proceed to Payment" : "Confirm Booking"}
          </motion.button>
        </motion.div>
      </aside>
    </form>
  );
}
