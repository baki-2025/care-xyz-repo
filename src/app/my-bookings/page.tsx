import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MyBookingsClient from "./MyBookingsClient";

export const metadata = {
  title: "My Bookings | Care.xyz",
  description: "View and manage your care service bookings.",
};

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-16 px-6 max-w-6xl mx-auto min-h-screen">
        <MyBookingsClient />
      </main>
      <Footer />
    </>
  );
}
