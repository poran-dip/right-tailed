import { Brain, CheckCircle, BarChart3, Target, FileText, Sparkles, TrendingUp } from "lucide-react"

interface FeaturesSectionProps {
  onPrimaryCTA: () => void
}

const FeaturesSection = ({ onPrimaryCTA }: FeaturesSectionProps) => {
  const features = [
    {
      icon: Brain,
      title: "AI Question Analysis",
      gradient: "from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20",
      border: "border-blue-200 dark:border-blue-800",
      iconGradient: "from-blue-500 to-purple-600",
      checkColor: "text-blue-600",
      points: [
        "Auto-extract questions from PDFs",
        "Intelligent topic tagging and categorization",
        "Identify question patterns across years"
      ]
    },
    {
      icon: BarChart3,
      title: "Smart Heatmaps",
      gradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      border: "border-purple-200 dark:border-purple-800",
      iconGradient: "from-purple-500 to-pink-600",
      checkColor: "text-purple-600",
      points: [
        "Visual topic frequency analysis",
        "Identify high-weightage topics instantly",
        "Data-driven study prioritization"
      ]
    },
    {
      icon: Target,
      title: "Personalized Study Plans",
      gradient: "from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20",
      border: "border-pink-200 dark:border-pink-800",
      iconGradient: "from-pink-500 to-red-600",
      checkColor: "text-pink-600",
      points: [
        "AI-generated preparation roadmaps",
        "Adaptive scheduling based on exam date",
        "Focus on your weakest areas first"
      ]
    },
    {
      icon: FileText,
      title: "Adaptive Mock Tests",
      gradient: "from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20",
      border: "border-green-200 dark:border-green-800",
      iconGradient: "from-green-500 to-teal-600",
      checkColor: "text-green-600",
      points: [
        "Realistic exam simulations with timers",
        "Mix of MCQs and long-form questions",
        "Difficulty adjusts to your performance"
      ]
    },
    {
      icon: Sparkles,
      title: "AI Auto-Grading",
      gradient: "from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
      border: "border-yellow-200 dark:border-yellow-800",
      iconGradient: "from-yellow-500 to-orange-600",
      checkColor: "text-yellow-600",
      points: [
        "Instant feedback on your answers",
        "Point-by-point evaluation breakdown",
        "Learn what you missed immediately"
      ]
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      gradient: "from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
      border: "border-indigo-200 dark:border-indigo-800",
      iconGradient: "from-indigo-500 to-blue-600",
      checkColor: "text-indigo-600",
      points: [
        "Track strengths and weaknesses by topic",
        "Visualize improvement over time",
        "Get personalized recommendations"
      ]
    }
  ]

  return (
    <section id="features" className="py-20 px-6 bg-linear-to-b from-blue-100/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Everything You Need to Excel</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Powerful features designed for serious exam preparation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className={`p-4 md:p-8 rounded-2xl bg-linear-to-br ${feature.gradient} border ${feature.border} hover:shadow-xl transition-all group`}>
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-0">
                  <div className={`shrink-0 w-12 md:w-14 h-12 md:h-14 bg-linear-to-br ${feature.iconGradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 md:w-7 h-5 md:h-7 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4">{feature.title}</h3>
                </div>
                <ul className="space-y-2 md:space-y-3 text-gray-700 dark:text-gray-300">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <CheckCircle className={`w-5 h-5 ${feature.checkColor} mt-0.5 shrink-0`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <button 
            onClick={onPrimaryCTA} 
            className="inline-block px-5 md:px-8 py-3.5 md:py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
          >
            Grab PYQs
          </button>
          <a href="#process" className="px-5 md:px-8 py-3.5 md:py-4 bg-slate-100/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 hover:bg-slate-200/80 dark:hover:bg-slate-800/80 border border-slate-400/40 dark:border-slate-600/40 transition-all rounded-xl text-lg font-semibold">
            How It Works
          </a>
        </div>
      </div>
      </section>
  )
}

export default FeaturesSection
