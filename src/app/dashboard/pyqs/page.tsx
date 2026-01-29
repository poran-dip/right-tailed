'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { pyqs } from '@/lib/pyqs'

function PYQContent() {
  const searchParams = useSearchParams()

  // URL params (optional, fallback only)
  const initialDept = searchParams.get('department') || 'all'
  const initialType = searchParams.get('type')

  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState(initialDept)
  const [subject, setSubject] = useState('all')

  // All departments
  const departments = useMemo(() => {
    return Array.from(new Set(pyqs.map(p => p.departmentId)))
  }, [])

  // Subjects based on department
  const subjects = useMemo(() => {
    return Array.from(
      new Set(
        pyqs
          .filter(p => department === 'all' || p.departmentId === department)
          .map(p => p.subject)
      )
    )
  }, [department])

  // Final filtered list
  const filteredPYQs = useMemo(() => {
    return pyqs
      .filter(p =>
        initialType ? p.examType === initialType : true
      )
      .filter(p =>
        department === 'all' ? true : p.departmentId === department
      )
      .filter(p =>
        subject === 'all' ? true : p.subject === subject
      )
      .filter(p =>
        p.subject.toLowerCase().includes(search.toLowerCase())
      )
  }, [initialType, department, subject, search])

  return (
    <div className="px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Past Year Question Papers
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Filter by department and subject
          </p>
        </div>

        <div className="flex justify-between gap-4">

          <div className="relative w-[50vw]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subject..."
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            />
          </div>

          <select
            value={department}
            onChange={e => {
              setDepartment(e.target.value)
              setSubject('all')
            }}
            className="text-center px-5 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <option value="all">All departments</option>
            {departments.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="text-center py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <option value="all">All subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-6">
          {filteredPYQs.length === 0 && (
            <div className="text-center text-slate-500 py-20">
              No PYQs found
            </div>
          )}

          {filteredPYQs.map(p => (
            <div
              key={p.id}
              className="rounded-2xl w-fit dark:border dark:border-slate-800 px-6 py-4 bg-linear-to-br from-purple-600 via-purple-400 to-purple-600 text-white shadow-xl shadow-purple-500/25"
            >
              <div className="flex flex-col justify-between items-start">
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {p.subject}
                    </h3>
                    <p className="text-sm text-white/70">
                      {p.departmentId} • Year {p.year}
                    </p>
                  </div>

                  <span className="text-sm px-3 py-1 rounded-full bg-white text-purple-600 ml-5">
                    {p.questions.length} questions
                  </span>
                </div>

                <div className='w-full mt-3'>
                  <p className='text-right font-semibold cursor-pointer hover:text-purple-100 hover:scale-[1.01] transition-all duration-300'>View paper {'>'} </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default function PYQPage() {
  return (
    <Suspense fallback={
      <div className="p-10 text-center text-slate-500">
        Loading PYQs…
      </div>
    }>
      <PYQContent />
    </Suspense>
  )
}
