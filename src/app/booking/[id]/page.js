"use client";

import { useState, useEffect } from "react";
import { getUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { saveBooking } from "@/lib/booking";

export default function BookingPage({ params }) {
  const router = useRouter();
  const [hours, setHours] = useState(1);

  const price = 100;
  const total = hours * price;

  useEffect(() => {
    if (!getUser()) {
      router.push("/login");
    }
  }, []);

  const handleBooking = () => {
    saveBooking({
      service: params.id,
      duration: hours,
      total,
      status: "Pending"
    });

    alert("Booking Confirmed! Invoice sent.");
    router.push("/my-bookings");
  };

  return (
    <div>
      <h1>Booking Service</h1>

      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />

      <p>Total Cost: {total} BDT</p>

      <button onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
}