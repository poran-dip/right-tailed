import { Brain, CheckCircle, BarChart3, Target, FileText, Sparkles, TrendingUp } from "lucide-react"

interface FeaturesSectionProps {
  onPrimaryCTA: () => void
}

const FeaturesSection = ({ onPrimaryCTA }: FeaturesSectionProps) => {
  const features = [
    {
      icon: Brain,
      title: "Question Intelligence",
      points: [
        "Extract questions from PDFs automatically",
        "Clean topic tagging across years",
        "Spot recurring patterns instantly"
      ]
    },
    {
      icon: BarChart3,
      title: "Topic Heatmaps",
      points: [
        "Frequency-based topic analysis",
        "Identify high-impact chapters fast",
        "Prioritize smarter, not harder"
      ]
    },
    {
      icon: Target,
      title: "Study Planning",
      points: [
        "Exam-date aware preparation plans",
        "Focus-driven scheduling",
        "Weak-area prioritization"
      ]
    },
    {
      icon: FileText,
      title: "Mock Tests",
      points: [
        "Exam-like simulations",
        "Balanced MCQs and theory",
        "Adaptive difficulty"
      ]
    },
    {
      icon: Sparkles,
      title: "Answer Evaluation",
      points: [
        "Instant structured feedback",
        "Point-wise evaluation",
        "Clear improvement insights"
      ]
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      points: [
        "Topic-wise performance tracking",
        "Visual improvement trends",
        "Actionable recommendations"
      ]
    }
  ]

  return (
    <section
      id="features"
      className="py-20 px-6 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Built for Serious Preparation
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Focused tools that help you understand what actually matters in exams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>

                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  {feature.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <div className="mt-14 flex items-center justify-center gap-4">
          <button
            onClick={onPrimaryCTA}
            className="px-12 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg cursor-pointer font-semibold text-lg transition-all"
          >
            Grab PYQs
          </button>

          <a
            href="#process"
            className="px-12 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all font-medium text-lg"
          >
            How It Works
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
