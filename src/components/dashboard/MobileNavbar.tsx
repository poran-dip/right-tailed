'use client'

import { Menu } from "lucide-react"
import { useDashboard } from "@/contexts/DashboardContext"

const MobileNavbar = () => {
  const { toggleSidebar } = useDashboard()

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-4 py-2">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
        </button>

        <h3 className="text-lg font-bold text-purple-600">
          RightTailed
        </h3>

        {/* Spacer for centering */}
        <div className="w-10"></div>
      </div>
    </div>
  )
}

export default MobileNavbar
