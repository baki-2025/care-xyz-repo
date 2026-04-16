import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, nid, contact } = await req.json();

    if (!name || !email || !password || !nid || !contact) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    // Password validation: 6+ char, 1 uppercase, 1 lowercase
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ message: "Password must be at least 6 characters long and include an uppercase and a lowercase letter." }, { status: 400 });
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      nid,
      contact,
      authProvider: "credentials",
    });

    return NextResponse.json({ message: "User created successfully.", user: { id: newUser._id, email: newUser.email, name: newUser.name } }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "An error occurred during registration." }, { status: 500 });
  }
}
