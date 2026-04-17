"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";

export default function CheckoutForm({ amount, onPaymentSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/my-bookings",
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess(paymentIntent.id);
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      
      <motion.button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 disabled:opacity-50"
      >
        <span id="button-text">
          {isLoading ? "Processing..." : `Pay ৳${amount.toLocaleString()}`}
        </span>
      </motion.button>
      
      {message && <div id="payment-message" className="text-error text-sm font-bold text-center">{message}</div>}
    </form>
  );
}
