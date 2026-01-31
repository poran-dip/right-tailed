'use client'

import { useEffect, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  BookOpen,
  Layers,
  TrendingUp,
  Upload,
  Play,
  FileText,
  Calendar,
  Award,
  Send
} from 'lucide-react'
import { Subject, Paper, Student, StudentPopulated, PaperPopulated } from '@/lib/types'
import gsap from 'gsap'
import { useState } from 'react'
import UploadModal from '../Upload'

interface HomeProps {
  syllabus: Subject[] | null
  papers: PaperPopulated[] | null
  student: StudentPopulated | null
}

interface TopicROI {
  topic: string
  frequency: number
  avgMarks: number
  roi: number
}

const DashboardHome = ({ syllabus, papers, student }: HomeProps) => {
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const coursesRef = useRef<HTMLDivElement>(null)
  const papersRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  const [showUploadModal, setShowUploadModal] = useState(false)


  const uploadPDFfunction=()=>{
    
  }

  // Calculate topic ROI for each course
  const courseROIData = useMemo(() => {
    if (!syllabus || !papers) return {}

    const data: Record<string, TopicROI[]> = {}

    syllabus.forEach((course) => {
      const topicStats: Record<string, { totalMarks: number; count: number }> = {}

      // Get all questions for this course
      papers
        .filter((paper) => paper.subjectId?._id?.toString() === course._id?.toString())
        .forEach((paper) => {
          paper.questions.forEach((q) => {
            // Find the topic name from the course's topics array using topicId
            const topic = course.topics.find(t => t._id?.toString() === q.topicId.toString())
            const topicName = topic?.name || 'Unknown'
            
            if (!topicStats[topicName]) {
              topicStats[topicName] = { totalMarks: 0, count: 0 }
            }
            topicStats[topicName].totalMarks += q.marks
            topicStats[topicName].count += 1
          })
        })

      // Calculate ROI for each topic
      const topicROIs: TopicROI[] = Object.entries(topicStats).map(
        ([topic, stats]) => ({
          topic,
          frequency: stats.count,
          avgMarks: stats.totalMarks / stats.count,
          roi: stats.count * (stats.totalMarks / stats.count), // frequency × avg marks
        })
      )

      // Sort by ROI and get top 3
      data[course.name] = topicROIs.sort((a, b) => b.roi - a.roi).slice(0, 3)
    })

    return data
  }, [syllabus, papers])

  const totalTopics = syllabus?.reduce((acc, course) => acc + course.topics.length, 0) || 0

  const getNextExam = () => {
    if (!student?.upcomingExams || student.upcomingExams.length === 0) return null

    const now = new Date()
    const upcomingExams = student.upcomingExams
      .map(exam => {
        // Find the subject name from syllabus
        const subject = syllabus?.find(s => s._id === exam.subjectId)
        return {
          ...exam,
          dateTime: new Date(exam.dateTime),
          course: subject?.name || 'Unknown Subject' // Add course name for display
        }
      })

    return upcomingExams[0] || null
  }

  const nextExam = getNextExam()

  const getTimeUntilExam = (examDate: Date) => {
    const now = new Date()
    const diff = examDate.getTime() - now.getTime()

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`
    return 'Soon'
  }

  useEffect(() => {
    if (!syllabus) return

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
      }

      // Animate stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        )
      }

      // Animate courses
      if (coursesRef.current) {
        gsap.fromTo(
          coursesRef.current.children,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, delay: 0.3, ease: 'power3.out' }
        )
      }

      // Animate papers
      if (papersRef.current) {
        gsap.fromTo(
          papersRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.5, ease: 'power2.out' }
        )
      }

      // Animate action buttons
      if (actionsRef.current) {
        gsap.set(actionsRef.current, {
          opacity: 0,
          y: 20,
        });

        gsap.to(actionsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    })

    return () => ctx.revert()
  }, [syllabus])

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <div ref={headerRef} className="mb-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold bg-linear-to-r from-purple-800 via-purple-600 to-purple-800 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-2">
              Welcome back, {student?.name?.split(' ')[0] || 'Student'}!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Semester {student?.semester || 'N/A'} • Ready to ace your exams?
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Exam Alert */}
      {nextExam && (
        <div className="mb-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-linear-to-br from-purple-600 via-purple-400 to-purple-600 rounded-2xl p-6 shadow-xl shadow-purple-500/30">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent"></div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start gap-4 w-full sm:w-auto">
                <div className="hidden sm:flex w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-white/20 backdrop-blur-sm items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-xl font-bold">Upcoming Exam</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm text-xs font-semibold">
                      {getTimeUntilExam(new Date(nextExam.dateTime))}
                    </span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold mb-1">{nextExam.course}</p>
                  <p className="text-white/90 text-sm">
                    {new Date(nextExam.dateTime).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {' • '}
                    {new Date(nextExam.dateTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push(`/dashboard/courses/${encodeURIComponent(nextExam.course)}`)}
                className="group w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-white/90 transition-all duration-300 cursor-pointer hover:scale-[1.02] flex items-center gap-2 shadow-lg"
              >
                <Send className="w-4 sm:w-5 h-4 sm:h-5 mt-0.5" />
                Start Studying
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Pulse effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div
        ref={statsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-7xl mx-auto"
      >
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {syllabus?.length || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {totalTopics}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Topics</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {papers?.length || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Papers</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {papers?.reduce((sum, p) => sum + p.questions.length, 0) || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div ref={actionsRef} className="flex justify-between gap-4 mb-10 max-w-7xl mx-auto">
        <div className="w-[50%] flex flex-col transition-all duration-300 relative overflow-hidden border border-purple-600/20 dark:border-purple-500/70 dark:text-white hover:bg-purple-50/5 text-black rounded-2xl p-3 sm:p-6">
          <div className=" flex items-center gap-4">
            <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-purple-500 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <Upload className="w-5 sm:w-7 h-5 sm:h-7" />
            </div>
            <div className="text-left">
              <h3 className="text-base sm:text-xl font-bold mb-1">Upload PYQ</h3>
              <p className="text-black/70 dark:text-white/70 text-sm">Add past year questions to expand the database</p>
            </div>
          </div>
          <button onClick={() => setShowUploadModal(true)} className="group w-1/2 ml-auto mt-5 cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-purple-500/50 bg-purple-500 font-semibold px-10 rounded-md text-white h-10 flex items-center justify-center gap-2">
            Upload PYQs
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
              →
            </span>
          </button>

        </div>

        <div className="w-[50%] flex flex-col relative overflow-hidden dark:text-white transition-all duration-300 hover:bg-purple-50/5 border border-purple-600/20 dark:border-purple-500/70 text-black rounded-2xl p-3 sm:p-6">
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-purple-500 text-white backdrop-blur-sm flex items-center justify-center shrink-0">
              <Play className="w-5 sm:w-7 h-5 sm:h-7" />
            </div>
            <div className="text-left">
              <h3 className="text-base sm:text-xl font-bold mb-1">Take Mock Test</h3>
              <p className="text-black/80 dark:text-white/80 text-sm">Practice with AI-generated questions</p>
            </div>
          </div>
          <button onClick={() => router.push('/dashboard/mock-test')} className="group w-1/2 ml-auto mt-5 font-semibold  cursor-pointer transition-all duration-300 hover:shadow-md hover:shadow-purple-500/50 bg-purple-500 px-10 rounded-md text-white h-10 flex items-center justify-center gap-2">
            Take mock tests
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
              →
            </span>
          </button>

        </div>
      </div>

      {/* Current Semester Courses */}
      <div className="mb-10 max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
              Your Courses
            </h2>
          </div>

          <span className="text-sm text-slate-600 dark:text-slate-400 sm:ml-2">
            <span className="hidden sm:inline">• </span>Top ROI Topics
          </span>
        </div>

        <div
          ref={coursesRef}
          className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5"
        >
          {syllabus?.map((course) => {
            const topTopics = courseROIData[course.name] || []

            return (
              <button
                key={course.name}
                onClick={() => router.push(`/dashboard/courses/${encodeURIComponent(course.name)}`)}
                className="group text-left rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg shadow-slate-200/20 dark:shadow-neutral-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-300/30 dark:hover:shadow-neutral-800/30 hover:-translate-y-1"
              >
                {/* Course Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl leading-tight text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Sparkles className="w-4 h-4" />
                      <span>{course.topics.length} topics</span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-linear-to-r from-transparent via-slate-300 dark:via-neutral-600 to-transparent mb-4"></div>

                {/* Top ROI Topics */}
                {topTopics.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                      <TrendingUp className="w-3.5 h-3.5" />
                      High Priority Topics
                    </div>
                    {topTopics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl p-3 border border-blue-200/50 dark:border-blue-800/30"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                            {topic.topic}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {topic.frequency}× • avg {topic.avgMarks.toFixed(1)} marks
                          </p>
                        </div>
                        <div className="ml-3 px-2.5 py-1 rounded-lg bg-blue-600 dark:bg-blue-500 text-white text-xs font-bold">
                          {topic.roi.toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                    No question data available yet
                  </p>
                )}

                {/* View Details Hint */}
                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-neutral-700/50">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                    View all topics
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Papers */}
      <div ref={papersRef} className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Available Papers
          </h2>
        </div>

        <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg">
          {papers && papers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {papers.slice(0, 6).map((paper, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    // Find subject name from syllabus
                    const subject = syllabus?.find(s => s._id === paper.subjectId?._id)
                    router.push(`/dashboard/papers/${encodeURIComponent(subject?.name || '')}/${paper.year}`)
                  }}
                  className="group text-left p-4 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 dark:from-neutral-800 dark:to-neutral-950 border border-slate-200 dark:border-neutral-700 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {syllabus?.find(s => s._id === paper.subjectId?._id)?.name || 'Unknown Subject'}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Year {paper.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {paper.questions.length} questions
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 dark:text-slate-400 py-8">
              No papers available yet. Upload your first PYQ to get started!
            </p>
          )}

          {papers && papers.length > 6 && (
            <button
              onClick={() => router.push('/dashboard/papers')}
              className="mt-6 w-full py-3 rounded-xl bg-linear-to-r from-slate-100 to-slate-200 dark:from-neutral-800 dark:to-neutral-700 text-slate-700 dark:text-slate-300 font-medium hover:from-slate-200 hover:to-slate-300 dark:hover:from-neutral-700 dark:hover:to-neutral-600 transition-all duration-300"
            >
              View all {papers.length} papers →
            </button>
          )}
        </div>
      </div>
      
      <UploadModal open={showUploadModal} onClose={() => setShowUploadModal(false)}/>

    </div>
  )
}

export default DashboardHome
