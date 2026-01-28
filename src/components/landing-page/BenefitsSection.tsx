import { Clock, TrendingUp, Heart } from 'lucide-react'

interface BenefitsSectionProps {
  onPrimaryCTA: () => void
}

const BenefitsSection = ({ onPrimaryCTA }: BenefitsSectionProps) => {
  return (
    <section id="benefits" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Why Students Choose <span className='text-purple-600'>RightTailed</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Clear direction, less guesswork, and better outcomes.
          </p>
        </div>

        <div className="flex items-center justify-center gap-5 my-10">
          <div className="text-center p-8 rounded-2xl border border-slate-200 dark:border-slate-800 w-[30%]">
            <div className="mb-5 flex justify-center">
              <div className="p-4 rounded-2xl bg-purple-600/10">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
              Save 10+ Hours Weekly
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Stop spending time on low-impact topics. Focus only on what moves the needle.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl border border-slate-200 dark:border-slate-800 w-[30%]">
            <div className="mb-5 flex justify-center">
              <div className="p-4 rounded-2xl bg-purple-600/10">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
              Measurable Score Improvement
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Data-backed preparation leads to consistent performance gains.
            </p>
          </div>
          <div className="text-center p-8 rounded-2xl border border-slate-200 dark:border-slate-800 w-[30%]">
            <div className="mb-5 flex justify-center">
              <div className="p-4 rounded-2xl bg-purple-600/10">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
              Lower Exam Stress
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              When expectations are clear, confidence follows naturally.
            </p>
          </div>
        </div>
        <div className="border border-slate-200 dark:border-0 p-10 bg-slate-50 dark:bg-slate-950">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white">
              Ready to Prepare Smarter?
            </h3>
            <p className="text-lg mb-6 text-slate-600 dark:text-slate-400">
              Build clarity, consistency, and confidence for your next exam.
            </p>
            <button
              onClick={onPrimaryCTA}
              className="px-12 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-lg transition-all"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
