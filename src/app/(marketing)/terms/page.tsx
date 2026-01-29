'use client'

import { ShieldAlert, Scale, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="py-16 px-6 mt-8 mb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 md:w-14 lg:w-16 h-12 md:h-14 lg:h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 mb-6">
            <Scale className="w-4 md:w-6 lg:w-8 h-4 md:h-6 lg:h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
            Last updated: January 31, 2026
          </p>
        </div>

        {/* Disclaimer Box */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 dark:text-yellow-500 shrink-0 mt-1" />
            <div>
              <h2 className="text-lg md:text-xl font-bold text-yellow-900 dark:text-yellow-300 mb-3">
                Important Disclaimer
              </h2>
              <p className="text-yellow-800 dark:text-yellow-400 text-sm md:text-base leading-relaxed">
                RightTailed is an experimental, educational project built during a hackathon.
                It is provided <strong>as-is</strong> and is intended to support exam preparation,
                not replace official resources, instructors, or personal judgment.
              </p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
          
          {/* Section 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Scope & Limitations
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              RightTailed provides insights based on past question papers and automated analysis.
              While we aim to make this information useful, we do not guarantee that it is complete,
              accurate, or applicable to your specific exam or syllabus version.
            </p>
          </div>

          {/* Section 2 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User Responsibility
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              By using RightTailed, you acknowledge and agree that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
              <li>Your exam preparation strategy and outcomes are your own responsibility</li>
              <li>Any insights or visualizations should be independently verified</li>
              <li>AI-generated analysis may contain errors or limitations</li>
              <li>The platform is intended as a supplementary study aid, not a single source of truth</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Academic Guarantees
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              RightTailed does not guarantee exam results, grades, rankings, or academic performance.
              Decisions made using the platform should be considered alongside official materials,
              instructor guidance, and personal preparation.
            </p>
          </div>

          {/* Section 4 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Experimental Nature
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              This platform was created during a hackathon and should be considered a prototype.
              Features may be incomplete, change over time, or occasionally break.
              Availability and reliability are not guaranteed.
            </p>
          </div>

          {/* Section 5 */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              If you have questions, feedback, or concerns about these terms,
              please reach out through our GitHub repository or contact the team directly.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
