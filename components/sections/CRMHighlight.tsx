'use client';

import { useState } from 'react';

export default function CRMHighlight() {
  const features = [
    {
      icon: '👥',
      title: 'Team Management',
      description: 'In our CRM, we manage team members efficiently with role-based permissions and performance tracking.',
      details: 'With our CRM system, we create detailed team member profiles, assign specific roles and permissions, and monitor team performance in real-time. This ensures that everyone has access to the right information and tools they need to perform their jobs effectively.'
    },
    {
      icon: '💬',
      title: 'Daily Chats',
      description: 'In our CRM, we have code spaces where we chat and communicate through this system.',
      details: 'Our integrated chat system includes dedicated code spaces for technical discussions, instant messaging, group conversations, file sharing, and maintains a complete message history. Team members can communicate seamlessly without switching between different applications, keeping all project-related discussions and code conversations in one centralized location.'
    },
    {
      icon: '✅',
      title: 'Task Management',
      description: 'In our CRM, we have boards where we can add tasks and track what our employees are doing.',
      details: 'We create task boards, assign them to team members, set priorities, track progress, and manage deadlines all in one place. Our system provides visual progress indicators and automated notifications to ensure that no task falls through the cracks and projects stay on schedule. All employee activities are tracked through our comprehensive task management system.'
    },
    {
      icon: '📅',
      title: 'Timeline Management',
      description: 'In our CRM, we have project sections with sub-tag boards for detailed organization.',
      details: 'Our timeline management system includes Gantt charts, milestone tracking, time-based planning, and progress visualization. We can upload files to boards, add tasks, and track how much time is spent on each task. We get detailed analytics on time allocation across different projects and team members, ensuring creative and efficient day-to-day operations.'
    },
    {
      icon: '📧',
      title: 'Chat Messages',
      description: 'In our CRM, we use integrated messaging for seamless communication.',
      details: 'All our conversations are stored and searchable within the CRM, with conversation threads, message search functionality, and smart notification system. We never lose important information and maintain context across all our business communications, from daily chats to project-specific discussions.'
    },
    {
      icon: '🤝',
      title: 'CRM Meetings',
      description: 'In our CRM, we schedule and manage meetings directly with calendar integration.',
      details: 'Our meeting scheduler integrates with our calendar, allows us to set up meetings with team members or clients, take meeting notes directly in the CRM, and automatically create follow-up tasks. All meeting data is tracked and stored for future reference and time management.'
    }
  ];

  return (
    <section id="crm-highlight" className="relative py-16 pb-0 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              How Our System Works
            </span>
          </p>
          <h2 className="text-4xl sm:text-5xl font-inter font-bold leading-tight mb-6">
            Discover Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Team Management
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            See how our team members collaborate through our internal CRM system with efficient workflows
          </p>
        </div>

        {/* Blog-style Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="group relative bg-white dark:bg-slate-800/50 rounded-xl p-8 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-400/20 hover:-translate-y-2 overflow-hidden">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon container with enhanced hover */}
              <div className="relative text-4xl mb-6 text-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                <span className="relative z-10">{feature.icon}</span>
              </div>
              
              {/* Title with hover effect */}
              <h3 className="relative text-xl font-inter font-semibold text-gray-900 dark:text-white mb-4 text-center transform transition-all duration-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:scale-105">
                {feature.title}
              </h3>
              
              {/* Description with hover effect */}
              <p className="relative text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transform transition-all duration-500 group-hover:text-gray-700 dark:group-hover:text-gray-200">
                {feature.description}
              </p>
              
              {/* Details with hover effect */}
              <p className="relative text-sm text-gray-500 dark:text-gray-400 leading-relaxed transform transition-all duration-500 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                {feature.details}
              </p>

              {/* Decorative elements on hover */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 blur-sm"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100 blur-sm"></div>
              
              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-purple-400/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>

      
      </div>
    </section>
  );
}
