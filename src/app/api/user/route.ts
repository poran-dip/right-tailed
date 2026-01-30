import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import { Student } from '@/models';

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
      .populate('departmentId')
      .populate('currentSubjects')
      .populate({
        path: 'uploadedPapers',
        populate: { path: 'subjectId' }
      })
      .populate({
        path: 'savedPapers',
        populate: { path: 'subjectId' }
      })
      .select('-passwordHash') // Exclude passwordHash from response
      .lean();

    if (!student) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        student
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
    const { name, email, semester, departmentId, currentSubjects, savedPapers, upcomingExams } = body;

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
    if (departmentId !== undefined) updateData.departmentId = departmentId;
    if (currentSubjects !== undefined) updateData.currentSubjects = currentSubjects;
    if (savedPapers !== undefined) updateData.savedPapers = savedPapers;
    if (upcomingExams !== undefined) updateData.upcomingExams = upcomingExams;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('departmentId')
      .populate('currentSubjects')
      .populate({
        path: 'uploadedPapers',
        populate: {
          path: 'subjectId',
        }
      })
      .populate({
        path: 'savedPapers',
        populate: { path: 'subjectId' }
      })
      .select('-passwordHash')
      .lean();

    if (!updatedStudent) {
      return NextResponse.json(
        { success: false, error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        student: updatedStudent,
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
