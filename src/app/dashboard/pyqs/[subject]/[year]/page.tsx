'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PaperPopulated } from '@/lib/types';
import NotFound from '../../../../not-found';

export default function PYQDetailPage() {
  const params = useParams();
  const [paper, setPaper] = useState<PaperPopulated | null>(null);
  const [loading, setLoading] = useState(true);

  const subjectSlug = params?.subject as string;
  const year = params?.year as string;

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        setLoading(true);
        // Fetching all papers to find the match
        // Note: In a production app, you might want an API like /api/papers/${id}
        const res = await fetch('/api/papers');
        const data = await res.json();

        if (data.success) {
          const foundPaper = data.papers.find((p: PaperPopulated) => {
            const pSlug = p.subjectId.name.toLowerCase().trim().replace(/\s+/g, '-');
            return pSlug === subjectSlug && String(p.year) === year;
          });
          setPaper(foundPaper || null);
        }
      } catch (err) {
        console.error('Failed to fetch paper details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (subjectSlug && year) {
      fetchPaper();
    }
  }, [subjectSlug, year]);

  if (loading) {
    return <div className="p-10 text-center text-slate-500">Loading paper details...</div>;
  }

  if (!paper) {
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-600">
          {paper.subjectId.name}
        </h1>
        <p className="text-slate-500 mt-2">
          {paper.subjectId?.department?.name} • Academic Year {paper.year}
        </p>
      </div>

      <div className="space-y-4">
        {paper.questions.map((q, i) => (
          <div key={i} className="p-6 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-3 py-1 rounded-md text-sm font-bold">
                Question {i + 1}
              </span>
              <span className="text-sm font-medium text-slate-500">
                {q.marks} Marks
              </span>
            </div>

            <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
              {q.text}
            </p>
            
            {q.topicId && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Topic: <span className="text-purple-500">{q.topicId}</span>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
