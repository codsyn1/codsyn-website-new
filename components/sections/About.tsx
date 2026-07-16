'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import '@/styles/scroll-animations.css';

export default function About() {
  const [visibleStats, setVisibleStats] = useState(false);

  // Scroll animations for different elements
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: leftColumnRef, isVisible: leftColumnVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: rightColumnRef, isVisible: rightColumnVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleStats(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: '50+', label: 'Projects Delivered' },
    { number: '100+', label: 'Happy Clients' },
    { number: '3+', label: 'Years of Experience' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <section id="about" className="relative py-10 bg-white dark:bg-background text-gray-900 dark:text-white overflow-hidden -mt-2" style={{scrollMarginTop: '80px'}}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className={`text-center mb-8 ${headerVisible ? 'scroll-visible' : 'scroll-hidden-scale'}`}>
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              About Codsyn
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold leading-tight mb-4">
            We Build
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Digital Excellence
            </span>
          </h2>
          
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 items-center">
          {/* Left Column - About Codsyn */}
          <div ref={leftColumnRef} className={leftColumnVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}>
            {/* <h3 className="text-xl font-inter font-semibold text-purple-600 dark:text-purple-300 mb-6">About Codsyn</h3> */}
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
              Codsyn is a modern software house focused on building reliable, scalable, and high-performance digital products. We work with startups, growing businesses, and enterprises to turn ideas into production-ready software that solves real problems. Our team brings together experienced developers, designers, and engineers who care deeply about quality, performance, and long-term maintainability—not just shipping features quickly.
             </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-6">
             Our approach is rooted in clear communication and thoughtful execution. We work closely with our clients to understand their goals, design the right solutions, and deliver production-ready software that creates real, measurable impact.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">
            At Codsyn, trust is earned through consistency and results. We follow transparent processes, realistic timelines, and continuous collaboration, so you always know what’s happening with your project. Our focus isn’t just delivering software—it’s building long-term partnerships that help businesses scale with confidence.
            </p>
          </div>

          {/* Right Column - Stats */}
          <div ref={rightColumnRef} className={`relative bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-slate-800/40 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-3xl p-4 sm:p-6 border border-purple-200/50 dark:border-purple-700/30 shadow-2xl overflow-hidden min-h-64 sm:min-h-80`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-center">
              
              <div ref={statsRef} className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full ${statsVisible ? 'scroll-visible-scale' : 'scroll-hidden-scale'}`}>
                {stats.map((stat, index) => (
                  <div key={index} className={`relative group animate-stagger-${index + 1}`}>
                    {/* Hover background effect */}
                    <div className="absolute inset-0 bg-white/40 dark:bg-slate-700/20 rounded-2xl scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                    
                    {/* Content */}
                    <div className="relative text-center p-3 sm:p-4 rounded-2xl bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/20 group-hover:border-purple-400/50 dark:group-hover:border-purple-500/50 transition-all duration-300">
                      <div className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 dark:from-purple-400 dark:via-purple-500 dark:to-indigo-400 mb-2 sm:mb-3 group-hover:scale-110 transition-all duration-500 drop-shadow-sm">
                        {visibleStats ? stat.number : '0'}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                        {stat.label}
                      </div>
                      
                      {/* Decorative element */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-300"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
          