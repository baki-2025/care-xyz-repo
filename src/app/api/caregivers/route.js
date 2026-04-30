import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Fetch all caregivers
    const caregivers = await db.collection('caregivers').find({}).toArray();

    return NextResponse.json({ caregivers }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch caregivers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
