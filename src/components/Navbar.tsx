'use client'

import { useState } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"
import { MobileMenu } from "@/components/landing-page"

interface NavbarProps {
  setShowSignInDialog: (state: boolean) => void
}

const Navbar = ({ setShowSignInDialog }: NavbarProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <header>
      <nav className="fixed top-0 w-full dark:border-b bg-white/70 dark:border-white/20 backdrop-blur-xs dark:bg-slate-900 z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <span className="text-md font-bold text-purple-600">RightTailed</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            <a
              href="#features"
              className="font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-all"
            >
              Benefits
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowSignInDialog(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 active:scale-95 hover:scale-[1.01] cursor-pointer"
            >
              Sign In
            </button>
            <ThemeToggle />
          </div>

          <button
            onClick={() => setShowMobileMenu(true)}
            className="block md:hidden text-slate-900 dark:text-slate-100 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {showMobileMenu && (
        <MobileMenu 
          onClose={() => setShowMobileMenu(false)}
          setShowSignInDialog={setShowSignInDialog}
        />
      )}
    </header>
  )
}

export default Navbar;
