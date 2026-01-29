import { NextRequest, NextResponse } from "next/server";
import { exams, achievements } from "@/lib/data";

// app/api/user/syllabus/route.ts
export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { student: { name: 'Student123', email: 'student@example.com', semester: 6, exams, achievements } },
    { status: 200 }
  )
}
