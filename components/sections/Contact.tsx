'use client'

import { useState } from 'react'
import { sendContactForm } from '@/lib/emailjs'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const result = await sendContactForm(formData)
      if (result.success) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-16 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8" style={{scrollMarginTop: '80px'}}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Get In Touch
            </span>
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-inter font-bold leading-tight mb-6">
            Let's Work
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Together
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? We're here to help bring your ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900 dark:text-white">Let's Create Something Amazing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              We're here to help bring your ideas to life. Whether you need a new website, 
              CRM system, or custom web application, we're ready to collaborate.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="mr-2 sm:mr-3 text-lg sm:text-xl">📧</span>
                <span className="text-sm sm:text-base">info@codsyn.com</span>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="mr-2 sm:mr-3 text-lg sm:text-xl">📱</span>
                <span className="text-sm sm:text-base">+92 321 5971854</span>
              </div>
              
            </div>

            {/* Why Work With Us */}
            <div className="mb-6 sm:mb-8">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-white">Why Work With Us?</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start">
                  <span className="mr-3 text-purple-600 dark:text-purple-400 text-lg">✓</span>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">Expert Team</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">10+ years of combined experience</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-purple-600 dark:text-purple-400 text-lg">✓</span>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">Fast Delivery</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Agile development with quick iterations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 text-purple-600 dark:text-purple-400 text-lg">✓</span>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">24/7 Support</p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Always here when you need us</p>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
          <div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="crm-system">CRM System</option>
                  <option value="custom-software">Custom Software</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm sm:text-base resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 sm:py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 text-center">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-center">
                    ❌ Failed to send message. Please try again later.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
