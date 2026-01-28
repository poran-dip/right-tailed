// app/api/user/syllabus/route.ts

import { NextRequest, NextResponse } from "next/server"
import { syllabus } from "@/lib/data"

export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { course: [ syllabus ] },
    { status: 200 }
  )
}
