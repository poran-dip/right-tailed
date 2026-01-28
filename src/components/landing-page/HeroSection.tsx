import { ArrowRight, ShieldCheck } from 'lucide-react'
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
    <div className="min-h-screen flex">
      <div className="box w-[90%] md:w-[50%] px-10 pt-15">
        <div>
            <h1 className="text-3xl md:text-5xl mt-10 font-bold text-gray-900 dark:text-gray-50 leading-[1.1] tracking-tight">
              Exams <span className='text-purple-600'>aren't random!</span>
              <br />
              <span className='text-[2.3rem] text-black/60 dark:text-white/70'>They just pretend to be</span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-5 font-light leading-relaxed">
              We analyze past papers to show what actually matters — topics, weightage, patterns, time ROI.
            </p>
          </div>

          <div className='mt-8 mb-10'>
            <ExamSelector ref={examSelectorRef} />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
            <ShieldCheck className="w-4 md:w-5 h-4 md:h-5" />
            <span>Built from real university PYQs, not guesswork</span>
          </div>
      </div>
      <div className="box w-[90%] md:w-[50%] bg-purple-500 dark:bg-slate-900 dark:border-l dark:border-white/20">
        <img src="/hero.png" alt="" className='h-full w-full object-cover object-top'/>
      </div>
    </div>
  )
});

export default HeroSection;
