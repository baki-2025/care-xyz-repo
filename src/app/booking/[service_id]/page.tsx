import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BookingClient from "./BookingClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingHeader from "@/components/book/BookingHeader";
import { careServices } from "@/data/careServices";

export const metadata = {
  title: "Complete Your Booking | Care.xyz",
  description: "Secure your personalized care in three simple steps.",
};

export default async function BookingPage({ params }: { params: Promise<{ service_id: string }> }) {
  const session = await getServerSession(authOptions);
  const resolvedParams = await params;

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=/booking/${resolvedParams.service_id}`);
  }

  const service = careServices.find((s) => s.id === resolvedParams.service_id);
  
  if (!service) {
    redirect("/"); // Or to a 404
  }

  // extract the user ID
  const userId = (session.user as any).id || "";

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen">
        <div className="mb-12">
          <BookingHeader />
        </div>
        <BookingClient service={service} userId={userId} />
      </main>
      <Footer />
    </>
  );
}
