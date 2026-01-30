import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import { Student, Subject, Paper } from '@/models';

export async function GET(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get('id');
    
    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Student ID required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const student = await Student.findById(studentId)
      .populate('subjectIds')
      .populate('paperIds')
      .lean();

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    const { password, ...studentData } = student;

    return NextResponse.json(
      { 
        success: true,
        student: studentData
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get student error:', error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
