/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Github, Linkedin, BrainCircuit } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="portfolio-footer" className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left">
          {/* Logo & descriptive footer */}
          <div className="space-y-2">
            <div
              onClick={handleScrollTop}
              className="flex items-center justify-center md:justify-start space-x-2 font-display font-medium text-lg text-white cursor-pointer hover:text-violet-400 transition-colors"
            >
              <BrainCircuit className="text-violet-500 fill-violet-500/10" size={20} />
              <span>Injam Mokshagna</span>
            </div>
            <p className="text-xs text-slate-505 max-w-sm">
              Formulating regression, classification systems, and computer vision models with high utility.
            </p>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-3">
            <a
              id="footer-social-email"
              href="mailto:injammokshagna@gmail.com"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-red-500 hover:text-white text-slate-400 font-bold transition-all"
              aria-label="Email Address"
            >
              <Mail size={16} />
            </a>
            <a
              id="footer-social-github"
              href="https://github.com/Moksha-25"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-750 hover:text-white text-slate-400 font-bold transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={16} />
            </a>
            <a
              id="footer-social-linkedin"
              href="https://www.linkedin.com/in/injam-mokshagna"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-400 font-bold transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Copyright notice section */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs text-slate-500 font-medium">
            © {currentYear} Injam Mokshagna. Built with passion for AI, Data Science, and Software Development.
          </p>
          <div className="flex space-x-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
            <span>Responsive Layout</span>
            <span>•</span>
            <span>React SPA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
