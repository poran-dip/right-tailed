import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Subject } from '@/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const departmentId = searchParams.get('departmentId')
    
    let query = {}
    if (departmentId) query = { ...query, departmentId }
    
    const subjects = await Subject.find(query).populate('departmentId').lean()
    return NextResponse.json(
     { success: true, subjects },
     { status: 200 }
   )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subjects' },
      { status: 500 }
    )
  }
}
