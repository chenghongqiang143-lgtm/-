import React, { useEffect, useState } from 'react';

const SecurityView: React.FC = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState(98);

  const startScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scan
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScore(100);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  return (
    <div className="relative h-full w-full bg-[#0f172a] flex flex-col items-center justify-between py-12 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e293b] to-[#0f172a] z-0" />
      
      {/* Animated Rings Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className={`w-[500px] h-[500px] border border-blue-500/10 rounded-full absolute ${isScanning ? 'animate-ping opacity-20' : ''}`} style={{animationDuration: '3s'}}></div>
          <div className={`w-[400px] h-[400px] border border-blue-500/10 rounded-full absolute ${isScanning ? 'animate-ping opacity-30' : ''}`} style={{animationDuration: '2s'}}></div>
          <div className={`w-[300px] h-[300px] border border-blue-500/10 rounded-full absolute ${isScanning ? 'animate-ping opacity-40' : ''}`} style={{animationDuration: '1.5s'}}></div>
      </div>

      {/* Header */}
      <div className="z-10 w-full flex justify-between items-center">
        <div className="flex flex-col">
            <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-1">Security Guard</span>
            <h2 className="text-white text-xl font-semibold">系统安全</h2>
        </div>
        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Central Shield/Score */}
      <div className="z-10 flex flex-col items-center justify-center relative mt-10 mb-10">
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Progress Ring */}
            <svg className="absolute w-full h-full rotate-[-90deg]">
                <circle cx="128" cy="128" r="120" stroke="#1e293b" strokeWidth="4" fill="transparent" />
                <circle 
                    cx="128" cy="128" r="120" stroke="#3b82f6" strokeWidth="4" fill="transparent" 
                    strokeDasharray={754}
                    strokeDashoffset={754 - (754 * (isScanning ? scanProgress : score)) / 100}
                    className="transition-all duration-300 ease-out"
                />
            </svg>
            
            <div className="flex flex-col items-center">
                <span className="text-7xl font-light text-white tracking-tighter transition-all duration-500">
                    {isScanning ? scanProgress : score}
                </span>
                <span className="text-blue-400/80 text-sm font-medium tracking-widest uppercase mt-2">
                    {isScanning ? 'Scanning...' : 'Secure'}
                </span>
            </div>
        </div>
        
        <button 
            onClick={startScan}
            disabled={isScanning}
            className={`mt-12 px-12 py-4 rounded-full font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-lg ${isScanning ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50 hover:shadow-blue-600/50 hover:-translate-y-1'}`}
        >
            {isScanning ? '扫描中...' : '全面扫描'}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="z-10 w-full grid grid-cols-2 gap-4">
        <div className="bg-[#1e293b]/50 backdrop-blur-sm p-5 rounded-3xl border border-white/5 flex flex-col items-start hover:bg-[#1e293b]/80 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <span className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">Virus DB</span>
            <span className="text-white text-lg font-medium mt-1">Updated</span>
        </div>
        <div className="bg-[#1e293b]/50 backdrop-blur-sm p-5 rounded-3xl border border-white/5 flex flex-col items-start hover:bg-[#1e293b]/80 transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/20 flex items-center justify-center mb-3">
                 <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">Memory</span>
            <span className="text-white text-lg font-medium mt-1">Optimized</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;