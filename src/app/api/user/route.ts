import { NextRequest, NextResponse } from "next/server";

// app/api/user/syllabus/route.ts
export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { name: 'Student123', email: 'student@example.com' },
    { status: 200 }
  )
}
