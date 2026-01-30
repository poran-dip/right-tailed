import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { Student, Subject, Paper } from '@/models';

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json();

    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: "Passwords don't match" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json({ 
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      }
    });

  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
