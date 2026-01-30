'use client'

import { useStudentData } from './layout'
import DashboardHome from '@/components/dashboard/DashboardHome'

const DashboardPage = () => {
  const { student, isLoading } = useStudentData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative">
        <DashboardHome 
          syllabus={student?.currentSubjects || null} 
          papers={student?.uploadedPapers || null} 
          student={student} 
        />
      </div>
    </div>
  )
}

export default DashboardPage
