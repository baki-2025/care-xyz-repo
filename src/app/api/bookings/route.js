import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { serviceId, serviceName, durationPlan, durationValue, location, totalPrice } = await req.json();

    if (!serviceId || !serviceName || !durationPlan || !durationValue || !location || !location.division || !location.address) {
      return NextResponse.json({ error: 'Missing required booking details.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const userId = session.user.id;
    
    // Create new booking
    const bookingData = {
      user: new ObjectId(userId),
      serviceId,
      serviceName,
      date: new Date(),
      durationPlan,
      durationValue,
      location,
      totalPrice,
      status: 'pending',
      paymentStatus: paymentStatus || 'pending',
      transactionId: transactionId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('bookings').insertOne(bookingData);
    const newBooking = { ...bookingData, _id: result.insertedId };

    // Send real email invoice
    const { sendBookingInvoice } = require('@/lib/email');
    await sendBookingInvoice(
      { ...newBooking, userName: session.user.name },
      session.user.email
    );

    return NextResponse.json(
      { message: 'Booking successful', booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}