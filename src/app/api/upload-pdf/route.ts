// app/api/upload-pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'File must be a PDF' }, { status: 400 })
    }

    const MAX_FILE_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Get arrayBuffer
    const bytes = await file.arrayBuffer()
    
    // Clone the arrayBuffer to prevent detachment
    const clonedBytes = bytes.slice(0)
    
    // Create uint8Array for parsing
    const uint8ArrayForParsing = new Uint8Array(bytes)
    
    // Create buffer for saving (from cloned bytes)
    const bufferForSaving = Buffer.from(clonedBytes)

    let textContent = ''
    let pageCount = 0

    try {
      const { getDocumentProxy } = await import('unpdf')
      
      const pdf = await getDocumentProxy(uint8ArrayForParsing)
      pageCount = pdf.numPages
      
      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i)
        const content = await page.getTextContent()
        const pageText = content.items.map((item: any) => item.str).join(' ')
        textContent += pageText + '\n\n'
      }

      console.log(` PDF parsed: ${pageCount} pages, ${textContent.length} characters`)
    } catch (parseError) {
      console.error('PDF parsing failed:', parseError)
    }

    // Save file using the cloned buffer
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${uniqueSuffix}-${sanitizedName}`
    const filepath = path.join(uploadDir, filename)

    await writeFile(filepath, bufferForSaving)

    console.log(' File saved:', filename)

    return NextResponse.json({
      success: true,
      filename: filename,
      filepath: `/uploads/${filename}`,
      size: file.size,
      originalName: file.name,
      pages: pageCount,
      textContent: textContent || null,
      preview: textContent ? textContent.substring(0, 500) : null,
      message: 'PDF uploaded and parsed successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST to upload PDFs',
    endpoint: '/api/upload-pdf'
  })
}