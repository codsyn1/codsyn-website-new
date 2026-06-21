'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sendPartnerForm } from '@/lib/emailjs';

type SubmitStatus = 'success' | 'error' | '';

const SUCCESS_STATUS: SubmitStatus = 'success';
const ERROR_STATUS: SubmitStatus = 'error';

export default function BecomePartner() {
  const [formData, setFormData] = useState({
    companyName: '',
    natureOfBusiness: '',
    companyWebsite: '',
    linkedinProfile: '',
    businessEmail: '',
    contactInfo: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const result = await sendPartnerForm(formData);
      if (result.success) {
        setSubmitStatus(SUCCESS_STATUS);
        // Reset form after successful submission
        setFormData({
          companyName: '',
          natureOfBusiness: '',
          companyWebsite: '',
          linkedinProfile: '',
          businessEmail: '',
          contactInfo: '',
          description: ''
        });
      } else {
        setSubmitStatus(ERROR_STATUS);
      }
    } catch (error) {
      setSubmitStatus(ERROR_STATUS);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  
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
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-purple-200">
                🤝 Partnership Opportunities
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Become a Partner
            </h1>
            <p className="text-lg text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our network of innovative partners and collaborate on exciting projects. 
              Let's create something extraordinary together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-purple-100 font-medium text-sm">Open to Partnerships</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-yellow-300 text-sm">⭐</span>
                <span className="text-purple-100 font-medium text-sm">Trusted Partners</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-purple-100 font-medium text-sm">Global Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Partnership Form */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Partnership Application
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          {submitStatus === SUCCESS_STATUS ? (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center shadow-xl">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-3">
                Application Submitted Successfully!
              </h3>
              <p className="text-green-600 dark:text-green-300 text-lg">
                Thank you for your interest in partnering with us. We'll review your application and get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Company Information */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-purple-100 dark:border-purple-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">🏢</span>
                  Company Information
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Nature of Business *
                    </label>
                    <input
                      type="text"
                      name="natureOfBusiness"
                      value={formData.natureOfBusiness || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                      placeholder="Describe your business nature"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Company Website *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                        https://www.
                      </span>
                      <input
                        type="text"
                        name="companyWebsite"
                        value={formData.companyWebsite || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-24 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                        placeholder="website.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Add Linkedin Profile *
                    </label>
                    <input
                      type="url"
                      name="linkedinProfile"
                      value={formData.linkedinProfile || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      name="businessEmail"
                      value={formData.businessEmail || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                      placeholder="business@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Contact Info *
                    </label>
                    <input
                      type="tel"
                      name="contactInfo"
                      value={formData.contactInfo || ''}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Description
                    </label>
                    <div className="relative">
                      <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleInputChange}
                        maxLength={180}
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 dark:bg-gray-700 dark:text-white hover:border-purple-300 resize-none"
                        placeholder="Write something about yourself and company..."
                      />
                      <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {(formData.description?.length || 0)} / 180
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white font-bold rounded-full hover:from-purple-700 hover:via-purple-800 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : 'Submit Partnership Application'}
                </button>
              </div>
              
              {/* Status Messages */}
              {submitStatus === SUCCESS_STATUS && (
                <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 text-center">
                    ✅ Partnership application submitted successfully! We'll review your application and get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === ERROR_STATUS && (
                <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-center">
                    ❌ Failed to submit application. Please try again later.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

          </div>
  );
}
