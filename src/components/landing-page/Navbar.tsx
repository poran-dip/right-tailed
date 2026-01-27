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
      <nav className="fixed top-0 w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md z-50 shadow-md">
        <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <Image src="/logo.png" height={32} width={32} alt="RightTailed Logo" />
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-blue-400 transition-colors">RightTailed</span>
          </a>
          
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            <a
              href="#features"
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              Features
            </a>
            <a
              href="#process"
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-all"
            >
              Benefits
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setShowSignInDialog(true)}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
