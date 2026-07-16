'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  icon: string;
  features: string[];
  image?: string;
}

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('all');

  const services: Record<string, Service[]> = {
    development: [
      {
        title: 'Web Development',
        description: 'Custom websites built with modern frameworks like React, Next.js, and TypeScript',
        icon: '🌐',
        features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
        image: '/website-development-and-design-1.jpg'
      },
      {
        title: 'MERN Stack Development',
        description: 'Advanced mern stack solutions for modern web applications',
        icon: '🚀',
        features: ['Modern Stack', 'Scalable Architecture', 'Performance Optimization'],
        image: '/mern-stack.png'
      },
      {
        title: 'Backend Development',
        description: 'Scalable APIs and server-side applications with Node.js and Python',
        icon: '⚙️',
        features: ['REST APIs', 'Database Design', 'Cloud Integration'],
        image: '/backend.jpg'
      },
      {
        title: 'Mobile App Development',
        description: 'Native iOS and Android apps using React Native and Flutter',
        icon: '📱',
        features: ['Cross-Platform', 'Native Performance', 'App Store Deployment'],
        image: '/mobile-app-dev.jpg'
      },
      {
        title: 'POS Software Development',
        description: 'Custom point-of-sale systems tailored to your business needs',
        icon: '🏪',
        features: ['Inventory Management', 'Payment Processing', 'Sales Analytics'],
        image: '/pos-software-development-guide.webp'
      },
      {
        title: 'Custom Software Solutions',
        description: 'Tailored software applications to solve your unique business challenges',
        icon: '🔧',
        features: ['Custom Architecture', 'Scalable Solutions', 'Business Integration'],
        image: '/custom-software.jpg'
      }
    ],
    web_wordpress: [
      {
        title: 'WordPress Development',
        description: 'Professional WordPress websites with custom themes and plugins',
        icon: '📝',
        features: ['Custom Themes', 'Plugin Development', 'CMS Integration'],
        image: '/wordpress.png'
      },
      {
        title: 'E-commerce Development',
        description: 'Online stores with secure payment gateways and inventory management',
        icon: '🛒',
        features: ['Shopping Cart', 'Payment Integration', 'Product Management'],
        image: '/ecommerce.jpg'
      }
    ],
    flutter: [
      {
        title: 'Flutter Development',
        description: 'Beautiful cross-platform mobile apps with Flutter framework',
        icon: '🦋',
        features: ['Cross-Platform', 'Fast Performance', 'Modern UI'],
        image: '/flutter-development.jpg'
      },
      {
        title: 'Flutter UI/UX',
        description: 'Modern, intuitive user interfaces for Flutter apps',
        icon: '🎨',
        features: ['Material Design', 'Custom Animations', 'User Testing'],
        image: '/flutter-ui-ux.jpg'
      },
      {
        title: 'React Native Development',
        description: 'Cross-platform mobile apps built with React Native framework',
        icon: '📱',
        features: ['Cross-Platform', 'Native Performance', 'Hot Reload'],
        image: '/react-native.webp'
      },
      {
        title: 'React Native UI/UX',
        description: 'Beautiful and intuitive user interfaces for React Native applications',
        icon: '🎨',
        features: ['Component Libraries', 'Custom Animations', 'User Testing'],
        image: '/flutter-ui-ux.jpg'
      }
    ],

    devops: [
      {
        title: 'DevOps Solutions',
        description: 'Complete DevOps services for streamlined development and deployment workflows',
        icon: '⚙️',
        features: ['CI/CD Pipelines', 'Container Orchestration', 'Cloud Infrastructure', 'Monitoring & Logging'],
        image: '/devops.webp'
      }
    ],

    ux_design: [
      {
        title: 'UX/UI Design',
        description: 'User-centered design that creates delightful experiences',
        icon: '🎨',
        features: ['User Research', 'Wireframing', 'Prototyping'],
        image: '/ui-ux.avif'
      }
    ],
    marketing: [
      {
        title: 'SEO Services',
        description: 'Improve search rankings and drive organic traffic',
        icon: '🔍',
        features: ['Keyword Research', 'On-Page SEO', 'Link Building'],
        image: '/seo-services.png'
      },
      {
        title: 'Social Media Marketing',
        description: 'Strategic campaigns across Facebook, Instagram, and LinkedIn',
        icon: '📱',
        features: ['Content Strategy', 'Analytics', 'Brand Growth'],
        image: '/Social-Media-Marketing.webp'
      },
      {
        title: 'Content Marketing',
        description: 'Engaging blog posts and content that converts',
        icon: '📝',
        features: ['Blog Writing', 'Copywriting', 'Content Strategy'],
        image: '/content-marketing.jpg'
      }
    ]
  };

  const filters = [
    { id: 'all', label: 'All Services', icon: '🎯' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'flutter', label: 'Mobile & Flutter', icon: '📱' },
    { id: 'web_wordpress', label: 'Web & WordPress', icon: '🌐' },
    { id: 'devops', label: 'DevOps', icon: '⚙️' },
    { id: 'marketing', label: 'Marketing & SEO', icon: '📈' },
    { id: 'ux_design', label: 'UX/UI Design', icon: '🎨' }
  ];

  const getFilteredServices = () => {
    if (activeFilter === 'all') {
      return Object.values(services).flat();
    }
    return services[activeFilter as keyof typeof services] || [];
  };

  const filteredServices = getFilteredServices();

  return (
    <section id="services" className="relative py-16 bg-purple-50/80 dark:bg-purple-950/20 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-2xl" style={{ scrollMarginTop: '80px' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Our Services
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold leading-tight mb-6">
            We Deliver
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Exceptional Solutions
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From development to marketing, we provide comprehensive services tailored to your business needs.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300 ${activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-300 dark:border-gray-600'
                }`}
            >
              <span className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm sm:text-base md:text-lg">{filter.icon}</span>
                <span className="text-xs sm:text-sm">{filter.label}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredServices.map((service, index) => (
            <div key={index} className="relative group h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {/* Background Image */}
              <div className="absolute inset-0">
                {service.image ? (
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-600 to-purple-800"></div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>
              </div>

              {/* Service Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6">
                {/* Top - Icon */}
                <div className="flex justify-start">
                  
                </div>

                {/* Bottom - Title */}
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-inter font-bold text-white drop-shadow-lg">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
