/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { EducationTimeline } from './components/EducationTimeline';
import { Achievements } from './components/Achievements';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { StartupLoader } from './components/StartupLoader';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <ThemeProvider>
      {showLoader && (
        <StartupLoader onComplete={() => setShowLoader(false)} />
      )}
      
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen transition-colors duration-300 antialiased font-sans flex flex-col justify-between">
        <Navbar />
        
        <main className="flex-1 w-full">
          {/* Main sections coordinates */}
          <Hero />
          <About />
          <Skills />
          <Projects />
          <EducationTimeline />
          <Achievements />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}
