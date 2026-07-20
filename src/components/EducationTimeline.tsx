/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, BookOpen, Calendar, MapPin, Award } from 'lucide-react';

interface TimelineItem {
  year: string;
  degree: string;
  institution: string;
  details: string;
  icon: React.ReactNode;
}

export const EducationTimeline: React.FC = () => {
  const items: TimelineItem[] = [
    {
      year: '2021 – 2025',
      degree: 'Bachelor of Technology (Computer Science)',
      institution: 'Sree Dattha Group of Institutions',
      details: 'Comprehensive educational foundation in computing systems, algorithmic structures, deep learning paradigms, neural network configurations, databases, and AI-driven mathematics.',
      icon: <GraduationCap className="text-white" size={18} />
    },
    {
      year: '2019 – 2021',
      degree: 'Intermediate Education (M.P.C)',
      institution: 'Sri Chaitanya Junior College',
      details: 'Formulated robust foundations under advanced Mathematics, Physics, and Chemistry (M.P.C) disciplines, developing quantitative and analytical frameworks.',
      icon: <BookOpen className="text-white" size={16} />
    },
    {
      year: '2018 – 2019',
      degree: 'Secondary School Certificates',
      institution: 'Gade Rukma Reddy Memorial High School',
      details: 'Graduated boarding credentials, scoring high proficiencies in general sciences and analytical computing blocks.',
      icon: <Award className="text-white" size={16} />
    }
  ];

  return (
    <section
      id="education"
      className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            My Timeline
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Education Profile
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        {/* Elegant Timeline Core */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical core border stem */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Outer spacing block */}
                  <div className="md:w-1/2" />

                  {/* Node icon locator */}
                  <div className="absolute left-4 md:left-1/2 w-9 h-9 transform -translate-x-1/2 bg-gradient-to-br from-violet-600 to-red-500 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center shadow z-10">
                    {item.icon}
                  </div>

                  {/* Core display card */}
                  <div
                    className={`pl-12 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 text-left'
                    }`}
                  >
                    <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 inline-block w-full">
                      <div className={`flex items-center space-x-2 text-violet-600 dark:text-violet-400 font-mono text-xs font-bold mb-2 ${isEven ? 'md:justify-end' : ''}`}>
                        <Calendar size={12} />
                        <span>{item.year}</span>
                      </div>

                      <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-1">
                        {item.degree}
                      </h4>

                      <div className={`flex items-center space-x-1.5 text-sm text-slate-500 dark:text-slate-400 font-medium mb-3 ${isEven ? 'md:justify-end' : ''}`}>
                        <MapPin size={14} className="text-slate-400 shrink-0" />
                        <span>{item.institution}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
