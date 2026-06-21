'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DigiExplainProject() {
  const [activeImage, setActiveImage] = useState(0);
  
  const images = [
    '/digiexplain01.png'
  ];

  const features = [
    {
      title: 'Multi-Panel Architecture',
      description: 'Separate interfaces for admin, vendor, and finance team roles'
    },
    {
      title: 'Role-Based Access Control',
      description: 'Secure authentication and authorization system'
    },
    {
      title: 'Real-Time Data Sync',
      description: 'Firebase-powered real-time updates across all panels'
    },
    {
      title: 'Vendor Management',
      description: 'Complete vendor portal for product and service management'
    },
    {
      title: 'Finance Dashboard',
      description: 'Specialized finance team panel for financial operations'
    },
    {
      title: 'Admin Control',
      description: 'Centralized admin panel for system management'
    }
  ];

  const challenges = [
    {
      title: 'Multi-Panel Synchronization',
      solution: 'Implemented Firebase real-time database for instant data synchronization across all panels'
    },
    {
      title: 'Role-Based Security',
      solution: 'Developed comprehensive authentication system with role-based access control'
    },
    {
      title: 'Real-Time Updates',
      solution: 'Used Firebase listeners for real-time data updates across all user roles'
    },
    {
      title: 'Scalable Architecture',
      solution: 'Built modular system architecture to support multiple business units'
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
                🖥️ Multi-Panel Admin System
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              DigiExplain
            </h1>
            <p className="text-lg text-purple-100 mb-6 max-w-3xl mx-auto leading-relaxed">
              React+Firebase project with complete admin panel featuring separate vendor portals and finance team panels for comprehensive business management and control.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-purple-100 font-medium text-sm">Live Application</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="text-purple-100 font-medium text-sm">4.7 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-purple-100 font-medium text-sm">Web Application</span>
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
              App Screenshots
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image with Navigation */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={images[activeImage]}
                  alt="DigiExplain Project Screenshot"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
                      activeImage === index 
                        ? 'ring-2 ring-purple-500 shadow-lg' 
                        : 'hover:shadow-md opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`DigiExplain Screenshot ${index + 1}`}
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
                  DigiExplain - Multi-Panel Admin System
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  React+Firebase project with complete admin panel featuring separate vendor portals and finance team panels for comprehensive business management and control.
                </p>
              </div>
              
              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Multi-panel architecture for different user roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Role-based access control and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Real-time data synchronization across panels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Vendor portal for product management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Finance team panel for operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Centralized admin control system</span>
                  </li>
                </ul>
              </div>
              
              {/* Action Button */}
              <div>
                <a 
                  href="https://digiexplain.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-900 transition-all duration-300 text-center"
                >
                  🚀 View Live Platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive business management solution with powerful features designed to streamline operations and boost efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Challenges */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Challenges & Solutions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Overcoming complex technical challenges to deliver a robust and scalable multi-panel admin system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <span className="text-purple-600 dark:text-purple-400 font-medium">Solution:</span> {challenge.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Transform Your Business Management
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ready to streamline your business operations? Get in touch with us to learn how our multi-panel admin system can revolutionize your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/become-partner"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300"
            >
              Start Your Project
            </Link>
            <Link
              href="/#contact"
              className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-900 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
