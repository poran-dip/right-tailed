import { Brain, ClipboardCheck, Sparkles, TrendingUp, Upload } from "lucide-react"

interface WorkflowSectionProps {
  onPrimaryCTA: () => void
}


const WorkflowSection = ({ onPrimaryCTA }: WorkflowSectionProps) => {
  const steps = [
    { 
      step: "01", 
      title: "Browse or Contribute PYQs", 
      desc: "Search through our databases of hundreds of institutes and exams or upload PYQs from your college or exam", 
      icon: Upload,
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      step: "02", 
      title: "AI Analysis", 
      desc: "Our AI extracts questions, identifies topics, and creates heatmaps", 
      icon: Brain,
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      step: "03", 
      title: "Take Mock Tests", 
      desc: "Practice with AI-generated tests based on real patterns", 
      icon: ClipboardCheck,
      gradient: "from-orange-500 to-red-500"
    },
    { 
      step: "04", 
      title: "Get Smarter", 
      desc: "Review AI-graded results and follow your personalized study plan", 
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-500"
    }
  ]


  return (
    <section id="process" className="py-20 px-6 bg-linear-to-b from-gray-300/80 to-slate-50/80 dark:from-gray-700/80 dark:to-slate-900/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">How RightTailed Works</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Your path to exam success in 4 simple steps</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {steps.map((item, i) => {
            const Icon = item.icon
            return (
              <div 
                key={i} 
                className="group relative bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-transparent hover:scale-105"
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}></div>
                
                {/* Step number badge */}
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-linear-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    STEP {item.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button 
            onClick={onPrimaryCTA}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            Start Your Journey
          </button>
          <a href="#benefits" className="px-5 md:px-8 py-3.5 md:py-4 bg-slate-100/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 border border-slate-400/40 dark:border-slate-600/40 transition-all rounded-xl text-lg font-semibold">
            Dive Into Benefits
          </a>
        </div>
      </div>
    </section>
  )
}

export default WorkflowSection
