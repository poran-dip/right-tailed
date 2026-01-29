'use client'

import { useEffect, useState, useRef } from 'react'
import { course, paper } from '@/lib/types'
import { Menu, BookOpen } from 'lucide-react'
import gsap from 'gsap'
<<<<<<< HEAD
import Home from '@/components/dashboard/Home'
=======
import Home from '@/components/dashboard/DashboardHome'
import { useDashboard } from '@/contexts/DashboardContext'
>>>>>>> 8ef1465c6bc746f4044db3c8704def856190c14b

const DashboardPage = () => {
  const [syllabus, setSyllabus] = useState<course[] | null>(null)
  const [papers, setPapers] = useState<paper[] | null>(null)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  // Get sidebar controls from context
  const { toggleSidebar } = useDashboard()

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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30 flex">
<<<<<<< HEAD
=======
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        {/* Home Component */}
>>>>>>> 8ef1465c6bc746f4044db3c8704def856190c14b
        <Home
          syllabus={syllabus}
          papers={papers}
          expanded={expanded}
          onToggle={toggle}
          onCardHover={handleCardHover}
          cardsRef={cardsRef}
        />
    </div>
  )
}

export default DashboardPage
