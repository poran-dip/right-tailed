import { Brain, ClipboardCheck, TrendingUp, Upload } from "lucide-react"
import ScrollStack, { ScrollStackItem } from "../ScrollStack"

interface WorkflowSectionProps {
  onPrimaryCTA: () => void
}

const WorkflowSection = ({ onPrimaryCTA }: WorkflowSectionProps) => {
  const steps = [
    {
      title: "Browse or Contribute PYQs",
      desc: "Explore and upload previous year questions.",
      icon: Upload
    },
    {
      title: "Question Analysis",
      desc: "Questions are structured and analyzed by topic.",
      icon: Brain
    },
    {
      title: "Practice with Mock Tests",
      desc: "Train using real exam patterns.",
      icon: ClipboardCheck
    },
    {
      title: "Track and Improve",
      desc: "Measure progress and refine strategy.",
      icon: TrendingUp
    }
  ]

  return (
    <section id="process" className="bg-purple-600 py-24 px-6">
      <div className="max-w-5xl mx-auto text-center mb-20">
        <h2 className="text-4xl font-bold text-white mb-4">
          How RightTailed Works
        </h2>
        <p className="text-purple-100">
          A focused workflow built for real exam prep.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <ScrollStack>
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <ScrollStackItem key={i}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-purple-600/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-600">{step.desc}</p>
              </ScrollStackItem>
            )
          })}
        </ScrollStack>
      </div>

      <div className="mt-24 flex justify-center">
        <button
          onClick={onPrimaryCTA}
          className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold text-lg hover:bg-purple-50 transition"
        >
          Start Your Journey
        </button>
      </div>
    </section>
  )
}

export default WorkflowSection
