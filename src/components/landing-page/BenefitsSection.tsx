import { Clock, TrendingUp, Heart } from 'lucide-react'

interface BenefitsSectionProps {
  onPrimaryCTA: () => void
}

const BenefitsSection = ({ onPrimaryCTA }: BenefitsSectionProps) => {
  return (
    <section id="benefits" className="py-20 px-6 bg-linear-to-b from-blue-100/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Why Students Love RightTailed</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Join thousands of students who transformed their exam preparation</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-8">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-blue-200 dark:bg-blue-900/30 rounded-2xl">
                <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Save 10+ Hours Weekly</h3>
            <p className="text-gray-600 dark:text-gray-400">Stop wasting time on low-weightage topics. Focus on what matters.</p>
          </div>
          <div className="text-center p-8">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-purple-200 dark:bg-purple-900/30 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Boost Scores by 30%</h3>
            <p className="text-gray-600 dark:text-gray-400">Data-driven preparation leads to measurably better results.</p>
          </div>
          <div className="text-center p-8">
            <div className="mb-4 flex justify-center">
              <div className="p-4 bg-indigo-200 dark:bg-indigo-900/30 rounded-2xl">
                <Heart className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">Reduce Exam Anxiety</h3>
            <p className="text-gray-600 dark:text-gray-400">Know exactly what to expect. Walk into exams with confidence.</p>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-10 border border-blue-200 dark:border-blue-800">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">Ready to Ace Your Next Exam?</h3>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">Join students who are already studying smarter, not harder</p>
            <button 
              onClick={onPrimaryCTA}
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              Start Crushing Exams Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
