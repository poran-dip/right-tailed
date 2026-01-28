'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { pyqs } from '@/lib/pyqs'

export default function PYQPage() {
  const searchParams = useSearchParams()

  const type = searchParams.get('type')
  const id = searchParams.get('id')

  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('all')

  const filteredPYQs = useMemo(() => {
    return pyqs
      .filter(p =>
        (!type || p.examType === type) &&
        (!id || p.departmentId === id)
      )
      .filter(p =>
        subject === 'all' ? true : p.subject === subject
      )
      .filter(p =>
        p.subject.toLowerCase().includes(search.toLowerCase())
      )
  }, [type, id, search, subject])

  const subjects = Array.from(
    new Set(filteredPYQs.map(p => p.subject))
  )

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Past Year Question Papers
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Filtered results based on your selection
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-600" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by subject..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            />
          </div>

          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <option value="all">All subjects</option>
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* PYQ List */}
        <div className="grid gap-6">
          {filteredPYQs.length === 0 && (
            <div className="text-center text-slate-500 py-20">
              No PYQs found.
            </div>
          )}

          {filteredPYQs.map(p => (
            <div
              key={p.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {p.subject}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Year {p.year}
                  </p>
                </div>
                <span className="text-sm px-3 py-1 rounded-full bg-purple-600/10 text-purple-600">
                  {p.questions.length} questions
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
