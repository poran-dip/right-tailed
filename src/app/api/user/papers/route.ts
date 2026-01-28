// app/api/user/papers/route.ts

import { NextRequest, NextResponse } from "next/server"
import { questionPaper2025 } from "@/lib/data"

export async function GET(_req: NextRequest) {
  return NextResponse.json(
    { papers: [ questionPaper2025 ] },
    { status: 200 }
  )
}
