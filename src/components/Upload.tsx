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
              const file = e.target.files?.[0]
              if (file) setFileName(file.name)
            }}
          />
        </div>

        {/* Action button */}
        <button
          disabled={!fileName}
          className="mt-4 w-full h-11 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition"
        >
          Parse Questions
        </button>
      </div>
    </div>
  )
}

export default UploadModal
