'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div className="min-h-screen flex bg-white dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeNav={activeNav} setActiveNav={setActiveNav}/>

      <main className="flex-1">
        <div className="lg:hidden sticky top-0 z-30 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-b border-slate-200 dark:border-neutral-700 px-4 py-2 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-md text-purple-600">
            <Menu className="w-6.5 h-6.5" strokeWidth={3}/>
          </button>
          <img src="/icon0.svg" alt="" className='h-7'/>
        </div>

        <div className="overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
