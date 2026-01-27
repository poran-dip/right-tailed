import { ShieldCheck } from 'lucide-react'
import { forwardRef, useImperativeHandle, useRef } from 'react';
import ExamSelector, { ExamSelectorHandle } from './ExamSelector';

export type HeroHandle = {
  focusExamSelector: () => void;
};

const HeroSection = forwardRef<HeroHandle>((_, ref) => {
  const examSelectorRef = useRef<ExamSelectorHandle>(null);

  useImperativeHandle(ref, () => ({
    focusExamSelector() {
      examSelectorRef.current?.focus();
    },
  }));

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 lg:pt-22 pb-12 bg-linear-to-b from-slate-300 to-slate-50 dark:from-slate-800 dark:to-slate-950">
      <div className="container mx-auto text-center">
        <div className="mb-6 lg:mb-12 space-y-4 lg:space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 leading-[1.1] tracking-tight">
            Exams aren't random.
            <br />
            <span className="text-gray-600 dark:text-gray-400">They just pretend to be.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            We analyze past papers to show what actually matters — topics, weightage, patterns, time ROI.
          </p>
        </div>
        
        <div className="mb-12">
          <ExamSelector ref={examSelectorRef} />
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
          <ShieldCheck className="w-4 md:w-5 h-4 md:h-5" />
          <span>Built from real university PYQs, not guesswork</span>
        </div>
      </div>
    </section>
  )
});

export default HeroSection;
