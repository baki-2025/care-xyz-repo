import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    const resolvedParams = await params;
    const caregiverId = resolvedParams.id;

    if (!caregiverId || !ObjectId.isValid(caregiverId)) {
      return NextResponse.json({ error: 'Invalid caregiver ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const caregiver = await db.collection('caregivers').findOne({ _id: new ObjectId(caregiverId) });

    if (!caregiver) {
      return NextResponse.json({ error: 'Caregiver not found' }, { status: 404 });
    }

    return NextResponse.json({ caregiver }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch caregiver:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
