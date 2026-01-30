'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, Sparkles, BookOpen, Layers } from 'lucide-react'
import { ISubject, IPaper } from '@/lib/db.types'
import gsap from 'gsap'

interface HomeProps {
  syllabus: ISubject[] | null
  papers: IPaper[] | null
  expanded: Record<string, boolean>
  onToggle: (courseName: string) => void
  onCardHover: (index: number, isEntering: boolean) => void
  cardsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
}

const Home = ({ syllabus, papers, expanded, onToggle, onCardHover, cardsRef }: HomeProps) => {
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const totalTopics = syllabus?.reduce((acc, course) => acc + course.topics.length, 0) || 0

  useEffect(() => {
    if (!syllabus) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      if (statsRef.current) {
        gsap.from(statsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
        })
      }

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.7,
            delay: 0.3 + index * 0.08,
            ease: 'power3.out',
          })
        }
      })
    })

    return () => ctx.revert()
  }, [syllabus, cardsRef])

  return (
    <div className="w-full px-5 sm:px-6 py-8 sm:py-12">
      <div ref={headerRef} className="mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-violet-700 via-violet-800 to-purple-900 dark:from-slate-100 dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
            Your courses
          </h1>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg ml-0 ">
          Explore your curriculum and track your progress
        </p>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 max-w-7xl mx-auto">
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {syllabus?.length || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {totalTopics}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Topics Covered</p>
            </div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-200/50 dark:border-neutral-700/50 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {papers?.length || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Papers Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {syllabus?.map((course, index) => {
          const isOpen = expanded[course.name]
          const displayTopics = isOpen ? course.topics : course.topics.slice(0, 15)

          return (
            <div
              key={course.name}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              data-course-name={course.name}
              onMouseEnter={() => onCardHover(index, true)}
              onMouseLeave={() => onCardHover(index, false)}
              className="group rounded-3xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg shadow-slate-200/20 dark:shadow-neutral-900/20 flex flex-col transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-300/30 dark:hover:shadow-neutral-800/30">
              <div className="flex items-start justify-between mb-5">
                <div className="flex-1">
                  <h3 className="font-bold text-xl leading-tight text-slate-900 dark:text-slate-100 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{course.topics.length} topics</span>
                  </div>
                </div>

                <button onClick={() => onToggle(course.name)} className="shrink-0 w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-180">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="h-px bg-linear-to-r from-transparent via-slate-300 dark:via-neutral-600 to-transparent mb-5"></div>

              <div className="topics-container flex flex-wrap gap-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent" style={{ maxHeight: isOpen ? 320 : 120 }}>
                {displayTopics.map((topic, topicIndex) => (
                  <span key={topicIndex} className="text-sm px-4 py-2 rounded-full font-medium bg-linear-to-br from-blue-100 to-indigo-100 text-blue-800 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-default"> {topic.name}</span>
                ))}
              </div>
              {!isOpen && course.topics.length > 15 && (
                <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-neutral-700/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    + {course.topics.length - 15} more topics
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home