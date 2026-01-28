'use client'

import { useEffect, useState, useRef } from 'react'
import { course, paper } from '@/lib/types'
import { Menu, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import Navbar from '../../components/LeftNav'
import Home from '../../components/dashboard-home'

const DashboardPage = () => {
  const [syllabus, setSyllabus] = useState<course[] | null>(null)
  const [papers, setPapers] = useState<paper[] | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('courses')
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    fetch('/api/user/syllabus')
      .then((res) => res.json())
      .then((data) => setSyllabus(data.course))
  }, [])

  useEffect(() => {
    fetch('/api/user/papers')
      .then((res) => res.json())
      .then((data) => setPapers(data.papers))
  }, [])

  const toggle = (courseName: string) => {
    const cardElement = cardsRef.current.find(
      (el) => el?.dataset.courseName === courseName
    )

    if (cardElement) {
      const topicsContainer = cardElement.querySelector('.topics-container')

      if (expanded[courseName]) {
        gsap.to(topicsContainer, {
          maxHeight: 120,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      } else {
        gsap.to(topicsContainer, {
          maxHeight: 320,
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }
    }

    setExpanded((prev) => ({
      ...prev,
      [courseName]: !prev[courseName],
    }))
  }

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index]
    if (!card) return

    if (isEntering) {
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      })
    } else {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30 flex">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Navbar Component */}
      <Navbar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden sticky top-0 z-30 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-neutral-700 px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-900 dark:text-slate-100">EduDash</span>
          </div>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Home Component */}
        <Home
          syllabus={syllabus}
          papers={papers}
          expanded={expanded}
          onToggle={toggle}
          onCardHover={handleCardHover}
          cardsRef={cardsRef}
        />
      </div>
    </div>
  )
}

export default DashboardPage