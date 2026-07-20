/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, Binary, BarChart3, Settings, Play, CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: number; // 0 to 100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const skillCategories: SkillCategory[] = [
    {
      title: 'Data Science',
      icon: <Database size={16} className="text-violet-500" />,
      skills: [
        { name: 'Machine Learning', level: 90 },
        { name: 'Deep Learning', level: 85 },
        { name: 'Computer Vision', level: 80 },
        { name: 'NLP', level: 75 }
      ]
    },
    {
      title: 'Programming',
      icon: <Binary size={16} className="text-red-500" />,
      skills: [
        { name: 'Python', level: 95 },
        { name: 'SQL', level: 85 },
        { name: 'HTML', level: 80 },
        { name: 'CSS', level: 75 }
      ]
    },
    {
      title: 'Data Analysis',
      icon: <BarChart3 size={16} className="text-violet-400" />,
      skills: [
        { name: 'Power BI', level: 80 },
        { name: 'Tableau', level: 75 },
        { name: 'Data Visualization', level: 88 }
      ]
    },
    {
      title: 'Libraries & Frameworks',
      icon: <Settings size={16} className="text-red-400" />,
      skills: [
        { name: 'NumPy', level: 92 },
        { name: 'Pandas', level: 94 },
        { name: 'Matplotlib', level: 88 },
        { name: 'Scikit-Learn', level: 90 },
        { name: 'TensorFlow', level: 82 }
      ]
    },
    {
      title: 'Tools',
      icon: <Play size={16} className="text-violet-500" />,
      skills: [
        { name: 'Git & GitHub', level: 86 },
        { name: 'Jupyter Notebook', level: 92 },
        { name: 'Excel', level: 85 }
      ]
    }
  ];

  const categories = ['All', ...skillCategories.map((c) => c.title)];

  const filteredSkills =
    activeCategory === 'All'
      ? skillCategories.flatMap((c) => c.skills)
      : skillCategories.find((c) => c.title === activeCategory)?.skills || [];

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            My Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Technical Skills
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => {
            const matchedCategory = skillCategories.find((c) => c.title === category);
            return (
              <button
                id={`skill-filter-${category.replace(/\s+/g, '-').toLowerCase()}`}
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center space-x-1.5 px-4.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-350 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-red-500 text-white shadow-md shadow-violet-600/10'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-900'
                }`}
              >
                {matchedCategory && matchedCategory.icon}
                <span>{category}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Skill progress bars Grid */}
        <div id="skills-bars-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-violet-100 dark:hover:border-violet-950 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm sm:text-base flex items-center space-x-1.5">
                  <CheckCircle size={14} className="text-violet-500" />
                  <span>{skill.name}</span>
                </span>
                <span className="text-xs font-mono font-bold text-violet-600 dark:text-violet-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress bar boundary */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-violet-600 to-red-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Informational accent note */}
        <div className="mt-14 p-4 rounded-xl bg-violet-50/20 dark:bg-slate-900/30 border border-violet-100/50 dark:border-violet-950/50 text-center max-w-2xl mx-auto flex items-center justify-center space-x-2 text-xs sm:text-sm text-slate-500 dark:text-slate-405">
          <span>💡 Includes theoretical fundamentals (AI Mathematics, Stats, Loss functions) alongside hands-on code experiences.</span>
        </div>
      </div>
    </section>
  );
};
