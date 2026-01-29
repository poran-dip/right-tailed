'use client'

import { useEffect, useState, useRef } from 'react'
import { course, paper } from '@/lib/types'
import { Menu, BookOpen } from 'lucide-react'
import gsap from 'gsap'
import Home from '@/components/dashboard/Home'

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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30 flex">
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