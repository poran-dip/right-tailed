'use client'

import { useEffect, useRef } from 'react'
import {
  Trophy,
  Star,
  Lock,
  Sparkles,
  Target,
  BookOpen,
  Zap,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  Flame
} from 'lucide-react'
import gsap from 'gsap'
import { achievements } from '@/lib/data'

const getAchievementIcon = (name: string) => {
  const lowerName = name.toLowerCase()

  if (lowerName.includes('streak') || lowerName.includes('consistent')) return Flame
  if (lowerName.includes('perfect') || lowerName.includes('ace')) return Star
  if (lowerName.includes('speed') || lowerName.includes('fast')) return Zap
  if (lowerName.includes('early') || lowerName.includes('first')) return Clock
  if (lowerName.includes('complete') || lowerName.includes('finish')) return CheckCircle
  if (lowerName.includes('study') || lowerName.includes('learn')) return BookOpen
  if (lowerName.includes('master') || lowerName.includes('expert')) return Award
  if (lowerName.includes('improve') || lowerName.includes('progress')) return TrendingUp
  if (lowerName.includes('goal') || lowerName.includes('target')) return Target

  return Trophy
}

const getAchievementGradient = (index: number) => {
  const gradients = [
    'from-purple-500 to-purple-600',
    'from-purple-400 to-purple-600',
    'from-purple-500 via-purple-600 to-purple-700',
    'from-purple-400 via-purple-500 to-purple-600',
    'from-purple-500 to-indigo-600',
    'from-purple-600 to-fuchsia-600',
  ]
  return gradients[index % gradients.length]
}

const AchievementsPage = () => {
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)

  const unlockedCount = achievements.filter(a => a.isUnlocked).length
  const totalCount = achievements.length
  const progressPercentage = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
      }
      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1 })
      }
      if (achievementsRef.current) {
        gsap.fromTo(achievementsRef.current.children, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08 })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12 bg-linear-to-br from-white via-purple-50 to-purple-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 min-h-screen">
      
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-purple-600 via-purple-500 to-purple-600 dark:from-purple-400 dark:via-purple-500 dark:to-purple-400 bg-clip-text text-transparent">
                Achievements
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                Track your learning milestones
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {[
            { icon: Award, value: unlockedCount, label: 'Unlocked' },
            { icon: Target, value: totalCount, label: 'Total Available' },
            { icon: TrendingUp, value: `${progressPercentage.toFixed(0)}%`, label: 'Completion' },
          ].map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-800 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </div>
                  <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>

                  {i === 2 && (
                    <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" ref={achievementsRef}>
          {achievements.map((achievement, index) => {
            const Icon = getAchievementIcon(achievement.name)
            const gradient = getAchievementGradient(index)
            const isUnlocked = achievement.isUnlocked

            return (
              <div key={index} className={`group relative rounded-2xl p-6 border transition-all duration-300 ${
                isUnlocked
                  ? 'bg-white/90 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-lg hover:-translate-y-1'
                  : 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-300/50 dark:border-slate-800/50'
              } backdrop-blur-xl overflow-hidden`}>

                {isUnlocked && <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${gradient}`}></div>}

                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/5 dark:bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <Lock className="w-8 h-8 text-slate-400 dark:text-slate-600" />
                  </div>
                )}

                <div className={`${!isUnlocked ? 'opacity-40' : ''}`}>
                  <div className={`mb-4 w-14 h-14 rounded-xl flex items-center justify-center ${
                    isUnlocked ? `bg-linear-to-br ${gradient}` : 'bg-slate-200 dark:bg-slate-800'
                  }`}>
                    <Icon className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-slate-400 dark:text-slate-600'}`} />
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-slate-100">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{achievement.description}</p>

                  {isUnlocked && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50">
                      <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">Unlocked</span>
                    </div>
                  )}
                </div>

                {isUnlocked && (
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage
