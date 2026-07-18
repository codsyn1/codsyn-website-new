import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';

// Template IDs
const CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || 'contact_template';
const PARTNER_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_PARTNER_TEMPLATE_ID || 'partner_template';

if (
  EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || 
  EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
  EMAILJS_PUBLIC_KEY === 'your_public_key_here' ||
  EMAILJS_SERVICE_ID === 'your_service_id_here'
) {
  console.warn('⚠️ EmailJS is using placeholder credentials. Please set your credentials in a .env.local file.');
}

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Contact Form Service
export const sendContactForm = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      to_name: 'Codsyn Team',
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      templateParams
    );

    console.log('Contact form sent successfully:', response);
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    const errMsg = error?.text || error?.message || JSON.stringify(error) || 'Unknown error';
    console.error('Error sending contact form:', errMsg, error);
    return { 
      success: false, 
      message: `Failed to send message: ${errMsg}` 
    };
  }
};

// Partner Form Service
export const sendPartnerForm = async (formData) => {
  try {
    const templateParams = {
      company_name: formData.companyName,
      nature_of_business: formData.natureOfBusiness,
      company_website: formData.companyWebsite,
      linkedin_profile: formData.linkedinProfile,
      business_email: formData.businessEmail,
      contact_info: formData.contactInfo,
      description: formData.description,
      to_name: 'Codsyn Team',
      reply_to: formData.businessEmail,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      PARTNER_TEMPLATE_ID,
      templateParams
    );

    console.log('Partner form sent successfully:', response);
    return { success: true, message: 'Application submitted successfully!' };
  } catch (error) {
    const errMsg = error?.text || error?.message || JSON.stringify(error) || 'Unknown error';
    console.error('Error sending partner form:', errMsg, error);
    return { 
      success: false, 
      message: `Failed to submit application: ${errMsg}` 
    };
  }
};

