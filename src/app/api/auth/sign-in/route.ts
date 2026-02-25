import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { Student } from '@/models';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const student = await Student.findOne({ email: email.toLowerCase() }).select('+passwordHash');

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
    if (!student.passwordHash) {
      return NextResponse.json(
        { success: false, error: "This account does not use password login" },
        { status: 400 }
      );
    }
    
    const isValidPassword = await bcrypt.compare(password, student.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        semester: student.semester,
        departmentId: student.departmentId,
      }
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
