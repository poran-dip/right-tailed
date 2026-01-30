import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Department } from '@/models'

export async function GET() {
  try {
    await dbConnect()
    const departments = await Department.find().lean()
    return NextResponse.json(
      { success: true, departments },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}
