'use client';

import { useState } from 'react';

export default function Team() {
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});

  const handleCardClick = (memberName: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [memberName]: !prev[memberName]
    }));
  };
  const team = [
    {
      name: 'Jehangir Ahmed',
      role: 'CEO & Founder',
      image: '/jehangir.png',
      bio: 'Visionary leader with 9+ years of experience in tech innovation and business strategy. Passionate about building scalable solutions that drive business growth and transform digital landscapes.',
      expertise: ['Business Strategy', 'Product Development', 'Team Leadership']
    },
    {
      name: 'Aftab Asif',
      role: 'Full Stack Department Head',
      image: '/aftab.jpeg',
      bio: 'Experienced full-stack developer specializing in React, Next.js, and modern JavaScript frameworks. Expert in creating beautiful, responsive user experiences with clean code and attention to detail.',
      expertise: ['React/Next.js', 'Backend Development', 'Full Stack Development']
    },
    {
      name: 'Nadia Malik',
      role: 'Business Development Head',
      image: '/nadia.jpeg',
      bio: 'Strategic business development leader with expertise in market expansion and partnership building. Driving growth initiatives and fostering key client relationships to scale business operations effectively.',
      expertise: ['Business Development', 'Strategic Planning', 'Client Relations', 'Market Analysis']
    },
    {
      name: 'Muhammed Umer',
      role: 'Digital Marketing Head',
      image: '/umer.jpeg',
      bio: 'Creative social media specialist with expertise in digital marketing and content strategy. Skilled in building brand awareness and driving engagement through data-driven campaigns and compelling storytelling.',
      expertise: ['SEO Services', 'Social Media Marketing', 'Content Strategy', 'Analytics']
    }
  ];

  return (
    <section id="team" className="relative py-16 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8" style={{scrollMarginTop: '80px'}}>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Meet Our Team
            </span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-bold leading-tight mb-6">
            The Minds Behind
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Our Success
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Talented professionals dedicated to turning your vision into reality
          </p>
        </div>

        {/* Team Grid with Flip Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {team.map((member, index) => { return ( <div key={index} className="relative w-full h-64 sm:h-72 md:h-80 lg:h-84 xl:h-96 perspective-1000">
              {/* Flip Card Container */}
              <div 
                className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d cursor-pointer ${
                  flippedCards[member.name] ? 'rotate-y-180' : ''
                }`}
                onClick={() => handleCardClick(member.name)}
              >
                
                {/* Front of Card */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                  <div className="group bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-400/20 h-full relative overflow-hidden">
                    {/* CEO Badge for Jahangir */}
                    {member.role === 'CEO & Founder' && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                        CEO
                      </div>
                    )}
                    {/* Team Lead Badge for Aftab */}
                    {member.role === 'Full Stack Department Head' && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse z-10">
                        Team Head
                      </div>
                    )}
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-purple-600/10"></div>
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                      {/* Team Member Image */}
                      <div className="text-center mb-4">
                        <div className="relative w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto rounded-full overflow-hidden mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                          <img 
                            src={member.image}
                            alt={member.name}
                            className={member.name === 'Aftab Asif' 
                              ? "w-full h-full object-cover object-top" 
                              : member.name === 'Jehangir Ahmed'
                              ? "w-full h-full object-cover object-center scale-110"
                              : member.name === 'Muhammed Umer'
                              ? "w-full h-full object-cover object-top scale-130"
                              : member.name === 'Muhammad Sameer'
                              ? "w-full h-full object-cover object-top scale-100"
                              : "w-full h-full object-cover"
                            }
                          />
                          
                          {/* Decorative ring */}
                          <div className="absolute inset-0 rounded-full border-4 border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-500"></div>
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-inter font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 bg-gradient-to-r from-purple-600 to-purple-600 bg-clip-text text-transparent">
                          {member.name}
                        </h3>
                        <p className="text-purple-600 dark:text-purple-300 font-bold mb-1 sm:mb-2 tracking-wider uppercase text-xs sm:text-sm">
                          {member.role}
                        </p>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                        {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      {/* Social Links */}
                      <div className="flex justify-center space-x-1 sm:space-x-2 sm:space-x-3 mt-2 sm:mt-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 cursor-pointer transform hover:scale-110">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48C2 10.09 3.23 11.64c0 1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82.89 1.67 1.3-3.61 1.08-2.68L12 16l-4.53-4.53c-1.3-.26-2.46-.42-3.58-.13-1.09-.27-2.09-.27-2.09 0-2.91 1.31-3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68L12 16l4.53 4.53c1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68z"/>
                          </svg>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer transform hover:scale-110">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48C2 10.09 3.23 11.64c0 1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82.89 1.67 1.3-3.61 1.08-2.68L12 16l-4.53-4.53c-1.3-.26-2.46-.42-3.58-.13-1.09-.27-2.09-.27-2.09 0-2.91 1.31-3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68L12 16l4.53 4.53c1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68z"/>
                          </svg>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 cursor-pointer transform hover:scale-110">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48C2 10.09 3.23 11.64c0 1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82.89 1.67 1.3-3.61 1.08-2.68L12 16l-4.53-4.53c-1.3-.26-2.46-.42-3.58-.13-1.09-.27-2.09-.27-2.09 0-2.91 1.31-3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68L12 16l4.53 4.53c1.3.26 2.46.42 3.58.13 1.09.27 2.09.27 2.09 0 2.91-1.31 3.58-2.68 4.53-3.82-.89 1.67 1.3-3.61 1.08-2.68z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Card (Bio Only) */}
                <div className="absolute inset-0 w-full h-full rotate-y-180 backface-hidden">
                  <div className="bg-gradient-to-t from-transparent via-purple-900/20 to-purple-900/40 p-3 sm:p-4 md:p-6 rounded-2xl border border-purple-400/30 h-full relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-purple-600/20"></div>
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center h-full text-white">
                      {/* Role Tag */}
                      <div className="text-center mb-3">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                          {member.role}
                        </span>
                      </div>

                      {/* Bio */}
                      <div className="text-center px-2 py-2">
                        <p className="text-white/95 leading-relaxed font-medium text-sm">
                          {member.bio}
                        </p>
                      </div>

                      {/* Expertise Tags */}
                      <div className="flex flex-wrap justify-center gap-1 mt-2">
                        {member.expertise.slice(0, 3).map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-medium backdrop-blur-sm">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Click Hint */}
                      <div className="text-center mt-2">
                        <p className="text-white/60 text-xs italic">
                          Click to flip back
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

     
      </div>

      {/* Custom CSS for 3D Flip */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}
