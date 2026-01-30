import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/db';
import Paper from '@/models/Paper';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const subjectId = req.nextUrl.searchParams.get('subjectId');
    
    const query = subjectId ? { subjectId } : {};
    
    const papers = await Paper.find(query)
      .populate('subjectId')
      .sort({ year: -1 })
      .lean();

    return NextResponse.json(
      { 
        success: true,
        papers
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Get papers error:', error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
