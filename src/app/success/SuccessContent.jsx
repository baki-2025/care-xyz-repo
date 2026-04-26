"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, Loader, XCircle } from "lucide-react";

export default function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (res.ok) {
          // Redirect to my-bookings after a delay
          setTimeout(() => {
            router.push("/my-bookings");
          }, 3000);
        } else {
          setError(data.error || "Failed to confirm payment");
        }
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [sessionId, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={48} />
          <p>Confirming your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-red-500">{error}</p>
          <button onClick={() => router.push("/")} className="mt-4 px-4 py-2 bg-primary text-white rounded">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p>Your booking has been confirmed. Redirecting to your bookings...</p>
      </div>
    </div>
  );
}
