'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, ArrowLeft, CheckCircle2, ShieldCheck, Activity, Users, Calendar, CreditCard } from 'lucide-react';

export default function SmartClinicHMS() {
  const [activeImage, setActiveImage] = useState(0);
  
  const images = [
    '/famc.png'
  ];

  const features = [
    {
      title: 'Patient Management',
      description: 'Comprehensive digital health records with quick access to patient history and profiles.',
      icon: <Users size={24} />
    },
    {
      title: 'Smart Scheduling',
      description: 'Real-time appointment booking system with automated reminders and doctor availability.',
      icon: <Calendar size={24} />
    },
    {
      title: 'Doctor Dashboard',
      description: 'Tailored interface for healthcare providers to manage consultations and prescriptions.',
      icon: <Activity size={24} />
    },
    {
      title: 'Secure HMS Core',
      description: 'Built with industry-standard security protocols to ensure patient data confidentiality.',
      icon: <ShieldCheck size={24} />
    },
    {
      title: 'Billing & Invoicing',
      description: 'Automated billing system with support for insurance and detailed financial reporting.',
      icon: <CreditCard size={24} />
    },
    {
      title: 'Cloud Integration',
      description: 'Seamless Firebase-powered real-time data sync across various clinic departments.',
      icon: <Globe size={24} />
    }
  ];

  const challenges = [
    {
      title: 'Healthcare Data Security',
      solution: 'Implemented robust end-to-end encryption and Firebase Security Rules to ensure HIPAA-level patient data protection.'
    },
    {
      title: 'Real-time Scheduling Sync',
      solution: 'Utilized Firebase Real-time Database to prevent double-bookings and ensure instant updates across all receptionist terminals.'
    },
    {
      title: 'Complex Medical History',
      solution: 'Designed a modular data structure that chronologically organizes diverse medical records into a readable, intuitive timeline.'
    },
    {
      title: 'High Availability',
      solution: 'Built a serverless architecture that remains responsive during peak clinic hours with zero infrastructure maintenance.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-inter">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Link 
              href="/#projects" 
              className="inline-flex items-center text-purple-200 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </div>
          
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-purple-200 uppercase tracking-widest">
                Healthcare Management Solution
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Farooq Azam Smart Clinic HMS
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto mb-10 leading-relaxed opacity-90">
                A state-of-the-art Health Management System designed to modernize medical practices, offering intelligent scheduling, secure patient records, and real-time medical workflow automation.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Live Application
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <Activity className="w-4 h-4 text-blue-400" />
                React & Firebase
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                <div className="p-2">
                    <img
                        src={images[activeImage]}
                        alt="HMS Screenshot"
                        className="w-full h-auto rounded-2xl"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/50">
                    <h4 className="text-purple-900 dark:text-purple-300 font-bold mb-2">Category</h4>
                    <p className="text-purple-700/80 dark:text-purple-400/80 text-sm">HealthTech / SaaS</p>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                    <h4 className="text-blue-900 dark:text-blue-300 font-bold mb-2">Build Duration</h4>
                    <p className="text-blue-700/80 dark:text-blue-400/80 text-sm">4 Months</p>
                </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About Project</h2>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6">
                Farooq Azam Smart Clinic HMS is a comprehensive solution specifically tailored for private clinics and multi-department hospitals. The system bridges the gap between patient care and administrative efficiency by automating routine tasks and centralizing critical data access.
              </p>
              <a 
                href="https://farooqazamsmartclinic.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                Launch Live Site <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
              </a>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Core Capabilities</h3>
              <div className="grid gap-4">
                {features.slice(0, 4).map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 shadow-sm">
                        <div className="w-10 h-10 bg-purple-50 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400">
                            {feature.icon}
                        </div>
                        <span className="text-gray-700 dark:text-slate-300 font-medium">{feature.title}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="mt-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Features</h2>
                <div className="h-1 w-20 bg-purple-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900/50 transition-all duration-300 shadow-sm hover:shadow-xl group">
                        <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Technical Roadmap */}
        <section className="mt-32 py-16 bg-slate-900 rounded-[3rem] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px]"></div>
            <div className="relative z-10 px-8 lg:px-16">
                <h2 className="text-3xl font-bold mb-12 text-center lg:text-left">Challenges & Solutions</h2>
                <div className="grid md:grid-cols-2 gap-12">
                    {challenges.map((item, i) => (
                        <div key={i} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full border border-purple-500/50 flex items-center justify-center text-xs text-purple-400 font-bold">0{i+1}</span>
                                <h4 className="text-lg font-bold text-white">{item.title}</h4>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed pl-11">
                                <span className="text-purple-400 font-semibold italic">Solution:</span> {item.solution}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="mt-16 py-20 bg-purple-600 text-white text-center rounded-t-[3rem]">
          <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Have a similar idea?</h2>
              <p className="text-xl text-purple-100 mb-10 opacity-80 italic">"Transforming healthcare through intelligent software solutions."</p>
              <Link 
                href="/#contact"
                className="px-10 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl shadow-black/20"
              >
                Let's Discuss Your Project
              </Link>
          </div>
      </section>
    </div>
  );
}
