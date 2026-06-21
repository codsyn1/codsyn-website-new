'use client';

import { useEffect, useState } from 'react';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information-collection', title: 'Information We Collect' },
    { id: 'information-use', title: 'How We Use Your Information' },
    { id: 'information-sharing', title: 'Information Sharing' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'user-rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' }
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100;
    
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section.id);
          break;
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden mt-10 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🔒</div>
          <div className="absolute top-20 right-20 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>🛡️</div>
          <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>🔐</div>
          <div className="absolute bottom-10 right-10 text-4xl animate-pulse" style={{ animationDelay: '2s' }}>🌟</div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent animate-gradient">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Your privacy is our priority. This policy explains how we collect, use, and protect your information with transparency and care.
            </p>
            
            {/* Decorative Elements */}
            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Updated Regularly</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-xs font-medium">GDPR Compliant</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-purple-200 text-xs animate-pulse">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-purple-200 dark:border-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto py-4">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`whitespace-nowrap text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                }`}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Introduction */}
          <section id="introduction" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Introduction</h2>
            <div className="prose prose-lg text-gray-600 dark:text-gray-300 max-w-none">
              <p>
                Welcome to Codsyn. We are committed to protecting your personal information and your right to privacy. 
                This Privacy Policy explains how we collect, use, process, and safeguard your information when you visit 
                our website and use our services.
              </p>
              <p>
                By using our website and services, you consent to the collection and use of information in accordance with this policy.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section id="information-collection" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name and contact information</li>
                  <li>Email address and phone number</li>
                  <li>Company information</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section id="information-use" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries</li>
                <li>Send project proposals</li>
                <li>Communicate about projects</li>
                <li>Analyze website usage</li>
                <li>Send marketing communications (with consent)</li>
                <li>Process 50% advance payment for project commencement</li>
              </ul>
            </div>
          </section>

          {/* Information Sharing */}
          <section id="information-sharing" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Information Sharing</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                We share information only with your consent or as required by law.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Service Providers:</strong> Trusted third parties for essential services</li>
                <li><strong>Legal Requirements:</strong> When required by law</li>
                <li><strong>With Consent:</strong> When you authorize us to share</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section id="data-security" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Data Security</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction. These include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure servers and hosting infrastructure</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>Access controls and authentication systems</li>
              </ul>
            </div>
          </section>

          {/* Cookies and Tracking */}
          <section id="cookies" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p>You can control cookies through your browser settings.</p>
            </div>
          </section>

          {/* Your Rights */}
          <section id="user-rights" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Rights</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request data portability</li>
                <li>Withdraw consent where processing is based on consent</li>
              </ul>
              <p>To exercise these rights, please contact us using the information below.</p>
            </div>
          </section>

          {/* Contact */}
          <section id="contact" className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-purple-200 dark:border-purple-800">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                If you have any questions about this Privacy Policy or want to exercise your rights, please contact us:
              </p>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 space-y-2">
                <p><strong>Email:</strong> info@codsyn.com</p>
                <p><strong>Phone:</strong> +92 321 5971854</p>
                <p><strong>Website:</strong> www.codsyn.com</p>
              </div>
              <p>We will respond to your inquiry within 30 days.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
