'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Metadata } from 'next';

const projectData = {
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    description: 'Modern online shopping platform with real-time inventory and payment processing built with MERN stack',
    image: '/ecommerce.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'web',
    featured: true,
    stats: { users: '10K+', rating: '4.8', downloads: '50K+', completion: '100%' },
    hero: {
      subtitle: 'E-Commerce Solution',
      overview: 'A comprehensive e-commerce platform that revolutionizes online shopping with seamless user experience, real-time inventory management, and secure payment processing.'
    },
    gallery: [
      '/ecommerce.jpg',
      '/mern-stack.png',
      '/website-development-and-design-1.jpg'
    ],
    features: [
      {
        title: 'Real-time Inventory',
        description: 'Automatic stock updates and low-level alerts to ensure product availability.',
        icon: '📦'
      },
      {
        title: 'Secure Payments',
        description: 'Multiple payment gateways with PCI compliance and fraud detection.',
        icon: '🔒'
      },
      {
        title: 'User Dashboard',
        description: 'Personalized shopping experience with order tracking and wishlist management.',
        icon: '👤'
      },
      {
        title: 'Admin Panel',
        description: 'Comprehensive backend for product management, analytics, and customer support.',
        icon: '⚙️'
      }
    ],
    techStack: [
      { name: 'React', level: 95, color: 'bg-blue-500' },
      { name: 'Node.js', level: 90, color: 'bg-green-500' },
      { name: 'MongoDB', level: 85, color: 'bg-green-600' },
      { name: 'Stripe', level: 80, color: 'bg-purple-500' },
      { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
      { name: 'Next.js', level: 85, color: 'bg-gray-800' }
    ],
    challenges: [
      'Implementing real-time inventory synchronization across multiple warehouses',
      'Optimizing page load times for large product catalogs',
      'Ensuring PCI compliance for payment processing',
      'Building responsive design for mobile commerce'
    ],
    solutions: [
      'WebSocket integration for real-time updates',
      'Lazy loading and image optimization strategies',
      'Stripe integration with secure tokenization',
      'Mobile-first responsive design approach'
    ],
    results: {
      completion: '100%',
      timeline: '6 months',
      team: '4 developers',
      performance: '99.9% uptime',
      satisfaction: '4.8/5 rating'
    }
  },
  'tositsolutions-canada': {
    title: 'TOSITSOLUTIONS Canada',
    description: 'Professional SEO optimization and digital marketing solutions for Canadian businesses, featuring comprehensive search engine optimization, local SEO strategies, and performance-driven marketing campaigns.',
    image: '/TOSITSOLUTIONS.jpeg',
    tags: ['SEO', 'Digital Marketing', 'Local SEO', 'Performance Marketing'],
    category: 'seo',
    featured: true,
    stats: { clients: '50+', ranking: 'Top 3', satisfaction: '95%', completion: '100%' },
    hero: {
      subtitle: 'SEO & Digital Marketing',
      overview: 'A comprehensive SEO and digital marketing agency that helps Canadian businesses achieve top search rankings and drive targeted traffic through proven optimization strategies.'
    },
    gallery: [
      '/TOSITSOLUTIONS.jpeg',
      '/website-development-and-design-1.jpg',
      '/ui-ux.avif'
    ],
    features: [
      {
        title: 'Search Engine Optimization',
        description: 'Comprehensive SEO strategies to improve organic search rankings and drive qualified traffic.',
        icon: '🔍'
      },
      {
        title: 'Local SEO',
        description: 'Targeted local optimization to dominate local search results and attract nearby customers.',
        icon: '📍'
      },
      {
        title: 'Content Marketing',
        description: 'Strategic content creation and optimization to establish authority and engage audiences.',
        icon: '📝'
      },
      {
        title: 'Performance Analytics',
        description: 'Detailed tracking and reporting to measure ROI and optimize marketing campaigns.',
        icon: '📊'
      }
    ],
    techStack: [
      { name: 'Google Analytics', level: 95, color: 'bg-orange-500' },
      { name: 'SEMrush', level: 90, color: 'bg-blue-500' },
      { name: 'Ahrefs', level: 88, color: 'bg-red-500' },
      { name: 'Google Search Console', level: 92, color: 'bg-green-500' },
      { name: 'WordPress SEO', level: 85, color: 'bg-cyan-500' }
    ],
    challenges: [
      'Competing with established SEO agencies in Canadian market',
      'Adapting to frequent Google algorithm updates',
      'Managing client expectations for SEO timeline',
      'Demonstrating ROI for long-term SEO investments'
    ],
    solutions: [
      'Specialized focus on Canadian market and local SEO',
      'Proactive algorithm monitoring and strategy adjustments',
      'Transparent reporting and realistic timelines',
      'Comprehensive analytics and performance tracking'
    ],
    results: {
      completion: '100%',
      timeline: 'Ongoing',
      team: '3 SEO specialists',
      performance: 'Top 3 rankings',
      satisfaction: '95% client retention'
    }
  },
  'social-media-dashboard': {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media management with advanced campaign tracking and insights',
    image: '/Social-Media-Marketing.webp',
    tags: ['Next.js', 'Chart.js', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    stats: { users: '15K+', rating: '4.9', completion: '100%' },
    hero: {
      subtitle: 'Analytics Platform',
      overview: 'A comprehensive social media analytics dashboard that provides deep insights into campaign performance, audience engagement, and content optimization.'
    },
    gallery: [
      '/Social-Media-Marketing.webp',
      '/content-marketing.jpg',
      '/ui-ux.avif'
    ],
    features: [
      {
        title: 'Real-time Analytics',
        description: 'Live tracking of social media metrics and engagement data.',
        icon: '�'
      },
      {
        title: 'Campaign Management',
        description: 'Create, schedule, and monitor social media campaigns across platforms.',
        icon: '🎯'
      },
      {
        title: 'Content Optimization',
        description: 'AI-powered recommendations for optimal posting times and content.',
        icon: '🤖'
      },
      {
        title: 'Team Collaboration',
        description: 'Multi-user workspace with role-based access and approval workflows.',
        icon: '�'
      }
    ],
    techStack: [
      { name: 'Next.js', level: 92, color: 'bg-gray-800' },
      { name: 'Chart.js', level: 85, color: 'bg-blue-500' },
      { name: 'Tailwind CSS', level: 90, color: 'bg-cyan-500' },
      { name: 'PostgreSQL', level: 88, color: 'bg-blue-600' },
      { name: 'Redis', level: 80, color: 'bg-red-600' }
    ],
    challenges: [
      'Processing large volumes of real-time social media data',
      'Creating intuitive data visualization for complex metrics',
      'Implementing multi-platform API integrations',
      'Ensuring data privacy and compliance with regulations'
    ],
    solutions: [
      'Stream processing with Apache Kafka for real-time data',
      'Custom chart components with D3.js for advanced visualizations',
      'Unified API layer with rate limiting and caching',
      'GDPR-compliant data handling with encryption'
    ],
    results: {
      completion: '100%',
      timeline: '5 months',
      team: '5 developers',
      performance: '99.95% uptime',
      satisfaction: '4.9/5 rating'
    }
  },
  'ai-content-generator': {
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation tool for marketing teams with advanced NLP capabilities',
    image: '/content-marketing.jpg',
    tags: ['Python', 'TensorFlow', 'FastAPI'],
    category: 'ai',
    featured: false,
    stats: { users: '8K+', rating: '4.7', completion: '100%' },
    hero: {
      subtitle: 'AI-Powered Content',
      overview: 'An advanced AI content generation platform that leverages natural language processing to create high-quality marketing content at scale.'
    },
    gallery: [
      '/content-marketing.jpg',
      '/backend.jpg',
      '/custom-software.jpg'
    ],
    features: [
      {
        title: 'Multi-language Support',
        description: 'Generate content in over 50 languages with cultural adaptation.',
        icon: '🌍'
      },
      {
        title: 'Brand Voice Training',
        description: 'AI learns your brand voice and maintains consistency across content.',
        icon: '🎭'
      },
      {
        title: 'SEO Optimization',
        description: 'Built-in SEO analysis and keyword optimization for better rankings.',
        icon: '🔍'
      },
      {
        title: 'Content Templates',
        description: 'Pre-designed templates for blogs, social media, and marketing copy.',
        icon: '📝'
      }
    ],
    techStack: [
      { name: 'Python', level: 95, color: 'bg-blue-500' },
      { name: 'TensorFlow', level: 88, color: 'bg-orange-500' },
      { name: 'FastAPI', level: 90, color: 'bg-green-500' },
      { name: 'Docker', level: 85, color: 'bg-blue-400' },
      { name: 'AWS', level: 82, color: 'bg-orange-400' }
    ],
    challenges: [
      'Training models for diverse content types and industries',
      'Ensuring content originality and avoiding plagiarism',
      'Scaling inference for high-volume requests',
      'Maintaining content quality and coherence'
    ],
    solutions: [
      'Transfer learning with domain-specific fine-tuning',
      'Advanced plagiarism detection with semantic analysis',
      'Auto-scaling with GPU optimization for inference',
      'Multi-stage content validation and quality scoring'
    ],
    results: {
      completion: '100%',
      timeline: '8 months',
      team: '6 developers',
      performance: '2.3s avg response time',
      satisfaction: '4.7/5 rating'
    }
  },
  'digikeds-website-redesign': {
    title: 'Digikeds Website Redesign',
    description: 'A company website we redesigned the UI and built in Next.js with AI chatbot attached.',
    image: '/digikeds-website-redesign.png',
    tags: ['Next.js', 'AI', 'Chatbot'],
    category: 'web',
    featured: false,
    stats: { users: 'N/A', rating: '5', completion: '100%' },
    hero: {
      subtitle: 'AI-Enhanced Website',
      overview: 'A modern redesign of a company website using Next.js, featuring an integrated AI chatbot for enhanced user interaction.'
    },
    gallery: [
      '/digikeds-website-redesign.png'
    ],
    features: [
      {
        title: 'AI Chatbot',
        description: 'Interactive AI-powered chatbot delivering personalized assistance.',
        icon: '🤖'
      },
      {
        title: 'Responsive UI',
        description: 'Sleek, mobile-first design with smooth animations.',
        icon: '💎'
      }
    ],
    techStack: [
      { name: 'Next.js', level: 90, color: 'bg-gray-800' },
      { name: 'Tailwind CSS', level: 85, color: 'bg-cyan-500' },
      { name: 'OpenAI API', level: 80, color: 'bg-purple-500' }
    ],
    challenges: [
      'Integrating AI chatbot seamlessly',
      'Ensuring design consistency across devices',
      'Optimizing performance for dynamic content'
    ],
    solutions: [
      'Modular component architecture',
      'Serverless functions for AI calls',
      'Advanced caching and lazy loading'
    ],
    results: {
      completion: '100%',
      timeline: '3 months',
      team: '3 developers',
      performance: 'Fast load times',
      satisfaction: '5/5 rating'
    }
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeImage, setActiveImage] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const project = projectData[slug as keyof typeof projectData];
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The project you're looking for doesn't exist.</p>
          <a href="/#projects" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Back to Projects
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Enhanced Hero Section with Parallax */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-purple-100 via-purple-50 to-white dark:from-purple-900/20 dark:via-slate-900 dark:to-slate-900"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm mb-8 animate-fade-in">
            <a href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              Home
            </a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <a href="/#projects" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
              Projects
            </a>
            <span className="text-gray-300 dark:text-gray-600">/</span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">{project.title}</span>
          </nav>

          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Category Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-white text-sm font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              {project.hero.subtitle}
            </div>
            
            {/* Main Title with Gradient Effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-400 dark:to-white bg-clip-text text-transparent animate-gradient">
                {project.title}
              </span>
            </h1>
            
            {/* Description with Typewriter Effect */}
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {project.hero.overview}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-700 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Enhanced Project Stats with Symmetrical Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: 'users' in project.stats ? project.stats.users : ('clients' in project.stats ? project.stats.clients : 'N/A'), label: 'users' in project.stats ? 'Users' : ('clients' in project.stats ? 'Clients' : 'N/A'), icon: '👥', color: 'from-blue-500 to-blue-600' },
              { value: 'rating' in project.stats ? `⭐ ${project.stats.rating}` : ('ranking' in project.stats ? `🏆 ${project.stats.ranking}` : 'N/A'), label: 'rating' in project.stats ? 'Rating' : ('ranking' in project.stats ? 'Ranking' : 'N/A'), icon: '⭐', color: 'from-yellow-500 to-orange-500' },
              { value: project.results.timeline, label: 'Timeline', icon: '⏱️', color: 'from-green-500 to-green-600' },
              { value: project.results.team, label: 'Team Size', icon: '🚀', color: 'from-purple-500 to-purple-600' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col items-center justify-center text-center min-h-[140px]`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-purple-800 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Gallery</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore the visual journey of our project through these carefully curated screenshots and designs.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Image Display */}
            <div className="lg:col-span-2">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={project.gallery[activeImage]} 
                  alt={`${project.title} - Image ${activeImage + 1}`}
                  className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onClick={() => setLightboxOpen(true)}
                />
                
                {/* Image Overlay Controls */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {activeImage + 1} / {project.gallery.length}
                  </div>
                  <button 
                    onClick={() => setLightboxOpen(true)}
                    className="bg-black/70 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </button>
                </div>
                
                {/* Navigation Arrows */}
                <button 
                  onClick={() => setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev + 1) % project.gallery.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Screenshots</h3>
              {project.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeImage === index 
                      ? 'ring-4 ring-purple-500 shadow-2xl scale-105' 
                      : 'opacity-70 hover:opacity-100 hover:scale-105 shadow-lg'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - Thumbnail ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  {activeImage === index && (
                    <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                      <div className="bg-purple-500 text-white p-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full">
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <img 
              src={project.gallery[activeImage]} 
              alt={`${project.title} - Full Size ${activeImage + 1}`}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            <div className="flex justify-center items-center gap-4 mt-6">
              <button 
                onClick={() => setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-white text-sm">
                {activeImage + 1} / {project.gallery.length}
              </div>
              
              <button 
                onClick={() => setActiveImage((prev) => (prev + 1) % project.gallery.length)}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Features</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the powerful features that make this project exceptional and deliver outstanding value.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Feature Icon */}
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <span className="text-3xl filter drop-shadow-md">{feature.icon}</span>
                </div>
                
                {/* Feature Content */}
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animation-delay-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Tech Stack Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800/50 dark:to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Stack</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technologies to ensure performance, scalability, and maintainability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {project.techStack.map((tech, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600"></div>
                </div>
                
                {/* Tech Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {tech.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{tech.level}%</span>
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 dark:text-purple-400 text-sm">⚡</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`${tech.color} h-3 rounded-full transition-all duration-1500 ease-out relative overflow-hidden`}
                      style={{ width: isVisible ? `${tech.level}%` : '0%' }}
                    >
                      {/* Animated Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
                    </div>
                  </div>
                  
                  {/* Skill Level Indicator */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {tech.level >= 90 ? 'Expert' : tech.level >= 75 ? 'Advanced' : tech.level >= 60 ? 'Intermediate' : 'Beginner'}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                            i < Math.floor(tech.level / 20) 
                              ? 'bg-purple-500' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Challenges & Solutions Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Challenges & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Solutions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              How we overcame complex technical challenges with innovative solutions and creative problem-solving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Challenges Column */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Challenges</h3>
                </div>
                
                <div className="space-y-6">
                  {project.challenges.map((challenge, index) => (
                    <div 
                      key={index}
                      className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-x-2 border-l-4 border-red-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-red-600 dark:text-red-400 font-bold">!</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Challenge {index + 1}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {challenge}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Solutions Column */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Solutions</h3>
                </div>
                
                <div className="space-y-6">
                  {project.solutions.map((solution, index) => (
                    <div 
                      key={index}
                      className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-x-2 border-l-4 border-green-500"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Solution {index + 1}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
            {/* Icon */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform duration-300">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Amazing?</span>
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with our expertise and innovative solutions. Your dream project awaits!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Start Your Project
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              <button className="group px-8 py-4 bg-purple-700/50 backdrop-blur-sm text-white font-bold rounded-full hover:bg-purple-600/50 transition-all duration-300 border border-white/30 hover:border-white/50 hover:scale-105 transform">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Live Demo
                </span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-10 pt-10 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-purple-200 text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.9</div>
                <div className="text-purple-200 text-sm">Client Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-purple-200 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
