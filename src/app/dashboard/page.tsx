'use client'

import { useState, useRef } from 'react'
import gsap from 'gsap'
import Home from '@/components/dashboard/DashboardHome'
import { useStudentData } from './layout'

const DashboardPage = () => {
  const { syllabus, papers, isLoading } = useStudentData()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600 dark:text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30 flex">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-blue-400/5 dark:bg-blue-400/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-indigo-400/5 dark:bg-indigo-400/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="flex-1 min-w-0 overflow-x-hidden">
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
