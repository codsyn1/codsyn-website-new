export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100 py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
          {/* Company Info */}
          <div >
             <div className="flex items-center gap-0 mb-2">
              <img 
                src="/white-logo.png" 
                alt="Codsyn Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
              <img 
                src="/white-text.png" 
                alt="Codsyn" 
                className="h-6 sm:h-7 md:h-9 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Professional web development services transforming ideas into digital reality with cutting-edge technology and innovative solutions.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.facebook.com/share/1CJc84gDVF/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-900/50 rounded-full flex items-center justify-center hover:bg-purple-800/50 transition-colors cursor-pointer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v3.23h-1.507c-1.265 0-1.503.621-1.503 1.503v2.09h3.032l-.392 3.47h-2.64V23.927c5.737-.9 10.125-5.864 10.125-11.854z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-900/50 rounded-full flex items-center justify-center hover:bg-purple-800/50 transition-colors cursor-pointer">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/codsyn-smc-pvt-ltd/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-purple-900/50 rounded-full flex items-center justify-center hover:bg-purple-800/50 transition-colors cursor-pointer">
                <svg className="w-5 h-5 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="ml-0 sm:ml-6 md:ml-10">
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Services</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Projects</a></li>
              <li><a href="#team" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Our Team</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">Services</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Web Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Mobile App Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">UI/UX Design</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">SEO Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Social Media Marketing</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-purple-300 transition-colors text-sm">Custom Software Solutions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-200">Newsletter</h4>
            <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              Subscribe to our newsletter for the latest updates, tech insights, and exclusive offers.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 sm:px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
              <button className="w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
                Subscribe
              </button>
            </div>
           
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs sm:text-sm">
              &copy; 2023 - 2026 Codsyn SMC PVT LTD. All rights reserved.
            </p>
            
            <div className="flex space-x-4 sm:space-x-6 mt-3 md:mt-0">
              <a href="/privacy-policy" className="text-gray-500 hover:text-purple-300 text-xs sm:text-sm transition-colors">Privacy Policy</a>
              <a href="#contact" className="text-gray-500 hover:text-purple-300 text-xs sm:text-sm transition-colors">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs sm:text-sm">
            Designed and developed by <a href="#team" className="text-purple-400 hover:text-purple-300 transition-colors">Codsyn</a> 
          </p>
        </div>
      </div>
    </footer>
  )
}
