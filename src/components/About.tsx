/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Award, Target, Code, Heart, Layers, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const cards = [
    {
      icon: <Code className="text-violet-500 stroke-[2.5]" size={24} />,
      title: 'Python Specialist',
      desc: 'Writing clean, idiomatic Python code optimized for statistical calculation, predictive modeling, and system scripting.'
    },
    {
      icon: <Layers className="text-red-500 stroke-[2.5]" size={24} />,
      title: 'Machine Learning & DL',
      desc: 'Passionate about training neural networks, applying CNNs, and utilizing Scikit-learn algorithms to extract insights.'
    },
    {
      icon: <Sparkles className="text-violet-500 stroke-[2.5]" size={24} />,
      title: 'AI Product Maker',
      desc: 'Developing fully functional prediction services and real-time computer vision streams that run efficiently.'
    }
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            Who am I
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Main Story Panel */}
          <div className="space-y-6">
            <h4 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-105">
              Transforming raw complex data into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-red-500 dark:from-violet-400 dark:to-red-400 font-extrabold">intelligent, live interactions</span>.
            </h4>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              I am completing my <strong className="text-slate-900 dark:text-white font-semibold">Bachelor of Technology in Computer Science from Sree Dattha Group of Institutions (2021–2025)</strong>. From the early stages of my degree, I gravitated toward fields that blend mathematical logic with computational power—spearheading my path into Data Science and Deep Learning.
            </p>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              My core philosophy is learning by doing. I believe predictive models achieve their ultimate value only when packed into highly responsive, accessible UI utilities where users can easily test and visualize the decisions. Whether it's estimating property values, automating bank loans, or detecting real-time driver fatigue, I build systems with production stability and accuracy in mind.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="px-5 py-4 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="block text-3xl font-display font-bold text-violet-600 dark:text-violet-400">2025</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Graduation Year</span>
              </div>
              <div className="px-5 py-4 bg-slate-50/60 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="block text-3xl font-display font-bold text-red-500 dark:text-red-400 animate-pulse">4+</span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-1">Key AI/ML Projects</span>
              </div>
            </div>
          </div>

          {/* Core Focus Columns */}
          <div className="space-y-6 lg:pl-4">
            <h5 className="text-lg font-bold font-display text-slate-800 dark:text-slate-200">
              My Core Focus Areas
            </h5>

            <div className="space-y-4">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800/60 hover:border-violet-200 dark:hover:border-violet-900/60 transition-all duration-300"
                >
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-slate-900 dark:text-white">
                    {card.icon}
                  </div>
                  <div>
                    <h6 className="font-bold font-display text-slate-900 dark:text-white text-base">
                      {card.title}
                    </h6>
                    <p className="text-sm text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
