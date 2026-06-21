'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StagChemistSEOProject() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    '/stagchemist-seo.jpeg',
    '/stag-chemist-01.png',
    '/stag-chemist-02.png',
    '/stag-chemist-03.png',
    '/stag-chemist-04.png',
    '/stag-chemist-05.png'
  ];

  const features = [
    {
      title: 'Local SEO Domination',
      description: 'Optimized local search presence for the UK pharmacy, ensuring top visibility for customers in the surrounding areas.'
    },
    {
      title: 'Keyword Strategy',
      description: 'Comprehensive keyword research and implementation targeting high-intent pharmacy and healthcare search terms.'
    },
    {
      title: 'Technical SEO Audit',
      description: 'Complete technical optimization including site speed, mobile responsiveness, and schema markup for healthcare entities.'
    },
    {
      title: 'Content Marketing',
      description: 'Strategic health-focused blog content that establishes authority and drives organic traffic from health-related queries.'
    },
    {
      title: 'Conversion Optimization',
      description: 'SEO-driven UX improvements to ensure search visitors are converted into loyal pharmacy customers.'
    },
    {
      title: 'Performance Tracking',
      description: 'Real-time monitoring of search rankings, organic traffic, and user behavior to refine and improve SEO strategies.'
    }
  ];

  const challenges = [
    {
      title: 'Highly Competitive Local Market',
      solution: 'Implemented advanced local SEO strategies including GMB optimization and hyper-local content targeting.'
    },
    {
      title: 'Complex Healthcare Search Intent',
      solution: 'Developed search-intent-focused content clusters that address specific patient needs and healthcare concerns.'
    },
    {
      title: 'Technical Healthcare Schema',
      solution: 'Integrated sophisticated healthcare and pharmacy schema markup to improve search engine understanding and rich snippets.'
    },
    {
      title: 'Organic Traffic Growth',
      solution: 'Built a sustainable SEO foundation that consistently delivers high-quality organic traffic and business growth.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 mx-4 md:mx-8 lg:mx-12 my-6 md:my-8 rounded-2xl overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-900/20 to-indigo-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 pt-16">
          <Link 
            href="/#projects" 
            className="inline-flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
          
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-blue-200">
                🔍 SEO Optimization
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Stag Chemist SEO Strategy
            </h1>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive SEO optimization and digital growth strategy for an established UK pharmacy, 
              focusing on local search dominance, high-intent keyword rankings, and organic traffic conversion.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-blue-100 font-medium text-sm">SEO Excellence</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300 text-sm">📈</span>
                <span className="text-blue-100 font-medium text-sm">+250% Organic Growth</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span className="text-blue-100 font-medium text-sm">Local Search Specialist</span>
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
              SEO Performance & Visibility
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={images[activeImage]}
                  alt="SEO Performance Screenshot"
                  className="w-full h-[500px] object-contain object-center"
                />
                
                <button
                  onClick={() => setActiveImage(activeImage === 0 ? images.length - 1 : activeImage - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setActiveImage(activeImage === images.length - 1 ? 0 : activeImage + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {activeImage + 1} / {images.length}
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 shrink-0 ${
                      activeImage === index 
                        ? 'ring-2 ring-blue-500 shadow-lg' 
                        : 'hover:shadow-md opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`SEO Performance Screenshot ${index + 1}`}
                      className="w-20 h-20 object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Right Side - Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Stag Chemist - Digital Growth & SEO
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our comprehensive SEO strategy for Stag Chemist transformed their digital footprint, 
                  taking them from a local shop to a dominant search authority in the pharmacy sector. 
                  We focused on technical excellence, content authority, and local search visibility.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">SEO Highlights</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Top 3 rankings for highly competitive pharmacy keywords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Local search dominance for community healthcare queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Significant increase in organic prescription requests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Advanced healthcare schema implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Optimized site performance and mobile experience</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <a 
                  href="https://stagchemist.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-800 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-900 transition-all duration-300 text-center shadow-lg"
                >
                  🚀 Explore the Optimized Platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Strategic SEO Features
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Challenges & Strategic Solutions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-900/30">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-blue-600 dark:text-blue-400">Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 text-white rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-900/20 to-indigo-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Expert SEO for Your Business?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's elevate your search rankings and drive sustainable organic growth with our proven SEO strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#contact"
              className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              Start SEO Strategy
            </Link>
            <Link 
              href="/#projects"
              className="px-8 py-3 bg-indigo-700 text-white font-semibold rounded-full hover:bg-indigo-800 transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
