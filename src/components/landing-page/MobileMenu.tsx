'use client'

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"

interface MobileMenuProps {
  onClose: () => void
  setShowSignInDialog: (state: boolean) => void
}

const MobileMenu = ({ onClose, setShowSignInDialog }: MobileMenuProps) => {
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 md:hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className={`absolute top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl ${isClosing ? 'animate-slideOutRight' : 'animate-slideInRight'}`}>
        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes slideOutRight {
            from { transform: translateX(0); }
            to { transform: translateX(100%); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-fadeOut {
            animation: fadeOut 0.2s ease-out;
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s ease-out;
          }
          .animate-slideOutRight {
            animation: slideOutRight 0.3s ease-out;
          }
        `}</style>
        <nav className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" height={24} width={24} alt="RightTailed Logo" />
              <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RightTailed
              </span>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-1 flex-1">
            <button 
              onClick={() => {
                setShowSignInDialog(true);
              }}
              className="w-full mt-2 px-4 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all"
            >
              Sign In
            </button>

            <a
              href="#features"
              onClick={handleClose}
              className="mt-2 px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-200 dark:border-gray-800"
            >
              Features
            </a>
            <a
              href="#process"
              onClick={handleClose}
              className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border-b border-gray-200 dark:border-gray-800"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={handleClose}
              className="px-4 py-3 font-semibold text-gray-900 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Benefits
            </a>
          </div>

          <div className="px-4 pb-4 pt-2 border-t border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu
