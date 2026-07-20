/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Terminal, BrainCircuit, Activity, Cpu, Code2, Sparkles } from 'lucide-react';

interface StartupLoaderProps {
  onComplete: () => void;
}

export const StartupLoader: React.FC<StartupLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [bootingPhase, setBootingPhase] = useState('Initializing Core Project Workspace...');
  const [displayLogs, setDisplayLogs] = useState<string[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  const keyLogs = [
    '⚡ Establishing direct neural connection to Injam Mokshagna profile...',
    '⚙️ Loading linear algebra & multi-variable calculus metrics...',
    '📊 Slicing house pricing dataset matrices [13320 records x 9 columns]',
    '🧠 Instantiating classification models: compile_opt("adam")',
    '👁️ Calibrating computer vision webcam pipeline canvas buffers...',
    '🟢 Establishing persistent room connections to localhost:3000...',
    '🚀 Boosting walk and code joy index to 100%...',
    '✨ System status optimized: WELCOME TO THE COGNITIVE SHOWCASE!'
  ];

  useEffect(() => {
    if (progress < 20) {
      setBootingPhase('🔗 ESTABLISHING NEURAL CONNOTATIONS...');
    } else if (progress < 40) {
      setBootingPhase('⚙️ MOUNTING LINEAR ALGEBRA LOSS MATRIX...');
    } else if (progress < 65) {
      setBootingPhase('🧠 TRAINING CONVOLUTIONAL CLASSIFICATION PIPELINE...');
    } else if (progress < 85) {
      setBootingPhase('⚡ MAXIMIZING CAFFEINE INDEX & CODE JOY...');
    } else {
      setBootingPhase('✨ ALL SYSTEMS HIGHLY JOYFUL. MOUNTING PORTFOLIO!');
    }
  }, [progress]);

  useEffect(() => {
    // 5 seconds total duration. Progress reaches 100 at 4.5 seconds, then enters fadeOut state.
    const runDuration = 4800; 
    const stepInterval = 40; // Frequency of progress updates
    const progressPerStep = 100 / (runDuration / stepInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + progressPerStep;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, stepInterval);

    // Staggered boot logs insertion
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < keyLogs.length) {
        setDisplayLogs(prev => [...prev, keyLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 450);

    // Trigger completion fade
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
      // Wait for exit transition to terminate
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }, runDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(logInterval);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out ${
        fadeOut ? 'opacity-0 scale-[1.05] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Animated Sparkle/Matrix backdrop video simulation */}
      <div className="absolute inset-0 bg-[#090d16] pointer-events-none overflow-hidden">
        
        {/* Futuristic Grid Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-60" />
        
        {/* Soft Ambient glowing cyberpunk lights */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[180px] animate-pulse" />
        
        {/* Moving Laser line scan simulation (High-tech tech visual backdrop) */}
        <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-red-400/30 to-transparent top-0 animate-laser" />

        {/* Binary water stream matrices floating */}
        <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none font-mono text-[10px] text-emerald-400 flex flex-wrap gap-x-12 justify-around overflow-hidden p-6 leading-relaxed">
          {Array.from({ length: 15 }).map((_, col) => (
            <div key={col} className="flex flex-col animate-matrix" style={{ animationDelay: `${col * 0.3}s` }}>
              {Array.from({ length: 30 }).map((_, row) => (
                <span key={row}>{Math.random() > 0.5 ? '1' : '0'}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main holographic container card */}
      <div className="relative max-w-2xl w-full mx-auto px-6 z-10 flex flex-col items-center text-center space-y-8">
        
        {/* Immersive Glowing Logo Sphere */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-red-500 rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-4 shadow-2xl">
            <BrainCircuit size={40} className="text-violet-400 animate-spin-slow duration-[1000s]" />
          </div>
          {/* Pulsing micro circles */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-slate-950 animate-ping" />
        </div>

        {/* Text descriptions */}
        <div className="space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-violet-400 font-bold">
            Initializing Holo-Portfolio Space
          </h2>
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
            INJAM MOKSHAGNA
          </h3>
          <p className="text-xs font-mono text-slate-400 max-w-md mx-auto transition-all duration-300">
            {bootingPhase}
          </p>
        </div>

        {/* Boot Terminal Logs simulation window */}
        <div className="w-full bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 font-mono text-[10px] text-left text-violet-400 space-y-2 h-36 overflow-y-auto no-scrollbar shadow-inner backdrop-blur-md">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 mb-2 text-slate-500 select-none">
            <Terminal size={12} />
            <span className="text-[9px] font-bold uppercase tracking-wider">Mokshagna Core Loader Engine v3.1</span>
          </div>
          <div className="space-y-1.5 flex flex-col">
            {displayLogs.map((log, index) => {
              const logStr = String(log || '');
              const isHighlight = logStr.includes('WELCOM') || logStr.includes('🟢') || logStr.includes('✨') || logStr.includes('SUCCESS');
              return (
                <div key={index} className="flex items-start space-x-1.5 break-words">
                  <span className="text-slate-500 font-bold">&gt;&gt;</span>
                  <span className={isHighlight ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {logStr}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Numeric metric percentage and progress bar */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold">
            <div className="flex items-center space-x-1.5">
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              <span>COMPILATION SCORE</span>
            </div>
            <span className="text-violet-400 font-extrabold">{progress.toFixed(0)}%</span>
          </div>

          <div className="h-2 w-full bg-slate-900 border border-slate-800 rounded-full p-0.5 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-red-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Skip Prompt */}
        <button
          id="skip-loader-btn"
          onClick={onComplete}
          className="px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/40 text-[10px] font-mono text-slate-400 hover:text-white hover:border-slate-500 transition-all cursor-pointer shadow-sm select-none"
        >
          Skip Intro Cinematic ({progress.toFixed(0)}%) ⤏
        </button>
      </div>

      {/* Cyberpunk branding bottom lines */}
      <div className="absolute bottom-6 flex items-center space-x-6 text-slate-600 font-mono text-[9px] uppercase tracking-widest select-none">
        <span className="flex items-center space-x-1.5">
          <Cpu size={10} />
          <span>Core: Web3000 Node</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1.5">
          <Code2 size={10} />
          <span>React ML Sandbox</span>
        </span>
      </div>
    </div>
  );
};
