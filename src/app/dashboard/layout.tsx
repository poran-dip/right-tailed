'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import Sidebar from '@/components/dashboard/Sidebar'
import MobileNavbar from '@/components/dashboard/MobileNavbar'
import { DashboardProvider } from '@/contexts/DashboardContext'
import { course, paper, student } from '@/lib/types'
import { useAuthGuard } from '@/hooks/useAuthGuard'

interface StudentData {
  syllabus: course[] | null
  papers: paper[] | null
  student: student | null
  isLoading: boolean
}

const StudentDataContext = createContext<StudentData>({
  syllabus: null,
  papers: null,
  student: null,
  isLoading: true,
})

export const useStudentData = () => useContext(StudentDataContext)

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  useAuthGuard();

  const [syllabus, setSyllabus] = useState<course[] | null>(null)
  const [papers, setPapers] = useState<paper[] | null>(null)
  const [student, setStudent] = useState<student | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem('studentId')
        
        if (!studentId) {
          console.error('No student ID found in localStorage')
          setIsLoading(false)
          return
        }
        
        const userRes = await fetch(`/api/user?id=${studentId}`)
        const userData = await userRes.json()

        if (userData.success && userData.student) {
          setStudent(userData.student)
          
          // subjectIds and paperIds are already populated from your API
          setSyllabus(userData.student.subjectIds as course[])
          setPapers(userData.student.paperIds as paper[])
        }
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
        value={{ syllabus, papers, student, isLoading }}
      >
        <div className="min-h-screen flex bg-white dark:bg-slate-950">
          <Sidebar />

          <main className="flex-1 overflow-x-hidden lg:ml-58">
            <MobileNavbar />

            <div className="mt-12 lg:mt-0" /> {/* Spacer */}
            {children}
          </main>
        </div>
      </StudentDataContext.Provider>
    </DashboardProvider>
  )
}
