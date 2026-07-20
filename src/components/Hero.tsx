/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowDown, Mail, Briefcase, FileDown, Eye, CheckCircle2, Award, BookOpen, GraduationCap, Github, Linkedin, Phone } from 'lucide-react';
import { DeveloperSimulation } from './DeveloperSimulation';

export const Hero: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [phrases] = useState([
    'Python Developer',
    'Data Science Enthusiast',
    'Machine Learning Developer',
    'AI Builder'
  ]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, charIdx - 1));
          setCharIdx((prev) => prev - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % phrases.length);
      }
    } else {
      if (charIdx < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.substring(0, charIdx + 1));
          setCharIdx((prev) => prev + 1);
        }, 100);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 1500); // Wait on complete phrase
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, phrases]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePrintResume = () => {
    try {
      if (typeof window !== 'undefined' && typeof window.print === 'function') {
        window.print();
      } else {
        console.warn('window.print is not available.');
      }
    } catch (err) {
      console.warn('Printing is not supported or blocked in current preview sandbox context:', err);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      {/* Decorative gradient glowing spheres */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-violet-400/20 dark:bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-red-400/20 dark:bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-semibold tracking-wide">
              <span>🚀 Open for Data Science & ML Opportunities</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              Hi, I'm <br className="sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-red-500 dark:from-violet-400 dark:to-red-400">Injam Mokshagna</span>
            </h1>

            {/* Cycling typewriter */}
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-slate-700 dark:text-slate-300 flex items-center min-h-[40px]">
              <span className="text-slate-900 dark:text-white mr-2">I'm a</span>
              <span className="text-violet-600 dark:text-violet-400 font-bold cursor-blink pb-1 pr-1">
                {typedText}
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Python-focused developer passionate about Data Science, Machine Learning, Analytics, and Software Development. Experienced in building predictive models, data-driven applications, and AI-powered solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                id="cta-contact"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-red-500 hover:from-violet-700 hover:to-red-600 text-white font-medium shadow-lg shadow-violet-500/25 dark:shadow-violet-950/35 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail size={18} />
                <span>Contact Me</span>
              </button>

              <button
                id="cta-resume"
                onClick={() => setIsResumeModalOpen(true)}
                className="inline-flex items-center space-x-2 px-3 sm:px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-400 text-slate-700 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <FileDown size={18} />
                <span>View / Download Resume</span>
              </button>

              <button
                id="cta-about"
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center space-x-1.5 px-5 py-3 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-semibold transition-colors cursor-pointer"
              >
                <span>About Me</span>
                <ArrowDown size={16} className="animate-bounce text-violet-500" />
              </button>
            </div>
          </div>

          {/* Interactive visual canvas mockup */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <DeveloperSimulation />
          </div>
        </div>
      </div>

      {/* Dynamic resume viewer modal */}
      {isResumeModalOpen && (
        <div id="resume-viewer-modal" className="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-6 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm">
          <div className="relative transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl transition-all max-w-4xl w-full border border-slate-200 dark:border-slate-800">
            {/* Modal Actions */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <GraduationCap className="text-violet-500 dark:text-violet-400" />
                <span>Injam Mokshagna — Professional CV</span>
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  id="modal-print-button"
                  onClick={handlePrintResume}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  <Eye size={14} />
                  <span>Interactive Print / Save PDF</span>
                </button>
                <button
                  id="modal-dismiss-button"
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-1 px-2.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Resume Content Sheet (Styled to match print criteria elegantly) */}
            <div id="printable-resume-area" className="p-6 md:p-8 max-h-[75vh] overflow-y-auto print:max-h-full print:overflow-visible print:p-0 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
              <div className="flex flex-col md:flex-row md:justify-between border-b-2 border-violet-600 dark:border-violet-500 pb-5">
                <div>
                  <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">Injam Mokshagna</h2>
                  <p className="text-violet-600 dark:text-violet-400 font-semibold mt-1">Python Developer | Data Science Enthusiast</p>
                  <p className="text-sm text-slate-500 mt-2 max-w-md">
                    Experienced in building predictive machine learning models, deploying data-centric software utilities, and creating AI solutions.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <p className="flex items-center space-x-2">
                    <Mail size={14} /> <span>injammokshagna@gmail.com</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Phone size={14} /> <span>+91 9392728189</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Github size={14} /> <span>github.com/Moksha-25</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Linkedin size={14} /> <span>linkedin.com/in/rb.gy/r3zyl5</span>
                  </p>
                </div>
              </div>

              {/* Education Block */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-violet-600 dark:text-violet-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                  Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-950 dark:text-white text-sm sm:text-base">
                      <h5>Bachelor of Technology in Computer Science</h5>
                      <span className="text-slate-500 text-xs sm:text-sm font-normal">2021 – 2025</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Sree Dattha Group of Institutions</p>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-950 dark:text-white text-sm">Intermediate Education</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Sri Chaitanya Junior College</p>
                    </div>
                    <span className="text-slate-500 text-xs">2019 – 2021</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-slate-950 dark:text-white text-sm">Schooling</div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Gade Rukma Reddy Memorial High School</p>
                    </div>
                    <span className="text-slate-500 text-xs">2018 – 2019</span>
                  </div>
                </div>
              </div>

              {/* Skills Sheet */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-violet-600 dark:text-violet-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                  Core Skills
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-slate-600 dark:text-slate-400">
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white text-xs">Data Science & AI:</span>
                    <span className="text-xs">Machine Learning, Deep Learning, Computer Vision, NLP</span>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white text-xs">Programming:</span>
                    <span className="text-xs">Python, SQL, HTML, CSS</span>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white text-xs">Analysis & BI:</span>
                    <span className="text-xs">Power BI, Tableau, Excel, NumPy, Pandas, Matplotlib</span>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white text-xs">ML Libraries:</span>
                    <span className="text-xs">Scikit-Learn, TensorFlow, OpenCV</span>
                  </div>
                  <div>
                    <span className="font-bold block text-slate-900 dark:text-white text-xs">Tools & Platform:</span>
                    <span className="text-xs">Git, GitHub, Jupyter Notebook</span>
                  </div>
                </div>
              </div>

              {/* Key Projects Summary */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-violet-600 dark:text-violet-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                  Selected Engineering Projects
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Bengaluru House Price Prediction</h5>
                    <p className="mt-0.5">Developed a machine learning pipeline using feature engineering, data cleaning, and regression models. Deployed with Streamlit.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Loan Eligibility Prediction System</h5>
                    <p className="mt-0.5">Engineered a ML classification model to automate approvals, backed by demographic and transaction variables.</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Drowsiness Detection system</h5>
                    <p className="mt-0.5">Real-time computer vision system tracking facial landmarks and eyes aspect ratio (EAR) using CNN models to fire safety alerts.</p>
                  </div>
                </div>
              </div>

              {/* Achievements banner */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-violet-600 dark:text-violet-400 border-b border-slate-200 dark:border-slate-800 pb-1 mb-3">
                  Achievements
                </h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Active programmer solving algorithmic challenges on LeetCode & HackerRank.</li>
                  <li>In-depth focus on Machine Learning mathematics and numerical computing foundations.</li>
                  <li>Regularly exploring and utilizing AI developer tools.</li>
                </ul>
              </div>
            </div>

            {/* Modal foot */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
              <button
                id="modal-close"
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
