import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    
    // Strict admin check
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { db } = await connectToDatabase();

    // Fetch all bookings from the database
    const allBookings = await db.collection('bookings')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ bookings: allBookings }, { status: 200 });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
