@echo off
echo Setting up EmailJS configuration...
echo.

echo Creating .env.local file with your EmailJS credentials...

(
echo # EmailJS Configuration
echo NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=56p9xfGOpaXqvUyrn
echo NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_fsrzwsr
echo NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=contact_template
echo NEXT_PUBLIC_EMAILJS_PARTNER_TEMPLATE_ID=partner_template
) > .env.local

echo.
echo ✅ .env.local file created successfully!
echo.
echo 📧 EmailJS is now configured with your credentials:
echo    - Public Key: 56p9xfGOpaXqvUyrn
echo    - Service ID: service_fsrzwsr
echo    - Contact Template: contact_template
echo    - Partner Template: partner_template
echo.
echo 🚀 Your forms are ready to send emails!
echo.
echo 📝 Next steps:
echo    1. Create EmailJS templates using emailjs-templates.md
echo    2. Restart your development server
echo    3. Test both forms
echo.
pause
