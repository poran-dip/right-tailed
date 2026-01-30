'use client';

import { useParams } from 'next/navigation';
import { questionPaper2025 } from '@/lib/data';
import NotFound from '@/app/not-found';

export default function PYQDetailPage() {
  const params = useParams();

  const subject = params?.subject as string;
  const year = params?.year as string;

  const expectedSubject = questionPaper2025.subject
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');

  const expectedYear = String(questionPaper2025.year);

  if (!subject || !year) {
    return <div className="p-10">Params missing</div>;
  }

  if (subject !== expectedSubject || year !== expectedYear) {
    return <NotFound />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 text-purple-600">
        {questionPaper2025.subject} - {questionPaper2025.year}
      </h1>

      <div className="space-y-4">
        {questionPaper2025.questions.map((q, i) => (
          <div key={i} className="p-4 border rounded-lg bg-white dark:bg-slate-900">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Q{i + 1}</span>
              <span className="text-sm text-gray-500">
                {q.marks} marks
              </span>
            </div>

            <p>{q.question}</p>
            <p className="text-xs text-purple-600 mt-1">
              {q.topic}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
