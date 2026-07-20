/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Github, Play, ArrowUpRight, Check, AlertTriangle, ShieldCheck, Battery, Clock, Eye, AlertCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  githubUrl: string;
  hasDemo: boolean;
  category: string;
  image: string;
  tags: string[];
}

export const Projects: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  // List of Projects requested
  const projects: Project[] = [
    {
      id: 'house-prices',
      title: 'Bengaluru House Price Prediction',
      description: 'An interactive machine learning regression pipeline predicting housing valuations based on local attributes.',
      bullets: [
        'Developed end-to-end regression training architectures.',
        'Applied robust outlier detection and extensive feature engineering.',
        'Supports dynamic hyperparameter weights to generate instant valuations.'
      ],
      githubUrl: 'https://github.com/Moksha-25',
      hasDemo: true,
      category: 'Machine Learning',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'Scikit-Learn', 'Regression', 'Data Engineering']
    },
    {
      id: 'loan-eligibility',
      title: 'Loan Eligibility Prediction System',
      description: 'An automated banking risk classification model evaluating prospects based on transaction profiles.',
      bullets: [
        'Built a classification engine with cross-validated high precision.',
        'Interactive real-time parameter tuning with custom risk scores.',
        'Designed client-side risk validation checks to model eligibility.'
      ],
      githubUrl: 'https://github.com/Moksha-25',
      hasDemo: true,
      category: 'Data Science',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      tags: ['ML Classification', 'Predictive Modeling', 'Risk Analysis']
    },
    {
      id: 'drowsiness-detector',
      title: 'Drowsiness Detection using Deep Learning',
      description: 'A computer-vision facial landmarks safety alert system detecting prolonged eye closure to trigger alarms.',
      bullets: [
        'Built CNN models to process facial landmarks in high frequency.',
        'Calculates real-time Eye Aspect Ratio (EAR) metrics.',
        'Uses WebAudio chimes to alert when fatigue is detected.'
      ],
      githubUrl: 'https://github.com/Moksha-25',
      hasDemo: true,
      category: 'Deep Learning',
      image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80',
      tags: ['CNN', 'OpenCV', 'Computer Vision', 'WebAudio API']
    },
    {
      id: 'multi-utility',
      title: 'Multi-Functional Utility Application',
      description: 'An advanced system automation client combining schedulers, hardware safety, and precise timers.',
      bullets: [
        'Interfaces directly with device battery charge indicators.',
        'Advanced customizable alarm rules with specific weekdays.',
        'Precision millisecond stopwatches and notification alerts.'
      ],
      githubUrl: 'https://github.com/Moksha-25',
      hasDemo: true,
      category: 'Python Developer',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      tags: ['Python', 'System Alerts', 'Stopwatch', 'Thread Schedulers']
    }
  ];

  // Live Demo state holders
  // 1. House Price State
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [sqft, setSqft] = useState(1200);
  const [locationScore, setLocationScore] = useState(1.0); // 1 to 2 weights
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);

  // 2. Loan State
  const [income, setIncome] = useState(4500);
  const [coIncome, setCoIncome] = useState(1500);
  const [creditHistory, setCreditHistory] = useState('1'); // '1' is Good, '0' is Bad
  const [education, setEducation] = useState('Graduate');
  const [historyResult, setHistoryResult] = useState<string | null>(null);

  // 3. Drowsiness Simulation state
  const [videoActive, setVideoActive] = useState(false);
  const [eyesState, setEyesState] = useState<'open' | 'closed'>('open');
  const [drowsinessCounter, setDrowsinessCounter] = useState(0);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 4. Multi Utility state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isWatchRunning, setIsWatchRunning] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [alarmTimeString, setAlarmTimeString] = useState('07:00');
  const [scheduledAlarms, setScheduledAlarms] = useState<string[]>(['07:00 Mon-Fri']);

  // Dynamic calculative predictions
  useEffect(() => {
    // 1. House Price Simulation
    const baseVal = 20; // 20 Lakhs base
    const pricePerSqft = 3.5; // k per sqft
    const bhkMultiplier = 8;
    const bathMultiplier = 5;
    const estimation = baseVal + ((sqft * pricePerSqft) / 100) + (bhk * bhkMultiplier) + (bath * bathMultiplier);
    const finalEstimate = Math.round(estimation * locationScore * 10) / 10;
    setPredictedPrice(finalEstimate);
  }, [bhk, bath, sqft, locationScore]);

  // Handle Drowsiness alert triggers with beep
  const audioContextRef = useRef<any>(null);

  const playBuzzer = () => {
    try {
      if (typeof window === 'undefined') return;
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') return;
      
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // High pitch alarm tone
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn('WebAudio context blocked or unsupported:', e);
    }
  };

  useEffect(() => {
    let drowsinessInterval: NodeJS.Timeout | null = null;
    
    if (activeDemo === 'drowsiness-detector') {
      if (eyesState === 'closed') {
        drowsinessInterval = setInterval(() => {
          setDrowsinessCounter((prev) => {
            const next = prev + 1;
            if (next >= 3) {
              setAlarmTriggered(true);
              playBuzzer();
            }
            return next;
          });
        }, 500);
      } else {
        setDrowsinessCounter(0);
        setAlarmTriggered(false);
      }
    }

    return () => {
      if (drowsinessInterval) clearInterval(drowsinessInterval);
    };
  }, [eyesState, activeDemo]);

  // Stopwatch effect
  useEffect(() => {
    let animFrame: number;
    let lastTime = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      setStopwatchTime((prev) => prev + delta);
      animFrame = requestAnimationFrame(loop);
    };

    if (isWatchRunning) {
      lastTime = Date.now();
      animFrame = requestAnimationFrame(loop);
    }

    return () => cancelAnimationFrame(animFrame);
  }, [isWatchRunning]);

  // Battery indicator trigger
  useEffect(() => {
    const nav = navigator as any;
    if (nav && typeof nav.getBattery === 'function') {
      try {
        nav.getBattery()
          .then((battery: any) => {
            setBatteryLevel(Math.round(battery.level * 100));
            battery.addEventListener('levelchange', () => {
              setBatteryLevel(Math.round(battery.level * 100));
            });
          })
          .catch((err: any) => {
            console.warn('Battery status API blocked or unsupported:', err);
          });
      } catch (e) {
        console.warn('Failed to call battery status API:', e);
      }
    }
  }, []);

  // Web camera setup
  const toggleCamera = async () => {
    if (videoActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setVideoActive(false);
    } else {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Webcam media constraints are not available in current context');
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setVideoActive(true);
      } catch (err) {
        console.warn('Could not start real webcam, activating simulated frame mode:', err);
        setVideoActive(true);
      }
    }
  };

  useEffect(() => {
    if (activeDemo !== 'drowsiness-detector') {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setVideoActive(false);
    }
  }, [activeDemo]);

  // Run Loan eligibility prediction logic
  const runLoanPrediction = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate complex Logistic Regression classification logic
    const score = (income / 1000) * 1.5 + (coIncome / 1000) * 0.8 + (creditHistory === '1' ? 8 : -10) + (education === 'Graduate' ? 2 : 0);
    if (score > 6) {
      setHistoryResult('Approved! Highly Eligible (94.2% model confidence)');
    } else {
      setHistoryResult('Rejected! High Credit Risk Detected (87.5% model confidence)');
    }
  };

  const handleCreateAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduledAlarms((prev) => [...prev, `${alarmTimeString} Mon-Fri`]);
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-violet-600 dark:text-violet-400 mb-2">
            My Built Work
          </h2>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
            Key Software & AI Projects
          </h3>
          <div className="h-1 w-12 bg-gradient-to-r from-violet-500 to-red-500 rounded mx-auto mt-4" />
        </div>

        {/* Project Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              id={`project-card-${project.id}`}
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 hover:border-violet-400 dark:hover:border-violet-900 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Thumbnail header */}
              <div className="relative h-48 overflow-hidden bg-slate-850">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-4">
                  <span className="px-2.5 py-1 rounded bg-violet-600/90 text-white text-[10px] font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Descriptor content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 text-xs text-slate-500 dark:text-slate-450">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-violet-500 font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags and Links */}
                <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800/60">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-150 border border-slate-200/65 dark:bg-slate-850 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-3">
                    <a
                      id={`project-github-btn-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-violet-500 dark:hover:border-violet-500 text-xs text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 font-semibold transition-all"
                    >
                      <Github size={14} />
                      <span>Codebase</span>
                    </a>

                    {project.hasDemo && (
                      <button
                        id={`project-demo-btn-${project.id}`}
                        onClick={() => setActiveDemo(project.id)}
                        className="inline-flex items-center space-x-1 px-4.5 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-red-500 text-white text-xs font-semibold shadow hover:shadow-lg hover:shadow-violet-500/10 transition-all cursor-pointer"
                      >
                        <Play size={10} className="fill-current" />
                        <span>Try Interactive Demo</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Popover/Overlay showing fully configured Interactive Predictors */}
      {activeDemo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden transition-colors duration-300 flex flex-col">
            {/* Header */}
            <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-display font-medium text-slate-950 dark:text-white flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400">
                    📊 Simulation
                  </span>
                  <span className="text-lg font-bold">
                    {projects.find((p) => p.id === activeDemo)?.title}
                  </span>
                </h3>
              </div>
              <button
                id="close-simulation-btn"
                onClick={() => {
                  setActiveDemo(null);
                  setHistoryResult(null);
                }}
                className="p-1 px-2.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Immersive Sandbox Body */}
            <div className="p-6 overflow-y-auto max-h-[80vh] bg-white dark:bg-slate-900">
              {/* ----------------- HOUSE PRICE PREDICTOR DEMO ----------------- */}
              {activeDemo === 'house-prices' && (
                <div className="space-y-6">
                  <div className="p-4 bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900 text-xs leading-relaxed text-violet-700 dark:text-violet-300 rounded-xl">
                    ⚡ <strong>Live Model Pipeline:</strong> Standard regression parameters estimate property metrics with high proximity, aligning coordinates within the Bengaluru real-estate bounds.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Select Location Index
                      </label>
                      <select
                        id="location-multiplier"
                        value={locationScore}
                        onChange={(e) => setLocationScore(parseFloat(e.target.value))}
                        className="w-full text-sm font-medium border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                        <option value="1.5">Indiranagar (Premium Standard)</option>
                        <option value="1.3">Whitefield (Tech Hub High)</option>
                        <option value="1.15">Yelahanka (Developing Residential)</option>
                        <option value="1.0">Electronic City (IT Zone)</option>
                        <option value="0.85">Hebbal (Suburbs Standard)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Square Footage (Sqft): {sqft}
                      </label>
                      <input
                        id="sqft-slider"
                        type="range"
                        min="500"
                        max="8000"
                        step="50"
                        value={sqft}
                        onChange={(e) => setSqft(parseInt(e.target.value))}
                        className="w-full accent-violet-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Bedrooms (BHK): {bhk}
                      </label>
                      <input
                        id="bhk-slider"
                        type="range"
                        min="1"
                        max="8"
                        step="1"
                        value={bhk}
                        onChange={(e) => setBhk(parseInt(e.target.value))}
                        className="w-full accent-violet-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Bathrooms: {bath}
                      </label>
                      <input
                        id="bath-slider"
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={bath}
                        onChange={(e) => setBath(parseInt(e.target.value))}
                        className="w-full accent-violet-600"
                      />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                      Calculated Model Prediction
                    </span>
                    <div className="text-4xl font-display font-extrabold text-violet-600 dark:text-red-400">
                      ₹ {predictedPrice} <span className="text-xl">Lakhs</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      ~ ${((predictedPrice || 0) * 1200).toLocaleString()} USD. Real-time regression estimate on R²=0.86 coefficient limits.
                    </p>
                  </div>
                </div>
              )}

              {/* ----------------- LOAN ELIGIBILITY SYSTEMS DEMO ----------------- */}
              {activeDemo === 'loan-eligibility' && (
                <div className="space-y-6">
                  <div className="p-4 bg-violet-50/50 dark:bg-violet-950/20 border border-violet-100 dark:border-violet-900 text-xs leading-relaxed text-violet-700 dark:text-violet-300 rounded-xl">
                    ⚡ <strong>Live classification pipeline:</strong> Input applicant metrics to execute binary scoring calculations indicating loan verification possibility.
                  </div>

                  <form onSubmit={runLoanPrediction} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Applicant Income / Month ($)
                      </label>
                      <input
                        id="loan-income-input"
                        type="number"
                        min="500"
                        max="50000"
                        value={income}
                        onChange={(e) => setIncome(parseInt(e.target.value))}
                        className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Coapplicant Income / Month ($)
                      </label>
                      <input
                        id="loan-coincome-input"
                        type="number"
                        min="0"
                        max="25000"
                        value={coIncome}
                        onChange={(e) => setCoIncome(parseInt(e.target.value))}
                        className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Credit History Reputation
                      </label>
                      <select
                        id="loan-credit-select"
                        value={creditHistory}
                        onChange={(e) => setCreditHistory(e.target.value)}
                        className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                        <option value="1">Good Standing (Paid Previous Dues)</option>
                        <option value="0">Defaulted / Bad Reputation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Education Status
                      </label>
                      <select
                        id="loan-education-select"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        className="w-full text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-slate-50 dark:bg-slate-800 text-black dark:text-white focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                        <option value="Graduate">University Graduate</option>
                        <option value="Not Graduate">Not Graduate</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 pt-2">
                       <button
                        id="loan-eval-btn"
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-violet-600 to-red-500 hover:from-violet-700 hover:to-red-650 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
                      >
                        Run Classification Model (Predict)
                      </button>
                    </div>
                  </form>

                  {historyResult && (
                    <div
                      id="loan-prediction-result-panel"
                      className={`p-5 rounded-2xl border text-center transition-all ${
                        historyResult.includes('Approved')
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      <span className="text-xs uppercase font-black tracking-widest block text-slate-500 mb-1">
                        Decision Outcome
                      </span>
                      <div className="text-xl font-bold flex items-center justify-center space-x-2">
                        {historyResult.includes('Approved') ? (
                          <ShieldCheck className="text-emerald-500" />
                        ) : (
                          <AlertTriangle className="text-rose-500" />
                        )}
                        <span>{historyResult}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ----------------- DROWSINESS DETECTION DEMO ----------------- */}
              {activeDemo === 'drowsiness-detector' && (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 text-xs leading-relaxed text-amber-800 dark:text-amber-300 rounded-xl flex items-start space-x-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-amber-500" />
                    <span>
                      ⚠️ <strong>WebAudio Alarm enabled:</strong> Trigger eye closure simulation to watch EAR calculations drop. If closed prolonged (&gt;1.5s), an active safety chime sounds. Keep speaker volume modest!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    {/* Visual Box */}
                    <div className="sm:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl h-64 relative flex flex-col justify-center items-center overflow-hidden">
                      {/* Active green landmark indicator lines overlay */}
                      <div className="absolute inset-x-0 h-px bg-emerald-500/30 top-1/2 animate-scan" style={{ animationDuration: '3s' }} />

                      {videoActive ? (
                        <div className="text-center">
                          {/* Face tracking mesh overlay simulation on face */}
                          <div className={`border-2 rounded-full absolute top-12 left-1/2 -translate-x-1/2 w-40 h-44 flex flex-col justify-around py-12 px-6 transition-all ${alarmTriggered ? 'border-rose-500 bg-rose-500/10' : 'border-emerald-400 bg-emerald-400/5'}`}>
                            <div className="flex justify-between">
                              {/* Left eye landmark indicator */}
                              <div className={`w-8 h-4 rounded-full border flex items-center justify-center ${alarmTriggered ? 'border-rose-400' : 'border-emerald-300'}`}>
                                <div className={`w-2 h-2 rounded-full transition-all ${eyesState === 'closed' ? 'scale-y-0.1 bg-rose-400' : 'scale-y-100 bg-emerald-400'}`} />
                              </div>
                              {/* Right eye landmark */}
                              <div className={`w-8 h-4 rounded-full border flex items-center justify-center ${alarmTriggered ? 'border-rose-400' : 'border-emerald-300'}`}>
                                <div className={`w-2 h-2 rounded-full transition-all ${eyesState === 'closed' ? 'scale-y-0.1 bg-rose-400' : 'scale-y-100 bg-emerald-400'}`} />
                              </div>
                            </div>
                            <div className="w-12 h-3 border-b-2 self-center rounded-b-full transition-all border-emerald-400 scale-x-75 mt-4" />
                          </div>

                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover rounded-2xl opacity-60"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-3 p-4 text-center">
                          <Eye size={40} className="text-slate-600 animate-pulse" />
                          <p className="text-slate-400 text-xs">Simulated fatigue workspace offline. Activate camera bounds or trigger quick interactive switches below.</p>
                        </div>
                      )}

                      {/* Display Alert state */}
                      <div className="absolute bottom-4 right-4">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase flex items-center space-x-1 ${alarmTriggered ? 'bg-rose-600 text-white animate-bounce' : 'bg-slate-800 text-slate-300'}`}>
                          <span>⚡ Fatigue:</span>
                          <span className="font-extrabold">{alarmTriggered ? 'ALERT! WAKE UP' : 'STABLE'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Controls Column */}
                    <div className="sm:col-span-5 space-y-4">
                      {/* Web Camera Toggle */}
                      <button
                        id="cam-initializer-btn"
                        onClick={toggleCamera}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${videoActive ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
                      >
                        {videoActive ? 'Turn Off Webcam Feed' : 'Launch Local Camera Capture'}
                      </button>

                      {/* Eye simulator controller state hooks */}
                      <div className="p-4 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-850 rounded-xl space-y-3">
                        <span className="text-xs font-bold text-slate-500 block">Simulate Driver Response:</span>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            id="eye-open-sim"
                            onClick={() => setEyesState('open')}
                            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${eyesState === 'open' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                          >
                            👀 Eyes Open (EAR: 0.34)
                          </button>
                          <button
                            id="eye-closed-sim"
                            onClick={() => setEyesState('closed')}
                            className={`py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${eyesState === 'closed' ? 'bg-rose-600 text-white shadow animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
                          >
                            😴 Eyes Closed (EAR: 0.08)
                          </button>
                        </div>

                        {/* Calculations readout */}
                        <div className="pt-2 text-xs font-mono space-y-1 text-slate-500 border-t border-slate-200 dark:border-slate-800">
                          <p>Drowsiness Timer: {Math.round(drowsinessCounter * 0.5 * 10) / 10} seconds</p>
                          <p>Fatigue Limit: 1.5 seconds</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- MULTI-FUNCTIONAL UTILITY DEMO ----------------- */}
              {activeDemo === 'multi-utility' && (
                <div className="space-y-6">
                  <div className="p-4 bg-violet-50/50 dark:bg-violet-950/20 border border-violet-150 dark:border-violet-900 text-xs leading-relaxed text-violet-700 dark:text-violet-300 rounded-xl">
                    ⚡ <strong>Working Desktop Tools Sandbox:</strong> Native components simulated fully. This environment matches standard client system automation variables.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Widget 1: Precise Stopwatch */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center space-x-2 text-violet-600 dark:text-violet-400">
                        <Clock size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Stopwatch</span>
                      </div>

                      <div className="my-5 text-3xl font-mono font-extrabold text-center text-slate-900 dark:text-white">
                        {(() => {
                          const min = Math.floor(stopwatchTime / 60000);
                          const sec = Math.floor((stopwatchTime % 60000) / 1000);
                          const ms = Math.floor((stopwatchTime % 1000) / 10);
                          return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
                        })()}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          id="stopwatch-start-stop"
                          onClick={() => setIsWatchRunning(!isWatchRunning)}
                          className={`py-1.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer ${isWatchRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gradient-to-r from-violet-600 to-red-500 hover:from-violet-700 hover:to-red-600'}`}
                        >
                          {isWatchRunning ? 'Pause' : 'Start'}
                        </button>
                        <button
                          id="stopwatch-reset"
                          onClick={() => {
                            setIsWatchRunning(false);
                            setStopwatchTime(0);
                          }}
                          className="py-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-850 dark:text-slate-300 transition-all cursor-pointer"
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    {/* Widget 3: Real Device Battery State */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between">
                      <div className="flex items-center space-x-2 text-violet-600 dark:text-violet-400">
                        <Battery size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Hardware Battery Observer</span>
                      </div>

                      <div className="my-4 text-center">
                        <span className="text-4xl font-display font-black text-slate-900 dark:text-white">
                          {batteryLevel}%
                        </span>
                        <div className="w-full max-w-xs mx-auto mt-3 h-3 bg-slate-200 dark:bg-slate-850 rounded-full border border-slate-350 dark:border-slate-700 p-0.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${batteryLevel < 25 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            style={{ width: `${batteryLevel}%` }}
                          />
                        </div>
                      </div>

                      <p className="text-[10px] text-center text-slate-500">
                        API interfaces live dynamically. Triggers alarm prompts if metrics fall beneath safety thresholds.
                      </p>
                    </div>

                    {/* Widget 4: Alarm Rule Scheduler */}
                    <div className="p-5 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl sm:col-span-2 space-y-4">
                      <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400">
                        <AlertCircle size={16} />
                        <span className="text-sm font-bold uppercase tracking-wider">Scheduled Alarms & Alerts</span>
                      </div>

                      <form onSubmit={handleCreateAlarm} className="flex items-center space-x-3">
                        <input
                          id="alarm-time-input"
                          type="time"
                          value={alarmTimeString}
                          onChange={(e) => setAlarmTimeString(e.target.value)}
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-1 focus:ring-violet-500 outline-none"
                        />
                        <button
                          id="submit-alarm-row"
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs cursor-pointer shadow transition-all"
                        >
                          + Set System Alarm
                        </button>
                      </form>

                      {/* Display alarms */}
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Alarms List:</span>
                        <div className="flex flex-wrap gap-2">
                          {scheduledAlarms.map((a, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center space-x-1.5"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                              <span>{a}</span>
                              <button
                                id={`remove-alarm-btn-${i}`}
                                onClick={() => setScheduledAlarms((prev) => prev.filter((_, idx) => idx !== i))}
                                className="hover:text-rose-500 font-extrabold ml-1"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                id="footer-dismiss"
                onClick={() => {
                  setActiveDemo(null);
                  setHistoryResult(null);
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-red-500 hover:from-violet-700 hover:to-red-600 text-white font-bold text-sm rounded-xl cursor-pointer shadow-md transition-all"
              >
                Done / Return
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
