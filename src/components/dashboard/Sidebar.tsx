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

const Sidebar = () => {
  const router = useRouter()
  const { sidebarOpen, setSidebarOpen, activeNav, setActiveNav } = useDashboard()

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
    const res = await fetch('/api/auth/sign-out', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!res.ok) {
      console.error('Sign out failed');
      return;
    }

    router.push('/');
  }

  useEffect(() => {
    if (window.innerWidth >= 1024 && sidebarRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(sidebarRef.current!, {
          x: -50,
          duration: 0.6,
          ease: 'power3.out',
        })

        navItemsRef.current.forEach((item, index) => {
          if (!item) return
          gsap.from(item, {
            x: -20,
            opacity: 1,
            duration: 0.4,
            delay: 0.2 + index * 0.08,
            ease: 'power2.out',
          })
        })
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <>
      <aside
        ref={sidebarRef}
<<<<<<< HEAD
        className={`fixed top-0 left-0 h-screen w-52 md:w-60 bg-linear-to-b from-purple-600 via-purple-500 to-purple-600 text-white shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)] z-50 transition-transform duration-300 lg:relative ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full px-2 md:px-0 md:pl-5 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold text-white">RightTailed</h2>
              <p className="text-xs text-white/60">Learning Portal</p>
            </div>

            <button onClick={onClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10">
              <X className="w-5 h-5 text-white/70 hover:text-white" />
=======
        className={`fixed lg:relative top-0 left-0 h-dvh pl-2 pr-4
          bg-white dark:bg-neutral-900
          border-r border-slate-200 dark:border-neutral-700
          z-50 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Brand */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-purple-600">
                RightTailed
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Student Dashboard
              </p>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
>>>>>>> 8ef1465c6bc746f4044db3c8704def856190c14b
            </button>
          </div>

          <nav className="flex-1 space-y-3 md:pl-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeNav === item.id

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  ref={(el) => { navItemsRef.current[index] = el }}
                  onClick={() => {
                    setActiveNav(item.id)
                    if (window.innerWidth < 1024) setSidebarOpen(false)
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${isActive
                    ? 'bg-purple-400 text-white shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="pt-6 mt-6 mr-3 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Student Name
                </p>
                <p className="text-xs text-white/60 truncate">
                  student@email.com
                </p>
              </div>
            </div>

<<<<<<< HEAD
            <button className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl text-white/70 hover:text-red-400 hover:bg-red-500/10 transition">
=======
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
            >
>>>>>>> 8ef1465c6bc746f4044db3c8704def856190c14b
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

<<<<<<< HEAD
      {isOpen && (
=======
      {/* Mobile overlay */}
      {sidebarOpen && (
>>>>>>> 8ef1465c6bc746f4044db3c8704def856190c14b
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
