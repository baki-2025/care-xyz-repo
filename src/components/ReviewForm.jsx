"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Star, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ caregiverId }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!session) {
    return (
      <div className="bg-surface-container p-6 rounded-[2rem] text-center border border-outline-variant/10">
        <p className="text-on-surface-variant font-medium mb-4">Please log in to leave a review.</p>
        <button onClick={() => router.push('/login')} className="px-6 py-2 rounded-full bg-primary text-on-primary font-bold text-sm uppercase tracking-widest">
          Log In
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caregiverId, rating, comment }),
      });

      if (res.ok) {
        setComment("");
        setRating(5);
        setMessage("Review submitted successfully!");
        router.refresh(); // Refresh the page to show the new review
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to submit review.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/10">
      <h3 className="text-xl font-black font-headline text-on-surface mb-6">Write a Review</h3>
      
      {message && (
        <div className="mb-4 p-3 rounded-xl bg-green-100 text-green-700 font-medium text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={32}
                  className={star <= rating ? "text-amber-500 fill-amber-500" : "text-outline-variant"}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-on-surface mb-2">Your Experience</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            className="w-full p-4 rounded-2xl bg-surface border-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-colors font-medium text-on-surface resize-none"
            placeholder="Share your experience with this caregiver..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-primary text-on-primary font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
