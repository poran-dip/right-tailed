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

export async function PUT(req: NextRequest) {
  try {
    const studentId = req.nextUrl.searchParams.get('id');
    
    if (!studentId) {
      return NextResponse.json(
        { success: false, error: "Student ID required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { name, email, semester, program, subjectIds, paperIds, exams } = body;

    await dbConnect();

    if (email) {
      const existingStudent = await Student.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: studentId }
      });
      
      if (existingStudent) {
        return NextResponse.json(
          { success: false, error: "Email already in use" },
          { status: 409 }
        );
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase();
    if (semester !== undefined) updateData.semester = semester;
    if (program !== undefined) updateData.program = program;
    if (subjectIds !== undefined) updateData.subjectIds = subjectIds;
    if (paperIds !== undefined) updateData.paperIds = paperIds;
    if (exams !== undefined) updateData.exams = exams;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('subjectIds')
      .populate('paperIds')
      .lean();

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    const { password, ...studentData } = updatedStudent;

    return NextResponse.json(
      { 
        success: true,
        student: studentData,
        message: "Profile updated successfully"
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Update student error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
