'use client';

import { useState, useEffect, useRef } from 'react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      text: "Hi 👋 Welcome to Codsyn SMC Private Limited!\n\nThank you for contacting us through our website.\n\nWe provide the following services:\n\n🔹 Web Development (Business Websites, E-commerce Stores, Custom Websites – Next.js, React, WordPress etc.)\n\n🔹 Mobile App Development (Flutter & React Native – Android & iOS Apps)\n\n🔹 Digital Marketing (SEO, Facebook Ads, Google Ads, Google Business Profile Optimization)\n\nKindly let us know which service you are interested in, so our team can guide you properly and share complete details.\n\nWe look forward to working with you 😊", 
      sent: false, 
      time: "14:41", 
      id: 1 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const phoneNumber = "+923215971854"; // Remove spaces and + for WhatsApp API
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  // Auto-responses for common questions
  const getAutoResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! How can I assist you today?";
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate')) {
      return "Our pricing varies based on project requirements. Could you tell me more about what you're looking for?";
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('services')) {
      return "We offer web development, mobile apps, UI/UX design, and more. What specific service interests you?";
    }
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
      return "You can view our portfolio in the Projects section. Would you like me to send you a direct link?";
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
      return "You can reach us through this chat, email us at info@example.com, or call +92 321 5971854";
    }
    if (lowerMessage.includes('time') || lowerMessage.includes('hours') || lowerMessage.includes('available')) {
      return "We're available 24/7 through this chat. Our team typically responds within minutes!";
    }
    
    // Default response
    return "Thank you for your message! I'll make sure our team gets back to you soon. Is there anything specific I can help you with?";
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mark conversation as started
      if (!conversationStarted) {
        setConversationStarted(true);
      }

      // Add user message
      const newMessage = {
        text: message,
        sent: true,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        id: Date.now()
      };
      setMessages(prev => [...prev, newMessage]);
      
      // Clear input
      const userMessage = message;
      setMessage('');
      
      // Show typing indicator
      setIsTyping(true);
      
      // Simulate typing delay and then add auto-response
      setTimeout(() => {
        setIsTyping(false);
        
        const autoResponse = getAutoResponse(userMessage);
        const botMessage = {
          text: autoResponse,
          sent: false,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
          id: Date.now() + 1
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-scroll to latest message when chat is reopened
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [isOpen]);

  const sendConversationToWhatsApp = () => {
    // Format the entire conversation for WhatsApp
    let conversationText = "Hello! I started a chat on your website. Here's our conversation:\n\n";
    
    messages.forEach((msg, index) => {
      const sender = msg.sent ? "Me" : "Assistant";
      conversationText += `${sender}:\n${msg.text}\n\n`;
    });
    
    conversationText += "---\nPlease continue our conversation on WhatsApp!";
    
    // Open WhatsApp with the complete conversation
    const encodedMessage = encodeURIComponent(conversationText);
    window.open(`${whatsappUrl}?text=${encodedMessage}`, '_blank');
  };

  const endChatAndSend = () => {
    if (conversationStarted) {
      // Add a final message
      const finalMessage = {
        text: "Thank you for chatting! I'm sending our conversation to WhatsApp now for continued support.",
        sent: false,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        id: Date.now()
      };
      setMessages(prev => [...prev, finalMessage]);
      
      // Send to WhatsApp after a short delay
      setTimeout(() => {
        sendConversationToWhatsApp();
      }, 1000);
    } else {
      // If no conversation started, just open WhatsApp
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
      {/* WhatsApp Widget */}
      <div 
        id="whatsapp-widget"
        className="fixed bottom-6 right-6 z-50 transition-all duration-500"
        style={{ zIndex: 9999 }}
      >
        {isOpen ? (
          /* Chat Window */
          <div className="bg-white rounded-2xl shadow-2xl w-80 h-[500px] flex flex-col animate-slide-up">
            {/* Clean Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 rounded-t-2xl flex items-center justify-between">
              {/* Left Section - Title and Info */}
              <div className="flex flex-col items-start flex-1">
                <div className="text-white font-bold text-lg">Live Chat Support</div>
                <div className="text-purple-100 text-xs flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  {conversationStarted ? "We typically reply within minutes" : "Chat with our AI assistant"}
                </div>
              </div>
              
              {/* Right Section - Close Button */}
              <div className="flex items-center gap-2 ml-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto bg-gray-50"
            >
              {messages.map((msg, index) => (
                <div key={index} className={`mb-3 flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] ${msg.sent ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-2`}>
                    <p 
                      className="text-sm" 
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    ></p>
                    <p className={`text-xs mt-1 ${msg.sent ? 'text-purple-200' : 'text-gray-500'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start mb-3">
                  <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t bg-white rounded-b-2xl">
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={conversationStarted ? "Type your message..." : "Start a conversation..."}
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:text-purple-600"
                />
                {conversationStarted ? (
                  <button
                    onClick={handleSendMessage}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => window.open(whatsappUrl, '_blank')}
                    className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors"
                    title="Chat directly on WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.065 2.876c1.396 2.393 3.009 3.399 4.639 4.086.613.265 1.092.424 1.466.544.615.2 1.176.172 1.621.104.495-.074 1.52-.622 1.735-1.224.215-.602.215-1.119.149-1.224-.066-.104-.239-.149-.495-.297zm-5.423 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
                    </svg>
                  </button>
                )}
              </div>
              {conversationStarted && (
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Type a message or click "Send to WhatsApp" to continue the conversation there
                </div>
              )}
            </div>
            
            {/* Footer with Send to WhatsApp Button */}
            {conversationStarted && (
              <div className="px-4 pb-4 bg-white rounded-b-2xl">
                <button
                  onClick={endChatAndSend}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.065 2.876c1.396 2.393 3.009 3.399 4.639 4.086.613.265 1.092.424 1.466.544.615.2 1.176.172 1.621.104.495-.074 1.52-.622 1.735-1.224.215-.602.215-1.119.149-1.224-.066-.104-.239-.149-.495-.297zm-5.423 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
                  </svg>
                  Send to WhatsApp
                </button>
              </div>
            )}
          </div>
        ) : (
          /* WhatsApp Button */
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group animate-bounce-slow"
          >
            <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.065 2.876c1.396 2.393 3.009 3.399 4.639 4.086.613.265 1.092.424 1.466.544.615.2 1.176.172 1.621.104.495-.074 1.52-.622 1.735-1.224.215-.602.215-1.119.149-1.224-.066-.104-.239-.149-.495-.297zm-5.423 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884z"/>
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -15px, 0);
          }
          70% {
            transform: translate3d(0, -7px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
      `}</style>
    </>
  );
}
