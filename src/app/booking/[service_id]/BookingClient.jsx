"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Clock, MapPin, BadgeCheck, ChevronDown, Lock, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import warehouses from "@/data/warehouses.json";
import divisions from "@/data/division.json";
import { careServices } from "@/data/careServices";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/book/CheckoutForm";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder");

export default function BookingClient({ service, userId }) {
  const router = useRouter();

  // State for Service Type
  const [activeServiceId, setActiveServiceId] = useState(service.id);
  
  // Find full active service
  const activeService = useMemo(() => {
    return careServices.find(s => s.id === activeServiceId) || service;
  }, [activeServiceId, service]);
  
  // State for Duration
  const [durationPlan, setDurationPlan] = useState("Hourly");
  const [durationValue, setDurationValue] = useState(4);

  // State for Location
  const [selectedDivision, setSelectedDivision] = useState("Dhaka");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

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

  // Calculate Total Cost dynamically
  const totalCost = useMemo(() => {
    if (durationPlan === "Hourly") {
      return activeService.pricePerHour * durationValue;
    } else {
      return activeService.pricePerDay * durationValue;
    }
  }, [durationPlan, durationValue, activeService]);

  const handleInitiatePayment = async () => {
    if (!selectedDivision || !selectedDistrict || !selectedArea || !address) {
      alert("Please fill in all location details and address.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalCost }),
      });
      const data = await res.json();
      if (res.ok) {
        setClientSecret(data.clientSecret);
        setShowPayment(true);
      } else {
        alert(data.error || "Failed to initiate payment.");
      }
    } catch (err) {
      alert("Something went wrong connecting to payment gateway.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (transactionId) => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: activeService.id,
          serviceName: activeService.title,
          durationPlan,
          durationValue,
          location: {
            division: selectedDivision,
            district: selectedDistrict,
            area: selectedArea,
            postCode,
            address,
          },
          totalPrice: totalCost,
          transactionId,
          paymentStatus: "paid",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/my-bookings");
      } else {
        alert(data.error || "Payment successful, but failed to save booking. Please contact support.");
      }
    } catch (err) {
      alert("Something went wrong saving your booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      {/* Form Journey Column */}
      <div className="lg:col-span-12 xl:col-span-7 space-y-12">
        {/* STEP 1: SERVICE TYPE */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 lg:p-12 bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 relative overflow-hidden"
        >
          <div className="flex items-center space-x-5 mb-10">
            <div className="p-4 bg-tertiary-container rounded-2xl text-on-tertiary-container shadow-sm">
              <BadgeCheck size={28} />
            </div>
            <h2 className="text-3xl font-headline font-black text-primary uppercase tracking-tighter">
              Service Type
            </h2>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
              Select Care Option
            </label>
            <div className="relative group">
              <select
                value={activeServiceId}
                onChange={(e) => setActiveServiceId(e.target.value)}
                className="w-full h-16 bg-surface-container-highest/80 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-lg text-primary cursor-pointer"
              >
                {careServices.map((s) => (
                  <option key={s.id} value={s.id}>{s.title}</option>
                ))}
              </select>
              <ChevronDown size={22} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
            </div>
          </div>
        </motion.section>

        {/* STEP 2: DURATION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 lg:p-12 bg-surface-container-lowest rounded-[3rem] shadow-sm border border-outline-variant/10 relative overflow-hidden"
        >
          <div className="flex items-center space-x-5 mb-10">
            <div className="p-4 bg-secondary-container rounded-2xl text-primary shadow-sm">
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
                    onClick={() => {
                      setDurationPlan(plan);
                      setDurationValue(plan === "Hourly" ? 4 : 1);
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
                  onChange={(e) => setDurationValue(Number(e.target.value))}
                  className="w-full h-16 bg-surface-container-highest/50 border border-outline-variant/10 rounded-2xl px-6 appearance-none focus:ring-4 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer group-hover:bg-surface-container-highest"
                >
                  {durationPlan === "Hourly" ? (
                    <>
                      <option value="2">2 Hours</option>
                      <option value="4">4 Hours (Recommended)</option>
                      <option value="8">8 Hours</option>
                      <option value="12">Full Shift (12h)</option>
                    </>
                  ) : (
                    <>
                      <option value="1">1 Day</option>
                      <option value="3">3 Days</option>
                      <option value="7">7 Days</option>
                      <option value="30">30 Days (Monthly)</option>
                    </>
                  )}
                </select>
                <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* STEP 3: LOCATION */}
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

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
                Post Code
              </label>
              <input
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
                className="w-full h-14 bg-surface-container-lowest/80 border border-outline-variant/10 rounded-2xl px-6 focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all font-bold text-on-surface placeholder-on-surface-variant/30"
                placeholder="1212"
                type="text"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant ml-3 opacity-60">
                Full Street Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-surface-container-lowest/80 border border-outline-variant/10 rounded-[2rem] p-6 focus:ring-4 focus:ring-primary/20 focus:bg-surface transition-all font-bold text-on-surface placeholder-on-surface-variant/30"
                placeholder="House no, Street name, Landmark..."
                rows={4}
              />
            </div>
          </div>
        </motion.section>
      </div>

      {/* Summary Sidebar Column */}
      <aside className="lg:col-span-12 xl:col-span-5 sticky top-28 space-y-8">
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
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Service Type</span>
              <span className="font-extrabold text-lg text-[#9fe2ff] text-right">{activeService.title}</span>
            </div>
            
            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Duration</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">
                {durationValue} {durationPlan === "Hourly" ? "Hours" : "Days"}
              </span>
            </div>

            <div className="flex justify-between items-center py-4 border-b border-white/10">
              <span className="text-on-primary/70 font-bold text-sm uppercase tracking-wider">Rate</span>
              <span className="font-extrabold text-lg text-[#9fe2ff]">
                ৳{durationPlan === "Hourly" ? activeService.pricePerHour + "/hr" : activeService.pricePerDay + "/day"}
              </span>
            </div>
          </div>

          {/* Dynamic Cost Display */}
          <div className="bg-primary-container/20 p-8 rounded-[2.5rem] flex justify-between items-end border border-white/5">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest text-on-primary-container opacity-60">
                Total Estimate
              </span>
              <div className="text-6xl font-headline font-black mt-2 tracking-tighter">
                ৳{totalCost.toLocaleString()}
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleInitiatePayment}
            disabled={loading || showPayment}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full bg-surface-container-lowest text-primary py-6 rounded-[2rem] font-black text-2xl shadow-2xl transition-all transform ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-surface active:scale-95"}`}
          >
            {loading ? "Processing..." : "Pay & Confirm"}
          </motion.button>

          {/* Payment Modal/Overlay */}
          {showPayment && clientSecret && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-surface-container-lowest rounded-[3rem] p-10 max-w-lg w-full shadow-2xl relative"
              >
                <button 
                  onClick={() => setShowPayment(false)}
                  className="absolute top-8 right-8 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <XCircle size={32} />
                </button>
                
                <h3 className="text-3xl font-headline font-black text-primary mb-6 uppercase tracking-tighter">
                  Complete Payment
                </h3>
                
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm amount={totalCost} onPaymentSuccess={handlePaymentSuccess} />
                </Elements>
                
                <p className="mt-8 text-xs text-on-surface-variant text-center font-medium">
                  Payments are secure and encrypted via <strong>Stripe</strong>.
                </p>
              </motion.div>
            </div>
          )}

          <div className="flex items-center justify-center space-x-3 text-on-primary/60 text-[10px] font-black uppercase tracking-widest leading-none">
            <Lock size={14} className="text-on-primary/40" />
            <span>Secure Cash on Delivery</span>
          </div>
        </motion.div>
      </aside>
    </div>
  );
}
