'use client';

import { useEffect, useRef, useState } from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Khan",
      company: "Minibites Restaurant",
      location: "Karachi, Pakistan",
      project: "Minibites - Restaurant & Food Delivery",
      content: "Codsyn transformed our restaurant business with their amazing food delivery app. The real-time order tracking and seamless payment integration has doubled our online orders. Their Flutter expertise is outstanding!"
    },
    {
      name: "Sarah Mitchell",
      company: "Stag Chemist",
      location: "London, UK", 
      project: "Stag Chemist - Pharmacy Platform",
      content: "Our pharmacy website and admin system is exactly what we needed. The Stripe payment integration and product management features have streamlined our operations completely. Professional team from UK!"
    },
    {
      name: "Dr. Baseer Ahmed",
      company: "Baseer Hospital",
      location: "Lahore, Pakistan",
      project: "Baseer Hospital - Speakers Platform", 
      content: "The speakers platform and TTC control system has revolutionized how we manage our educational content. Codsyn understood our healthcare requirements perfectly. Highly recommended in Pakistan!"
    },
    {
      name: "James Wilson",
      company: "Mindscare Wellness",
      location: "Manchester, UK",
      project: "Mindscare - Mental Health Platform",
      content: "Our mental health platform is helping thousands of users. The therapy session management and mood tracking features are exceptional. Codsyn delivered beyond our expectations from the UK!"
    },
    {
      name: "Muhammad Riaz",
      company: "Stars Science Academy",
      location: "Islamabad, Pakistan", 
      project: "Stars Science Academy",
      content: "The educational website and course management system has improved our student enrollment significantly. Codsyn's WordPress expertise helped us create a professional learning platform in Pakistan."
    },
    {
      name: "Robert Taylor",
      company: "DigiExplain Solutions",
      location: "Birmingham, UK",
      project: "DigiExplain - Multi-Panel Admin System",
      content: "Our multi-panel admin system with vendor and finance portals is exactly what our business needed. The React+Firebase solution is robust and scalable. Excellent work from the Codsyn team!"
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isHovered) {
        scrollContainer.scrollLeft += 0.5;
        
        // Simple infinite loop - when reaching end, jump back to start
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 16);
    return () => clearInterval(intervalId);
  }, [isHovered]);

  return (
    <section id="testimonials" className="relative py-16 bg-purple-50/80 dark:bg-purple-950/20 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-2xl" style={{scrollMarginTop: '80px'}}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Client Testimonials
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold leading-tight mb-6">
            What Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Clients Say
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real feedback from real clients who trust our services
          </p>
        </div>

        {/* Scrolling Testimonials */}
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex gap-2 sm:gap-4 overflow-x-hidden scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Original testimonials */}
            {testimonials.map((testimonial, index) => (
              <div key={index} className="shrink-0 w-64 sm:w-72 md:w-80 bg-white dark:bg-slate-800/50 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/10">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div className="mb-3">
                  <p className="text-xs font-medium text-purple-600 dark:text-purple-300 mb-1">{testimonial.project}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
            {/* Multiple duplicates for seamless infinite scroll */}
            {Array.from({ length: 5 }, (_, duplicateIndex) => (
              testimonials.map((testimonial, testimonialIndex) => (
                <div key={`duplicate-${duplicateIndex}-${testimonialIndex}`} className="shrink-0 w-64 sm:w-72 md:w-80 bg-white dark:bg-slate-800/50 p-4 sm:p-6 md:p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/10">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                  <div className="mb-3">
                    <p className="text-xs font-medium text-purple-600 dark:text-purple-300 mb-1">{testimonial.project}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
