'use client'

import { useState } from 'react';
import { ArrowDown, Search, X } from 'lucide-react';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { departments, entranceExams } from '@/lib/data';

export type ExamSelectorHandle = {
  focus: () => void;
};

const ExamSelector = forwardRef<ExamSelectorHandle>((_, ref) => {
  const [examType, setExamType] = useState<'regular' | 'entrance'>('regular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFocusIndicator, setShowFocusIndicator] = useState(false);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      setShowFocusIndicator(true);
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      focusTimeoutRef.current = setTimeout(() => setShowFocusIndicator(false), 3000);
    },
  }));

  const filteredItems = examType === 'regular'
  ? departments.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : entranceExams.filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const canProceed = searchQuery.trim().length > 0;

  const handleProceed = () => {
    if (!canProceed) return;
    
    const selectedItem = filteredItems[0];
    if (!selectedItem) return;

    if (examType === 'regular') {
      window.location.href = `/department/${selectedItem.id}`;
    } else {
      window.location.href = `/entrance/${selectedItem.id}`;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-linear-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 border-2 border-blue-400/30 dark:border-blue-900/30 rounded-xl md:rounded-3xl p-3 md:p-4 shadow-md md:shadow-xl shadow-blue-100/50 dark:shadow-black/20">
        <div className="flex gap-1 mb-3 md:mb-5 bg-linear-to-r from-blue-50 to-purple-50 dark:from-gray-900/50 dark:to-gray-900/50 p-1.5 rounded-xl md:rounded-2xl border border-blue-100 dark:border-gray-700">
          <button
            onClick={() => {
              setExamType('regular');
              setSearchQuery('');
              setShowDropdown(false);
            }}
            className={`flex-1 px-3 md:px-6 py-1 md:py-2 rounded-md md:rounded-xl font-semibold transition-all duration-200 ${
              examType === 'regular'
                ? 'bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Regular Exam
          </button>
          <button
            onClick={() => {
              setExamType('entrance');
              setSearchQuery('');
              setShowDropdown(false);
            }}
            className={`flex-1 px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 ${
              examType === 'entrance'
                ? 'bg-linear-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Entrance Exam
          </button>
        </div>

        {showFocusIndicator && (
          <div className="hidden lg:block fixed top-30 left-1/2 -translate-x-1/2 z-50">
            <div className="relative bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl px-2 py-4 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-500">
              <div className="flex items-center justify-between gap-3">
                <div className="shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <p className="text-base font-semibold text-white whitespace-nowrap">
                  Start searching for your {examType === 'regular' ? 'college' : 'entrance exam'} PYQs!
                </p>
                <button 
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => {
                    if (focusTimeoutRef.current) clearTimeout(focusTimeoutRef.current);
                    setShowFocusIndicator(false);
                  }} 
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 -z-10"></div>
            </div>
          </div>
        )}

        <div className="relative mb-3 md:mb-5">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-blue-500" />
          <input
            type="text"
            name="exam-type"
            value={searchQuery}
            ref={inputRef}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onFocus={() => setShowDropdown(searchQuery.length > 0)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            placeholder={examType === 'regular' ? 'Search for your department/program...' : 'Search for entrance exam...'}
            className="w-full pl-10 md:pl-12 pr-5 py-3 md:py-4 rounded-xl border-2 border-blue-200 dark:border-blue-900/50 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
          />

          {showDropdown && filteredItems.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-gray-700 rounded-xl shadow-2xl shadow-blue-100/50 dark:shadow-black/30 max-h-72 overflow-y-auto">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSearchQuery(item.name);
                    setShowDropdown(false);
                  }}
                  className="w-full px-5 py-3 text-left hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors border-b border-blue-50 dark:border-gray-700 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                  {'category' in item && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.category}</div>
                  )}
                </button>
              ))}
            </div>
          )}

          {showDropdown && searchQuery && filteredItems.length === 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-gray-700 rounded-xl shadow-2xl shadow-blue-100/50 dark:shadow-black/30 p-3 md:p-5 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No {examType === 'regular' ? 'colleges' : 'exams'} found
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleProceed}
          disabled={!canProceed}
          className={`w-full py-3 md:py-4 rounded-xl font-semibold text-base transition-all duration-200 ${
            canProceed
              ? 'bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          View Past Papers →
        </button>
      </div>      
    </div>
  );
});

export default ExamSelector;
