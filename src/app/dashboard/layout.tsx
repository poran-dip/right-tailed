'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MobileNavbar from '@/components/dashboard/MobileNavbar'
import { DashboardProvider } from '@/contexts/DashboardContext'
import { course, paper } from '@/lib/types'

interface StudentData {
  syllabus: course[] | null
  papers: paper[] | null
  studentName: string | null
  studentEmail: string | null
  isLoading: boolean
}

const StudentDataContext = createContext<StudentData>({
  syllabus: null,
  papers: null,
  studentName: null,
  studentEmail: null,
  isLoading: true,
})

export const useStudentData = () => useContext(StudentDataContext)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [syllabus, setSyllabus] = useState<course[] | null>(null)
  const [papers, setPapers] = useState<paper[] | null>(null)
  const [studentName, setStudentName] = useState<string | null>(null)
  const [studentEmail, setStudentEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [syllabusRes, papersRes, userRes] = await Promise.all([
          fetch('/api/user/syllabus'),
          fetch('/api/user/papers'),
          fetch('/api/user')
        ])

        const syllabusData = await syllabusRes.json()
        const papersData = await papersRes.json()
        const userData = await userRes.json()

        setSyllabus(syllabusData.course)
        setPapers(papersData.papers)
        setStudentName(userData.name)
        setStudentEmail(userData.email)
      } catch (error) {
        console.error('Failed to fetch student data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DashboardProvider>
      <StudentDataContext.Provider
        value={{ syllabus, papers, studentName, studentEmail, isLoading }}
      >
        <div className="min-h-screen flex bg-white dark:bg-slate-950">
          <Sidebar />

          <main className="flex-1 overflow-x-hidden">
            <MobileNavbar />
            {children}
          </main>
        </div>
      </StudentDataContext.Provider>
    </DashboardProvider>
  )
}
