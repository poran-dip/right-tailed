'use client'

import { Loader2, Sparkles } from 'lucide-react'
import { useStudentData } from './layout'
import DashboardHome from '@/components/dashboard/DashboardHome'

const DashboardPage = () => {
  const { student, isLoading } = useStudentData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="flex flex-col items-center gap-6 text-center">
          
          {/* Icon Stack */}
          <div className="relative flex items-center justify-center">
            {/* Rotating outer loader */}
            <Loader2 className="w-14 h-14 text-slate-400/40 animate-spin" />

            {/* Pulsing center icon */}
            <Sparkles className="absolute w-8 h-8 text-indigo-500 dark:text-indigo-400 animate-pulse" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-slate-700 dark:text-slate-200 animate-pulse">
              Loading your experience...
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Preparing everything behind the scenes
            </p>
          </div>

          {/* Subtle progress illusion */}
          <div className="w-48 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-2">
            <div className="h-full w-1/2 bg-indigo-500 animate-[progress_1.5s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Custom keyframes */}
        <style jsx>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(50%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
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
