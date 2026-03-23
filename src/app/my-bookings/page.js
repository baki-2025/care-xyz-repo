"use client";

import { useEffect, useState } from "react";
import { getBookings } from "@/lib/booking";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.map((b, i) => (
        <div key={i}>
          <p>Service: {b.service}</p>
          <p>Duration: {b.duration}</p>
          <p>Total: {b.total} BDT</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}