'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Subject, Paper, Exam, Department } from '@/lib/types'
import { Settings, BookOpen, FileText, CalendarDays, Save } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [studentId, setStudentId] = useState('')
  const router = useRouter()

  useEffect(() => {
    const storedId = localStorage.getItem('studentId')
    if (!storedId) router.push('/')
    else setStudentId(storedId)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    semester: '',
    departmentId: '',
  })

  const [allDepartments, setAllDepartments] = useState<Department[]>([])
  const [allSubjects, setAllSubjects] = useState<Subject[]>([])
  const [allPapers, setAllPapers] = useState<Paper[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedPapers, setSelectedPapers] = useState<string[]>([])
  const [exams, setExams] = useState<Exam[]>([])

  useEffect(() => {
    if (!studentId) return
    fetchStudentData()
    fetchAllSubjects()
    fetchAllPapers()
    fetchAllDepartments()
  }, [studentId])

  const inputStyle =
    'w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 transition'

  const cardStyle =
    'bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg'

  const fetchStudentData = async () => {
    try {
      const res = await fetch(`/api/user?id=${studentId}`)
      const data = await res.json()
      if (data.success) {
        const student = data.student
        setFormData({
          name: student.name,
          email: student.email,
          semester: student.semester?.toString() || '',
          departmentId: student.departmentId?._id || student.departmentId || '',
        })
        setSelectedSubjects(student.currentSubjects.map((s: Subject) => s._id))
        setSelectedPapers(student.savedPapers.map((p: Paper) => p._id))
        setExams(student.upcomingExams || [])
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchAllSubjects = async () => {
    const res = await fetch('/api/subject')
    const data = await res.json()
    if (data.success) setAllSubjects(data.subjects || [])
  }

  const fetchAllPapers = async () => {
    const res = await fetch('/api/papers')
    const data = await res.json()
    if (data.success) setAllPapers(data.papers || [])
  }

  const fetchAllDepartments = async () => {
    const res = await fetch('/api/departments')
    const data = await res.json()
    if (data.success) setAllDepartments(data.departments || [])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/user?id=${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          semester: formData.semester ? parseInt(formData.semester) : undefined,
          currentSubjects: selectedSubjects,
          savedPapers: selectedPapers,
          upcomingExams: exams.filter(e => e.subjectId && e.dateTime),
        }),
      })
      const data = await res.json()
      if (data.success) setSuccess('Settings updated successfully!')
      else setError(data.error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-purple-50 to-purple-100 dark:from-slate-900">
        <div className="animate-pulse text-purple-600 text-lg font-medium">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white via-purple-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 px-4 sm:px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Settings className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>

        {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>}
        {success && <div className="text-purple-700 bg-purple-100 p-3 rounded-lg">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* BASIC INFO */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-5">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input className={inputStyle} placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              <input className={inputStyle} placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              <input className={inputStyle} type="number" placeholder="Semester" value={formData.semester} onChange={e => setFormData({ ...formData, semester: e.target.value })} />
              <select className={inputStyle} value={formData.departmentId} onChange={e => setFormData({ ...formData, departmentId: e.target.value })}>
                <option value="">Select Department</option>
                {allDepartments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
              </select>
            </div>
          </div>

          {/* SUBJECTS */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2"><BookOpen /> Subjects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {allSubjects.map(s => (
                <label key={s._id} className="flex items-center gap-2 bg-purple-50 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={selectedSubjects.includes(s._id)} onChange={() =>
                    setSelectedSubjects(prev => prev.includes(s._id) ? prev.filter(id => id !== s._id) : [...prev, s._id])
                  } />
                  {s.name}
                </label>
              ))}
            </div>
          </div>

          {/* PAPERS */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2"><FileText /> Papers</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {allPapers.map(p => (
                <label key={p._id} className="flex items-center gap-2 bg-purple-50 dark:bg-slate-800 p-2 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={selectedPapers.includes(p._id)} onChange={() =>
                    setSelectedPapers(prev => prev.includes(p._id) ? prev.filter(id => id !== p._id) : [...prev, p._id])
                  } />
                  Year {p.year}
                </label>
              ))}
            </div>
          </div>

          {/* EXAMS */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-5 flex items-center gap-2"><CalendarDays /> Upcoming Exams</h2>
            <div className="space-y-3">
              {exams.map((exam, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-3">
                  <select className={inputStyle} value={exam.subjectId} onChange={e => {
                    const updated = [...exams]; updated[i].subjectId = e.target.value; setExams(updated)
                  }}>
                    <option value="">Select Subject</option>
                    {selectedSubjects.map(id => {
                      const sub = allSubjects.find(s => s._id === id)
                      return sub && <option key={id} value={id}>{sub.name}</option>
                    })}
                  </select>
                  <input type="datetime-local" className={inputStyle} value={exam.dateTime} onChange={e => {
                    const updated = [...exams]; updated[i].dateTime = e.target.value; setExams(updated)
                  }} />
                  <button type="button" onClick={() => setExams(exams.filter((_, idx) => idx !== i))}
                    className="bg-red-600 text-white cursor-pointer rounded-lg hover:bg-red-700 transition">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:scale-105 transition disabled:opacity-50">
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
