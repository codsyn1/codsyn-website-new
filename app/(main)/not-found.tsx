'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-700/30 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
          }}
        ></div>
        <div 
          className="absolute w-[400px] h-[400px] bg-blue-300/30 dark:bg-blue-700/30 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
            right: '5%',
            bottom: '10%'
          }}
        ></div>
        <div 
          className="absolute w-[300px] h-[300px] bg-pink-300/30 dark:bg-pink-700/30 rounded-full blur-3xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            left: '10%',
            top: '20%'
          }}
        ></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/30 dark:bg-purple-600/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`relative z-10 text-center max-w-lg mx-auto transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* 404 Number with Enhanced Effects */}
        <div className="mb-10 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-spin-slow opacity-20">🌌</div>
          </div>
          <h1 className="text-[150px] sm:text-[180px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 dark:from-purple-400 dark:via-pink-400 dark:to-purple-600 animate-gradient bg-gradient-animation relative">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl sm:text-7xl animate-bounce">😵</span>
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 blur-2xl opacity-50">
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
          </div>
        </div>

        {/* Error Message with Animation */}
        <div className={`mb-8 transition-all duration-700 delay-300 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Lost in Digital Space
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            The page you're looking for has drifted into the cosmic void. 
            Let's navigate you back to civilization!
          </p>
        </div>

        {/* Action Buttons with Enhanced Styling */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-700 delay-500 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <button
            onClick={handleGoHome}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="relative z-10">Return Home</span>
          </button>
          <button
            onClick={handleGoBack}
            className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white font-bold rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-purple-300 dark:border-purple-700 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Helpful Links with Enhanced Card */}
        <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 border border-purple-200 dark:border-purple-800 shadow-2xl transition-all duration-700 delay-700 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Navigation
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { href: "/#services", label: "Our Services", icon: "🚀" },
              { href: "/#projects", label: "Projects", icon: "💼" },
              { href: "/#team", label: "Our Team", icon: "👥" },
              { href: "/#contact", label: "Contact Us", icon: "📧" }
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="group flex items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all duration-300 transform hover:scale-105"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors text-sm font-medium">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Fun Status Message */}
        <div className={`mt-10 text-center transition-all duration-700 delay-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              Status: Page lost in the multiverse 🌌
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-10 left-10 text-5xl animate-bounce opacity-70">🚀</div>
      <div className="absolute top-20 right-20 text-4xl animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}>⭐</div>
      <div className="absolute bottom-20 left-20 text-4xl animate-bounce opacity-70" style={{ animationDelay: '1s' }}>🌙</div>
      <div className="absolute bottom-10 right-10 text-5xl animate-pulse opacity-60" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="absolute top-1/2 left-5 text-3xl animate-spin opacity-50" style={{ animationDuration: '10s' }}>🛸</div>
      <div className="absolute top-1/3 right-10 text-3xl animate-bounce opacity-50" style={{ animationDelay: '2s' }}>🌟</div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
