'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({children} : {children: React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
