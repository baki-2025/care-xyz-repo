import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import Booking from "@/models/Booking";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const userId = (session.user as any).id;
    // Find all bookings for this user, sort by latest
    const userBookings = await Booking.find({ user: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });

    return NextResponse.json({ bookings: userBookings }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { bookingId, action } = await req.json();

    if (!bookingId || action !== "cancel") {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    await connectToDatabase();
    
    const userId = (session.user as any).id;
    
    // Ensure the booking belongs to the user and is pending
    const booking = await Booking.findOne({ _id: new mongoose.Types.ObjectId(bookingId), user: new mongoose.Types.ObjectId(userId) });
    
    if (!booking) {
      return NextResponse.json({ error: "Booking not found or not owned by user." }, { status: 404 });
    }

    if (booking.status !== "pending") {
      return NextResponse.json({ error: "Only pending bookings can be cancelled." }, { status: 400 });
    }

    booking.status = "cancelled";
    await booking.save();

    return NextResponse.json({ message: "Booking cancelled successfully", booking }, { status: 200 });
  } catch (error) {
    console.error("Failed to cancel booking:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
