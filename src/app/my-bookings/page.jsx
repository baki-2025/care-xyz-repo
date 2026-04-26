import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileHeader from "@/components/bookings/ProfileHeader";
import BookingList from "@/components/bookings/BookingList";
import DashboardCards from "@/components/bookings/DashboardCards";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Bookings | Care.IO",
  description: "Manage your personalized care journey, upcoming visits, and view your care history with our professional sanctuary.",
};

export default async function MyBookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <ProfileHeader />
        <BookingList />
        <DashboardCards />
      </main>
      <Footer />
    </>
  );
}
