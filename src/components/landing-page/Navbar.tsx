'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

interface NavbarProps {
  setShowSignInDialog: (state: boolean) => void
}

const Navbar = ({ setShowSignInDialog }: NavbarProps) => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [signedIn, setSignedIn] = useState(false)
  const scrollYRef = useRef(0)

  useEffect(() => {
    setSignedIn(!!localStorage.getItem('studentId'))
  }, [])

  useEffect(() => {
    if (menuOpen) {
      scrollYRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollYRef.current)
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
    }
  }, [menuOpen])

  const closeMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setMenuOpen(false)
    }, 300)
  }

  return (
    <header>
      <nav className="fixed top-0 w-full bg-white/70 dark:bg-slate-900/80 backdrop-blur-xs border-b border-slate-200 dark:border-white/20 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="block md:hidden text-slate-900 dark:text-slate-100"
          >
            <Menu className="w-6 h-6" strokeWidth={3} />
          </button>

          <span className="text-md font-bold text-purple-600">RightTailed</span>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="font-semibold hover:text-purple-600">Features</a>
            <a href="#process" className="font-semibold hover:text-purple-600">How It Works</a>
            <a href="#benefits" className="font-semibold hover:text-purple-600">Benefits</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {signedIn &&
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
              >
                Open Dashboard
              </button>
            }

            {!signedIn &&
              <button
                onClick={() => setShowSignInDialog(true)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
              >
                Sign In
              </button>
            }
            
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className={`fixed inset-0 z-50 md:hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          <div
            className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl flex flex-col
            ${isClosing ? 'animate-slideOutLeft' : 'animate-slideInLeft'}`}
          >
            <style jsx>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
              @keyframes slideInLeft { from { transform: translateX(-100%); } to { transform: translateX(0); } }
              @keyframes slideOutLeft { from { transform: translateX(0); } to { transform: translateX(-100%); } }
              .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
              .animate-fadeOut { animation: fadeOut 0.2s ease-out; }
              .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
              .animate-slideOutLeft { animation: slideOutLeft 0.3s ease-out; }
            `}</style>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Image src="/logo.png" width={24} height={24} alt="RightTailed" />
                <span className="text-lg font-bold text-purple-600">RightTailed</span>
              </div>
              <button onClick={closeMenu}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <a href="#features" onClick={closeMenu} className="block px-4 py-3 font-semibold">Features</a>
              <a href="#process" onClick={closeMenu} className="block px-4 py-3 font-semibold">How It Works</a>
              <a href="#benefits" onClick={closeMenu} className="block px-4 py-3 font-semibold">Benefits</a>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-4">
              <button
                onClick={() => {
                  setShowSignInDialog(true)
                  closeMenu()
                }}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold"
              >
                Sign In
              </button>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
