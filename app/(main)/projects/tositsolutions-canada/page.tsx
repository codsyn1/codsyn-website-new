'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TositsolutionsCanadaProject() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    '/TOSITSOLUTIONS.jpeg'
  ];

  const features = [
    {
      title: 'Business Management',
      description: 'Comprehensive TOSITSOLUTIONS management with real-time tracking and automated compliance reporting',
      icon: '📊'
    },
    {
      title: 'Real-time Monitoring',
      description: 'Live tracking of TOSITSOLUTIONS status and performance metrics',
      icon: '📈'
    },
    {
      title: 'Automated Reporting',
      description: 'Generate compliance reports automatically with customizable scheduling',
      icon: '📋'
    },
    {
      title: 'Canadian Compliance',
      description: 'Built specifically for Canadian TOSITSOLUTIONS regulations and standards',
      icon: '🍁'
    },
    {
      title: 'React Frontend',
      description: 'Modern user interface with responsive design and smooth interactions',
      icon: '⚛️'
    },
    {
      title: 'Node.js Backend',
      description: 'Scalable server architecture with efficient data processing',
      icon: '🔧'
    },
    {
      title: 'Firebase Integration',
      description: 'Real-time data synchronization and secure authentication',
      icon: '🔥'
    }
  ];

  const challenges = [
    {
      title: 'TOSITSOLUTIONS Integration',
      solution: 'Developed custom API connectors for seamless integration with existing TOSITSOLUTIONS systems'
    },
    {
      title: 'Compliance Management',
      solution: 'Built flexible compliance engine to adapt to changing Canadian regulations'
    },
    {
      title: 'Data Security',
      solution: 'Implemented end-to-end encryption and secure data handling protocols'
    },
    {
      title: 'Performance Optimization',
      solution: 'Optimized database queries and caching strategies for large-scale operations'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mx-4 md:mx-8 lg:mx-12 my-6 md:my-8 rounded-2xl overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/20 to-purple-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 pt-16">
          <Link 
            href="/#projects" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
          
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-purple-200">
                💊 TOSITSOLUTIONS Platform
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              TOSITSOLUTIONS Canada
            </h1>
            <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive business management solution for Canadian TOSITSOLUTIONS companies with real-time tracking, 
              automated reporting, and compliance management built with React and Node.js.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-purple-100 font-medium text-sm">Live Platform</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="text-purple-100 font-medium text-sm">4.9 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-purple-100 font-medium text-sm">React & Node.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* Image Gallery */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Interface
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image with Navigation */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={images[activeImage]}
                  alt="TOSITSOLUTIONS Canada Platform Screenshot"
                  className="w-full h-[500px] object-contain object-center"
                />
                
                {/* Previous Button */}
                <button
                  onClick={() => setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Next Button */}
                <button
                  onClick={() => setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7" />
                  </svg>
                </button>
                
                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activeImage + 1} / {images.length}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 shrink-0 ${
                      activeImage === index 
                        ? 'ring-2 ring-purple-500 shadow-lg' 
                        : 'hover:shadow-md opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`TOSITSOLUTIONS Canada Screenshot ${index + 1}`}
                      className="w-20 h-20 object-cover object-center"
                    />
                    {activeImage === index && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <div className="bg-purple-600 text-white p-1 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  TOSITSOLUTIONS Canada Project
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Comprehensive business management solution for Canadian TOSITSOLUTIONS companies with real-time tracking, 
                  automated reporting, and compliance management built with React and Node.js.
                </p>
              </div>
              
              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Business management with real-time tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Automated compliance reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Real-time monitoring and metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Canadian TOSITSOLUTIONS compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">React frontend and Node.js backend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Firebase real-time integration</span>
                  </li>
                </ul>
              </div>
              
              {/* Action Button */}
              <div>
                <a 
                  href="https://tositsolutions-canada.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-center"
                >
                  View Live Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/40 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your TOSITSOLUTIONS Management?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto">
            Let's create a comprehensive TOSITSOLUTIONS management system with advanced features and real-time capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#contact" 
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Start Your Project
            </Link>
            <Link 
              href="/#projects" 
              className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition-colors"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
