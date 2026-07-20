/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Terminal, Moon, Zap, Volume2, VolumeX, 
  Cpu, GitBranch, Activity, Code, Laptop, Database, RotateCcw 
} from 'lucide-react';
// @ts-ignore
import avatarImg from './avatar.png';

type Mode = 'sleep' | 'joy' | 'research' | 'cinematic';

export const DeveloperSimulation: React.FC = () => {
  const [mode, setMode] = useState<Mode>('sleep');
  const [isMuted, setIsMuted] = useState(true);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [coffeeLevel, setCoffeeLevel] = useState(15);
  const [accuracy, setAccuracy] = useState(74.2);
  const [cudaLoad, setCudaLoad] = useState(12.5);
  const [gitCommits, setGitCommits] = useState(384);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  
  // Custom synthetic retro sound effects using Web Audio API safely re-using context
  const audioContextRef = useRef<any>(null);

  const playSynthSound = (type: 'keypress' | 'chime' | 'snore' | 'beep') => {
    if (isMuted) return;
    try {
      if (typeof window === 'undefined') return;
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
        audioContextRef.current = new AudioCtx();
      }
      
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;

      // Resume context if suspended (browser security autoplay blocks)
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      
      if (type === 'keypress') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120 + Math.random() * 260, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'chime') {
        const notes = [440.00, 554.37, 659.25, 880.00]; // A4, C#5, E5, A5 futuristic major chord
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.07);
          osc.stop(ctx.currentTime + idx * 0.07 + 0.4);
        });
      } else if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'snore') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(55, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(85, ctx.currentTime + 1.0);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch (e) {
      // Audio synth handled safe fallback
    }
  };

  // Rotate camera on mouse move (3D cinematic parallax effect)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation to a subtle 4.5 degrees max for gorgeous visual premium feel
    setRotate({
      x: -y / (rect.height / 9),
      y: x / (rect.width / 9),
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Switch modes
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    if (newMode === 'joy') {
      playSynthSound('chime');
      setCoffeeLevel(100);
      setCudaLoad(86.4);
      setAccuracy(99.6);
      setTerminalLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ⚡ Speed Coding triggered! Compiling high-yield components.`,
        `[${new Date().toLocaleTimeString()}] CAFFEINE RATIO RESTORED: 100%`,
        `[${new Date().toLocaleTimeString()}] IDE Workspace streaming active code blocks...`,
        `[${new Date().toLocaleTimeString()}] RGB Mechanical Switch: Keypress feedback active`,
      ]);
    } else if (newMode === 'research') {
      playSynthSound('beep');
      setCoffeeLevel(85);
      setCudaLoad(99.1);
      setAccuracy(99.8);
      setTerminalLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 🧠 Neural Matrix mode active. Initializing AI algorithms...`,
        `[${new Date().toLocaleTimeString()}] CUDA Cores load at 99.1% (Deep Research Pipeline)`,
        `[${new Date().toLocaleTimeString()}] Fitting ML models: Gradient descent optimizing loss...`,
        `[${new Date().toLocaleTimeString()}] Accuracy threshold reached: 99.82% SUCCESS!`,
      ]);
    } else if (newMode === 'cinematic') {
      playSynthSound('chime');
      setCoffeeLevel(92);
      setCudaLoad(45.2);
      setAccuracy(99.9);
      setTerminalLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 🎬 Cinematic 5-Second Portrait sequence initialized.`,
        `[${new Date().toLocaleTimeString()}] CAMERA: Slow track & zoom-in active (5.0s loop)`,
        `[${new Date().toLocaleTimeString()}] RENDER: Gaussian Depth-of-Field enabled`,
        `[${new Date().toLocaleTimeString()}] AMBIENT: Soft monitor glow cycles activated`,
        `[${new Date().toLocaleTimeString()}] OCULUS: Autonomic blink-cycles synchronized`,
      ]);
    } else {
      playSynthSound('snore');
      setCoffeeLevel(15);
      setCudaLoad(4.2);
      setAccuracy(74.2);
      setTerminalLogs(prev => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] 💤 Cozy standby initiated. Conserving system compute.`,
        `[${new Date().toLocaleTimeString()}] Warning: Mug running empty. Standby for replenishment.`,
        `[${new Date().toLocaleTimeString()}] Late-night background tasks sleeping...`,
      ]);
    }
  };

  // Run loops to simulate logs or system changes
  useEffect(() => {
    let logInterval: NodeJS.Timeout;
    let attributeInterval: NodeJS.Timeout;
    
    // Set initial logs based on mode
    if (mode === 'sleep') {
      setTerminalLogs([
        '>>> INITIALIZING BACKGROUND KERNEL CORES... STANDBY',
        '>>> Warning: Caffeine levels below optimal bounds (< 15%)',
        '>>> Matrix calculations resting. Safe sleep cycles configured.',
        '>>> Current process state: Cozy late-night meditation',
      ]);
    } else if (mode === 'joy') {
      setTerminalLogs([
        '>>> FULL SYSTEM POWER RESTORED!',
        '>>> Rendering IDE viewport at 120 FPS...',
        '>>> Merging Git pull-request with 0 conflicts.',
        '>>> Active typing feedback running. Let\'s code!',
      ]);
    } else if (mode === 'cinematic') {
      setTerminalLogs([
        '>>> CINEMATIC REAL-TIME VIEWPORT CALIBRATION',
        '>>> Depth-of-Field filter: Gaussian 4.5px enabled',
        '>>> Track & Dolly Zoom lens: 50mm cinematic ratio (16:9)',
        '>>> Face detection: Active (Mokshagna, custom avatar profile)',
      ]);
    } else {
      setTerminalLogs([
        '>>> COGNITIVE DEEP RESEARCH NODES RUNNING',
        '>>> Initializing TensorBoard logger pipelines...',
        '>>> Training neural matrix weights: Epoch 48/50',
        '>>> Auto-tuning learning rate (alpha=0.0035)... OK',
      ]);
    }

    logInterval = setInterval(() => {
      let activePhrases: string[] = [];
      if (mode === 'sleep') {
        activePhrases = [
          `[${new Date().toLocaleTimeString()}] zzzz... computing sleeping variables...`,
          `[${new Date().toLocaleTimeString()}] Cozy standby. Memory cache cooling down...`,
          `[${new Date().toLocaleTimeString()}] System temperature optimal at 28.5°C`,
        ];
      } else if (mode === 'joy') {
        activePhrases = [
          `[${new Date().toLocaleTimeString()}] SUCCESS: Compiled applet bundle.`,
          `[${new Date().toLocaleTimeString()}] Mechanical click: Typing responsive viewport.`,
          `[${new Date().toLocaleTimeString()}] Git commit sequence triggered.`,
          `[${new Date().toLocaleTimeString()}] Tailwind utility tree compiled in 1.4ms`,
        ];
      } else if (mode === 'cinematic') {
        activePhrases = [
          `[${new Date().toLocaleTimeString()}] CAMERA: Camera pan tracking locked.`,
          `[${new Date().toLocaleTimeString()}] OPHTHALMOLOGY: Subtle blink sequence active.`,
          `[${new Date().toLocaleTimeString()}] LIGHTING: Ambient glow shift cycle matching screens.`,
          `[${new Date().toLocaleTimeString()}] DEPTH: Bokeh lens blurring peripheral monitors.`,
        ];
      } else {
        activePhrases = [
          `[${new Date().toLocaleTimeString()}] Neural feed: Fitting SGD parameters...`,
          `[${new Date().toLocaleTimeString()}] CUDA Engine: Processing tensor gradients...`,
          `[${new Date().toLocaleTimeString()}] Convergence verified: Loss minimized to 0.002`,
          `[${new Date().toLocaleTimeString()}] Training Accuracy: 99.85%`,
        ];
      }
      
      const randomLine = activePhrases[Math.floor(Math.random() * activePhrases.length)];
      setTerminalLogs(prev => {
        const next = [...prev, randomLine];
        return next.slice(-15); // Keep a tidy console buffer
      });

      if (mode === 'joy') {
        playSynthSound('keypress');
      } else if (mode === 'research') {
        if (Math.random() > 0.6) playSynthSound('keypress');
      } else if (mode === 'cinematic') {
        if (Math.random() > 0.7) playSynthSound('keypress');
      } else {
        if (Math.random() > 0.8) playSynthSound('snore');
      }
    }, mode === 'sleep' ? 3800 : mode === 'joy' ? 1000 : 1500);

    // Drifting metrics simulator
    attributeInterval = setInterval(() => {
      if (mode === 'sleep') {
        setCoffeeLevel(prev => Math.max(5, prev - 1));
        setAccuracy(prev => Math.max(70, +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
        setCudaLoad(prev => Math.max(3, +(prev + (Math.random() * 0.5 - 0.25)).toFixed(1)));
      } else if (mode === 'joy') {
        setCoffeeLevel(prev => Math.max(75, prev - 0.4));
        setAccuracy(prev => Math.min(100, +(prev + (Math.random() * 0.05 - 0.02)).toFixed(1)));
        setCudaLoad(prev => Math.min(90, Math.max(80, +(prev + (Math.random() * 4 - 2)).toFixed(1))));
        if (Math.random() > 0.7) setGitCommits(prev => prev + 1);
      } else if (mode === 'cinematic') {
        setCoffeeLevel(prev => Math.max(80, prev - 0.2));
        setAccuracy(prev => Math.min(100, Math.max(99.8, +(prev + (Math.random() * 0.01 - 0.005)).toFixed(3))));
        setCudaLoad(prev => Math.min(50, Math.max(40, +(prev + (Math.random() * 1 - 0.5)).toFixed(1))));
        if (Math.random() > 0.95) setGitCommits(prev => prev + 1);
      } else {
        setCoffeeLevel(prev => Math.max(65, prev - 0.6));
        setAccuracy(prev => Math.min(100, Math.max(99.5, +(prev + (Math.random() * 0.02 - 0.01)).toFixed(2))));
        setCudaLoad(prev => Math.min(100, Math.max(95, +(prev + (Math.random() * 1 - 0.5)).toFixed(1))));
        if (Math.random() > 0.9) setGitCommits(prev => prev + 1);
      }
    }, 2000);

    return () => {
      clearInterval(logInterval);
      clearInterval(attributeInterval);
    };
  }, [mode]);

  // Support external custom logs (e.g. from the Contact Form when user inputs data)
  useEffect(() => {
    const handleAddLog = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setTerminalLogs(prev => {
          const next = [...prev, customEvent.detail];
          return next.slice(-15);
        });
        playSynthSound('chime');
      }
    };
    window.addEventListener('add-terminal-log', handleAddLog);
    return () => {
      window.removeEventListener('add-terminal-log', handleAddLog);
    };
  }, []);

  // Keep terminal scrolled to bottom safely without affecting parent/window scroll
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  return (
    <div id="interactive-workspace-container" className="relative w-full flex flex-col space-y-6">
      
      {/* Self-contained high-end CSS animations for keyframe vectors */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scrollUpCode {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-50px); }
        }
        @keyframes pulseMatrixGlow {
          0%, 100% { opacity: 0.15; filter: drop-shadow(0 0 4px rgba(139, 92, 246, 0.2)); }
          50% { opacity: 0.35; filter: drop-shadow(0 0 16px rgba(139, 92, 246, 0.6)); }
        }
        @keyframes scanlineAnim {
          0% { transform: translateY(-135px); }
          100% { transform: translateY(135px); }
        }
        @keyframes floatHoloHUD {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes floatHoloHUD2 {
          0%, 100% { transform: translateY(-6px); }
          50% { transform: translateY(2px); }
        }
        @keyframes steamFloat {
          0% { transform: translateY(0px) scaleX(1); opacity: 0; }
          15% { opacity: 0.5; }
          50% { transform: translateY(-20px) scaleX(1.3); opacity: 0.3; }
          100% { transform: translateY(-40px) scaleX(0.8); opacity: 0; }
        }
        @keyframes keycapFlash {
          0%, 100% { fill: #1e293b; }
          50% { fill: #22d3ee; }
        }
        @keyframes activeHandsMove {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-2px) translateX(1px); }
          75% { transform: translateY(1px) translateX(-2px); }
        }
        @keyframes cinematicCamera {
          0% {
            transform: scale(1.0) translate(0px, 0px);
          }
          100% {
            transform: scale(1.1) translate(1px, -3px);
          }
        }
        @keyframes cinematicBlink {
          0%, 88%, 92%, 100% {
            transform: scaleY(0);
            opacity: 0;
          }
          90% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
        @keyframes cinematicBreath {
          0%, 100% {
            transform: translateY(0px) scale(1.0);
          }
          50% {
            transform: translateY(-1.5px) scale(1.005);
          }
        }
        .code-scroller {
          animation: scrollUpCode 3s linear infinite;
        }
        .hud-floater-1 {
          animation: floatHoloHUD 5s ease-in-out infinite;
        }
        .hud-floater-2 {
          animation: floatHoloHUD2 6s ease-in-out infinite;
        }
        .steam-puff-1 {
          animation: steamFloat 2.5s ease-in-out infinite;
        }
        .steam-puff-2 {
          animation: steamFloat 2.5s ease-in-out infinite 1.2s;
        }
        .scanline-overlay {
          animation: scanlineAnim 3.5s linear infinite;
        }
        .keycap-active {
          animation: keycapFlash 0.3s ease-in-out infinite;
        }
        .typing-hands {
          animation: activeHandsMove 0.15s ease-in-out infinite;
        }
        .cinematic-zoom-wrapper {
          animation: cinematicCamera 5s cubic-bezier(0.25, 1, 0.5, 1) infinite alternate;
          transform-origin: 400px 180px;
          transition: all 1s ease-in-out;
        }
        .cinematic-eyelid-l {
          animation: cinematicBlink 4s ease-in-out infinite;
          transform-origin: 388px 153px;
        }
        .cinematic-eyelid-r {
          animation: cinematicBlink 4s ease-in-out infinite;
          transform-origin: 412px 153px;
        }
        .cinematic-body-breath {
          animation: cinematicBreath 4.5s ease-in-out infinite;
          transform-origin: 400px 240px;
        }
        .cinematic-bg-blurred {
          filter: blur(5px);
          opacity: 0.75;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cinematic-unblurred {
          filter: blur(0px);
          opacity: 1;
          transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cinematic-hands-slow {
          animation: activeHandsMove 0.35s ease-in-out infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      {/* Title control header with futuristic tab styling */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl w-full backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <div className={`p-2.5 rounded-xl transition-all duration-500 ${
            mode === 'joy' ? 'bg-red-500/20 text-red-400 animate-pulse' : 
            mode === 'research' ? 'bg-violet-500/20 text-violet-400 animate-pulse' : 
            mode === 'cinematic' ? 'bg-pink-500/20 text-pink-400 animate-pulse' :
            'bg-violet-500/10 text-violet-400'
          }`}>
            {mode === 'joy' ? <Code size={18} /> : mode === 'research' ? <Cpu size={18} /> : mode === 'cinematic' ? <Sparkles size={18} /> : <Moon size={18} />}
          </div>
          <div>
            <h4 id="workspace-mode-title" className="text-xs font-bold font-display text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              Workstation Holo-Simulator
              <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-500 font-mono px-1.5 py-0.5 rounded-md">Cinematic 3D</span>
            </h4>
            <p className="text-[10px] font-mono text-slate-500">
              Interactive State: {
                mode === 'joy' ? '⚡ WALK MODE / ACTIVE TYPING' : 
                mode === 'research' ? '🧠 AI DEEP RESEARCH PIPELINE' : 
                mode === 'cinematic' ? '🎬 CINEMATIC 5S PORTRAIT LOOP' :
                '💤 DIMMED / REST STANDBY'
              }
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          {/* Mute Button */}
          <button
            id="workspace-sound-toggle"
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isMuted 
                ? 'border-slate-300 dark:border-slate-800 text-slate-400 bg-transparent hover:bg-slate-200/30' 
                : 'border-red-500 dark:border-red-800 text-red-400 bg-red-500/10 animate-bounce'
            }`}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Sleep Toggle Button */}
          <button
            id="workspace-sleep-mode-btn"
            onClick={() => handleModeChange('sleep')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              mode === 'sleep' 
                ? 'bg-slate-200 dark:bg-slate-800 text-violet-600 dark:text-violet-400 border-violet-500/50' 
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Moon size={12} />
            <span>Standby</span>
          </button>

          {/* Speed Coding Button */}
          <button
            id="workspace-joy-mode-btn"
            onClick={() => handleModeChange('joy')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              mode === 'joy' 
                ? 'bg-gradient-to-r from-red-500 to-violet-500 text-white border-transparent shadow shadow-red-500/20' 
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Code size={12} />
            <span>Speed Code</span>
          </button>

          {/* AI Research Button */}
          <button
            id="workspace-research-mode-btn"
            onClick={() => handleModeChange('research')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              mode === 'research' 
                ? 'bg-gradient-to-r from-violet-600 to-red-500 text-white border-transparent shadow shadow-violet-500/20' 
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Cpu size={12} />
            <span>AI Research</span>
          </button>

          {/* Cinematic 5S Button */}
          <button
            id="workspace-cinematic-mode-btn"
            onClick={() => handleModeChange('cinematic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer flex items-center space-x-1.5 ${
              mode === 'cinematic' 
                ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-violet-600 text-white border-transparent shadow shadow-pink-500/20' 
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles size={12} />
            <span>Cinematic 5S</span>
          </button>
        </div>
      </div>

      {/* Main visual viewer frame */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full aspect-video rounded-3xl overflow-hidden bg-slate-950 border border-slate-200/40 dark:border-slate-800/80 shadow-2xl flex flex-col justify-between group [perspective:1200px]"
      >
        {/* Dynamic Interactive Ambient Cyberpunk backlighting */}
        <div 
          className={`absolute inset-0 bg-radial transition-all duration-1000 pointer-events-none ${
            mode === 'joy' ? 'from-red-900/30 via-slate-950/60 to-slate-950' : 
            mode === 'research' ? 'from-violet-900/35 via-slate-950/60 to-slate-950' : 
            mode === 'cinematic' ? 'from-pink-900/25 via-purple-950/40 via-slate-950/70 to-slate-950' :
            'from-violet-950/20 via-slate-950/80 to-slate-950'
          }`} 
        />

        {/* Techno neon dots grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-30" />

        {/* Live HUD Floating Indicators */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-1 select-none font-mono text-[9px] uppercase tracking-wider text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${
              mode === 'sleep' ? 'bg-amber-500 animate-pulse' : 
              mode === 'joy' ? 'bg-red-400 animate-ping' : 'bg-violet-400 animate-ping'
            }`} />
            <span>COCKPIT FEED: {mode === 'sleep' ? 'STANDBY MODE' : '120FPS CALIBRATED'}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-600">•</span>
            <span>Caffeine Quotient: {coffeeLevel.toFixed(0)}%</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-600">•</span>
            <span>Cuda Tensor Load: {cudaLoad.toFixed(1)}%</span>
          </div>
        </div>

        {/* Telemetry Diagnostics overlay block (Top Right) */}
        <div className="absolute top-4 right-4 z-20 hidden sm:flex flex-col space-y-1 bg-slate-950/90 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[9px] text-slate-400 select-none min-w-[140px] shadow-lg backdrop-blur-md">
          <div className="flex justify-between border-b border-slate-800/50 pb-1.5 text-[10px] font-bold text-violet-400">
            <span>⚙️ MONITOR METRICS</span>
          </div>
          <div className="flex justify-between pt-1">
            <span>Algorithm Acc:</span>
            <span className={mode === 'sleep' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
              {accuracy.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span>Precision Index:</span>
            <span className="text-red-400 font-bold">
              {mode === 'sleep' ? '75.2%' : mode === 'joy' ? '99.4%' : '99.8%'}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Git commits:</span>
            <span className="text-purple-400 font-bold">{gitCommits}</span>
          </div>
        </div>

        {/* Animated Workstation graphics workspace wrapper */}
        <div 
          className="flex-1 w-full flex items-center justify-center relative p-6 transition-all duration-300 ease-out"
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          
          {/* Active Workstation Ambient Backlight Glow behind desk */}
          <div className={`absolute bottom-4 md:bottom-8 w-5/6 h-32 blur-3xl rounded-full transition-all duration-1000 ${
            mode === 'joy' ? 'bg-red-500/20' : 
            mode === 'research' ? 'bg-violet-500/25' : 
            mode === 'cinematic' ? 'bg-pink-500/20' :
            'bg-violet-900/10'
          }`} />

          {/* High-fidelity Cinematic SVG Workstation Layout */}
          <svg viewBox="0 0 800 450" className="w-full h-full max-h-[330px] relative z-10 transition-transform duration-500 group-hover:scale-[1.015]">
            <defs>
              <linearGradient id="cyberCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9"/>
              </linearGradient>
              <linearGradient id="cyberViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85"/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.95"/>
              </linearGradient>
              <linearGradient id="standbyAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#451a03" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="deskBacklight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#020617"/>
              </linearGradient>
              <clipPath id="avatarClip">
                <rect x="345" y="110" width="110" height="135" rx="20" />
              </clipPath>
              <filter id="vectorGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* BACKGROUND CHIP PANELS & HANGING CABLES (Adds industrial tech aesthetics) */}
            <path d="M 120 0 L 120 70" stroke="#1e293b" strokeWidth="2.5" />
            <path d="M 680 0 L 680 50" stroke="#1e293b" strokeWidth="2.5" />
            <rect x="75" y="70" width="90" height="26" rx="5" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="120" y="86" fill="#475569" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              {mode === 'sleep' ? 'DORMANT' : mode === 'joy' ? 'SPEED_CODING' : mode === 'cinematic' ? 'CINEMATIC_5S' : 'AI_GRADIENT'}
            </text>

            {/* MONITORS (Left, Center, and Right displays implementing "multiple monitors displaying code") */}
            
            {/* 1. LEFT MONITOR (Data Visualizations & ML Gradients) */}
            <g className={mode === 'cinematic' ? 'cinematic-bg-blurred' : 'cinematic-unblurred'}>
              <rect x="110" y="130" width="170" height="110" rx="12" fill="#030712" stroke={mode === 'sleep' ? '#1e293b' : mode === 'joy' ? '#22d3ee' : '#a78bfa'} strokeWidth="2" className="transition-all duration-1000" />
              
              {/* Left Screen content */}
              {mode === 'sleep' ? (
                <g opacity="0.4">
                  <line x1="130" y1="180" x2="260" y2="180" stroke="#334155" strokeWidth="1.5" strokeDasharray="4" />
                  <text x="195" y="200" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">SYSTEM SLEEP()</text>
                </g>
              ) : mode === 'joy' ? (
                <g>
                  {/* Active Line Charts */}
                  <path d="M 125 210 Q 155 180 185 200 T 245 150" fill="none" stroke="#22d3ee" strokeWidth="2.5" className="transition-all duration-500" />
                  <path d="M 125 215 Q 155 195 185 210 T 245 170" fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3" opacity="0.6" />
                  <circle cx="245" cy="150" r="4.5" fill="#22d3ee" filter="url(#vectorGlow)" className="animate-ping" />
                  <text x="195" y="225" fill="#22d3ee" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle" opacity="0.8">
                    REAL-TIME PIPELINE COMPILING
                  </text>
                </g>
              ) : (
                <g>
                  {/* AI / ML Loss Gradient Nodes */}
                  <line x1="140" y1="160" x2="190" y2="190" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
                  <line x1="190" y1="190" x2="240" y2="160" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
                  <line x1="140" y1="210" x2="190" y2="190" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
                  <line x1="190" y1="190" x2="240" y2="210" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
                  
                  <circle cx="140" cy="160" r="6" fill="#8b5cf6" />
                  <circle cx="140" cy="210" r="6" fill="#8b5cf6" />
                  <circle cx="190" cy="190" r="8" fill="#c084fc" filter="url(#vectorGlow)" className="animate-pulse" />
                  <circle cx="240" cy="160" r="6" fill="#8b5cf6" />
                  <circle cx="240" cy="210" r="6" fill="#8b5cf6" />
                  
                  <text x="195" y="228" fill="#c084fc" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                    SGD CALIBRATION OPTIMIZER
                  </text>
                </g>
              )}

              {/* Left monitor stand */}
              <path d="M 195 240 L 195 295" stroke="#334155" strokeWidth="6" />
              <path d="M 170 295 L 220 295" stroke="#1e293b" strokeWidth="4.5" />
            </g>


            {/* 2. RIGHT MONITOR (Visual IDE - Scrolling Code Lines) */}
            <g className={mode === 'cinematic' ? 'cinematic-bg-blurred' : 'cinematic-unblurred'}>
              <rect x="520" y="130" width="170" height="110" rx="12" fill="#020617" stroke={mode === 'sleep' ? '#1e293b' : mode === 'joy' ? '#34d399' : '#f43f5e'} strokeWidth="2" className="transition-all duration-1000" />
              
              {/* Right screen content */}
              {mode === 'sleep' ? (
                <g opacity="0.4">
                  <text x="605" y="190" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">Disconnected</text>
                </g>
              ) : (
                <g>
                  {/* IDE Frame bar */}
                  <rect x="521" y="131" width="168" height="14" rx="3" fill="#0f172a" />
                  <circle cx="530" cy="138" r="2.5" fill="#ef4444" />
                  <circle cx="537" cy="138" r="2.5" fill="#f59e0b" />
                  <circle cx="544" cy="138" r="2.5" fill="#10b981" />

                  {/* Mask for scrolling code to keep it inside the screen viewport */}
                  <clipPath id="codeScreenClip">
                    <rect x="525" y="150" width="160" height="85" />
                  </clipPath>
                  
                  <g clipPath="url(#codeScreenClip)">
                    {/* Scrolling Code Container */}
                    <g className={mode === 'joy' ? 'code-scroller' : ''}>
                      {/* Simulated colorized code blocks */}
                      <g transform="translate(530, 160)">
                        <rect x="0" y="0" width="40" height="3" rx="1" fill="#c084fc" />
                        <rect x="45" y="0" width="55" height="3" rx="1" fill="#38bdf8" />
                        
                        <rect x="10" y="8" width="80" height="3" rx="1" fill="#4ade80" />
                        
                        <rect x="10" y="16" width="60" height="3" rx="1" fill="#f43f5e" />
                        <rect x="75" y="16" width="35" height="3" rx="1" fill="#fb7185" />
                        
                        <rect x="20" y="24" width="70" height="3" rx="1" fill="#fbcfe8" />
                        
                        <rect x="20" y="32" width="50" height="3" rx="1" fill="#38bdf8" />
                        <rect x="75" y="32" width="25" height="3" rx="1" fill="#4ade80" />

                        {/* Line wrapping replicates */}
                        <rect x="0" y="44" width="30" height="3" rx="1" fill="#c084fc" />
                        <rect x="35" y="44" width="70" height="3" rx="1" fill="#e2e8f0" />
                        <rect x="10" y="52" width="85" height="3" rx="1" fill="#fb7185" />
                        <rect x="10" y="60" width="50" height="3" rx="1" fill="#38bdf8" />
                        <rect x="20" y="68" width="60" height="3" rx="1" fill="#4ade80" />
                      </g>
                    </g>
                  </g>
                  
                  {/* Compiler active status pill */}
                  <g transform="translate(615, 215)">
                    <rect x="0" y="0" width="68" height="18" rx="5" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
                    <text x="34" y="11" fill="#34d399" fontSize="7" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                      ✔ COMPILED
                    </text>
                  </g>
                </g>
              )}

              {/* Right monitor stand */}
              <path d="M 605 240 L 605 295" stroke="#334155" strokeWidth="6" />
              <path d="M 580 295 L 630 295" stroke="#1e293b" strokeWidth="4.5" />
            </g>


            {/* 3. CENTER LAPTOP (Active Git Contribution Dashboard) */}
            <g className={mode === 'cinematic' ? 'cinematic-zoom-wrapper' : ''}>
              <rect x="325" y="225" width="150" height="55" rx="5" fill="#020617" stroke={mode === 'cinematic' ? '#f472b6' : '#334155'} strokeWidth={mode === 'cinematic' ? '2.2' : '1.5'} />
              <polygon points="315,280 485,280 495,288 305,288" fill="#1e293b" />
              <line x1="380" y1="284" x2="420" y2="284" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              
              {/* Laptop Screen Content - Git contributions grid */}
              {mode === 'sleep' ? (
                <polygon points="335,230 465,230 472,275 328,275" fill="url(#standbyAmber)" opacity="0.4" />
              ) : (
                <g>
                  {/* Cyan/Green Screen background backglow */}
                  <polygon points="335,230 465,230 472,275 328,275" fill="#051524" />
                  <g transform="translate(345, 236)">
                    {/* Contribution grid blocks simulating actual user activity */}
                    <rect x="0" y="0" width="8" height="8" rx="1.5" fill="#15803d" />
                    <rect x="12" y="0" width="8" height="8" rx="1.5" fill="#22c55e" />
                    <rect x="24" y="0" width="8" height="8" rx="1.5" fill="#4ade80" />
                    <rect x="36" y="0" width="8" height="8" rx="1.5" fill="#166534" />
                    <rect x="48" y="0" width="8" height="8" rx="1.5" fill="#14532d" />
                    <rect x="60" y="0" width="8" height="8" rx="1.5" fill="#22c55e" />
                    <rect x="72" y="0" width="8" height="8" rx="1.5" fill="#4ade80" />
                    <rect x="84" y="0" width="8" height="8" rx="1.5" fill="#22c55e" />
                    <rect x="96" y="0" width="8" height="8" rx="1.5" fill="#14532d" />

                    <rect x="0" y="12" width="8" height="8" rx="1.5" fill="#14532d" />
                    <rect x="12" y="12" width="8" height="8" rx="1.5" fill="#166534" />
                    <rect x="24" y="12" width="8" height="8" rx="1.5" fill="#22c55e" />
                    <rect x="36" y="12" width="8" height="8" rx="1.5" fill="#4ade80" />
                    <rect x="48" y="12" width="8" height="8" rx="1.5" fill="#22c55e" />
                    <rect x="60" y="12" width="8" height="8" rx="1.5" fill="#166534" />
                    <rect x="72" y="12" width="8" height="8" rx="1.5" fill="#14532d" />
                    <rect x="84" y="12" width="8" height="8" rx="1.5" fill="#4ade80" />
                    <rect x="96" y="12" width="8" height="8" rx="1.5" fill="#15803d" />

                    <text x="50" y="32" fill={mode === 'cinematic' ? '#f472b6' : '#22d3ee'} fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      MOKSHAGNA_DEV (PR MERGED)
                    </text>
                  </g>
                </g>
              )}


              {/* THE MINIMALIST DESK SURFACE */}
              <rect x="60" y="286" width="680" height="15" rx="5" fill="url(#deskBacklight)" stroke="#334155" strokeWidth="1.5" />
              <rect x="120" y="301" width="24" height="149" fill="#090d16" />
              <rect x="656" y="301" width="24" height="149" fill="#090d16" />


              {/* THE MECHANICAL KEYBOARD (With sequenced keys simulation) */}
              <g transform="translate(330, 292)">
                <rect x="0" y="0" width="140" height="14" rx="3.5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                {/* Sequenced Keycaps */}
                <rect x="6" y="3" width="12" height="8" rx="1" fill="#1e293b" className={mode !== 'sleep' ? 'keycap-active' : ''} />
                <rect x="22" y="3" width="12" height="8" rx="1" fill="#1e293b" />
                <rect x="38" y="3" width="12" height="8" rx="1" fill="#1e293b" className={mode !== 'sleep' ? 'keycap-active' : ''} style={{ animationDelay: '0.1s' }} />
                <rect x="54" y="3" width="32" height="8" rx="1" fill="#1e293b" />
                <rect x="90" y="3" width="12" height="8" rx="1" fill="#1e293b" className={mode !== 'sleep' ? 'keycap-active' : ''} style={{ animationDelay: '0.2s' }} />
                <rect x="106" y="3" width="12" height="8" rx="1" fill="#1e293b" />
                <rect x="122" y="3" width="12" height="8" rx="1" fill="#1e293b" className={mode !== 'sleep' ? 'keycap-active' : ''} style={{ animationDelay: '0.15s' }} />
              </g>


              {/* COFFEE MUG WITH FLOATING DRIFTING STEAM */}
              <g transform="translate(265, 260)">
                {/* Coffee Mug */}
                <rect x="0" y="5" width="18" height="23" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
                <path d="M 18 10 Q 23 12 18 17" fill="none" stroke="#475569" strokeWidth="2" />
                
                {/* Drifting Steam (Pixar Aesthetic) */}
                <g opacity="0.75">
                  <path d="M 5 0 Q 2 -8 6 -16 T 3 -28" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" className="steam-puff-1" />
                  <path d="M 12 0 Q 15 -8 11 -16 T 14 -28" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" className="steam-puff-2" />
                </g>
              </g>


              {/* THE DEVELOPER CHARACTER (Combining Mokshagna's picture with high-end SVG body layers) */}
              <g id="developer-character-natural" className="transition-all duration-1000">
                
                {/* Technical Ergonomic Office Chair */}
                <rect 
                  x="350" 
                  y="110" 
                  width="100" 
                  height="135" 
                  rx="18" 
                  fill="#020617" 
                  stroke="#334155" 
                  strokeWidth="2.5"
                  style={{
                    transformOrigin: '400px 190px',
                    transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  className={mode === 'sleep' ? 'rotate-[-10deg] translate-x-[-12px] translate-y-[15px] opacity-70' : 'rotate-0 translate-x-0 translate-y-0'}
                />

                {mode === 'sleep' ? (
                  /*💤 STANDBY STATE: Resting comfortable head and torso position */
                  <g id="natural-sleep-mode" className="transition-all duration-1000">
                    {/* Folded backpack on desk */}
                    <g id="folded-backpack" className="transition-all duration-1000">
                      <rect x="315" y="245" width="170" height="40" rx="14" fill="#334155" stroke="#1e293b" strokeWidth="2.5" />
                      <line x1="322" y1="255" x2="478" y2="255" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3" />
                    </g>

                    {/* Sleeping Head tilted resting sideways on the backpack */}
                    <g 
                      style={{
                        transformOrigin: '400px 180px',
                        transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      className="rotate-[-10deg] translate-x-[-12px] translate-y-[15px]"
                    >
                      {/* Portrait card shadows */}
                      <rect x="345" y="110" width="110" height="135" rx="20" fill="black" opacity="0.4" filter="blur(5px)" />

                      {/* The Natural Photo */}
                      <image
                        href={avatarImg}
                        x="345"
                        y="110"
                        width="110"
                        height="135"
                        clipPath="url(#avatarClip)"
                        className="brightness-[0.62] contrast-[0.95] saturate-[0.65] transition-all duration-1000"
                      />

                      {/* Dark late-night overlay on avatar */}
                      <rect x="345" y="110" width="110" height="135" rx="20" fill="#1e1b4b" opacity="0.28" pointerEvents="none" />

                      {/* High-contrast border */}
                      <rect
                        x="345"
                        y="110"
                        width="110"
                        height="135"
                        rx="20"
                        fill="none"
                        stroke="#4338ca"
                        strokeWidth="3.5"
                        opacity="0.8"
                      />
                    </g>

                    {/* Sleeping Zzz particles drifting vertically */}
                    <g className="fill-violet-300 font-bold font-sans text-xs select-none">
                      <text x="325" y="90" fontSize="16" className="animate-pulse" opacity="0.8">Z</text>
                      <text x="305" y="70" fontSize="12" className="animate-pulse" opacity="0.6" style={{ animationDelay: '0.4s' }}>z</text>
                      <text x="285" y="55" fontSize="10" className="animate-pulse" opacity="0.4" style={{ animationDelay: '0.8s' }}>z</text>
                    </g>
                  </g>
                ) : (
                  /*🚀 SPEED CODING &🧠 AI DEEP RESEARCH ACTIVE CONFIGURATION */
                  <g id="natural-joy-mode" className="transition-all duration-1000">
                    
                    {/* Glowing holographic circular HUD indicators behind developer card */}
                    <circle cx="400" cy="177" r="85" fill="none" stroke={mode === 'joy' ? '#ef4444' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'} strokeWidth="1.5" strokeDasharray="5,3" className="animate-[spin_22s_linear_infinite]" opacity="0.35" />
                    <circle cx="400" cy="177" r="76" fill="none" stroke={mode === 'joy' ? '#34d399' : mode === 'cinematic' ? '#a78bfa' : '#f43f5e'} strokeWidth="1" strokeDasharray="12,8" className="animate-[spin_15s_linear_infinite_reverse]" opacity="0.25" />

                    {/* Upright developer posture wrapping user photo */}
                    <g 
                      style={{
                        transformOrigin: '400px 177px',
                        transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      className={`rotate-0 translate-x-0 translate-y-0 ${mode === 'cinematic' ? 'cinematic-body-breath' : ''}`}
                    >
                      {/* High-end dual borders around head card */}
                      <rect x="341" y="106" width="118" height="143" rx="24" fill="none" stroke={mode === 'joy' ? '#ef4444' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'} strokeWidth="1.5" opacity="0.65" filter="url(#vectorGlow)" />

                      {/* The Natural Photo */}
                      <image
                        href={avatarImg}
                        x="345"
                        y="110"
                        width="110"
                        height="135"
                        clipPath="url(#avatarClip)"
                        className="brightness-[1.12] contrast-[1.15] saturate-[1.15] transition-all duration-1000"
                      />

                      {/* Autonomic blink eyelids overlay for cinematic realism */}
                      {mode === 'cinematic' && (
                        <g opacity="0.95" pointerEvents="none">
                          {/* Left Eyelid */}
                          <ellipse cx="388" cy="153" rx="4.5" ry="3.2" fill="#2d1b4e" className="cinematic-eyelid-l" />
                          {/* Right Eyelid */}
                          <ellipse cx="412" cy="153" rx="4.5" ry="3.2" fill="#2d1b4e" className="cinematic-eyelid-r" />
                        </g>
                      )}

                      {/* Futuristic cyan / magenta scanline scanner effect */}
                      <g clipPath="url(#avatarClip)">
                        <line 
                          x1="345" 
                          y1="110" 
                          x2="455" 
                          y2="110" 
                          stroke={mode === 'joy' ? '#ef4444' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'} 
                          strokeWidth="2.5" 
                          opacity="0.8" 
                          filter="url(#vectorGlow)" 
                          className="scanline-overlay" 
                        />
                      </g>

                      {/* Tech Bezel on portrait */}
                      <rect
                        x="345"
                        y="110"
                        width="110"
                        height="135"
                        rx="20"
                        fill="none"
                        stroke={mode === 'joy' ? '#ef4444' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'}
                        strokeWidth="4"
                        filter="url(#vectorGlow)"
                        className="animate-pulse"
                      />
                      <rect
                        x="345"
                        y="110"
                        width="110"
                        height="135"
                        rx="20"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1.2"
                      />
                    </g>

                    {/* Active hands Typing over the mechanical keyboard (Pixar interactive detail) */}
                    <g className={mode === 'cinematic' ? 'cinematic-hands-slow' : 'typing-hands'} opacity="0.85">
                      {/* Hand 1 */}
                      <path d="M 310 295 Q 330 285 345 292" fill="none" stroke={mode === 'joy' ? '#22d3ee' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'} strokeWidth="5" strokeLinecap="round" />
                      {/* Hand 2 */}
                      <path d="M 490 295 Q 470 285 455 292" fill="none" stroke={mode === 'joy' ? '#22d3ee' : mode === 'cinematic' ? '#f472b6' : '#a78bfa'} strokeWidth="5" strokeLinecap="round" />
                    </g>

                    {/* Confident Success Badge Floating near him */}
                    <g transform="translate(425, 205)" className="animate-bounce">
                      <rect x="0" y="0" width="105" height="23" rx="6" fill={mode === 'cinematic' ? '#4c1d95' : '#064e3b'} stroke={mode === 'cinematic' ? '#c084fc' : '#10b981'} strokeWidth="1.5" />
                      <text x="52.5" y="14.5" fill={mode === 'cinematic' ? '#e9d5ff' : '#34d399'} fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                        {mode === 'cinematic' ? '✔ CINEMATIC 3D' : '✔ ACTIVE & FOCUS'}
                      </text>
                    </g>

                    {/* Floating Holographic HUD items representing "career and AI workflows" (Left & Right) */}
                    
                    {/* Left Floating Card */}
                    <g transform="translate(245, 100)" className="hud-floater-1 select-none">
                      <rect x="0" y="0" width="75" height="28" rx="6" fill="#020617" fillOpacity="0.85" stroke={mode === 'cinematic' ? '#f472b6' : '#22d3ee'} strokeWidth="1" />
                      <text x="37.5" y="12" fill={mode === 'cinematic' ? '#f472b6' : '#22d3ee'} fontSize="6.5" fontFamily="monospace" textAnchor="middle">CUDA CORES</text>
                      <text x="37.5" y="21" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                        {cudaLoad.toFixed(1)}%
                      </text>
                    </g>

                    {/* Right Floating Card */}
                    <g transform="translate(480, 100)" className="hud-floater-2 select-none">
                      <rect x="0" y="0" width="75" height="28" rx="6" fill="#020617" fillOpacity="0.85" stroke="#a78bfa" strokeWidth="1" />
                      <text x="37.5" y="12" fill="#a78bfa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">GIT COMMITS</text>
                      <text x="37.5" y="21" fill="#ffffff" fontSize="8" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                        {gitCommits}
                      </text>
                    </g>

                    {/* Neon Sparks & Binary matrix code blocks */}
                    <g className="text-[10px] font-mono font-bold select-none">
                      <text x="315" y="115" fill={mode === 'cinematic' ? '#f472b6' : '#ef4444'} className="animate-bounce" opacity="0.9">1</text>
                      <text x="475" y="95" fill="#34d399" className="animate-bounce" opacity="0.9">0</text>
                      <text x="345" y="70" fill={mode === 'cinematic' ? '#c084fc' : '#a78bfa'} className="animate-pulse" opacity="0.8">1</text>
                      <text x="445" y="65" fill="#f43f5e" className="animate-pulse" opacity="0.8">0</text>
                    </g>
                  </g>
                )}
              </g>
            </g>
          </svg>
        </div>

        {/* Real-time simulated developer terminal cockpit */}
        <div className="h-28 bg-slate-950/95 border-t border-slate-900 p-3 font-mono text-[9px] sm:text-xs text-violet-300 overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-1.5 select-none">
            <div className="flex items-center space-x-1">
              <Terminal size={12} className="text-red-400" />
              <span className="text-[10px] font-bold text-slate-400">DEVELOPER COCKPIT (AUTO-FLOW TELEMETRY)</span>
            </div>
            <span className="text-[8.5px] text-slate-500 font-semibold">Injam Workspace Console v3.1</span>
          </div>

          <div ref={terminalBodyRef} className="flex-1 overflow-y-auto no-scrollbar space-y-1 scroll-smooth">
            {terminalLogs.map((log, index) => {
              const logStr = String(log || '');
              const isSuccess = logStr.includes('SUCCESS') || logStr.includes('LIVE') || logStr.includes('OPTIMIZED') || logStr.includes('TRIGGERED') || logStr.includes('COMPILING');
              const isWarning = logStr.includes('Warning') || logStr.includes('Caffeine');
              return (
                <div 
                  key={index} 
                  className={`transition-all duration-300 ${
                    isSuccess ? 'text-emerald-400 font-bold' : 
                    isWarning ? 'text-amber-400' : 'text-red-400'
                  }`}
                >
                  {logStr}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>

      {/* Mode diagnostics and description block */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-850/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {mode === 'sleep' ? (
              <span>💤 <strong>Standby Rest Mode:</strong> Highlights Injam's dedication to midnight debugging and server optimizations, conserving compute power while preparing next-gen predictive algorithms.</span>
            ) : mode === 'joy' ? (
              <span>🚀 <strong>Speed Coding Mode:</strong> Visualizes high-frequency keyboard operations, real-time code line streaming, and Git merges at full velocity with tactile audio feedback!</span>
            ) : mode === 'cinematic' ? (
              <span>🎬 <strong>Cinematic 5S Portrait:</strong> A premium, slow-tracking 3D camera loop of Injam at his workstation. Highlights include autonomic eye blinks, gentle posture breathing, and a high-end depth-of-field focus on his portfolio.</span>
            ) : (
              <span>🧠 <strong>AI Deep Research:</strong> Simulates heavy GPU CUDA matrix workloads, tuning stochastic gradient descent weights to fit loss graphs with premium portfolio aesthetics.</span>
            )}
          </p>
        </div>
        
        {/* Compilation load progress bar */}
        <div className="w-full sm:w-44 flex flex-col space-y-1 select-none">
          <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold">
            <span>COMPILATION LOAD</span>
            <span>{mode === 'sleep' ? '4.2x' : mode === 'joy' ? '86.4x' : mode === 'cinematic' ? '45.2x' : '99.1x'} / Sec</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${
                mode === 'sleep' ? 'bg-amber-500 w-[5%]' : 
                mode === 'joy' ? 'bg-gradient-to-r from-red-400 to-violet-500 w-[86%]' : 
                mode === 'cinematic' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 w-[45%]' :
                'bg-gradient-to-r from-violet-500 to-pink-500 w-[99%]'
              }`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
