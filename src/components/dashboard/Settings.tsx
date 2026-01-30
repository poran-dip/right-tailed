'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Subject {
  _id: string;
  name: string;
  topics: string[];
}

interface Paper {
  _id: string;
  year: number;
  subjectId: string;
}

interface Exam {
  subjectId: string;
  dateTime: string;
}

interface Student {
  _id: string;
  name: string;
  email: string;
  semester?: number;
  program?: string;
  subjectIds: Subject[];
  paperIds: Paper[];
  exams: Exam[];
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [studentId, setStudentId] = useState('');

  const router = useRouter()
  
  useEffect(() => {
    const storedId = localStorage.getItem('studentId');
    if(!storedId) {
      return router.push('/')
    } else {
      setStudentId(storedId)
    }
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    semester: '',
    program: '',
  });

  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [allPapers, setAllPapers] = useState<Paper[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    if (!studentId) return;

    fetchStudentData();
    fetchAllSubjects();
    fetchAllPapers();
  }, [studentId]);

  const fetchStudentData = async () => {
    try {
      const res = await fetch(`/api/user?id=${studentId}`);
      const data = await res.json();

      if (data.success) {
        const student = data.student;
        setFormData({
          name: student.name,
          email: student.email,
          semester: student.semester?.toString() || '',
          program: student.program || '',
        });
        setSelectedSubjects(student.subjectIds.map((s: Subject) => s._id));
        setSelectedPapers(student.paperIds.map((p: Paper) => p._id));
        setExams(student.exams || []);
      } else {
        setError(data.error || 'Failed to load student data');
      }
    } catch (err) {
      setError('Failed to load student data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllSubjects = async () => {
    try {
      const res = await fetch('/api/subjects');
      const data = await res.json();
      if (data.success) setAllSubjects(data.subjects || []);
    } catch (err) {
      console.error('Failed to load subjects');
    }
  };

  const fetchAllPapers = async () => {
    try {
      const res = await fetch('/api/papers');
      const data = await res.json();
      if (data.success) setAllPapers(data.papers || []);
    } catch (err) {
      console.error('Failed to load papers');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handlePaperToggle = (paperId: string) => {
    setSelectedPapers(prev =>
      prev.includes(paperId)
        ? prev.filter(id => id !== paperId)
        : [...prev, paperId]
    );
  };

  const addExam = () => {
    setExams([...exams, {
      subjectId: '',
      dateTime: '',
    }]);
  };

  const updateExam = (index: number, field: string, value: string) => {
    const updated = [...exams];
    updated[index] = { ...updated[index], [field]: value };
    setExams(updated);
  };

  const removeExam = (index: number) => {
    setExams(exams.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/user?id=${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          semester: formData.semester ? parseInt(formData.semester) : undefined,
          program: formData.program,
          subjectIds: selectedSubjects,
          paperIds: selectedPapers,
          exams: exams.filter(e => e.subjectId && e.dateTime),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess('Settings updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to update settings');
      }
    } catch (err) {
      setError('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Semester</label>
                <input
                  type="number"
                  name="semester"
                  value={formData.semester}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Program</label>
                <input
                  type="text"
                  name="program"
                  value={formData.program}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Subjects</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {allSubjects.map(subject => (
              <label key={subject._id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject._id)}
                  onChange={() => handleSubjectToggle(subject._id)}
                  className="w-4 h-4"
                />
                <span>{subject.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Papers */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Papers</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {allPapers.map(paper => (
              <label key={paper._id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedPapers.includes(paper._id)}
                  onChange={() => handlePaperToggle(paper._id)}
                  className="w-4 h-4"
                />
                <span>Year {paper.year} - {allSubjects.find(s => s._id === paper.subjectId)?.name || 'Unknown Subject'}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Exams */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Upcoming Exams</h2>
            <button
              type="button"
              onClick={addExam}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Exam
            </button>
          </div>

          <div className="space-y-3">
            {exams.map((exam, index) => (
              <div key={`${exam.dateTime}-${exam.subjectId}`} className="flex gap-3 items-start p-3 bg-gray-50 rounded">
                <select
                  value={exam.subjectId}
                  onChange={(e) => updateExam(index, 'subjectId', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Subject</option>
                  {selectedSubjects.map(subjectId => {
                    const subject = allSubjects.find(s => s._id === subjectId);
                    return subject ? (
                      <option key={subject._id} value={subject._id}>
                        {subject.name}
                      </option>
                    ) : null;
                  })}
                </select>

                <input
                  type="datetime-local"
                  value={exam.dateTime}
                  onChange={(e) => updateExam(index, 'dateTime', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="button"
                  onClick={() => removeExam(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}

            {exams.length === 0 && (
              <p className="text-gray-500 text-center py-4">No exams scheduled</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
