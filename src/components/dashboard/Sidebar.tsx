'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Home,
  BookOpen,
  FileText,
  Trophy,
  Settings,
  User,
  LogOut,
  X,
} from 'lucide-react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'
import { useDashboard } from '@/contexts/DashboardContext'
import ThemeToggle from '@/components/ThemeToggle'
import { useStudentData } from '@/app/dashboard/layout'


const Sidebar = () => {
  const router = useRouter()
  const { student } = useStudentData()
  const { sidebarOpen, setSidebarOpen, activeNav, setActiveNav } = useDashboard()

  useEffect(() => {
    const pathname = window.location.pathname
    const matchedItem = navItems.find(item => item.href === pathname)
    
    setActiveNav(matchedItem ? matchedItem.id : 'home')
  }, [])

  const sidebarRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '/dashboard' },
    { id: 'courses', icon: BookOpen, label: 'Courses', href: '/dashboard/courses' },
    { id: 'papers', icon: FileText, label: 'Papers', href: '/dashboard/pyqs' },
    { id: 'achievements', icon: Trophy, label: 'Achievements', href: '/dashboard/achievements' },
    { id: 'profile', icon: User, label: 'Profile', href: '/dashboard/profile' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ]

  const handleSignOut = async () => {
    const res = await fetch('/api/auth/sign-out', { method: 'POST' })
    if (!res.ok) return
    router.push('/')
  }

  useEffect(() => {
    if (window.innerWidth >= 1024 && sidebarRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(sidebarRef.current!, {
          x: -40,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out',
        })

        navItemsRef.current.forEach((item, i) => {
          if (!item) return
          gsap.from(item, {
            x: -20,
            opacity: 1,
            duration: 0.3,
            delay: 0.15 + i * 0.05,
            ease: 'power2.out',
          })
        })
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <>
      {/* SIDEBAR */}
      <aside
        ref={sidebarRef}
        className={`
          fixed inset-y-0 left-0 z-50 w-52 md:w-58
          bg-purple-500 dark:bg-slate-900
          border-r border-slate-200 dark:border-neutral-700
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* INNER WRAPPER (THIS IS WHERE SPACING LIVES) */}
        <div className="flex h-full flex-col pl-5 py-6 overflow-y-auto">
          {/* BRAND */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                RightTailed
              </h2>
              <p className="text-xs text-white/60 mt-1">
                Hey, {student?.name || 'Student'}!
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* NAV */}
          <nav className="flex-1 space-y-2 pl-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeNav === item.id

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  ref={(el) => {
                    navItemsRef.current[index] = el
                  }}
                  onClick={() => {
                    setActiveNav(item.id)
                    if (window.innerWidth < 1024) setSidebarOpen(false)
                  }}
                  className={`
                    flex items-center gap-3 rounded-lg px-4 py-3 text-md font-medium
                    transition-all duration-200
                    ${isActive
                      ? 'bg-purple-800/40 dark:bg-purple-600 text-white shadow-md'
                      : 'text-white/80 dark:text-slate-300 hover:bg-black/10 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* FOOTER */}
          <div className="mt-6 px-3 border-t border-slate-200 dark:border-neutral-700 pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white dark:text-slate-300">
                Theme
              </span>
              <ThemeToggle />
            </div>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg cursor-pointer px-4 py-3
                text-sm font-medium text-white dark:text-slate-300 hover:bg-white/20 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar