'use client';

import { useEffect, useState } from 'react';

export default function ScrollingTrain() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-4 z-[9999] pointer-events-none" style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)' }}>
      {/* Railway Track */}
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700">
        {/* Track rails */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-400 dark:bg-gray-600"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400 dark:bg-gray-600"></div>
        
        {/* Railway ties */}
        <div className="absolute inset-0 flex items-center justify-between">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-500 dark:bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Train */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 transition-none duration-75"
        style={{ 
          left: `${scrollProgress}%`,
          transform: `translateX(-50%) translateY(-50%)`
        }}
      >
        <div className="relative">
          {/* Train body */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg px-4 py-2 shadow-xl">
            <div className="flex items-center gap-2">
              {/* Train front */}
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              {/* Train windows */}
              <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-300 rounded-full"></div>
            </div>
          </div>
          
          {/* Train smoke effect */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2">
            <div className="w-6 h-2 bg-gray-400 dark:bg-gray-600 opacity-60 blur-sm"></div>
          </div>
          
          {/* Train wheels */}
          <div className="absolute -bottom-2 left-2 right-2 flex justify-between">
            <div className="w-2 h-2 bg-gray-800 dark:bg-gray-900 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 dark:bg-gray-900 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Stations */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold">Start</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold">Tokugata</div>
        <div className="text-sm text-gray-600 dark:text-gray-400 font-bold">Destination</div>
      </div>
    </div>
  );
}
