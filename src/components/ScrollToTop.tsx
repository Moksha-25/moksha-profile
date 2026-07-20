/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp, SlidersHorizontal, RotateCcw, Move, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ButtonSettings {
  size: number;          // 32 to 84 px
  bottomOffset: number;  // 8 to 400 px
  sideOffset: number;    // 8 to 400 px
  alignment: 'right' | 'left' | 'center';
  opacity: number;        // 0.3 to 1.0 (normal state)
  threshold: number;      // 100 to 1200 px
  freeDrag: boolean;
}

const DEFAULT_SETTINGS: ButtonSettings = {
  size: 52,
  bottomOffset: 24,
  sideOffset: 24,
  alignment: 'right',
  opacity: 0.9,
  threshold: 300,
  freeDrag: false,
};

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [settings, setSettings] = useState<ButtonSettings>(DEFAULT_SETTINGS);
  
  // Drag coordinates offset when in free drag mode
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Load custom settings from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem('scroll_btn_settings');
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
      
      const storedDrag = localStorage.getItem('scroll_btn_drag_offset');
      if (storedDrag) {
        setDragOffset(JSON.parse(storedDrag));
      }
    } catch (e) {
      console.warn('Could not read scroll settings from localStorage:', e);
    }
  }, []);

  // Save settings helper
  const saveSettings = (newSettings: ButtonSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem('scroll_btn_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Could not write scroll settings to localStorage:', e);
    }
  };

  // Monitor screen scrolling to trigger visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > settings.threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        // Automatically collapse config panel if button disappears
        setShowConfig(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [settings.threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleReset = () => {
    saveSettings(DEFAULT_SETTINGS);
    setDragOffset({ x: 0, y: 0 });
    try {
      localStorage.removeItem('scroll_btn_drag_offset');
    } catch (_) {}
  };

  const handleDragEnd = (_event: any, info: any) => {
    const offsetX = info?.offset?.x ?? 0;
    const offsetY = info?.offset?.y ?? 0;
    const nextOffset = {
      x: dragOffset.x + offsetX,
      y: dragOffset.y + offsetY
    };
    setDragOffset(nextOffset);
    try {
      localStorage.setItem('scroll_btn_drag_offset', JSON.stringify(nextOffset));
    } catch (e) {
      console.warn('Could not write drag offset storage:', e);
    }
  };

  // Build style guidelines dynamically based on state
  const getPositionStyles = (): React.CSSProperties => {
    if (settings.freeDrag) {
      // In drag mode, positioning is controlled primarily by framer-motion drag offset
      // relative to a default corner position
      return {
        position: 'fixed',
        bottom: `${DEFAULT_SETTINGS.bottomOffset}px`,
        right: `${DEFAULT_SETTINGS.sideOffset}px`,
        zIndex: 50,
      };
    }

    const styles: React.CSSProperties = {
      position: 'fixed',
      bottom: `${settings.bottomOffset}px`,
      zIndex: 50,
    };

    if (settings.alignment === 'right') {
      styles.right = `${settings.sideOffset}px`;
    } else if (settings.alignment === 'left') {
      styles.left = `${settings.sideOffset}px`;
    } else if (settings.alignment === 'center') {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef}
      style={getPositionStyles()}
      className="flex flex-col items-end gap-3 select-none pointer-events-auto"
      id="scroll-to-top-wrapper"
    >
      {/* Settings configuration drawer */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`w-[290px] rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/80 p-4 shadow-xl text-slate-800 dark:text-slate-100 ${
              settings.alignment === 'left' ? 'origin-bottom-left' : 'origin-bottom-right'
            }`}
            id="scroll-settings-panel"
          >
            <div className="flex items-center justify-between mb-3 border-b border-slate-100/80 dark:border-slate-800/80 pb-2">
              <span className="text-xs font-bold tracking-wide uppercase flex items-center gap-1.5 text-violet-600 dark:text-violet-400">
                <SlidersHorizontal size={14} />
                Adjust Scroll Button
              </span>
              <button 
                onClick={() => setShowConfig(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Size Slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                  <span>Button Size</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{settings.size}px</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="80"
                  value={settings.size}
                  onChange={(e) => saveSettings({ ...settings, size: parseInt(e.target.value, 10) })}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-ew-resize"
                />
              </div>

              {/* Vertical bottom spacing */}
              {!settings.freeDrag && (
                <>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                      <span>Bottom Space</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{settings.bottomOffset}px</span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="300"
                      value={settings.bottomOffset}
                      onChange={(e) => saveSettings({ ...settings, bottomOffset: parseInt(e.target.value, 10) })}
                      className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-ew-resize"
                    />
                  </div>

                  {/* Side offset */}
                  {settings.alignment !== 'center' && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                        <span>Side Edge Offset</span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">{settings.sideOffset}px</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="300"
                        value={settings.sideOffset}
                        onChange={(e) => saveSettings({ ...settings, sideOffset: parseInt(e.target.value, 10) })}
                        className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-ew-resize"
                      />
                    </div>
                  )}

                  {/* Horizontal Alignment Toggles */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] text-slate-500 font-medium">Align Side</span>
                    <div className="grid grid-cols-3 gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
                      {(['left', 'center', 'right'] as const).map((align) => (
                        <button
                          key={align}
                          onClick={() => saveSettings({ ...settings, alignment: align })}
                          className={`py-1 text-[10px] font-semibold rounded-md uppercase tracking-wider transition-all cursor-pointer ${
                            settings.alignment === align
                              ? 'bg-white dark:bg-slate-700 text-violet-600 dark:text-violet-400 shadow-sm'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Opacity slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                  <span>Standard Opacity</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{Math.round(settings.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={settings.opacity * 100}
                  onChange={(e) => saveSettings({ ...settings, opacity: parseInt(e.target.value, 10) / 100 })}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-ew-resize"
                />
              </div>

              {/* Threshold distance */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                  <span>Visibility Trigger</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{settings.threshold}px scroll</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="25"
                  value={settings.threshold}
                  onChange={(e) => saveSettings({ ...settings, threshold: parseInt(e.target.value, 10) })}
                  className="w-full accent-violet-600 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-ew-resize"
                />
              </div>

              {/* Free drag mode toggle */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100/80 dark:border-slate-800/80 mt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] font-bold flex items-center gap-1">
                    <Move size={11} className="text-slate-500" />
                    Free Move Mode
                  </span>
                  <span className="text-[9px] text-slate-400">Drags anywhere on screen</span>
                </div>
                <button
                  onClick={() => saveSettings({ ...settings, freeDrag: !settings.freeDrag })}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 outline-none ${
                    settings.freeDrag ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ${
                      settings.freeDrag ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* Draggable mode hint or action handles */}
              {settings.freeDrag && (
                <div className="bg-slate-50 dark:bg-slate-950/50 rounded-xl p-2.5 text-[10px] text-slate-500 dark:text-slate-400 italic text-center">
                  Drag the arrow button itself to customize position!
                </div>
              )}

              {/* Reset to Default */}
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 bg-white/50 hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800 text-[10px] font-bold tracking-wide uppercase transition-all cursor-pointer"
              >
                <RotateCcw size={11} />
                Reset Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button Row (Settings toggle & Main Scroll To Top trigger) */}
      <div className="flex items-center gap-2">
        {/* Gear config toggle button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowConfig(!showConfig)}
          className={`p-2 rounded-full border shadow-md transition-all cursor-pointer outline-none ${
            showConfig
              ? 'bg-slate-900 border-slate-950/20 text-white dark:bg-slate-100 dark:text-slate-900 dark:border-white'
              : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-violet-500 dark:hover:text-violet-400'
          }`}
          title="Adjust scroll button settings"
          aria-label="Settings"
        >
          <SlidersHorizontal size={14} />
        </motion.button>

        {/* Main interactive Scroll to Top Button */}
        <motion.button
          id="scroll-to-top-button"
          onClick={() => {
            if (isDraggingRef.current) return;
            scrollToTop();
          }}
          
          // Drag characteristics
          drag={settings.freeDrag}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={(e, info) => {
            handleDragEnd(e, info);
            // Wait briefly to allow click handler to be bypassed after drag release
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
          }}
          style={{
            width: `${settings.size}px`,
            height: `${settings.size}px`,
            opacity: showConfig ? 1.0 : settings.opacity,
            x: settings.freeDrag ? dragOffset.x : 0,
            y: settings.freeDrag ? dragOffset.y : 0,
          }}
          className={`flex items-center justify-center rounded-full text-white shadow-lg cursor-pointer transition-shadow duration-300 hover:opacity-100 relative group outline-none ${
            settings.freeDrag
              ? 'bg-gradient-to-tr from-violet-600 to-red-500 hover:shadow-violet-500/30'
              : 'bg-gradient-to-tr from-violet-500 to-red-500 hover:shadow-violet-500/30'
          }`}
          whileHover={{ 
            scale: 1.08,
            boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)'
          }}
          whileTap={{ scale: 0.94 }}
          title={settings.freeDrag ? "Hold and drag to move button, or click to scroll up" : "Scroll to top"}
          aria-label="Scroll to top"
        >
          <ArrowUp 
            size={Math.max(16, settings.size * 0.4)} 
            className="stroke-[2.5] relative transition-transform duration-300 group-hover:-translate-y-0.5" 
          />

          {settings.freeDrag && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-violet-500 ring-2 ring-white dark:ring-slate-950">
              <Move size={8} className="text-white" />
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
};
