'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const projectImages = [
  '/xcode01.jpeg',
  '/digiexplain01.png',
  '/pos01.png',
  '/baseerhospital01.png',
  '/mindscare01.png',
  '/ssatk01.png',
  '/minibite-01.jpeg',
  '/rostorante.png',
  '/stag-chemist-01.png',
  '/stagchemist-seo.jpeg',
  '/TOSITSOLUTIONS.jpeg',
  '/famc.png',
];

export default function ProjectShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollSpeed] = useState(1);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    let animationId: number;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      
      // Reset when we've scrolled through all content
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    // Start the animation
    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [scrollSpeed]);

  return (
    <section className="relative py-8 overflow-hidden bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Scrolling Image Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* First set of images */}
            {projectImages.map((image, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-2 group"
              >
                <div className="relative w-72 h-48 sm:w-80 sm:h-52 lg:w-96 lg:h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image}
                    alt={`Project ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    style={{ objectPosition: 'center' }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {projectImages.map((image, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-2 group"
              >
                <div className="relative w-72 h-48 sm:w-80 sm:h-52 lg:w-96 lg:h-60 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={image}
                    alt={`Project ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    style={{ objectPosition: 'center' }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges for smooth appearance */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-purple-50 via-purple-50/50 to-transparent dark:from-purple-900/20 dark:via-purple-900/10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-blue-50 via-blue-50/50 to-transparent dark:from-blue-900/20 dark:via-blue-900/10 pointer-events-none"></div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
