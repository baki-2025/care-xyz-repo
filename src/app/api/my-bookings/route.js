import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    const userId = session.user.id;
    // Find all bookings for this user, sort by latest
    const userBookings = await db.collection('bookings')
      .find({ user: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ bookings: userBookings }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId, action } = await req.json();

    if (!bookingId || action !== 'cancel') {
      return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const userId = session.user.id;
    
    // Ensure the booking belongs to the user and is pending
    const booking = await db.collection('bookings').findOne({ 
      _id: new ObjectId(bookingId), 
      user: new ObjectId(userId) 
    });
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found or not owned by user.' }, { status: 404 });
    }

    if (booking.status !== 'pending') {
      return NextResponse.json({ error: 'Only pending bookings can be cancelled.' }, { status: 400 });
    }

    await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { status: 'cancelled', updatedAt: new Date() } }
    );

    const updatedBooking = { ...booking, status: 'cancelled', updatedAt: new Date() };

    return NextResponse.json({ message: 'Booking cancelled successfully', booking: updatedBooking }, { status: 200 });
  } catch (error) {
    console.error('Failed to cancel booking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
