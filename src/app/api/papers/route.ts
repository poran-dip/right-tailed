import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import { Paper, Student } from '@/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const subjectId = searchParams.get('subjectId')
    const year = searchParams.get('year')
    const uploadedBy = searchParams.get('uploadedBy')
    
    let query: any = {}
    if (subjectId) query.subjectId = subjectId
    if (year) query.year = Number(year)
    if (uploadedBy) query.uploadedBy = uploadedBy
    
    const papers = await Paper.find(query)
      .populate('subjectId', 'name departmentId topics')
      .populate('uploadedBy', 'name email')
      .populate({
        path: "subjectId",
        populate: { path: "departmentId", model: "Department" },
      })
      .sort({ year: -1, createdAt: -1 })
      .lean()
    
    return NextResponse.json(
      { success: true, papers },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET papers error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch papers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    // Validate required fields
    const { subjectId, year, questions, uploadedBy } = body
    
    if (!subjectId || !year || !questions || !uploadedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: subjectId, year, questions, uploadedBy' },
        { status: 400 }
      )
    }
    
    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Questions must be a non-empty array' },
        { status: 400 }
      )
    }
    
    // Validate each question has required fields
    const invalidQuestions = questions.filter(
      q => !q.text || !q.marks || !q.topicId
    )
    
    if (invalidQuestions.length > 0) {
      return NextResponse.json(
        { success: false, error: 'All questions must have text, marks, and topicId' },
        { status: 400 }
      )
    }
    
    // Validate year is a valid number
    const yearNum = Number(year)
    if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2100) {
      return NextResponse.json(
        { success: false, error: 'Year must be a valid number between 2000 and 2100' },
        { status: 400 }
      )
    }
    
    // Create the paper
    const paper = await Paper.create({
      subjectId,
      year: yearNum,
      questions,
      uploadedBy,
    })
    
    // Add paper to student's uploadedPapers array
    await Student.findByIdAndUpdate(
      uploadedBy,
      { $addToSet: { uploadedPapers: paper._id } }
    )
    
    // Populate the paper before returning
    const populatedPaper = await Paper.findById(paper._id)
      .populate('subjectId', 'name departmentId topics')
      .populate('uploadedBy', 'name email')
      .lean()
    
    return NextResponse.json(
      { success: true, paper: populatedPaper },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('POST paper error:', error)
    
    // Handle duplicate paper error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'A paper for this subject and year already exists' },
        { status: 409 }
      )
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create paper' },
      { status: 500 }
    )
  }
}
