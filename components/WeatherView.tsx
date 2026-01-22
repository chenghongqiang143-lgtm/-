import React, { useEffect, useRef, useState } from 'react';

type SceneType = 'rain' | 'forest' | 'fire' | 'starry' | 'geometry' | 'cityscape' | 'waves' | 'snow' | 'zen' | 'eclipse' | 'moon' | 'glass';

interface SceneConfig {
  name: string;
  gradient: string;
  particleColor: string;
  particleType: 'line' | 'ember' | 'firefly' | 'star' | 'geometric' | 'bubble' | 'snow' | 'neon_circle' | 'zen_circle' | 'progress_bar' | 'moon_phase' | 'glass_orb';
  defaultAudioUrl: string;
  icon: React.ReactNode;
  textColor: string;
  statusColor: string;
  menuBgClass: string;
  menuTheme: 'dark' | 'light';
}

const SCENES: Record<SceneType, SceneConfig> = {
  rain: {
    name: '聆听雨声',
    gradient: 'from-[#1a2a3a] from-0% via-[#2c3e50] via-50% to-white to-85%',
    particleColor: 'rgba(255, 255, 255, 0.4)',
    particleType: 'line',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/weather/rain_heavy_loud.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 19l-1 2m5-2l-1 2m5-2l-1 2m5-2l-1 2" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-[#1a2a3a]/70',
    menuTheme: 'dark'
  },
  forest: {
    name: '林间静谧',
    gradient: 'from-[#064e3b] from-0% via-[#065f46] via-50% to-white to-85%',
    particleColor: 'rgba(110, 231, 183, 0.6)',
    particleType: 'firefly',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/forest_day.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4h4l-2-4h4l-2-4h6l-2 4h4l-2 4h4l-2 4h4l-2 4h4l-2 4h4l-2 4h4l-4 4H7z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v6" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-[#064e3b]/70',
    menuTheme: 'dark'
  },
  fire: {
    name: '温暖篝火',
    gradient: 'from-[#0f0505] via-[#2b0a0a] to-[#450a0a]',
    particleColor: 'rgba(255, 160, 50, 0.8)',
    particleType: 'ember',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/fire.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-white/60',
    menuBgClass: 'bg-[#2b0a0a]/70',
    menuTheme: 'dark'
  },
  starry: {
    name: '璀璨星空',
    gradient: 'from-[#020617] via-[#1e1b4b] to-[#0f172a]',
    particleColor: 'rgba(255, 255, 255, 0.8)',
    particleType: 'star',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/night_time.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-white/60',
    menuBgClass: 'bg-[#020617]/70',
    menuTheme: 'dark'
  },
  geometry: {
    name: '几何极简',
    gradient: 'from-[#4c1d95] via-[#2563eb] to-[#06b6d4]', 
    particleColor: 'rgba(255, 255, 255, 0.15)',
    particleType: 'geometric',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/science_fiction/scifi_drone_loud.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-white/80',
    menuBgClass: 'bg-[#1e293b]/70',
    menuTheme: 'dark'
  },
  cityscape: {
    name: '糖果色',
    gradient: 'from-gray-50 via-[#fdf2f8] to-white',
    particleColor: '', 
    particleType: 'neon_circle',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/city_ambience.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v10m0-10a4 4 0 110-8 4 4 0 010 8zm0 0a4 4 0 01-4 4h8a4 4 0 01-4-4z" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-white/80',
    menuTheme: 'light'
  },
  waves: {
    name: '海洋泡泡',
    gradient: 'from-[#1e3a8a] via-[#3b82f6] to-[#93c5fd]',
    particleColor: 'rgba(255, 255, 255, 0.3)',
    particleType: 'bubble',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/ambiences/waves_crashing_on_shore.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14.25c2.25 2 4.75 2 7 0 2.25-2 4.75-2 7 0" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 9.75c2.25 2 4.75 2 7 0 2.25-2 4.75-2 7 0" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-white/60',
    menuBgClass: 'bg-[#1e3a8a]/70',
    menuTheme: 'dark'
  },
  snow: {
    name: '雪落无声',
    gradient: 'from-[#475569] from-0% via-[#94a3b8] via-50% to-white to-85%',
    particleColor: 'rgba(255, 255, 255, 0.9)',
    particleType: 'snow',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/weather/blizzard.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v18M3 12h18m-2.5-6.5L5.5 18.5M18.5 18.5L5.5 5.5" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-[#475569]/70',
    menuTheme: 'dark'
  },
  zen: {
    name: '极简禅境',
    gradient: 'from-white via-[#fafafa] to-white',
    particleColor: '',
    particleType: 'zen_circle',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/water/stream_flowing.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-[#f0f0f0]/70',
    menuTheme: 'light'
  },
  eclipse: {
    name: '进度条',
    gradient: 'from-black to-gray-900', 
    particleColor: '',
    particleType: 'progress_bar',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/weather/wind_steady.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-white/60',
    menuBgClass: 'bg-[#18181b]/80',
    menuTheme: 'dark'
  },
  moon: {
    name: '月色变幻',
    gradient: 'from-[#0f172a] via-[#1e1b4b] to-[#020617]',
    particleColor: 'rgba(255, 255, 255, 0.5)',
    particleType: 'moon_phase',
    defaultAudioUrl: 'https://actions.google.com/sounds/v1/science_fiction/scifi_drone_loud.ogg',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
    textColor: 'text-white',
    statusColor: 'text-blue-200',
    menuBgClass: 'bg-[#0f172a]/70',
    menuTheme: 'dark'
  },
  glass: {
    name: '霓虹渐变',
    gradient: 'from-[#fbc2eb] from-0% via-[#a6c1ee] via-35% to-white to-60%',
    particleColor: '',
    particleType: 'glass_orb',
    defaultAudioUrl: '',
    icon: <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
    textColor: 'text-gray-900',
    statusColor: 'text-gray-500',
    menuBgClass: 'bg-[#fbc2eb]/70',
    menuTheme: 'light'
  }
};

// Pastel Palette for Zen mode (RGB values)
const ZEN_PALETTE = [
  [215, 140, 160], // Darker Rose
  [210, 180, 140], // Tan / Darker Peach
  [140, 200, 150], // Sage Green
  [140, 190, 210], // Steel Blue
  [180, 160, 200], // Muted Purple
  [255, 200, 160], // Soft Orange (replacing Terracotta)
  [240, 150, 150]  // Soft Red (replacing Cyan)
];

// Clock Themes Definition
interface ClockTheme {
    id: number;
    name: string;
    bg: string;
    card: string;
    text: string;
    divider: string;
    sub: string;
    accent: string;
}

const CLOCK_THEMES: ClockTheme[] = [
    { id: 0, name: '极简白', bg: 'bg-gray-100', card: 'bg-white', text: 'text-gray-900', divider: 'bg-gray-100/50', sub: 'text-gray-400', accent: 'text-gray-800' },
    { id: 1, name: '暗夜黑', bg: 'bg-[#000000]', card: 'bg-[#1a1a1a]', text: 'text-[#e5e5e5]', divider: 'bg-black/50', sub: 'text-[#525252]', accent: 'text-white' },
    { id: 2, name: '米白色', bg: 'bg-[#fcfbf9]', card: 'bg-[#efede6]', text: 'text-[#57534e]', divider: 'bg-[#d6d3d1]/50', sub: 'text-[#a8a29e]', accent: 'text-[#78716c]' }
];

const WeatherView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null); 
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [restMinutes, setRestMinutes] = useState(5);
  const [isRestMode, setIsRestMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  
  // Refs for animation loop access
  const timeLeftRef = useRef(timeLeft);
  const focusRef = useRef(focusMinutes);
  const restRef = useRef(restMinutes);
  const isRestRef = useRef(isRestMode);
  const isActiveRef = useRef(isActive);
  
  // Animation Refs
  const speedFactorRef = useRef(0.15);

  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock Mode States
  const [clockThemeId, setClockThemeId] = useState(0);
  const [clockDisplayMode, setClockDisplayMode] = useState<'clock' | 'timer'>('clock');
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  // Stopwatch States
  const [stopwatchTime, setStopwatchTime] = useState(0); // in milliseconds
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
    focusRef.current = focusMinutes;
    restRef.current = restMinutes;
    isRestRef.current = isRestMode;
    isActiveRef.current = isActive;
  }, [timeLeft, focusMinutes, restMinutes, isRestMode, isActive]);

  // Persistent Scene State
  const [currentScene, setCurrentScene] = useState<SceneType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('weather_current_scene');
      if (saved && SCENES[saved as SceneType]) {
        return saved as SceneType;
      }
    }
    return 'rain';
  });

  // Scene Ordering State (Custom Order)
  const [sceneOrder, setSceneOrder] = useState<SceneType[]>(() => {
    return ['rain', 'snow', 'zen', 'eclipse', 'geometry', 'glass', 'cityscape', 'starry', 'moon', 'forest', 'fire', 'waves'];
  });

  // Custom Audio State - Storing Base64 for persistence
  const [customAudioUrls, setCustomAudioUrls] = useState<Record<string, string>>(() => {
     if (typeof window !== 'undefined') {
         try {
             const saved = localStorage.getItem('weather_custom_audios');
             if (saved) return JSON.parse(saved);
         } catch (e) {
             console.error("Failed to load custom audios", e);
         }
     }
     return {};
  });

  // Persistent Mute State
  const [isMuted, setIsMuted] = useState(() => {
     if (typeof window !== 'undefined') {
         return localStorage.getItem('weather_is_muted') === 'true';
     }
     return false;
  });

  const [isAutoSwitch, setIsAutoSwitch] = useState(false);

  const [prevScene, setPrevScene] = useState<SceneType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Modals & Modes
  const [showMenu, setShowMenu] = useState(false);
  const [isSettingTime, setIsSettingTime] = useState(false);
  const [isSettingConfig, setIsSettingConfig] = useState(false);
  const [isClockMode, setIsClockMode] = useState(false);


  useEffect(() => {
    if (!isActive) {
      setTimeLeft((isRestMode ? restMinutes : focusMinutes) * 60);
    }
  }, [focusMinutes, restMinutes, isRestMode, isActive]);

  // Persist State
  useEffect(() => {
    localStorage.setItem('weather_current_scene', currentScene);
  }, [currentScene]);

  useEffect(() => {
      localStorage.setItem('weather_is_muted', String(isMuted));
  }, [isMuted]);
  
  // Persist Custom Audio safely wrapped in try/catch to handle storage quotas
  useEffect(() => {
      try {
          localStorage.setItem('weather_custom_audios', JSON.stringify(customAudioUrls));
      } catch (e) {
          console.error("Storage quota exceeded for custom audios");
      }
  }, [customAudioUrls]);

  // Clock Update Logic
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Stopwatch Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isStopwatchRunning && clockDisplayMode === 'timer') {
      const startTime = Date.now() - stopwatchTime;
      interval = setInterval(() => {
        setStopwatchTime(Date.now() - startTime);
      }, 30); // Update every 30ms for smooth UI
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning, clockDisplayMode]); // Removed stopwatchTime dependency to avoid drift/infinite loop on resume

  // Audio Control
  useEffect(() => {
    speedFactorRef.current = isActive ? 1.0 : 0.15;
    
    // Main Ambience
    const audio = audioRef.current;
    const activeConfig = SCENES[currentScene];
    const audioSrc = customAudioUrls[currentScene] || activeConfig.defaultAudioUrl;
    
    if (audio) {
      if (isActive && !isMuted && audioSrc) {
        audio.volume = 1.0; 
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log("Audio playback waiting for interaction or loading:", e);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [isActive, isMuted, currentScene, customAudioUrls, isClockMode]);

  // Timer Logic (Pomodoro)
  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) { // Keep timer running even in clock mode if active
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsRestMode(!isRestMode);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isRestMode]); 

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>, sceneKey: SceneType) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 2MB Limit for LocalStorage Safety
      if (file.size > 2 * 1024 * 1024) {
          alert("为确保应用流畅运行，请选择小于 2MB 的音频文件。");
          return;
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
          const result = evt.target?.result as string;
          if (result) {
              setCustomAudioUrls(prev => ({
                  ...prev,
                  [sceneKey]: result
              }));
          }
      };
      reader.onerror = () => {
          alert("读取文件失败");
      };
      reader.readAsDataURL(file);
  };

  const handleSceneChange = (newScene: SceneType) => {
    if (newScene === currentScene || isTransitioning) return;
    setPrevScene(currentScene);
    setCurrentScene(newScene);
    setIsTransitioning(true);
    setShowMenu(false);
    
    setTimeout(() => {
      setIsTransitioning(false);
      setPrevScene(null);
    }, 1000);
  };

  const navigateScene = (direction: 1 | -1) => {
    if (isClockMode) return; // Disable swipe in clock mode
    const currentIndex = sceneOrder.indexOf(currentScene);
    let nextIndex = currentIndex + direction;
    if (nextIndex >= sceneOrder.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = sceneOrder.length - 1;
    handleSceneChange(sceneOrder[nextIndex]);
  };
  
  // Use a ref to keep track of the latest navigateScene function to avoid stale closures in setInterval
  const navigateSceneRef = useRef(navigateScene);
  useEffect(() => {
    navigateSceneRef.current = navigateScene;
  });

  // Auto Switch Timer (10 Minutes)
  useEffect(() => {
    if (!isAutoSwitch) return;
    
    const interval = setInterval(() => {
        navigateSceneRef.current(1);
    }, 600000); // 10 minutes = 600000 ms

    return () => clearInterval(interval);
  }, [isAutoSwitch, currentScene]); // Reset timer when scene changes manually or automatically

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY; // Capture Start Y
  };

  const handleSwipe = (endX: number, endY: number) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const diffX = touchStartX.current - endX;
    const diffY = touchStartY.current - endY;
    
    // Check dominant direction
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal Swipe (Screen X)
      
      if (Math.abs(diffX) > 50) {
        if (isClockMode) {
             // In Rotated Clock Mode, Screen X is Visual Vertical (Up/Down)
             // Swipe visually "Down" (Screen X < -50, so diffX is negative?) 
             // diffX = start - end. If start < end (swipe right), diffX is negative.
             // Visual Down = Screen Right -> diffX < -50
             if (diffX < -50) {
                 setIsClockMode(false);
             }
        } else {
            // Normal Scene Navigation
            if (diffX > 0) {
              navigateScene(1);
            } else {
              navigateScene(-1);
            }
        }
      }
    } else {
      // Vertical Swipe (Screen Y)
      // Swipe UP: StartY > EndY => diffY > 0
      // Swipe DOWN: StartY < EndY => diffY < 0

      if (Math.abs(diffY) > 50) {
          if (isClockMode) {
              // In Rotated Clock Mode, Screen Y is Visual Horizontal (Left/Right)
              // Swipe visually "Left/Right" to toggle timer
              setClockDisplayMode(prev => prev === 'clock' ? 'timer' : 'clock');
          } else {
              // Normal Portrait Mode
              if (diffY > 50) {
                 // Swipe Up
                 if (!showMenu && !isClockMode) {
                     setIsClockMode(true);
                 }
              } else if (diffY < -50) {
                 // Swipe Down
                 if (isClockMode) {
                     setIsClockMode(false);
                 } else if (!showMenu) {
                     setShowMenu(true);
                 }
              }
          }
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    handleSwipe(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchStartY.current = e.clientY;
  };

  const onMouseUp = (e: React.MouseEvent) => {
    handleSwipe(e.clientX, e.clientY);
  };

  const handleReset = () => {
    setTimeLeft((isRestMode ? restMinutes : focusMinutes) * 60);
    setIsActive(false);
    setShowMenu(false);
  };

  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
        setShowThemeSelector(true);
    }, 800); // 800ms long press triggers theme menu
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
    }
  };

  const toggleStopwatch = () => {
    if (clockDisplayMode === 'timer') {
      setIsStopwatchRunning(!isStopwatchRunning);
    }
  };

  useEffect(() => {
    if (isClockMode) return; // Do not animate particles in clock mode to save battery/focus

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    let particles: any[] = [];
    const config = SCENES[currentScene];

    // Define count first so class can see it
    let pCount = 100;
    if (config.particleType === 'star') pCount = 200;
    if (config.particleType === 'geometric') pCount = 11;
    if (config.particleType === 'neon_circle') pCount = 7; 
    if (config.particleType === 'zen_circle') pCount = 1; 
    if (config.particleType === 'progress_bar') pCount = 15; // Decreased from 40 for cleaner look
    if (config.particleType === 'moon_phase') pCount = 60; // 1 Moon + 59 Stars
    if (config.particleType === 'glass_orb') pCount = 6; 
    if (config.particleType === 'bubble') pCount = 30; 
    if (config.particleType === 'ember') pCount = 60; 

    // Shared Progress for smooth bar animation
    let sharedProgress = 0;
    let sharedHue = 0;

    // Factory Function for Particles
    const createParticle = (index: number) => {
        // Initial state
        let p = {
            index,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            initialX: 0,
            initialY: 0,
            size: 0,
            opacity: 0.05 + Math.random() * 0.45,
            rotation: 0,
            rotationSpeed: 0,
            type: config.particleType,
            shape: '',
            oscillation: Math.random() * Math.PI * 2,
            oscillationSpeed: 0.02 + Math.random() * 0.03,
            hue: 0,
            baseSize: 0,
            colorProgress: 0,
            phase: 0,
            currentProgress: 0,
            geoColor: [255, 255, 255],
            
            // Methods attached directly to the object to avoid prototype/class issues in hooks
            reset: function(initial = false) {
                this.type = config.particleType;

                // Special override for moon scene to add stars
                if (currentScene === 'moon' && this.index < pCount - 1) {
                    this.type = 'star';
                }
                
                if (this.type === 'line') { 
                  this.vx = -3 - Math.random() * 3; 
                  this.vy = 22 + Math.random() * 10;
                  const driftOffset = height * 0.5; 
                  this.x = Math.random() * (width + driftOffset) - 50;
                  this.y = initial ? Math.random() * height : -50 - Math.random() * 50;
                  this.size = 35 + Math.random() * 20; 
                  this.rotation = Math.atan2(this.vy, this.vx) - Math.PI / 2;
                } else if (this.type === 'firefly') { 
                  this.x = Math.random() * width;
                  this.y = initial ? Math.random() * height : height + 20;
                  this.vx = (Math.random() - 0.5) * 0.5;
                  this.vy = -(0.2 + Math.random() * 0.4);
                  this.size = 1.2 + Math.random() * 2.5;
                } else if (this.type === 'ember') { 
                  this.x = Math.random() * width;
                  this.y = initial ? Math.random() * height : height + 10;
                  this.vx = (Math.random() - 0.5) * 0.5; 
                  this.vy = -(0.5 + Math.random() * 1.5); 
                  this.size = 2 + Math.random() * 4;
                } else if (this.type === 'star') { 
                  this.x = Math.random() * width;
                  this.y = Math.random() * height;
                  this.vx = 0; 
                  this.vy = 0; 
                  this.size = 0.5 + Math.random() * 2.0;
                } else if (this.type === 'bubble') { 
                  this.x = Math.random() * width;
                  this.y = initial ? Math.random() * height : height + 50;
                  this.vx = 0;
                  this.vy = -(1.0 + Math.random() * 1.5);
                  this.size = 2 + Math.random() * 8;
                } else if (this.type === 'snow') { 
                  this.x = Math.random() * width;
                  this.y = initial ? Math.random() * height : -10;
                  this.vx = 0;
                  this.vy = 0.8 + Math.random() * 1.5;
                  this.size = 1.5 + Math.random() * 3.0;
                } else if (this.type === 'geometric') { 
                  this.x = Math.random() * width;
                  this.y = Math.random() * height;
                  this.vx = (Math.random() - 0.5) * 1.0;
                  this.vy = (Math.random() - 0.5) * 1.0;
                  this.size = 60 + Math.random() * 60; 
                  const shapes = ['circle', 'square', 'triangle'];
                  this.shape = shapes[Math.floor(Math.random() * shapes.length)];
                  this.rotation = Math.random() * Math.PI * 2;
                  this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                  this.geoColor = [255, 255, 255]; 
                } else if (this.type === 'neon_circle') { 
                  this.hue = Math.random() * 360;
                  const minDim = Math.min(width, height);
                  if (currentScene === 'cityscape') {
                     if (this.index === 0) {
                         this.x = width * 0.2; this.y = height * 0.3; this.size = minDim * 0.9; 
                         this.vx = 0; this.vy = 0; this.initialX = this.x; this.initialY = this.y;
                     } else if (this.index === 1) {
                         this.x = width * 0.8; this.y = height * 0.7; this.size = minDim * 0.7; 
                         this.vx = 0; this.vy = 0; this.initialX = this.x; this.initialY = this.y;
                         this.hue = (this.hue + 180) % 360; 
                     } else {
                         this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
                         this.x = Math.random() * width; this.y = Math.random() * height;
                         if (this.index < 4) this.size = minDim * (0.3 + Math.random() * 0.225);
                         else this.size = minDim * (0.075 + Math.random() * 0.15);
                     }
                  } else {
                      this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5;
                      this.x = Math.random() * width; this.y = Math.random() * height;
                      if (this.index < 2) this.size = minDim * (0.6 + Math.random() * 0.3); 
                      else if (this.index < 4) this.size = minDim * (0.3 + Math.random() * 0.225);
                      else this.size = minDim * (0.075 + Math.random() * 0.15);
                  }
                } else if (this.type === 'zen_circle') { 
                  this.x = width / 2; this.y = 0; this.baseSize = height * 0.70; this.size = this.baseSize;
                  this.colorProgress = Math.random() * ZEN_PALETTE.length; 
                } else if (this.type === 'progress_bar') { 
                   this.hue = 0; this.currentProgress = 0;
                   if (this.index > 0) {
                       // Rising Bubble Initialization
                       this.x = Math.random() * width;
                       this.y = height + Math.random() * 100;
                       this.vx = 0;
                       this.vy = -1 - Math.random() * 3;
                       this.size = 2 + Math.random() * 5;
                       this.oscillation = Math.random() * Math.PI * 2;
                   }
                } else if (this.type === 'moon_phase') { 
                  this.x = width / 2; this.y = height * 0.25; this.size = Math.min(width, height) * 0.55; 
                  this.phase = 0; 
                } else if (this.type === 'glass_orb') {
                  this.x = Math.random() * width; this.y = Math.random() * height;
                  this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
                  this.size = 100 + Math.random() * 150; this.hue = Math.random() * 360; 
                }
            },

            update: function() {
                const factor = speedFactorRef.current;
                const isModeActive = isActiveRef.current;
                const framesPerSecond = 60;
                
                if (this.type === 'star') {
                   this.oscillation += 0.02 * factor; 
                   this.opacity = 0.2 + 0.7 * Math.abs(Math.sin(this.oscillation));
                   return; 
                }

                if (this.type === 'neon_circle') {
                   if (currentScene === 'cityscape' && (this.index === 0 || this.index === 1)) {
                      this.oscillation += 0.01 * factor;
                      this.x = this.initialX + Math.sin(this.oscillation) * 20;
                      this.y = this.initialY + Math.cos(this.oscillation * 0.8) * 20;
                   } else {
                     this.x += this.vx * factor; this.y += this.vy * factor;
                     if (this.x < 0 || this.x > width) this.vx *= -1;
                     if (this.y < 0 || this.y > height) this.vy *= -1;
                   }
                   const periodSeconds = isModeActive ? 60 : 180;
                   const hueInc = 360 / (periodSeconds * framesPerSecond);
                   this.hue += hueInc;
                   return;
                }

                if (this.type === 'zen_circle') {
                   this.oscillation += 0.008 * factor; 
                   const periodSeconds = isModeActive ? 60 : 180;
                   const colorInc = ZEN_PALETTE.length / (periodSeconds * framesPerSecond);
                   this.colorProgress += colorInc;
                   if (this.colorProgress >= ZEN_PALETTE.length) this.colorProgress = 0;
                   this.size = this.baseSize + Math.sin(this.oscillation) * 15;
                   return; 
                }

                if (this.type === 'moon_phase') {
                    this.phase += 0.0005 * factor;
                    if (this.phase > Math.PI * 2) this.phase -= Math.PI * 2;
                    return;
                }

                if (this.type === 'glass_orb') {
                    this.x += this.vx * factor; this.y += this.vy * factor;
                    if (this.x < -this.size || this.x > width + this.size) this.vx *= -1;
                    if (this.y < -this.size || this.y > height + this.size) this.vy *= -1;
                    const periodSeconds = isModeActive ? 60 : 180;
                    const hueInc = 360 / (periodSeconds * framesPerSecond);
                    this.hue += hueInc;
                    return;
                }

                if (this.type === 'geometric') {
                    this.x += this.vx * factor; this.y += this.vy * factor;
                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                    this.rotation += this.rotationSpeed * factor;
                    return;
                }

                if (this.type === 'progress_bar') {
                    if (this.index === 0) {
                        // Main Bar Logic
                        const periodSeconds = isModeActive ? 300 : 900;
                        const hueInc = 360 / (periodSeconds * 60); 
                        sharedHue += hueInc; // Shared hue

                        const totalSeconds = (isRestRef.current ? restRef.current : focusRef.current) * 60;
                        const currentLeft = timeLeftRef.current;
                        let targetProgress = 1 - (currentLeft / totalSeconds);
                        if (!isActiveRef.current && currentLeft === totalSeconds) targetProgress = 0;
                        
                        if (Math.abs(targetProgress - sharedProgress) > 0.5) {
                            sharedProgress = targetProgress;
                        } else {
                            sharedProgress += (targetProgress - sharedProgress) * 0.05;
                        }
                    } else {
                        // Bubbles
                        this.y += this.vy * factor;
                        this.oscillation += 0.05 * factor;
                        this.x += Math.sin(this.oscillation) * 0.5 * factor;

                        const safeProgress = Math.max(0, Math.min(1, sharedProgress));
                        const barHeight = height * safeProgress;
                        const topY = height - barHeight;

                        if (this.y < topY) {
                            // Reset Bubble
                            this.y = height + Math.random() * 100;
                            this.x = Math.random() * width;
                        }
                    }
                    return;
                }

                this.x += this.vx * factor;
                this.y += this.vy * factor;

                if (this.type === 'snow' || this.type === 'bubble' || this.type === 'firefly' || this.type === 'ember') {
                    this.oscillation += this.oscillationSpeed;
                    this.x += Math.sin(this.oscillation) * 0.5 * factor;
                }
                
                if (this.type === 'line' || this.type === 'snow') { 
                     if (this.y > height + 20 || (this.vx < 0 && this.x < -100)) this.reset();
                } else if (this.type === 'bubble' || this.type === 'firefly' || this.type === 'ember') { 
                     if (this.y < -20) this.reset();
                }
            },

            draw: function(ctx: CanvasRenderingContext2D) {
                const factor = speedFactorRef.current;
                const isModeActive = isActiveRef.current;
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation || 0);
                
                let curOp = this.opacity;
                if (this.type === 'firefly' || this.type === 'ember') curOp *= (0.6 + 0.4 * Math.sin(Date.now() / 300));
                
                ctx.fillStyle = config.particleColor.replace(/[\d\.]+\)$/g, `${curOp})`);
                
                if (this.type === 'neon_circle') {
                    const isLight = config.menuTheme === 'light';
                    let drawSize = this.size;
                    if (currentScene === 'cityscape' && (this.index === 0 || this.index === 1)) {
                         drawSize = this.size + Math.sin(this.oscillation) * 15;
                    }

                    if (isLight) {
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.shadowBlur = 40;
                        ctx.shadowColor = `hsla(${this.hue}, 60%, 80%, 0.5)`;
                        
                        if (currentScene === 'cityscape' && (this.index === 0 || this.index === 1)) {
                             ctx.fillStyle = `hsla(${this.hue}, 60%, 85%, 0.4)`; 
                        } else {
                             ctx.fillStyle = `hsla(${this.hue}, 60%, 85%, 0.1)`;
                        }

                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2, 0, Math.PI * 2); ctx.fill();

                        ctx.shadowBlur = 15;
                        ctx.shadowColor = `hsla(${this.hue}, 60%, 70%, 0.3)`;
                        ctx.fillStyle = `hsla(${this.hue}, 60%, 75%, 0.2)`;
                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2 * 0.85, 0, Math.PI * 2); ctx.fill();

                        ctx.shadowBlur = 5;
                        ctx.shadowColor = `hsla(${this.hue}, 70%, 60%, 0.4)`;
                        if (currentScene === 'cityscape' && (this.index === 0 || this.index === 1)) {
                            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.2)`; 
                        } else {
                            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, 0.4)`;
                        }
                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2 * 0.7, 0, Math.PI * 2); ctx.fill();
                        ctx.shadowBlur = 0; 
                    } else {
                        ctx.globalCompositeOperation = 'screen'; 
                        ctx.shadowBlur = 60;
                        ctx.shadowColor = `hsl(${this.hue}, 80%, 45%)`; 
                        ctx.fillStyle = `hsla(${this.hue}, 80%, 45%, 0.2)`; 
                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2, 0, Math.PI * 2); ctx.fill();

                        ctx.shadowBlur = 30;
                        ctx.shadowColor = `hsl(${this.hue}, 80%, 55%)`;
                        ctx.fillStyle = `hsla(${this.hue}, 80%, 55%, 0.4)`;
                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2 * 0.85, 0, Math.PI * 2); ctx.fill();

                        ctx.shadowBlur = 10;
                        ctx.shadowColor = `hsl(${this.hue}, 90%, 75%)`;
                        ctx.fillStyle = `hsla(${this.hue}, 90%, 75%, 0.9)`;
                        ctx.beginPath(); ctx.arc(0, 0, drawSize / 2 * 0.7, 0, Math.PI * 2); ctx.fill();
                        
                        ctx.globalCompositeOperation = 'source-over'; ctx.shadowBlur = 0; 
                    }

                } else if (this.type === 'zen_circle') {
                    const idx1 = Math.floor(this.colorProgress);
                    const idx2 = (idx1 + 1) % ZEN_PALETTE.length;
                    const t = this.colorProgress - idx1;
                    const c1 = ZEN_PALETTE[idx1];
                    const c2 = ZEN_PALETTE[idx2];
                    const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
                    const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
                    const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill();

                } else if (this.type === 'progress_bar') {
                    // Revert Translation to draw full screen elements
                    ctx.restore();
                    
                    const safeProgress = Math.max(0, Math.min(1, sharedProgress));
                    const barHeight = height * safeProgress;
                    const topY = height - barHeight;
                    const h = sharedHue % 360;

                    if (this.index === 0) {
                        // Draw Main Liquid Bar
                        const barGrad = ctx.createLinearGradient(0, height - barHeight, 0, height);
                        barGrad.addColorStop(0, `hsla(${h}, 80%, 60%, 0.9)`);
                        barGrad.addColorStop(1, `hsla(${(h + 40) % 360}, 80%, 50%, 0.8)`);
                        ctx.fillStyle = barGrad;
                        
                        // Reduced amplitude from 12 to 3 for smoother surface
                        const waveAmp = 3 * Math.min(1, safeProgress * 2); 
                        const phase = Date.now() / 250;

                        ctx.beginPath();
                        ctx.moveTo(0, height);
                        ctx.lineTo(0, topY);
                        for (let x = 0; x <= width; x += 10) {
                            ctx.lineTo(x, topY + Math.sin(x * 0.02 + phase) * waveAmp);
                        }
                        ctx.lineTo(width, height);
                        ctx.closePath();
                        ctx.fill();

                        // Surface Glow Line
                        ctx.strokeStyle = `hsla(${h}, 90%, 80%, 0.9)`;
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        for (let x = 0; x <= width; x += 5) {
                            const y = topY + Math.sin(x * 0.02 + phase) * waveAmp;
                            if (x === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.stroke();

                    } else {
                        // Draw Rising Bubbles (Energy)
                        // Only draw if inside liquid
                        // Rough check: y > topY + waveAmplitude
                        if (this.y > topY + 15) {
                             ctx.fillStyle = `rgba(255, 255, 255, 0.4)`;
                             ctx.beginPath();
                             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                             ctx.fill();
                        }
                    }
                    return; // Skip standard restore

                } else if (this.type === 'moon_phase') {
                    ctx.fillStyle = '#e6e6e6'; 
                    ctx.shadowBlur = 60;
                    ctx.shadowColor = 'rgba(230, 230, 255, 0.5)';
                    ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0;
                    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.clip(); ctx.restore();

                    ctx.fillStyle = '#0f172a'; 
                    const p = this.phase;
                    const r = this.size + 1; 
                    const x = r * Math.cos(p);
                    ctx.beginPath();
                    if (p < Math.PI) {
                        ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2); 
                        ctx.ellipse(0, 0, Math.abs(x), r, 0, -Math.PI/2, Math.PI/2, x < 0);
                    } else {
                        ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2);
                        ctx.ellipse(0, 0, Math.abs(x), r, 0, Math.PI/2, -Math.PI/2, x < 0);
                    }
                    ctx.fill();

                } else if (this.type === 'glass_orb') {
                    ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, 0.4)`;
                    ctx.filter = 'blur(40px)'; 
                    ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill(); ctx.filter = 'none';

                } else if (this.type === 'line') {
                  ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = 1.5;
                  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, this.size); ctx.stroke();
                } else if (this.type === 'geometric') {
                  ctx.strokeStyle = `rgba(255, 255, 255, ${curOp})`; ctx.lineWidth = 1;
                  ctx.beginPath();
                  const rSize = this.size / 2;
                  if (this.shape === 'circle') {
                     ctx.arc(0, 0, rSize, 0, Math.PI * 2);
                  } else if (this.shape === 'square') {
                     ctx.rect(-rSize, -rSize, this.size, this.size);
                  } else if (this.shape === 'triangle') {
                    ctx.moveTo(0, -rSize); ctx.lineTo(rSize, rSize); ctx.lineTo(-rSize, rSize); ctx.closePath();
                  } 
                  ctx.stroke(); 
                } else {
                  ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); if (this.type === 'bubble') {} ctx.fill();
                }
                ctx.restore();
            }
        };
        
        p.initialX = p.x;
        p.initialY = p.y;
        p.reset(true);
        return p;
    };

    particles = Array.from({ length: pCount }, (_, i) => createParticle(i));

    let geoHue = 220; // Initial hue for geometry scene

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dynamic Background for Geometry Scene
      if (currentScene === 'geometry') {
          const factor = speedFactorRef.current;
          geoHue += 0.05 * (factor > 0.2 ? factor : 0.2); 
          const h = geoHue % 360;
          const grd = ctx.createLinearGradient(0, 0, 0, height);
          grd.addColorStop(0, `hsl(${h}, 80%, 60%)`); 
          grd.addColorStop(1, `hsl(${(h + 40) % 360}, 80%, 50%)`);
          ctx.fillStyle = grd;
          ctx.fillRect(0, 0, width, height);
      }

      particles.forEach(p => { 
          if (p && typeof p.update === 'function') {
              p.update(); 
              p.draw(ctx); 
          }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [currentScene, isClockMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format Clock Time
  const getClockParts = (date: Date) => {
      const h = date.getHours();
      const m = date.getMinutes().toString().padStart(2, '0');
      const s = date.getSeconds().toString().padStart(2, '0');
      const isPm = h >= 12;
      const h12 = h % 12 || 12; // Convert to 12-hour format
      return { 
          h: h12.toString().padStart(2, '0'), 
          m, 
          s, 
          ampm: isPm ? 'PM' : 'AM' 
      };
  };

  const activeConfig = SCENES[currentScene];
  const activeAudioUrl = customAudioUrls[currentScene] || activeConfig.defaultAudioUrl;
  const isLightMenu = activeConfig.menuTheme === 'light';

  const clockParts = getClockParts(currentTime);
  const currentTheme = CLOCK_THEMES[clockThemeId];

  // Get data for Clock Mode based on display mode (Clock vs Timer)
  let displayH = clockParts.h;
  let displayM = clockParts.m;
  let displayS = clockParts.s;
  let displayLabel = clockParts.ampm;

  if (clockDisplayMode === 'timer') {
      // Stopwatch logic: minutes and seconds
      const totalSeconds = Math.floor(stopwatchTime / 1000);
      const mins = Math.floor(totalSeconds / 60);
      const secs = totalSeconds % 60;
      const ms = Math.floor((stopwatchTime % 1000) / 10); // Hundredths

      displayH = mins.toString().padStart(2, '0');
      displayM = secs.toString().padStart(2, '0');
      displayS = ms.toString().padStart(2, '0'); // Show MS in badge
      displayLabel = isStopwatchRunning ? "RUN" : "STOP";
  }
  
  return (
    <div 
      className="relative h-full w-full overflow-hidden select-none bg-black flex flex-col pointer-events-auto"
      onClick={() => {
        if (isClockMode) return;
        if (!isSettingTime && !isSettingConfig && !showMenu) setIsActive(!isActive);
      }}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown} // Add mouse support
      onTouchEnd={onTouchEnd}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Key prop ensures the audio element is destroyed and recreated when scene changes */}
      <audio 
        ref={audioRef} 
        key={currentScene + (customAudioUrls[currentScene] ? '_custom' : '')} 
        src={activeAudioUrl} 
        loop 
        preload="auto" 
        playsInline
      />

      {/* Clock Mode Overlay (Flip Clock Style) */}
      <div className={`absolute inset-0 z-[200] ${currentTheme.bg} transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${isClockMode ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {/* Rotated Container for Landscape Mode - Adaptive logic for Portrait/Landscape screens */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 portrait:rotate-90 portrait:w-[100vh] portrait:h-[100vw] landscape:rotate-0 landscape:w-full landscape:h-full flex flex-col justify-center items-center overflow-hidden">
              
              {/* Interaction Layer */}
              <div 
                  className="flex flex-row items-center gap-[4vmin] w-full justify-center"
                  onMouseDown={handleLongPressStart}
                  onMouseUp={handleLongPressEnd}
                  onMouseLeave={handleLongPressEnd}
                  onTouchStart={handleLongPressStart}
                  onTouchEnd={handleLongPressEnd}
                  onDoubleClick={toggleStopwatch}
              >
                  {/* Hour Card */}
                  <div className={`relative w-[58vmin] h-[58vmin] ${currentTheme.card} rounded-[4vmin] shadow-2xl flex items-center justify-center overflow-hidden transition-colors duration-500`}>
                       {/* Label */}
                       <span className={`absolute top-[4vmin] left-[4vmin] text-[3vmin] font-bold ${currentTheme.accent} font-sans tracking-widest`}>{displayLabel}</span>
                       {/* Number */}
                       <span className={`text-[38vmin] font-bold ${currentTheme.text} leading-none tracking-tighter font-sans select-none`}>{displayH}</span>
                       {/* Divider */}
                       <div className={`absolute top-1/2 left-0 w-full h-[2px] ${currentTheme.divider}`}></div>
                  </div>

                  {/* Minute Card */}
                  <div className={`relative w-[58vmin] h-[58vmin] ${currentTheme.card} rounded-[4vmin] shadow-2xl flex items-center justify-center overflow-hidden transition-colors duration-500`}>
                       {/* Number */}
                       <span className={`text-[38vmin] font-bold ${currentTheme.text} leading-none tracking-tighter font-sans select-none`}>{displayM}</span>
                       {/* Divider */}
                       <div className={`absolute top-1/2 left-0 w-full h-[2px] ${currentTheme.divider}`}></div>
                       
                       {/* Seconds/MS Floating Badge */}
                       {(clockDisplayMode === 'clock' || clockDisplayMode === 'timer') && (
                           <div className={`absolute bottom-[4vmin] right-[4vmin] ${currentTheme.bg} shadow-md border ${currentTheme.divider} rounded-xl px-[2vmin] py-[0.5vmin]`}>
                               <span className={`text-[3vmin] font-bold ${currentTheme.text} font-mono tracking-widest`}>{displayS}</span>
                           </div>
                       )}
                  </div>
              </div>

              {/* Subtitle - Floating (Absolute) to prevent affecting center alignment */}
              <div className="absolute bottom-16 w-full text-center animate-pulse z-20 pointer-events-none">
                   <p className={`text-xs ${currentTheme.sub} tracking-[0.3em] font-medium`}>
                      {clockDisplayMode === 'timer' ? '双击启停 · 左右滑动切换' : '长按换肤 · 左右滑动切换'}
                   </p>
              </div>

              {/* Close Button */}
              <button 
                 onClick={(e) => { e.stopPropagation(); setIsClockMode(false); }}
                 className="absolute bottom-8 right-12 text-gray-400 hover:text-gray-600 transition-colors z-50 p-4"
              >
                 <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
          </div>

          {/* Theme Selector - Rotated separately to match view */}
          {showThemeSelector && (
              <div 
                className="absolute inset-0 z-[210] bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300"
                onClick={() => setShowThemeSelector(false)}
              >
                  <div className="transform rotate-90 bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-xs mx-6" onClick={e => e.stopPropagation()}>
                       <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-6">选择主题</h3>
                       <div className="grid grid-cols-3 gap-6">
                           {CLOCK_THEMES.map((theme) => (
                               <button 
                                  key={theme.id}
                                  onClick={() => { setClockThemeId(theme.id); setShowThemeSelector(false); }}
                                  className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 ${clockThemeId === theme.id ? 'border-blue-500' : 'border-transparent'}`}
                                  style={{ background: theme.id === 1 ? '#000' : theme.id === 2 ? '#faf9f6' : '#f3f4f6' }}
                               >
                                   {clockThemeId === theme.id && <div className="w-2 h-2 rounded-full bg-blue-500 box-content border-2 border-white" />}
                               </button>
                           ))}
                       </div>
                  </div>
              </div>
          )}
      </div>

      {/* Background Layers */}
      <div className={`absolute inset-0 z-0 transition-all duration-700 ${showMenu || isSettingTime || isSettingConfig ? 'scale-105' : 'scale-100'}`}>
        {/* Layer 0: Current Scene (Bottom) */}
        <div className={`absolute inset-0 bg-gradient-to-b ${activeConfig.gradient}`} />
        
        {/* Layer 1: Previous Scene Fade Out (Top) */}
        {prevScene && (
           <div className={`absolute inset-0 bg-gradient-to-b ${SCENES[prevScene].gradient} transition-opacity duration-1000 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`} />
        )}
        
        {/* Fire Glow Overlay */}
        <div className={`absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-orange-600/20 via-red-900/10 to-transparent pointer-events-none transition-opacity duration-1000 ${currentScene === 'fire' ? 'opacity-100' : 'opacity-0'}`} />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>

      {/* Main UI Overlay */}
      <div className="relative h-full flex flex-col z-20">
        
        {/* Top Trigger Area */}
        <div 
          className="absolute top-0 left-0 w-full h-24 flex flex-col items-center justify-center cursor-pointer z-[70]"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(true);
          }}
        >
          {!showMenu && !isClockMode && (
            <div className="flex flex-col items-center space-y-2 opacity-30 hover:opacity-100 transition-all duration-300 transform translate-y-[-10px]">
              <div className={`w-14 h-1 rounded-full ${isLightMenu ? 'bg-black/20' : 'bg-white/60'}`}></div>
            </div>
          )}
        </div>

        {/* Time Setting Modal */}
        <div 
          className={`absolute inset-0 flex items-center justify-center z-[110] transition-all duration-500 ${isSettingTime ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSettingTime(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />
          <div 
            className={`relative ${activeConfig.menuBgClass} backdrop-blur-2xl p-12 rounded-[5rem] w-[88%] max-w-sm md:max-w-xl flex flex-col items-center shadow-2xl transition-colors duration-500`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`${isLightMenu ? 'text-black/40' : 'text-white/40'} text-[10px] uppercase tracking-[0.4em] font-bold mb-10 transition-colors duration-500`}>模式设定</h3>
            <div className="flex flex-col w-full space-y-8">
              <div className="flex items-center justify-between">
                <span className={`${isLightMenu ? 'text-black/50' : 'text-white/50'} text-xs font-bold uppercase tracking-widest ml-4 transition-colors duration-500`}>专注</span>
                <div className="flex items-center space-x-5">
                  <button onClick={() => setFocusMinutes(Math.max(1, focusMinutes - 1))} className={`w-10 h-10 rounded-full ${isLightMenu ? 'bg-black/10 text-black' : 'bg-white/10 text-white'} flex items-center justify-center active:scale-90 transition-colors duration-500`}>－</button>
                  <input 
                    type="number" 
                    value={focusMinutes} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) setFocusMinutes(Math.max(1, Math.min(180, val)));
                    }}
                    className={`text-2xl md:text-4xl font-bold ${isLightMenu ? 'text-black border-black/20 focus:border-black' : 'text-white border-white/20 focus:border-white'} min-w-[3rem] text-center bg-transparent border-b outline-none p-1 w-20 transition-colors duration-500`}
                  />
                  <button onClick={() => setFocusMinutes(Math.min(120, focusMinutes + 1))} className={`w-10 h-10 rounded-full ${isLightMenu ? 'bg-black/10 text-black' : 'bg-white/10 text-white'} flex items-center justify-center active:scale-90 transition-colors duration-500`}>＋</button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className={`${isLightMenu ? 'text-black/50' : 'text-white/50'} text-xs font-bold uppercase tracking-widest ml-4 transition-colors duration-500`}>休息</span>
                <div className="flex items-center space-x-5">
                  <button onClick={() => setRestMinutes(Math.max(1, restMinutes - 1))} className={`w-10 h-10 rounded-full ${isLightMenu ? 'bg-black/10 text-black' : 'bg-white/10 text-white'} flex items-center justify-center active:scale-90 transition-colors duration-500`}>－</button>
                  <input 
                    type="number" 
                    value={restMinutes} 
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val)) setRestMinutes(Math.max(1, Math.min(60, val)));
                    }}
                    className={`text-2xl md:text-4xl font-bold ${isLightMenu ? 'text-black border-black/20 focus:border-black' : 'text-white border-white/20 focus:border-white'} min-w-[3rem] text-center bg-transparent border-b outline-none p-1 w-20 transition-colors duration-500`}
                  />
                  <button onClick={() => setRestMinutes(Math.min(60, restMinutes + 1))} className={`w-10 h-10 rounded-full ${isLightMenu ? 'bg-black/10 text-black' : 'bg-white/10 text-white'} flex items-center justify-center active:scale-90 transition-colors duration-500`}>＋</button>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsSettingTime(false)}
              className={`mt-12 w-full py-5 rounded-full ${isLightMenu ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90'} font-bold text-xs tracking-widest uppercase shadow-lg active:scale-95 transition-all duration-500`}
            >
              完成设置
            </button>
          </div>
        </div>

        {/* Config/Settings Modal (Audio & Mute) */}
        <div 
          className={`absolute inset-0 flex items-center justify-center z-[120] transition-all duration-500 ${isSettingConfig ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsSettingConfig(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />
          <div 
            className={`relative ${activeConfig.menuBgClass} backdrop-blur-2xl p-8 rounded-[40px] w-[90%] max-w-sm md:max-w-2xl flex flex-col items-center shadow-2xl transition-colors duration-500 max-h-[80vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={`${isLightMenu ? 'text-black/40' : 'text-white/40'} text-[12px] uppercase tracking-[0.3em] font-bold mb-8 transition-colors duration-500`}>高级设置</h3>
            
            <div className="w-full space-y-8">
               {/* Global Mute Toggle */}
               <div className="flex items-center justify-between p-2">
                   <span className={`${isLightMenu ? 'text-black' : 'text-white'} text-sm font-medium`}>场景音效</span>
                   <button 
                       onClick={() => setIsMuted(!isMuted)}
                       className={`w-12 h-7 rounded-full transition-colors duration-300 relative ${isMuted ? 'bg-gray-400' : 'bg-green-500'}`}
                   >
                       <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-300 ${isMuted ? 'translate-x-0' : 'translate-x-5'}`} />
                   </button>
               </div>

               <div className={`h-[1px] w-full ${isLightMenu ? 'bg-black/10' : 'bg-white/10'}`} />

               {/* Custom Audio List */}
               <div className="flex flex-col space-y-4">
                   <h4 className={`${isLightMenu ? 'text-black/40' : 'text-white/40'} text-[10px] uppercase tracking-widest font-bold`}>导入场景音频 (MP3/WAV)</h4>
                   {Object.keys(SCENES).map((key) => {
                       const sKey = key as SceneType;
                       const config = SCENES[sKey];
                       const hasCustom = !!customAudioUrls[sKey];
                       return (
                           <div key={sKey} className="flex flex-col space-y-2">
                               <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className={`${isLightMenu ? 'text-black/60' : 'text-white/60'}`}>{config.icon}</div>
                                        <span className={`${isLightMenu ? 'text-black/80' : 'text-white/80'} text-xs font-medium`}>{config.name}</span>
                                    </div>
                                    {hasCustom && (
                                        <button 
                                            onClick={() => {
                                                const newUrls = {...customAudioUrls};
                                                delete newUrls[sKey];
                                                setCustomAudioUrls(newUrls);
                                            }}
                                            className="text-[10px] text-red-400 hover:text-red-300 underline"
                                        >
                                            恢复默认
                                        </button>
                                    )}
                               </div>
                               <div className="flex items-center space-x-2">
                                  <label className={`flex-1 cursor-pointer flex items-center justify-center p-2 rounded-lg border border-dashed ${isLightMenu ? 'border-black/10 hover:bg-black/5' : 'border-white/10 hover:bg-white/5'} transition-colors`}>
                                      <span className={`${isLightMenu ? 'text-black/40' : 'text-white/40'} text-[10px]`}>
                                          {hasCustom ? '已保存 (点击更换)' : '点击选择文件...'}
                                      </span>
                                      <input 
                                          type="file" 
                                          accept="audio/*"
                                          onChange={(e) => handleFileImport(e, sKey)}
                                          className="hidden"
                                      />
                                  </label>
                               </div>
                           </div>
                       );
                   })}
               </div>
            </div>

            <button 
              onClick={() => setIsSettingConfig(false)}
              className={`mt-10 w-full py-4 rounded-full ${isLightMenu ? 'bg-black text-white hover:bg-black/90' : 'bg-white text-black hover:bg-white/90'} font-bold text-xs tracking-widest uppercase shadow-lg active:scale-95 transition-all duration-500`}
            >
              关闭
            </button>
          </div>
        </div>

        {/* Floating Menu */}
        <div 
          className={`absolute inset-x-0 top-0 h-full flex flex-col items-center pt-16 transition-all duration-700 transform z-[100] ${
            showMenu ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={() => setShowMenu(false)}
        >
          <div 
            className={`flex flex-col ${activeConfig.menuBgClass} backdrop-blur-2xl rounded-[52px] p-8 max-w-[90vw] md:max-w-[600px] border ${isLightMenu ? 'border-black/5 shadow-xl' : 'border-white/10 shadow-2xl'} transition-colors duration-500 max-h-[85vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grid Layout with dynamic ordering */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {sceneOrder.map((sceneId, index) => (
                <div key={sceneId} className="relative group">
                  <button
                    onClick={() => handleSceneChange(sceneId)}
                    className={`w-full p-4 flex flex-col items-center justify-center transition-all duration-500 relative ${
                      currentScene === sceneId 
                        ? (isLightMenu ? 'bg-black text-white rounded-full shadow-2xl' : 'bg-white text-black rounded-full shadow-2xl') 
                        : (isLightMenu ? 'text-black/30 hover:bg-black/5 rounded-full' : 'text-white/30 hover:bg-white/10 rounded-full') 
                    } ${currentScene === sceneId ? 'scale-105' : 'scale-100'}`}
                  >
                    <div className="w-6 h-6 mb-2 flex items-center justify-center">
                      {SCENES[sceneId].icon}
                    </div>
                    <span className="text-[10px] font-medium tracking-widest whitespace-nowrap">
                      {SCENES[sceneId].name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            
            <div className={`h-[1px] w-full mb-6 ${isLightMenu ? 'bg-black/5' : 'bg-white/10'}`} />
            
            <div className="flex flex-col space-y-3 px-2">
              <div className="flex space-x-3 w-full">
                {/* Settings Button - Text Only */}
                <button
                  onClick={() => setIsSettingConfig(true)}
                  className={`p-5 rounded-[28px] flex-1 flex flex-col items-center justify-center ${
                    isLightMenu ? 'text-black/40 hover:bg-black/5' : 'text-white/40 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider">高级设置</span>
                </button>
                {/* Clock Button - Text Only */}
                <button
                  onClick={() => {
                      setShowMenu(false);
                      setIsClockMode(true);
                  }}
                  className={`p-5 rounded-[28px] flex-1 flex flex-col items-center justify-center ${
                    isLightMenu ? 'text-black/40 hover:bg-black/5' : 'text-white/40 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider">时钟模式</span>
                </button>
              </div>
              
              <div className="flex space-x-3 w-full">
                <button
                  onClick={() => setIsAutoSwitch(!isAutoSwitch)}
                  className={`p-5 rounded-[28px] flex-1 flex items-center justify-center text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${
                     isAutoSwitch
                       ? (isLightMenu ? 'bg-black text-white shadow-lg' : 'bg-white text-black shadow-lg')
                       : (isLightMenu ? 'text-black/30 hover:bg-black/5' : 'text-white/30 hover:bg-white/10')
                  }`}
                >
                  自动切换
                </button>
                <button
                  onClick={handleReset}
                  className={`p-5 rounded-[28px] flex-1 flex items-center justify-center text-[11px] font-bold tracking-widest uppercase ${
                     isLightMenu 
                       ? 'text-black/30 hover:bg-black/5' 
                       : 'text-white/30 hover:bg-white/10'
                  }`}
                >
                  重置计时
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scene Title */}
        <div className="flex flex-col items-center mt-32 pointer-events-none">
          <h1 className="text-[14px] md:text-[24px] font-bold tracking-[1.2em] uppercase opacity-40 text-white text-center drop-shadow-md">
            {isRestMode ? '休整片刻' : activeConfig.name}
          </h1>
        </div>

        {/* Timer Main Area */}
        <div className="flex-1 flex flex-col justify-end px-6 pb-10 pt-12 md:pb-20">
          <div className="flex flex-col items-start transition-all duration-700">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setIsSettingTime(true);
              }}
              className={`text-[92px] md:text-[180px] font-light tracking-tighter leading-none transition-colors duration-1000 ${activeConfig.textColor} drop-shadow-sm cursor-pointer hover:opacity-80 active:scale-95 transform transition-transform`}
            >
              {formatTime(timeLeft)}
            </div>
            
            <div className="mt-8 flex items-center space-x-6 px-1">
               <div className={`w-3.5 h-3.5 md:w-5 md:h-5 rounded-full transition-all duration-700 ${
                 isActive ? (isRestMode ? 'bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]' : 'bg-green-400 animate-pulse shadow-[0_0_20px_rgba(74,222,128,0.8)]') : 'bg-gray-300 shadow-inner'
               }`}></div>
               <span className={`text-[13px] md:text-[20px] font-bold tracking-[0.5em] transition-colors duration-1000 uppercase ${activeConfig.statusColor}`}>
                 {isActive ? (isRestMode ? '正在休息' : '专注中') : '轻触开始'}
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherView;