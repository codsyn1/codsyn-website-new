'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'erp', 'projects', 'team', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 80; // Add navbar height offset

      let maxOverlap = 0;
      let activeSectionFound = '';
      let bestMatchSection = '';
      let bestMatchCenter = Infinity;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const elementCenter = offsetTop + (offsetHeight / 2); // Center of section
          const overlapStart = elementCenter - 50; // 50px before center
          const overlapEnd = elementCenter + 50; // 50px after center

          // Check if scroll position is within this section's range
          if (scrollPosition >= overlapStart && scrollPosition <= overlapEnd) {
            const currentOverlap = overlapEnd - overlapStart;

            // Update if this section has more overlap than current max
            if (currentOverlap > maxOverlap) {
              maxOverlap = currentOverlap;
              activeSectionFound = section;
              bestMatchSection = section;
              bestMatchCenter = elementCenter;
            }

            // Update best match if exact center match
            if (Math.abs(scrollPosition - elementCenter) < Math.abs(scrollPosition - bestMatchCenter)) {
              bestMatchSection = section;
            }
          }
        }
      }

      setActiveSection(bestMatchSection);
      console.log(`Active section: ${bestMatchSection}`); // Debug log
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 px-4 xl:px-0 bg-white/95 dark:bg-background/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl w-full mx-auto">
          <div className="flex justify-between items-center">
            <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 group flex items-center mr-3" href="/">
              <div className="flex items-center gap-0">
                <Image
                  src="/white-logo.png"
                  alt="Codsyn Logo"
                  width={48}
                  height={48}
                  className="h-8 w-auto lg:h-12"
                  style={{ width: 'auto' }}
                  priority
                  unoptimized
                />
                <Image
                  src="/white-text.png"
                  alt="Codsyn"
                  width={120}
                  height={36}
                  className="h-6 w-auto lg:h-9"
                  style={{ width: 'auto' }}
                  priority
                  unoptimized
                />
              </div>
            </a>

            <div className="hidden lg:block">
              <nav aria-label="Main" className="relative flex justify-center">
                <ul className="flex items-center gap-2">
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'about'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#about">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      About
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'services'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#services">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Services
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'erp'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#erp">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      ERP
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'projects'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#projects">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/blog">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'team'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#team">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Team
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'testimonials'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#testimonials">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'contact'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} href="/#contact">
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex space-x-3 items-center">
              <a href="/become-partner" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 hidden md:flex items-center text-sm font-medium rounded-md whitespace-nowrap  text-white hover:bg-white/10 h-10 w-34 px-3">
                Become a Partner
              </a>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="group/button flex items-center justify-center border transform transition-transform duration-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-transparent border-transparent text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 h-10 w-10 lg:h-8.5 lg:w-8.5 lg:py-1.5 rounded-md text-sm leading-5 space-x-2 px-0 lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M4.5 9h15m-15 6h15"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-50 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-background shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Image
                  src="/white-logo.png"
                  alt="Codsyn Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                  style={{ width: 'auto' }}
                  priority
                  unoptimized
                />
                <Image
                  src="/white-text.png"
                  alt="Codsyn"
                  width={80}
                  height={24}
                  className="h-6 w-auto"
                  style={{ width: 'auto' }}
                  priority
                  unoptimized
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100  hover:text-black transition-colors text-white-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/#about"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'about'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/#services"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'services'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/#erp"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'erp'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    ERP
                  </a>
                </li>
                <li>
                  <a
                    href="/#projects"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'projects'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Blogs
                  </a>
                </li>
                <li>
                  <a
                    href="/#team"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'team'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="/#testimonials"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'testimonials'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium relative group transition-all duration-200 ${activeSection === 'contact'
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-white hover:text-purple-600 dark:hover:text-purple-400'
                      }`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontWeight: 500 }}
                  >
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t">
              <a
                href="/become-partner"
                onClick={() => setIsSidebarOpen(false)}
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-md font-medium transition-colors"
              >
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
