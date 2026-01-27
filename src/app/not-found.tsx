'use client'

import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Main 404 Display */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-9xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 mb-2">
            The page you're looking for doesn't exist.
          </p>
          <p className="text-sm md:text-lg text-gray-500 dark:text-gray-500 italic">
            Perhaps that page will be added later...
          </p>
        </div>

        <div className="flex flex-col items-center sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="max-w-60 inline-flex items-center justify-center gap-2 px-8 py-3 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-base md:text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            <Home className="w-4 md:w-5 h-4 md:h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="max-w-60 inline-flex items-center text-gray-800 dark:text-gray-200 justify-center gap-2 px-6 md:px-8 py-2.5 md:py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl font-semibold text-base md:text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
