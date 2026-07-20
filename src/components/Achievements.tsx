/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Code2, LineChart, Sparkles, Cpu, ExternalLink, ArrowRight } from 'lucide-react';

interface AchievementItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  metric?: string;
  metricsLabel?: string;
  accentClass: string;
}

export const Achievements: React.FC = () => {
  const achievements: AchievementItem[] = [
    {
      id: 'leetcode',
      icon: <Code2 size={24} className="text-amber-500" />,
      title: 'Active on LeetCode',
      subtitle: 'Algorithmic Problem Solving',
      description: 'Regularly solving computer science challenges. Focused on arrays, hashing, sliding windows, and binary tree algorithms to hone analytical thinking.',
      metric: '120+',
      metricsLabel: 'Problems Solved',
      accentClass: 'border-amber-200/60 dark:border-amber-950 hover:bg-amber-50/20'
    },
    {
      id: 'hackerrank',
      icon: <Award size={24} className="text-emerald-500" />,
      title: 'Active on HackerRank',
      subtitle: 'Core Concept Evaluation',
      description: 'Earning high proficiency credentials and programming stars in Python, Algorithms, and SQL challenges to prove database and development mastery.',
      metric: '5-Star',
      metricsLabel: 'Python Badge',
      accentClass: 'border-emerald-200/60 dark:border-emerald-950 hover:bg-emerald-50/20'
    },
    {
      id: 'ai-math',
      icon: <LineChart size={24} className="text-violet-500" />,
      title: 'Learning AI Mathematics',
      subtitle: 'Statistical Underpinnings',
      description: 'Strengthening internal foundations in Linear Algebra, Multi-variable Calculus, Probability modules, loss derivation models, and custom matrices calculation.',
      metric: 'Active',
      metricsLabel: 'Continuous Exploration',
      accentClass: 'border-violet-200/60 dark:border-violet-950 hover:bg-violet-50/20'
    },
    {
      id: 'ai-tools',
      icon: <Sparkles size={24} className="text-red-500" />,
      title: 'Exploring Latest AI Tools',
      subtitle: 'Next-Generation Dev Stack',
      description: 'Actively testing state-of-the-art vision models, prompt compilation patterns, pipeline chains, and agentic micro-frameworks for software automation.',
      metric: 'Daily',
      metricsLabel: 'Framework R&D',
      accentClass: 'border-red-200/60 dark:border-red-950 hover:bg-red-50/20'
    }
  ];

  return (
    <section
      id="achievements"
      className="py-20 sm:py-24 bg-white dark:bg-slate-905 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            Acquisitions & Hobbies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Achievements & Focus
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        {/* Bento Grid layout style card board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievements.map((item) => (
            <div
              id={`achievement-${item.id}`}
              key={item.id}
              className={`p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-805 shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow ${item.accentClass}`}
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mt-0.5">
                    {item.subtitle}
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Badging indicator bar inside */}
              {item.metric && (
                <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-505">
                    {item.metricsLabel}
                  </span>
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200/50 dark:border-slate-800 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 active-pulse" />
                    <span>{item.metric}</span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
