import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import Subject from '@/models/Subject';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const subjects = await Subject.find({}).sort({ name: 1 }).lean();

    return NextResponse.json(
      { 
        success: true,
        subjects
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get subjects error:', error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
