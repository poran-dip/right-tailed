'use client'

import { Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface UploadModalProps {
  open: boolean
  onClose: () => void
}

const UploadModal = ({ open, onClose }: UploadModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadPDFfunction = async () => {
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      // Create FormData to send the file
      const formData = new FormData()
      formData.append('pdf', file)
      
      // You can add additional metadata
      formData.append('fileName', file.name)
      formData.append('fileSize', file.size.toString())

      // Send to API route
      const response = await fetch('/api/upload-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      console.log('Upload successful:', data)

      // Handle success
      alert('PDF uploaded successfully!')//TODO: SHOULD BE A BETTER UI THINGY THAT POPS UP SHIVAYAN IF YOU CAN HANDLE THIS
      onClose()
      
      // Reset state
      setFile(null)
      setFileName(null)
      if (inputRef.current) inputRef.current.value = ''

    } catch (err) {
      console.error('Upload error:', err)
      setError('Failed to upload PDF. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg mx-4 rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Upload PYQ
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 cursor-pointer hover:text-slate-800 dark:hover:text-white text-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Dropzone */}
        <div
          onClick={() => inputRef.current?.click()}
          className="relative cursor-pointer border-2 border-dashed border-slate-300 dark:border-neutral-700 rounded-xl p-6 text-center transition hover:border-purple-500 hover:bg-purple-50/30 dark:hover:bg-purple-500/10"
        >
          {/* Remove file button */}
          {fileName && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setFileName(null)
                setFile(null)
                setError(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
              className="absolute top-2 cursor-pointer right-2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-200 dark:bg-neutral-700 text-slate-600 dark:text-slate-300 hover:bg-gray-300 hover:text-white transition"
              aria-label="Remove selected file"
            >
              ✕
            </button>
          )}

          <Upload className="mx-auto mb-2 text-purple-500" />

          <p className="text-sm text-slate-600 dark:text-slate-400">
            {fileName ? 'Selected file' : 'Click to upload a text-based PDF'}
          </p>

          {fileName && (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 truncate">
              {fileName}
            </p>
          )}

          {/* Hidden file input */}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0]
              if (selectedFile) {
                // Validate file size (e.g., max 10MB)
                if (selectedFile.size > 10 * 1024 * 1024) {
                  setError('File size must be less than 10MB')
                  return
                }
                
                setFileName(selectedFile.name)
                setFile(selectedFile)
                setError(null)
              }
            }}
          />
        </div>

        {/* Action button */}
        <button
          disabled={!fileName || uploading}
          className="mt-4 w-full h-11 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
          onClick={uploadPDFfunction}
        >
          {uploading ? 'Uploading...' : 'Parse Questions'}
        </button>
      </div>
    </div>
  )
}

export default UploadModal