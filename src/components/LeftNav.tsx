'use client'

import { useEffect, useRef } from 'react'
import { Home, BookOpen, FileText, Trophy, Settings, User, LogOut, X } from 'lucide-react'
import gsap from 'gsap'

interface NavbarProps {
  isOpen: boolean
  onClose: () => void
  activeNav: string
  setActiveNav: (id: string) => void
}

const Navbar = ({ isOpen, onClose, activeNav, setActiveNav }: NavbarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  const navItems = [
    { id: 'home', icon: Home, label: 'Home', href: '#' },
    { id: 'courses', icon: BookOpen, label: 'Courses', href: '#' },
    { id: 'papers', icon: FileText, label: 'Papers', href: '#' },
    { id: 'achievements', icon: Trophy, label: 'Achievements', href: '#' },
    { id: 'profile', icon: User, label: 'Profile', href: '#' },
    { id: 'settings', icon: Settings, label: 'Settings', href: '#' },
  ]

  useEffect(() => {
    // Initial page load animation for desktop
    if (window.innerWidth >= 1024) {
      const ctx = gsap.context(() => {
        if (sidebarRef.current) {
          gsap.set(sidebarRef.current, { opacity: 1, x: 0 })
          gsap.from(sidebarRef.current, {
            x: -50,
            duration: 0.6,
            ease: 'power3.out',
          })
        }

        navItemsRef.current.forEach((item, index) => {
          if (item) {
            gsap.set(item, { opacity: 1 })
            gsap.from(item, {
              x: -20,
              opacity: 0,
              duration: 0.4,
              delay: 0.2 + index * 0.08,
              ease: 'power2.out',
            })
          }
        })
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed lg:relative top-0 left-0 h-screen w-72 bg-white dark:bg-neutral-900 border-r border-slate-200 dark:border-neutral-700 z-50 flex-shrink-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6 overflow-y-auto">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Porandip title please
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Learning Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeNav === item.id
              return (
                <a
                  key={item.id}
                  ref={(el) => {
                    navItemsRef.current[index] = el
                  }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveNav(item.id)
                    if (window.innerWidth < 1024) {
                      onClose()
                    }
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-transform duration-300 flex-shrink-0 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                    strokeWidth={2}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </a>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-neutral-800 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md flex-shrink-0">
                <User className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  Student Name
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  student@email.com
                </p>
              </div>
            </div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 group">
              <LogOut
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                strokeWidth={2}
              />
              <span className="font-medium text-sm">Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
    </>
  )
}

export default Navbar