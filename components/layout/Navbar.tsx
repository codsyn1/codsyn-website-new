'use client'

import { useState } from 'react';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <nav className="relative py-4 px-4 xl:px-0 bg-white dark:bg-background shadow-md">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between items-center">
          <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 group flex items-center mr-3" href="/">
            <div className="flex items-center gap-0">
              <img 
                src="/white-logo.png" 
                alt="Codsyn Logo" 
                className="h-8 w-auto lg:h-12"
              />
              <img 
                src="/white-text.png" 
                alt="Codsyn" 
                className="h-6 w-auto lg:h-9"
              />
            </div>
          </a>
          
          <div className="hidden lg:block">
            <nav aria-label="Main" className="relative flex justify-center">
              <ul className="flex items-center gap-2">
                <li>
                  <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-white-800 hover:text-white-900 text-sm font-medium" href="/#home">
                    Home
                  </a>
                </li>
                <li>
                  <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-white-800 hover:text-white-900 text-sm font-medium" href="/#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-white-800 hover:text-white-900 text-sm font-medium" href="/#services">
                    Services
                  </a>
                </li>
                <li>
                  <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-white-800 hover:text-white-900 text-sm font-medium" href="/#projects">
                    Projects
                  </a>
                </li>
                <li>
                  <a className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 px-3 text-white-800 hover:text-white-900 text-sm font-medium" href="/#contact">
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
              className="group/button flex items-center justify-center border transform transition-transform duration-50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 bg-transparent border-transparent text-white-800 hover:bg-white-100 hover:border-white-100 h-10 w-10 lg:h-[34px] lg:w-[34px] lg:py-1.5 rounded-md text-sm leading-5 space-x-2 px-0 lg:hidden"
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
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-background shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <img 
                src="/white-logo.png" 
                alt="Codsyn Logo" 
                className="h-8 w-auto"
              />
              <img 
                src="/white-text.png" 
                alt="Codsyn" 
                className="h-6 w-auto"
              />
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors text-gray-800"
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
                  href="/#home" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full text-left px-4 py-3 text-white-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/#about" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full text-left px-4 py-3 text-white-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/#services" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full text-left px-4 py-3 text-white-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a 
                  href="/#projects" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full text-left px-4 py-3 text-white-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="/#contact" 
                  onClick={() => setIsSidebarOpen(false)}
                  className="block w-full text-left px-4 py-3 text-white-800 hover:bg-gray-100 rounded-md transition-colors font-medium"
                >
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
