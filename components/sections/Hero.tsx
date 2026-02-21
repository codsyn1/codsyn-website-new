'use client';

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import '@/styles/scroll-animations.css';

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState<{ text: string; color: string; delay: number }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [textRevealStage, setTextRevealStage] = useState(0);

  // Scroll animations for different elements
  const { ref: preHeadingRef, isVisible: preHeadingVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.1 });
  const { ref: subheadingRef, isVisible: subheadingVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.1 });
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: terminalRef, isVisible: terminalVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  // Page load animation with staged text reveal - optimized for mobile
  useEffect(() => {
    setIsPageLoaded(true);
    
    // Reduced timeouts for faster mobile load
    const stage1 = setTimeout(() => setTextRevealStage(1), 100);  // Pre-heading
    const stage2 = setTimeout(() => setTextRevealStage(2), 200);  // Main heading
    const stage3 = setTimeout(() => setTextRevealStage(3), 300);  // Subheading
    const stage4 = setTimeout(() => setTextRevealStage(4), 400); // Buttons
    const stage5 = setTimeout(() => setTextRevealStage(5), 500); // Terminal
    
    return () => {
      clearTimeout(stage1);
      clearTimeout(stage2);
      clearTimeout(stage3);
      clearTimeout(stage4);
      clearTimeout(stage5);
    };
  }, []);

  const terminalLines: { text: string; color: string; delay: number }[] = [
  { text: '$ npm run awesome-website', color: 'text-cyan-400', delay: 0 },
  { text: '✓ Installing happiness...', color: 'text-gray-400', delay: 400 },
  { text: '> sudo make me a sandwich', color: 'text-cyan-400', delay: 800 },
  { text: '✓ Done. Enjoy! 🥪', color: 'text-green-400', delay: 1200 },
  { text: '> console.log("Building fun... 😎")', color: 'text-purple-400', delay: 1600 },
  { text: '> curl -X POST /api/creativity', color: 'text-cyan-400', delay: 2000 },
  { text: '✓ Creativity level: 100% 🎨', color: 'text-yellow-400', delay: 2400 },
  { text: '✓ Website live! 🎉 Visit: https://codsyn.com', color: 'text-green-400 font-semibold animate-pulse', delay: 2800 },
];


  useEffect(() => {
    setVisibleLines([]);
    setCurrentLineIndex(0);
    setCurrentText('');
    
    const timer = setTimeout(() => {
      let lineIndex = 0;
      
      const processNextLine = () => {
        if (lineIndex >= terminalLines.length) return;
        
        const line = terminalLines[lineIndex];
        setCurrentLineIndex(lineIndex);
        setCurrentText('');
        
        // Faster typing for mobile performance
        let charIndex = 0;
        const typeChar = () => {
          if (charIndex <= line.text.length) {
            setCurrentText(line.text.slice(0, charIndex));
            charIndex++;
            setTimeout(typeChar, 30 + Math.random() * 20); // Reduced to 30-50ms for faster typing
          } else {
            // Line complete, add to visible lines and move to next
            setVisibleLines(prev => [...prev, line]);
            setCurrentText('');
            lineIndex++;
            
            // Reduced pause between lines
            setTimeout(processNextLine, 150);
          }
        };
        
        typeChar();
      };
      
      processNextLine();
    }, 200); // Reduced initial delay
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden m-6 mt-20" style={{scrollMarginTop: '80px'}}>
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("/hero-section-bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Pre-heading */}
          <div ref={preHeadingRef} className={`mb-3 ${preHeadingVisible || textRevealStage >= 1 ? 'scroll-visible' : 'scroll-hidden'}`}>
            <p className={`text-xs sm:text-sm md:text-base font-inter font-semibold text-purple-400 uppercase tracking-widest mb-4 inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10 ${preHeadingVisible || textRevealStage >= 1 ? 'scroll-visible' : 'scroll-hidden'}`}>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                Founders, startups, and businesses shipping software
              </span>
            </p>
          </div>

          {/* Main heading */}
          <div ref={headingRef} className={`mb-6 ${headingVisible || textRevealStage >= 2 ? 'scroll-visible' : 'scroll-hidden'}`}>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-inter font-bold leading-tight ${textRevealStage >= 2 ? 'animate-text-reveal' : ''}`}>
              Build Software
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 ${textRevealStage >= 2 ? 'animate-text-glow' : ''}`}>
                at Speed of Thought
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div ref={subheadingRef} className={`mb-8 ${subheadingVisible || textRevealStage >= 3 ? 'scroll-visible' : 'scroll-hidden'}`}>
            <p className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed ${textRevealStage >= 3 ? 'animate-fade-in-up' : ''}`}>
              A modern software house for startups and growing businesses. We
              design, build, and scale web, mobile, and SaaS products with
              confidence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 ${buttonsVisible || textRevealStage >= 4 ? 'scroll-visible' : 'scroll-hidden'}`}>
            <a href="#contact" className={`px-6 sm:px-8 py-3 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base md:text-lg ${textRevealStage >= 4 ? 'animate-bounce-in' : ''} text-center`}>
              Start Your Project
            </a>
            <a href="#projects" className={`px-6 sm:px-8 py-3 sm:py-4 md:px-10 md:py-5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all duration-200 border border-slate-600 transform hover:scale-105 text-sm sm:text-base md:text-lg ${textRevealStage >= 4 ? 'animate-bounce-in' : ''} text-center`}>
              View Our Work
            </a>
          </div>

          {/* Dashboard Preview */}
          <div ref={terminalRef} className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-800 max-w-4xl mx-auto font-mono text-xs sm:text-sm ${terminalVisible || textRevealStage >= 5 ? 'scroll-visible' : 'scroll-hidden'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-500 text-xs ml-2">codsyn-terminal</span>
            </div>
            
            <div className="h-[250px] sm:h-[300px] md:h-[330px] overflow-hidden">
              {visibleLines.map((line, index) => (
                <div key={index} className={`${line.color} mb-2`}>
                  {line.text}
                </div>
              ))}
              {currentLineIndex < terminalLines.length && (
                <div className={`${terminalLines[currentLineIndex].color} mb-2`}>
                  {currentText}
                  <span className="inline-block w-1 h-4 bg-cyan-400 animate-pulse opacity-80"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
