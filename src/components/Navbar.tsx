/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import { Menu, X, Sun, Moon, Database } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background shift on scroll
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Quick intersection estimation
      const scrollPosition = window.scrollY + 150;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div
            id="nav-logo"
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-2.5 cursor-pointer font-display font-medium text-xl tracking-tight text-slate-900 dark:text-white"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-red-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-violet-500/20">
              IM
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Injam <span className="text-violet-600 dark:text-violet-400 font-extrabold">Mokshagna</span>
              </h1>
              <p className="hidden xs:block text-[9px] text-violet-500 dark:text-violet-400 font-mono tracking-widest uppercase">
                Python Developer | Data Scientist
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div id="desktop-nav-links" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/45 border-b-2 border-violet-500/80'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Vertical Divider */}
            <span className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

            {/* Theme Toggle Button */}
            <button
              id="theme-toggler"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle light/dark theme"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={20} className="hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Mobile Hamburg Toggle & Theme */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="theme-toggler-mobile"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle light/dark theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/45'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
