import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectToDatabase from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    
    // For social login, token.id might not be set as ObjectId if it was auto-created.
    // Try to find by email if id is missing or invalid.
    let user;
    if (session.user.id && ObjectId.isValid(session.user.id)) {
      user = await db.collection('users').findOne({ _id: new ObjectId(session.user.id) });
    } else {
      user = await db.collection('users').findOne({ email: session.user.email });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Don't send the password back
    const { password, ...safeUser } = user;
    return NextResponse.json({ user: safeUser }, { status: 200 });

  } catch (error) {
    console.error('Failed to fetch profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, contact, nid } = await req.json();

    const { db } = await connectToDatabase();

    let filter = {};
    if (session.user.id && ObjectId.isValid(session.user.id)) {
      filter = { _id: new ObjectId(session.user.id) };
    } else {
      filter = { email: session.user.email };
    }

    const updateDoc = {
      $set: {
        name: name || session.user.name,
        contact,
        nid,
        updatedAt: new Date(),
      },
    };

    const result = await db.collection('users').updateOne(filter, updateDoc);

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
