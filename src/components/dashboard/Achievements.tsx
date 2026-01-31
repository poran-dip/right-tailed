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
    'from-amber-400 via-yellow-500 to-orange-500',
    'from-blue-400 via-cyan-500 to-teal-500',
    'from-purple-400 via-pink-500 to-rose-500',
    'from-emerald-400 via-green-500 to-teal-500',
    'from-orange-400 via-red-500 to-pink-500',
    'from-indigo-400 via-purple-500 to-pink-500',
    'from-cyan-400 via-blue-500 to-indigo-500',
    'from-lime-400 via-green-500 to-emerald-500',
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
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
        )
      }

      // Animate stats
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { scale: 0.8, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: 'back.out(1.7)' 
          }
        )
      }

      // Animate achievement cards
      if (achievementsRef.current) {
        gsap.fromTo(
          achievementsRef.current.children,
          { y: 50, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.7, 
            stagger: 0.08, 
            delay: 0.3, 
            ease: 'power3.out' 
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full px-4 sm:px-6 py-8 sm:py-12 bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-neutral-950 dark:via-blue-950/20 dark:to-indigo-950/30 min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-150 h-150 bg-amber-400/5 dark:bg-amber-400/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-purple-400/5 dark:bg-purple-400/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-slate-900 via-amber-900 to-orange-900 dark:from-slate-100 dark:via-amber-100 dark:to-orange-100 bg-clip-text text-transparent">
                Achievements
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                Track your learning milestones
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {/* Total Unlocked */}
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {unlockedCount}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Unlocked</p>
            </div>
          </div>

          {/* Total Achievements */}
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {totalCount}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Total Available</p>
            </div>
          </div>

          {/* Completion Percentage */}
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-neutral-700/50 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {progressPercentage.toFixed(0)}%
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Completion</p>
              
              {/* Progress bar */}
              <div className="mt-4 h-2 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              All Achievements
            </h2>
          </div>

          {achievements.length > 0 ? (
            <div 
              ref={achievementsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {achievements.map((achievement, index) => {
                const Icon = getAchievementIcon(achievement.name)
                const gradient = getAchievementGradient(index)
                const isUnlocked = achievement.isUnlocked

                return (
                  <div
                    key={index}
                    className={`group relative rounded-2xl p-6 border transition-all duration-300 ${
                      isUnlocked
                        ? 'bg-white/80 dark:bg-neutral-900/80 border-slate-200 dark:border-neutral-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
                        : 'bg-slate-100/50 dark:bg-neutral-900/30 border-slate-300/50 dark:border-neutral-800/50'
                    } backdrop-blur-xl overflow-hidden`}
                  >
                    {/* Decorative gradient background for unlocked achievements */}
                    {isUnlocked && (
                      <div className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r ${gradient}`}></div>
                    )}

                    {/* Lock overlay for locked achievements */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-slate-900/5 dark:bg-neutral-950/40 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-neutral-800 flex items-center justify-center shadow-lg">
                          <Lock className="w-8 h-8 text-slate-400 dark:text-neutral-600" />
                        </div>
                      </div>
                    )}

                    <div className={`relative ${!isUnlocked ? 'opacity-40' : ''}`}>
                      {/* Icon */}
                      <div className={`mb-4 w-14 h-14 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? `bg-linear-to-br ${gradient} shadow-lg`
                          : 'bg-slate-200 dark:bg-neutral-800'
                      }`}>
                        <Icon className={`w-7 h-7 ${isUnlocked ? 'text-white' : 'text-slate-400 dark:text-neutral-600'}`} />
                      </div>

                      {/* Achievement Info */}
                      <h3 className={`text-lg font-bold mb-2 ${
                        isUnlocked 
                          ? 'text-slate-900 dark:text-slate-100' 
                          : 'text-slate-600 dark:text-slate-500'
                      }`}>
                        {achievement.name}
                      </h3>
                      
                      <p className={`text-sm leading-relaxed ${
                        isUnlocked
                          ? 'text-slate-600 dark:text-slate-400'
                          : 'text-slate-500 dark:text-slate-600'
                      }`}>
                        {achievement.description}
                      </p>

                      {/* Unlocked badge */}
                      {isUnlocked && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50">
                          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            Unlocked
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Sparkle effect on hover for unlocked achievements */}
                    {isUnlocked && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-neutral-700/50">
              <Trophy className="w-16 h-16 text-slate-300 dark:text-neutral-700 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No achievements yet. Start studying to unlock them!
              </p>
            </div>
          )}
        </div>

        {/* Motivational Footer */}
        {totalCount > 0 && unlockedCount < totalCount && (
          <div className="bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Zap className="w-9 h-9" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-2xl font-bold mb-2">Keep Going!</h3>
                <p className="text-indigo-100">
                  {totalCount - unlockedCount} {totalCount - unlockedCount === 1 ? 'achievement' : 'achievements'} left to unlock. 
                  Every study session brings you closer to mastery.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Message for 100% completion */}
        {totalCount > 0 && unlockedCount === totalCount && (
          <div className="bg-linear-to-br from-amber-400 via-orange-500 to-rose-500 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <div className="relative flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 animate-bounce">
                <Trophy className="w-11 h-11" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-3xl font-bold mb-2">🎉 Master Achiever!</h3>
                <p className="text-amber-100 text-lg">
                  Incredible! You've unlocked all achievements. You're a true champion!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AchievementsPage
