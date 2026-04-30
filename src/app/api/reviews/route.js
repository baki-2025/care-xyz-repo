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

    const { caregiverId, rating, comment } = await req.json();

    if (!caregiverId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!ObjectId.isValid(caregiverId)) {
      return NextResponse.json({ error: 'Invalid caregiver ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const review = {
      caregiverId: new ObjectId(caregiverId),
      userId: new ObjectId(session.user.id),
      userName: session.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    await db.collection('reviews').insertOne(review);

    // Update the caregiver's average rating (optional but good for UX)
    const allReviews = await db.collection('reviews').find({ caregiverId: new ObjectId(caregiverId) }).toArray();
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    
    await db.collection('caregivers').updateOne(
      { _id: new ObjectId(caregiverId) },
      { $set: { rating: Number(avgRating.toFixed(1)) } }
    );

    return NextResponse.json({ message: 'Review added successfully', review }, { status: 201 });

  } catch (error) {
    console.error('Failed to add review:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const caregiverId = searchParams.get('caregiverId');

    if (!caregiverId || !ObjectId.isValid(caregiverId)) {
      return NextResponse.json({ error: 'Invalid caregiver ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    const reviews = await db.collection('reviews')
      .find({ caregiverId: new ObjectId(caregiverId) })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ reviews }, { status: 200 });

  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
