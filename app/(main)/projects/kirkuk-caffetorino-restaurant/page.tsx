'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function KirkukCaffetorinoProject() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    '/rostorante.png'
  ];

  const features = [
    {
      title: 'WordPress Restaurant Website',
      description: 'Professional restaurant website built with WordPress featuring elegant design and seamless user experience for dining establishments'
    },
    {
      title: 'Menu Management System',
      description: 'Dynamic menu management with categories, pricing, and beautiful food photography display for restaurant items'
    },
    {
      title: 'Reservation System',
      description: 'Online table reservation system with booking management and availability calendar for customer convenience'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-friendly responsive design that works perfectly on all devices with optimized loading speeds'
    },
    {
      title: 'SEO Optimized',
      description: 'Search engine optimized structure to help restaurants rank higher in local search results'
    },
    {
      title: 'Contact & Location Integration',
      description: 'Integrated contact forms, Google Maps location, and business hours display for customer information'
    }
  ];

  const challenges = [
    {
      title: 'Restaurant Brand Identity',
      solution: 'Created custom WordPress theme that reflects the restaurant\'s unique brand and atmosphere through design'
    },
    {
      title: 'Menu Presentation',
      solution: 'Developed elegant menu display system with categories, pricing, and appetizing food photography'
    },
    {
      title: 'Mobile Ordering Experience',
      solution: 'Optimized mobile experience for easy browsing and ordering from smartphones and tablets'
    },
    {
      title: 'Local SEO Integration',
      solution: 'Implemented local SEO strategies to improve visibility in restaurant search results'
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
                🍽️ Restaurant Website
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Kirkuk Caffetorino Restaurant
            </h1>
            <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Elegant restaurant website built with WordPress featuring beautiful design, menu management,
              reservation system, and optimized user experience for dining establishments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-purple-100 font-medium text-sm">Live Website</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="text-purple-100 font-medium text-sm">Premium Design</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-purple-100 font-medium text-sm">WordPress</span>
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
              Website Screenshots
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Images */}
            <div className="space-y-4">
              {/* Main Image with Navigation */}
              <div className="relative rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800">
                <img
                  src={images[activeImage]}
                  alt="Kirkuk Caffetorino Restaurant Website Screenshot"
                  className="w-full h-[500px] object-contain object-center"
                />

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
                    className={`relative rounded-lg overflow-hidden transition-all duration-300 shrink-0 ${activeImage === index
                        ? 'ring-2 ring-purple-500 shadow-lg'
                        : 'hover:shadow-md opacity-70 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Kirkuk Caffetorino Screenshot ${index + 1}`}
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
                  Kirkuk Caffetorino - Restaurant Website
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Elegant restaurant website built with WordPress featuring beautiful design, menu management,
                  reservation system, and optimized user experience for dining establishments.
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">WordPress restaurant website with custom theme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Dynamic menu management system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Online table reservation system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Beautiful responsive design for all devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">SEO optimized for local restaurant search</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-300">Contact forms and location integration</span>
                  </li>
                </ul>
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
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
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
              Challenges & Solutions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {challenges.map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-purple-600 dark:text-purple-400">Solution:</span> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 text-white rounded-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-900/20 to-purple-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Restaurant Website?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Let's create a stunning restaurant website with beautiful design and powerful functionality.
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
