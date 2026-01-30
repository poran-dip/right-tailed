'use client'

import { useState, useEffect } from 'react'
import { Upload, FileText, Loader2, Check, X, ChevronDown } from 'lucide-react'
import { Question, Subject } from '@/lib/types'

interface ParsedQuestion extends Omit<Question, 'topicId'> {
  topicId?: string
}

const UploadPaper = () => {
  const [studentId, setStudentId] = useState<string | null>(null)
  const [paper, setPaper] = useState<File | null>(null)
  const [questions, setQuestions] = useState<ParsedQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Form fields
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('')
  const [year, setYear] = useState<string>(new Date().getFullYear().toString())
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  useEffect(() => {
    const id = localStorage.getItem('studentId')
    if (id) {
      setStudentId(id)
      fetchSubjects()
    }
  }, [])

  useEffect(() => {
    if (selectedSubjectId) {
      const subject = subjects.find(s => s._id === selectedSubjectId)
      setSelectedSubject(subject || null)
    } else {
      setSelectedSubject(null)
    }
  }, [selectedSubjectId, subjects])

  const fetchSubjects = async () => {
    try {
      const res = await fetch('/api/subject')
      const data = await res.json()
      if (data.success) {
        setSubjects(data.subjects || [])
      }
    } catch (err) {
      console.error('Failed to fetch subjects:', err)
    }
  }

  const uploadFile = async () => {
    if (!paper) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', paper)
      formData.append("subjectId", selectedSubjectId)

      const res = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to parse PDF')
      }

      const data = await res.json()
      setQuestions(data.questions || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse PDF')
    } finally {
      setLoading(false)
    }
  }

  const handleTopicChange = (questionIndex: number, topicId: string) => {
    const updated = [...questions]
    updated[questionIndex] = { ...updated[questionIndex], topicId }
    setQuestions(updated)
  }

  const handleQuestionTextChange = (questionIndex: number, text: string) => {
    const updated = [...questions]
    updated[questionIndex] = { ...updated[questionIndex], text }
    setQuestions(updated)
  }

  const handleMarksChange = (questionIndex: number, marks: string) => {
    const updated = [...questions]
    updated[questionIndex] = { ...updated[questionIndex], marks: parseInt(marks) || 0 }
    setQuestions(updated)
  }

  const removeQuestion = (questionIndex: number) => {
    setQuestions(questions.filter((_, i) => i !== questionIndex))
  }

  const handleSave = async () => {
    if (!selectedSubjectId || !year || questions.length === 0 || !studentId) {
      setError('Please fill all fields and ensure questions are assigned topics')
      return
    }

    // Validate all questions have topics
    const hasInvalidQuestions = questions.some(q => !q.topicId)
    if (hasInvalidQuestions) {
      setError('All questions must be assigned a topic')
      return
    }

    setSaving(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch('/api/papers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: selectedSubjectId,
          year: parseInt(year),
          questions: questions.map(q => ({
            text: q.text,
            marks: q.marks,
            topicId: q.topicId,
          })),
          uploadedBy: studentId,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save paper')
      }

      setSuccess('Paper uploaded successfully!')
      
      // Reset form
      setTimeout(() => {
        setPaper(null)
        setQuestions([])
        setSelectedSubjectId('')
        setYear(new Date().getFullYear().toString())
        setSuccess(null)
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save paper')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-slate-950">
      {/* Top Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Upload Question Paper
        </h1>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Subject Select */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Subject
            </label>
            <div className="relative">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full px-3 py-2 pr-8 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* Year Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Year
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min="2000"
              max="2100"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              PDF File
            </label>
            <label
              htmlFor="paper"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 truncate"
            >
              <Upload className="h-4 w-4 shrink-0" />
              <span className="truncate">{paper ? paper.name : 'Select PDF'}</span>
            </label>
            <input
              type="file"
              id="paper"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPaper(e.target.files?.[0] ?? null)}
            />
          </div>

          {/* Analyze Button */}
          <div className="flex items-end">
            <button
              onClick={uploadFile}
              disabled={!paper || loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Parsing...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  Analyze PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
            <X className="h-4 w-4" />
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-lg">
            <Check className="h-4 w-4" />
            {success}
          </div>
        )}
      </div>

      {/* Main Workspace */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {questions.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-slate-500 dark:text-slate-400 min-h-100">
            <div className="text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">
                {loading ? 'Extracting questions...' : 'Upload a question paper to begin'}
              </p>
              <p className="text-sm mt-2">
                Select a subject, year, and PDF file, then click Analyze
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Questions Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
              {questions.map((q, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <FileText className="h-3 w-3" />
                      Question {i + 1}
                    </div>
                    <button
                      onClick={() => removeQuestion(i)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      title="Remove question"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Question Text */}
                  <textarea
                    value={q.text}
                    onChange={(e) => handleQuestionTextChange(i, e.target.value)}
                    className="w-full px-3 py-2 mb-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Question text..."
                  />

                  {/* Marks Input */}
                  <input
                    type="number"
                    value={q.marks || ''}
                    onChange={(e) => handleMarksChange(i, e.target.value)}
                    placeholder="Marks"
                    min="0"
                    className="w-full px-3 py-2 mb-3 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {/* Topic Select */}
                  <div className="relative">
                    <select
                      value={q.topicId || ''}
                      onChange={(e) => handleTopicChange(i, e.target.value)}
                      className={`w-full px-3 py-2 pr-8 text-sm rounded-lg border ${
                        q.topicId
                          ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      } text-slate-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select Topic</option>
                      {selectedSubject?.topics.map(topic => (
                        <option key={topic._id} value={topic._id}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving || !selectedSubjectId || questions.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    Save Paper ({questions.length} questions)
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UploadPaper
