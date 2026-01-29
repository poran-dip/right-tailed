'use client'

import { Github, Linkedin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Poran Dip Boruah',
      role: 'Systems Developer',
      bio: 'Leads system design and product direction, with a focus on turning PYQs into actionable, data-driven exam insights.',
      github: 'https://github.com/poran-dip',
      linkedin: 'https://linkedin.com/in/poran-dip',
      img: 'team/poran.jpg'
    },
    {
      name: 'Dikshyan Chakraborty',
      role: 'Full-Stack & AI/ML',
      bio: 'Works across the stack with strong depth in AI/ML, powering question analysis, topic extraction, and insight generation.',
      github: 'https://github.com/Dikshyan',
      linkedin: 'https://www.linkedin.com/in/dikshyan-chakraborty/',
      img: 'team/dikshyan.jpg'
    },
    {
      name: 'Shivayan Chakravarty',
      role: 'Backend & Database',
      bio: 'Builds high-performance backend systems and databases, ensuring scalable APIs and efficient data pipelines.',
      github: 'https://github.com/Shivayan09',
      linkedin: 'https://www.linkedin.com/in/shivayan-chakravarty-806702294/',
      img: 'team/shivayan.jpg'
    },
    {
      name: 'Parashar Deb',
      role: 'Full-Stack & UI/UX',
      bio: 'Designs and implements clean, intuitive interfaces that make complex exam data easy to explore.',
      github: 'https://github.com/ParasharDeb',
      linkedin: 'https://www.linkedin.com/in/parashar-deb-847949271/',
      img: 'team/parashar.jpg'
    }
  ];

  return (
    <main className="py-16 px-6 mt-8 mb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            About RightTailed
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We're a team of passionate students who believe exam preparation should be data-driven, not guesswork.
          </p>
          
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-900">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-gray-800 dark:text-gray-200 font-semibold">
              Built at Pandu College Hackathon 2026
            </span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-gray-600 dark:text-gray-400">January 31, 2026</span>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
            During the Pandu College Hackathon 2026, we noticed a common struggle among students: wasting countless hours studying low-weightage topics while missing the questions that actually matter.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
            RightTailed was born from this frustration. We built an AI-powered platform that analyzes past question papers to reveal patterns, weightage, and trends — helping students study smarter, not harder.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Meet the Team</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105"
              >
                {/* Avatar Placeholder */}
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover mb-4"
                />

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6">
                  {member.bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-4">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Start Using RightTailed
          </Link>
        </div>
      </div>
    </main>
  );
}
