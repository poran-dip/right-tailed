'use client'

import Sidebar from '@/components/dashboard/Sidebar'
import MobileNavbar from '@/components/dashboard/MobileNavbar'
import { DashboardProvider } from '@/contexts/DashboardContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <div className="min-h-screen flex bg-white dark:bg-slate-950">
        {/* Single Sidebar - handles both mobile and desktop */}
        <Sidebar />

        <main className="flex-1 overflow-x-hidden">
          {/* Mobile Navbar - only shows on mobile */}
          <MobileNavbar />
          
          {/* Page Content */}
          {children}
        </main>
      </div>
    </DashboardProvider>
  )
}