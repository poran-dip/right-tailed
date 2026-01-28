'use client'

import { useEffect, useState } from "react"
import { course, paper } from "@/lib/types"
import { ChevronDown, ChevronUp } from "lucide-react"

const DashboardPage = () => {
  const [syllabus, setSyllabus] = useState<course[] | null>(null)
  const [papers, setPapers] = useState<paper[] | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/user/syllabus')
      .then(res => res.json())
      .then(data => setSyllabus(data.course))
  }, [])

  useEffect(() => {
    fetch('/api/user/papers')
      .then(res => res.json())
      .then(data => setPapers(data.papers))
  }, [])

  const toggle = (courseName: string) => {
    setExpanded(prev => ({
      ...prev,
      [courseName]: !prev[courseName],
    }))
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Your courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {syllabus?.map(course => {
          const isOpen = expanded[course.name]

          return (
            <div
              key={course.name}
              className="rounded-2xl bg-white dark:bg-neutral-800 p-5 shadow-sm flex flex-col"
            >
              {/* header */}
              <div className="flex items-start justify-between mb-3">
                <p className="font-semibold text-lg leading-tight">
                  {course.name}
                </p>

                <button
                  onClick={() => toggle(course.name)}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isOpen ? <ChevronUp /> : <ChevronDown /> }
                </button>
              </div>

              {/* topics */}
              <div
                className={`
                  flex flex-wrap gap-2 overflow-y-auto pr-1
                  transition-all
                  ${isOpen ? 'max-h-80' : 'max-h-30'}
                `}
              >
                {course.topics.map(topic => (
                  <span
                    key={topic}
                    className="text-sm px-3 py-1 rounded-full
                      bg-blue-100 text-blue-700
                      dark:bg-blue-900/40 dark:text-blue-300"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* footer hint */}
              {!isOpen && course.topics.length > 15 && (
                <p className="mt-3 text-xs text-neutral-500">
                  + {course.topics.length - 15} more topics
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DashboardPage
