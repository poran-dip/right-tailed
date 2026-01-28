'use client';

import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { departments, entranceExams } from '@/lib/data';

export type ExamSelectorHandle = {
  focus: () => void;
};

const ExamSelector = forwardRef<ExamSelectorHandle>((_, ref) => {
  const [examType, setExamType] = useState<'regular' | 'entrance'>('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      setShowFocusIndicator(true);
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      focusTimeoutRef.current = setTimeout(
        () => setShowFocusIndicator(false),
        3000
      );
    },
  }));

  const filteredItems =
    examType === 'regular'
      ? departments.filter(d =>
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : entranceExams.filter(e =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const canProceed = searchQuery.trim().length > 0;

  const handleProceed = () => {
    if (!canProceed || !filteredItems[0]) return;

    const selected = filteredItems[0];

    window.location.href =
      examType === 'regular'
        ? `/department/${selected.id}`
        : `/entrance/${selected.id}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-900/30 rounded-3xl p-4 shadow-sm shadow-purple-600/10">

        {/* Toggle */}
        <div className="flex mb-5 rounded-2xl border border-purple-200 dark:border-gray-700 overflow-hidden">
          {(['regular', 'entrance'] as const).map(type => (
            <button
              key={type}
              onClick={() => {
                setExamType(type);
                setSearchQuery('');
                setShowDropdown(false);
              }}
              className={`flex-1 py-3 font-semibold transition-all ${
                examType === type
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
              }`}
            >
              {type === 'regular' ? 'Regular Exam' : 'Entrance Exam'}
            </button>
          ))}
        </div>

        {/* Focus hint */}
        {showFocusIndicator && (
          <div className="hidden lg:block fixed top-28 left-1/2 -translate-x-1/2 z-50">
            <div className="relative bg-purple-600 rounded-2xl px-4 py-3 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <p className="text-white font-semibold whitespace-nowrap">
                  Start searching for your{' '}
                  {examType === 'regular' ? 'department' : 'entrance exam'} PYQs
                </p>
                <button
                  onClick={() => {
                    if (focusTimeoutRef.current)
                      clearTimeout(focusTimeoutRef.current);
                    setShowFocusIndicator(false);
                  }}
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute inset-0 bg-purple-600 blur-xl opacity-40 -z-10 rounded-2xl" />
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600" />
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onFocus={() => setShowDropdown(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder={
              examType === 'regular'
                ? 'Search for your department/program...'
                : 'Search for entrance exam...'
            }
            className="w-full pl-12 pr-4 py-4 rounded-xl border border-purple-700/10 dark:border-purple-900/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 outline-none bg-black/3 transition-all"
          />

          {showDropdown && filteredItems.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 rounded-xl shadow-xl max-h-72 overflow-y-auto">
              {filteredItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSearchQuery(item.name);
                    setShowDropdown(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-purple-50 dark:hover:bg-purple-900/20 border-b last:border-b-0"
                >
                  <div className="text-gray-900 dark:text-gray-100 font-medium">
                    {item.name}
                  </div>
                  {'category' in item && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.category}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {showDropdown && searchQuery && filteredItems.length === 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 rounded-xl p-4 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            canProceed
              ? 'bg-purple-600 hover:bg-purple-700 text-white group'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          View Past Papers
          <ArrowRight className="transition-all duration-200 mt-1 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
});

export default ExamSelector;
