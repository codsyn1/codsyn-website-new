'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6; // Show 6 projects per page

  const projects = [
    {
      title: 'Farooq Azam Smart Clinic HMS',
      description: 'A state-of-the-art Health Management System designed to modernize medical practices, offering intelligent scheduling, secure patient records, and real-time medical workflow automation.',
      image: '/famc.png',
      tags: ['React', 'Firebase', 'Healthcare', 'HMS', 'SaaS'],
      category: 'web',
      link: 'https://farooqazamsmartclinic.com/',
      slug: 'farooq-azam-smart-clinic-hms',
      featured: true
    },
    {
      title: 'Digikeds Website Redesign',
      description: 'A modern, AI‑enhanced redesign of the Digikeds corporate site built with Next.js.',
      image: '/images/digikeds-website-redesign.png',
      tags: ['Next.js', 'AI', 'Chatbot', 'UI/UX'],
      category: 'web',
      link: 'https://digikeds.com',
      slug: 'digikeds-website-redesign',
      featured: false,
    },
    {
      title: 'Minibites - Restaurant & Food Delivery',
      description: 'Comprehensive restaurant management and food delivery application featuring real-time order tracking, seamless payment integration, and intuitive user experience built with Flutter and Firebase backend.',
      image: '/minibite-01.jpeg',
      tags: ['Flutter', 'Firebase', , 'Android'],
      category: 'mobile',
      link: 'https://play.google.com/store/apps/details?id=com.minibites.app',
      slug: 'minibites-restaurant-food-delivery',
      featured: true
    },
    {
      title: 'XCODE360 Freelancing Platform',
      description: 'Advanced Xcode plugin and development environment enhancement featuring intelligent code completion, real-time debugging tools, and streamlined workflow automation for iOS/macOS developers.',
      image: '/xcode01.jpeg',
      tags: ['Flutter', 'Android', 'Firebase'],
      category: 'mobile',
      link: 'https://play.google.com/store/apps/details?id=com.xcode.app',
      slug: 'xcode-ide-enhancement',
      featured: true
    },
     {
      title: 'Stag Chemist - Pharmacy Platform',
      description: 'UK-based local pharmacy website with React frontend and Firebase backend, featuring admin panel for product management, blog system, and Stripe payment gateway integration.',
      image: '/stag-chemist-01.png',
      tags: ['React', 'Firebase', 'Stripe', 'Admin Panel'],
      category: 'web',
      link: 'https://stagchemist.com/',
      slug: 'stag-chemist-pharmacy-platform',
      featured: true
    },
     {
    title: 'Home Page Redesign',
    description: 'A modern, responsive home page built with Next.js showcasing a sleek UI.',
    image: '/images/home.png',
    tags: ['Next.js', 'UI', 'Responsive'],
    category: 'web',
    link: 'https://homeservicese.com/',
    slug: 'home-page-redesign',
    featured: false
  },
  {
    title: 'Callify Platform',
    description: 'A call management platform with real‑time analytics and a clean UI.',
    image: '/images/callify.png',
    tags: ['React', 'Analytics', 'UI'],
    category: 'web',
    link: 'http://callifytechnologiesllc.com/',
    slug: 'callify-platform',
    featured: false
  },
    
   
    {
      title: 'DigiExplain - Multi-Panel Admin System',
      description: 'React+Firebase project with complete admin panel featuring separate vendor portals and finance team panels for comprehensive business management and control.',
      image: '/digiexplain01.png',
      tags: ['React', 'Firebase', 'Admin Panel', 'Vendor Portal', 'Finance Team'],
      category: 'web',
      link: 'https://digiexplain.com',
      slug: 'digiexplain-admin-system',
      featured: true
    },
    {
      title: 'Baseer Hospital - Speakers Platform',
      description: 'Professional speakers website with admin panel for TTC control and comprehensive main project management system.',
      image: '/baseerhospital01.png',
      tags: ['React', 'Admin Panel', 'TTC Control', 'Speakers'],
      category: 'web',
      link: 'https://baseerhospital.com/',
      slug: 'baseer-hospital-speakers-platform',
      featured: true
    },
    {
      title: 'Mindscare - Mental Health Platform',
      description: 'Comprehensive mental health and wellness platform featuring therapy sessions, meditation guides, mood tracking, and professional counseling services.',
      image: '/mindscare01.png',
      tags: ['React', 'Mental Health', 'Wellness', 'Therapy'],
      category: 'web',
      link: 'https://mentalhealthcarehospital.netlify.app/',
      slug: 'mindscare-mental-health-platform',
      featured: true
    },
    {
      title: 'Stars Science Academy',
      description: 'Educational WordPress website for science academy featuring course management, student enrollment, and interactive learning resources.',
      image: '/ssatk01.png',
      tags: ['WordPress', 'Education', 'Science Academy', 'Learning'],
      category: 'web',
      link: 'https://ssatk.wordpress.com',
      slug: 'stars-science-academy',
      featured: true
    },
    {
      title: 'Kirkuk Caffetorino Restaurant',
      description: 'Elegant restaurant website built with WordPress featuring beautiful design, menu management, reservation system, and optimized user experience for dining establishments.',
      image: '/rostorante.png',
      tags: ['WordPress', 'Restaurant', 'Menu Management', 'Reservation System'],
      category: 'web',
      link: 'https://www.kirkukkaffetorino.com/',
      slug: 'kirkuk-caffetorino-restaurant',
      featured: true
    },
    {
      title: 'Restaurant POS System',
      description: 'Complete POS software for restaurants managing inventory, stocks, orders, bills, invoice printing, dining, and delivery operations with comprehensive business management features.',
      image: '/pos01.png',
      tags: ['POS Software', 'Inventory Management', 'Restaurant', 'Billing System', 'Delivery'],
      category: 'pos',
      link: '#',
      slug: 'restaurant-pos-system',
      featured: true
    },
    {
      title: 'Stag Chemist - UK Pharmacy Platform',
      description: 'Strategic SEO optimization and digital growth strategy for a UK-based pharmacy, focusing on local search visibility, keyword ranking, and high-performance organic traffic growth.',
      image: '/stagchemist-seo.jpeg',
      tags: ['SEO', 'Digital Marketing', 'Local SEO', 'Search Rankings'],
      category: 'seo',
      link: 'https://stagchemist.com/',
      slug: 'stag-chemist-pharmacy-platform-seo',
      featured: true
    },
    {
      title: 'TOSITSOLUTIONS Canada',
      description: 'Professional SEO optimization and digital marketing solutions for Canadian businesses, featuring comprehensive search engine optimization, local SEO strategies, and performance-driven marketing campaigns.',
      image: '/TOSITSOLUTIONS.jpeg',
      tags: ['SEO', 'Digital Marketing', 'Local SEO', 'Performance Marketing'],
      category: 'seo',
      link: '#',
      slug: 'tositsolutions-canada',
      featured: true
    },
   
   
    {
      title: 'Home Page Redesign',
      description: 'A modern, responsive home page built with Next.js showcasing a sleek UI.',
      image: '/images/home.png',
      tags: ['Next.js', 'UI', 'Responsive'],
      category: 'web',
      link: 'https://homeservicese.com/',
      slug: 'home-page-redesign',
      featured: false
    },
    {
      title: 'Callify Platform',
      description: 'A call management platform built with Next.js, offering real‑time analytics and a clean UI.',
      image: '/images/callify.png',
      tags: ['Next.js', 'Analytics', 'UI'],
      category: 'web',
      link: 'http://callifytechnologiesllc.com/',
      slug: 'callify-platform',
      featured: false
    },
];

  const filters = [
    { id: 'all', label: 'All Projects', icon: '🎯' },
    { id: 'web', label: 'Web', icon: '🌐' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'pos', label: 'POS', icon: '💻' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    // { id: 'ai', label: 'AI', icon: '🤖' }
  ];

  const getFilteredProjects = () => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter(project => project.category === activeFilter);
  };

  const filteredProjects = getFilteredProjects();

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Reset page when filter changes
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Use setTimeout to ensure DOM has updated before scrolling
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section id="projects" className="relative py-12 bg-purple-50/80 dark:bg-purple-950/20 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-2xl" style={{ scrollMarginTop: '80px' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Our Projects
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold leading-tight mb-6">
            Recent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Work
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our latest projects and see how we turn ideas into reality.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600'
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{filter.icon}</span>
                <span>{filter.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentProjects.map((project, index) => (
            <div key={index} className="group relative bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 hover:-translate-y-2 transform">
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full shadow-lg">
                  ⭐ Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-4 sm:p-6">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-medium rounded-full border border-purple-400/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Title and Description */}
                <h3 className="text-lg sm:text-xl font-inter font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm line-clamp-2">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-800 text-white font-inter font-medium rounded-lg hover:from-green-700 hover:to-green-900 transition-all duration-300 shadow hover:shadow-lg hover:scale-105 transform text-xs sm:text-sm md:text-base text-center block"
                    >
                      🚀 View Live Platform
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-inter font-medium rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow hover:shadow-lg hover:scale-105 transform text-xs sm:text-sm md:text-base text-center block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 sm:mt-12">
            <div className="inline-flex items-center bg-white dark:bg-slate-800/50 rounded-full p-2 shadow-lg border border-purple-200/50 dark:border-purple-700/50 backdrop-blur-sm">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === 1
                  ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-300 hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 hover:scale-110 transform'
                  }`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 sm:space-x-2 mx-2 sm:mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${currentPage === pageNumber
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-400/30 hover:shadow-purple-400/40 hover:scale-110 transform'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-300 hover:scale-105 transform'
                      }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${currentPage === totalPages
                  ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 text-purple-600 dark:text-purple-300 hover:from-purple-200 hover:to-purple-300 dark:hover:from-purple-800/40 dark:hover:to-purple-700/40 hover:scale-110 transform'
                  }`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="relative mt-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-purple-800/10 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white dark:bg-slate-800/50 rounded-3xl p-6 sm:p-8 md:p-12 border border-purple-200 dark:border-purple-700/50 shadow-xl">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full mb-4 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with our expertise and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a href="#contact" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-inter font-semibold rounded-full hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform flex items-center justify-center gap-2 text-sm sm:text-base text-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Start Your Project
              </a>
              <a href="#projects" className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white font-inter font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300 border border-gray-300 dark:border-gray-600 hover:border-purple-400/40 hover:scale-105 transform flex items-center justify-center gap-2 text-sm sm:text-base text-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View All Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
