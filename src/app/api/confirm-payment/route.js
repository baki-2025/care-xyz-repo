import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from "@/lib/db";
import { ObjectId } from "mongodb";
import { sendBookingInvoice } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    // Retrieve the session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const metadata = checkoutSession.metadata;

    // Parse location if it's a string
    let location;
    try {
      location = JSON.parse(metadata.location);
    } catch {
      location = metadata.location;
    }

    const { db } = await connectToDatabase();

    // Check if booking already exists for this session
    const existingBooking = await db.collection("bookings").findOne({ transactionId: sessionId });
    if (existingBooking) {
      return NextResponse.json({ message: "Booking already confirmed" });
    }

    // Create the booking
    const bookingData = {
      user: new ObjectId(metadata.userId),
      serviceId: metadata.serviceId,
      serviceName: metadata.service,
      date: new Date(),
      durationPlan: metadata.durationPlan,
      durationValue: parseInt(metadata.durationValue),
      location,
      totalPrice: parseFloat(metadata.totalCost),
      status: "confirmed",
      paymentStatus: "paid",
      transactionId: sessionId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("bookings").insertOne(bookingData);

    // Get user details for email
    const user = await db.collection("users").findOne({ _id: new ObjectId(metadata.userId) });

    // Send email invoice
    await sendBookingInvoice(
      { ...bookingData, userName: user?.name || "Valued Customer" },
      metadata.email
    );

    return NextResponse.json({ message: "Booking confirmed" });
  } catch (error) {
    console.error("Confirm Payment Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}