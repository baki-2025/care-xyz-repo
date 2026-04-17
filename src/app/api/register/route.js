import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { name, email, password, nid, contact } = await req.json();

    if (!name || !email || !password || !nid || !contact) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Password validation: 6+ char, 1 uppercase, 1 lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long and include an uppercase and a lowercase letter.' }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email is already registered.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      nid,
      contact,
      authProvider: 'credentials',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ message: 'User created successfully.', user: { id: result.insertedId, email, name } }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'An error occurred during registration.' }, { status: 500 });
  }
}