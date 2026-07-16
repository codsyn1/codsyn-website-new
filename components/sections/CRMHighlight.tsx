'use client';

import Image from 'next/image';

export default function CRMHighlight() {
  return (
    <section id="erp" className="relative py-12 bg-purple-50/80 dark:bg-purple-950/20 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8 rounded-2xl" style={{scrollMarginTop: '80px'}}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Enterprise Resource Planning
            </span>
          </p>
          <h2 className="text-3xl sm:text-4xl font-inter font-bold leading-tight mb-6">
            Transform Your Business with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}C360
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A complete enterprise resource planning solution with Admin, Employee, and HR portals. Streamline operations, boost productivity, and scale your business.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive ERP Solution
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              C360 is a powerful enterprise resource planning system designed to streamline your business operations. Our integrated platform brings together all your essential business functions into one unified system. Perfect for businesses, teams, and freelancers looking to optimize their workflow.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Admin Portal for complete control and oversight</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Employee Portal for task management and collaboration</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">HR Portal for workforce management and payroll</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Real-time analytics and reporting dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400"></span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">Freelancer Portal for project management and client collaboration</span>
              </li>
            </ul>

            {/* CTA Button */}
            <div className="pt-6">
              <a
                href="https://c360.codsyn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                Explore C360
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - ERP Dashboard Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
              <Image
                src="/erp.png"
                alt="C360 ERP Dashboard"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
