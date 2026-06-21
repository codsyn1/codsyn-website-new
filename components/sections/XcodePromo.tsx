import React from 'react';
import Image from 'next/image';
import { 
  Layers, 
  Repeat, 
  MessageSquare, 
  Sparkles, 
  Workflow, 
  Globe 
} from 'lucide-react';

const xcodeCards = [
  {
    icon: <Layers size={24} />,
    title: "ALL-IN-ONE FREELANCE PLATFORM",
    description: "Access everything in one place—from project discovery to collaboration and delivery.",
    bgColor: "bg-purple-50/80 dark:bg-purple-900/10",
    borderColor: "border-purple-100 dark:border-purple-800/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    // Top-left: moves outward and up
    offset: "lg:-translate-y-10 lg:-translate-x-12" 
  },
  {
    icon: <Repeat size={24} />,
    title: "PROJECT EXCHANGE SYSTEM",
    description: "Exchange projects with ease. Connect with the right talent or clients faster.",
    bgColor: "bg-blue-50/80 dark:bg-blue-900/10",
    borderColor: "border-blue-100 dark:border-blue-800/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    // Middle-left: moves outward
    offset: "lg:-translate-x-20"
  },
  {
    icon: <MessageSquare size={24} />,
    title: "COMMUNITY DISCUSSIONS",
    description: "Engage in meaningful discussions and share knowledge with a global community.",
    bgColor: "bg-indigo-50/80 dark:bg-indigo-900/10",
    borderColor: "border-indigo-100 dark:border-indigo-800/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    // Bottom-left: moves outward and down
    offset: "lg:translate-y-10 lg:-translate-x-12"
  },
  {
    icon: <Sparkles size={24} />,
    title: "FUN & INTERACTIVE COMMUNITIES",
    description: "Join fun, creative, and interest-based communities to network and grow.",
    bgColor: "bg-fuchsia-50/80 dark:bg-fuchsia-900/10",
    borderColor: "border-fuchsia-100 dark:border-fuchsia-800/50",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
    // Top-right: moves outward and up
    offset: "lg:-translate-y-10 lg:translate-x-12"
  },
  {
    icon: <Workflow size={24} />,
    title: "SEAMLESS COLLABORATION",
    description: "Work efficiently with built-in tools that make teamwork smooth and productive.",
    bgColor: "bg-cyan-50/80 dark:bg-cyan-900/10",
    borderColor: "border-cyan-100 dark:border-cyan-800/50",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    // Middle-right: moves outward
    offset: "lg:translate-x-20"
  },
  {
    icon: <Globe size={24} />,
    title: "GLOBAL OPPORTUNITIES",
    description: "Explore projects and connect with clients worldwide for unlimited growth.",
    bgColor: "bg-violet-50/80 dark:bg-violet-900/10",
    borderColor: "border-violet-100 dark:border-violet-800/50",
    iconColor: "text-violet-600 dark:text-violet-400",
    // Bottom-right: moves outward and down
    offset: "lg:translate-y-10 lg:translate-x-12"
  }
];

export default function XcodePromo() {
  const leftCards = xcodeCards.slice(0, 3);
  const rightCards = xcodeCards.slice(3, 6);

  return (
    <section id="xcode-promo" className="relative py-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 rounded-full mb-4">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-widest">Xcode360 Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">Why Choose <span className="text-purple-600 dark:text-purple-400">XCode360</span>?</h2>
          <p className="max-w-2xl text-center text-gray-600 dark:text-slate-400">At Xcode360, we deliver value-driven solutions that exceed expectations.</p>
        </div>

        {/* Main Grid: Using 5 columns to give center more space if needed, or 3 even columns with negative margins */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-center">
          
          {/* Left Column - Higher Z-index to sit above image glow */}
          <div className="flex flex-col gap-6 order-2 lg:order-1 z-20">
            {leftCards.map((card, i) => (
              <div 
                key={i} 
                className={`p-6 ${card.bgColor} border ${card.borderColor} rounded-2xl shadow-sm transition-all duration-500 ${card.offset}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center ${card.iconColor} shadow-sm`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{card.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image - Massive size with negative margins to overlap container space */}
          <div className="flex justify-center order-1 lg:order-2 z-10 relative">
            <div className="relative w-full lg:scale-[1.8] lg:-translate-x-16 transition-transform duration-700 hover:scale-[1.8] flex justify-center items-center">
              {/* Soft glow background */}
              <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-[80px] scale-75 animate-pulse"></div>
              
              <Image
                src="/xcode-center-img.png"
                alt="Xcode360 Character"
                width={800}
                height={800}
                className="relative w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                priority
              />
            </div>
          </div>

          {/* Right Column - Higher Z-index */}
          <div className="flex flex-col gap-6 order-3 z-20">
            {rightCards.map((card, i) => (
              <div 
                key={i} 
                className={`p-6 ${card.bgColor} border ${card.borderColor} rounded-2xl shadow-sm transition-all duration-500 ${card.offset}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center ${card.iconColor} shadow-sm`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 uppercase tracking-tight">{card.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-slate-400 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Global CTA - Xcode Live Link */}
        <div className="mt-20 flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-500 fill-mode-both">
            <p className="text-gray-500 dark:text-slate-500 text-sm mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>
                Ready to take your freelancing journey to the next level?
            </p>
            <a 
              href="https://play.google.com/store/apps/details?id=com.xcode.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden select-none cursor-default"
            >
                <span className="relative z-10 flex items-center gap-2 select-none pointer-events-none">
                    Explore Xcode360 Platform
                    <Globe size={18} />
                </span>
            </a>
        </div>
      </div>
    </section>
  );
}