# EmailJS Templates Configuration

## Setup Instructions

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create the following templates
4. Update your environment variables with the IDs

## Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=contact_template
NEXT_PUBLIC_EMAILJS_PARTNER_TEMPLATE_ID=partner_template
```

## Template 1: Contact Form

**Template ID:** `contact_template`

**Subject:** `New Contact Form Submission from {{from_name}}`

**Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .header {
            text-align: center;
            padding: 40px 30px 30px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 800;
            color: white;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }
        
        .logo::before {
            content: '🚀';
            font-size: 28px;
        }
        
        .title {
            color: rgba(255, 255, 255, 0.9);
            font-size: 22px;
            font-weight: 600;
            margin: 0;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .info-section {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid rgba(99, 102, 241, 0.1);
        }
        
        .info-grid {
            display: grid;
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            background: white;
            border-radius: 12px;
            border: 1px solid rgba(99, 102, 241, 0.15);
            transition: all 0.3s ease;
        }
        
        .info-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
            border-color: rgba(99, 102, 241, 0.3);
        }
        
        .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .info-label::before {
            content: '▸';
            color: #6366f1;
            font-weight: bold;
        }
        
        .info-value {
            color: #1f2937;
            font-weight: 500;
            font-size: 15px;
            text-align: right;
            flex: 1;
            margin-left: 20px;
        }
        
        .message-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid rgba(251, 191, 36, 0.2);
            position: relative;
        }
        
        .message-section::before {
            content: '💬';
            position: absolute;
            top: -15px;
            left: 30px;
            font-size: 30px;
            background: white;
            padding: 5px 10px;
            border-radius: 50%;
            border: 2px solid rgba(251, 191, 36, 0.3);
        }
        
        .message-title {
            color: #92400e;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .message-text {
            background: white;
            padding: 20px;
            border-radius: 12px;
            color: #374151;
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            border: 1px solid rgba(251, 191, 36, 0.2);
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.1);
        }
        
        .cta-section {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-top: 1px solid rgba(99, 102, 241, 0.1);
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .footer-date {
            color: #9ca3af;
            font-size: 12px;
            font-weight: 500;
        }
        
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            margin-left: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 20px 10px;
            }
            
            .container {
                border-radius: 16px;
            }
            
            .header {
                padding: 30px 20px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .info-item {
                flex-direction: column;
                text-align: center;
                gap: 8px;
            }
            
            .info-value {
                text-align: center;
                margin-left: 0;
            }
            
            .cta-button {
                padding: 14px 28px;
                font-size: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Codsyn</div>
            <h1 class="title">New Contact Form Submission <span class="badge">New</span></h1>
        </div>

        <div class="content">
            <div class="info-section">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Name</div>
                        <div class="info-value">{{from_name}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">{{from_email}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Phone</div>
                        <div class="info-value">{{phone}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Service</div>
                        <div class="info-value">{{service}}</div>
                    </div>
                </div>
            </div>

            <div class="message-section">
                <h3 class="message-title">📝 Message</h3>
                <div class="message-text">{{message}}</div>
            </div>

            <div class="cta-section">
                <a href="mailto:{{reply_to}}" class="cta-button">
                    📧 Reply to {{from_name}}
                </a>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">This message was sent from the Codsyn website contact form</p>
            <p class="footer-date">Received on: {{date}}</p>
        </div>
    </div>
</body>
</html>
```

## Template 2: Partner Application Form

**Template ID:** `partner_template`

**Subject:** `New Partnership Application from {{company_name}}`

**Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Partnership Application</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            min-height: 100vh;
            padding: 40px 20px;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .header {
            text-align: center;
            padding: 40px 30px 30px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            position: relative;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
            opacity: 0.3;
        }
        
        .logo {
            font-size: 32px;
            font-weight: 800;
            color: white;
            margin-bottom: 8px;
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }
        
        .logo::before {
            content: '🤝';
            font-size: 28px;
        }
        
        .title {
            color: rgba(255, 255, 255, 0.9);
            font-size: 22px;
            font-weight: 600;
            margin: 0;
            position: relative;
            z-index: 1;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .info-section {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .info-grid {
            display: grid;
            gap: 20px;
        }
        
        .info-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 20px;
            background: white;
            border-radius: 12px;
            border: 1px solid rgba(16, 185, 129, 0.15);
            transition: all 0.3s ease;
        }
        
        .info-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.15);
            border-color: rgba(16, 185, 129, 0.3);
        }
        
        .info-label {
            font-weight: 600;
            color: #6b7280;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .info-label::before {
            content: '▸';
            color: #10b981;
            font-weight: bold;
        }
        
        .info-value {
            color: #1f2937;
            font-weight: 500;
            font-size: 15px;
            text-align: right;
            flex: 1;
            margin-left: 20px;
        }
        
        .info-value a {
            color: #10b981;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            border-bottom: 1px solid transparent;
        }
        
        .info-value a:hover {
            color: #059669;
            border-bottom-color: #059669;
        }
        
        .message-section {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            border: 1px solid rgba(251, 191, 36, 0.2);
            position: relative;
        }
        
        .message-section::before {
            content: '📄';
            position: absolute;
            top: -15px;
            left: 30px;
            font-size: 30px;
            background: white;
            padding: 5px 10px;
            border-radius: 50%;
            border: 2px solid rgba(251, 191, 36, 0.3);
        }
        
        .message-title {
            color: #92400e;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .message-text {
            background: white;
            padding: 20px;
            border-radius: 12px;
            color: #374151;
            font-size: 15px;
            line-height: 1.7;
            white-space: pre-wrap;
            border: 1px solid rgba(251, 191, 36, 0.2);
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.1);
        }
        
        .cta-section {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 16px 32px;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(16, 185, 129, 0.4);
        }
        
        .footer {
            text-align: center;
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-top: 1px solid rgba(16, 185, 129, 0.1);
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 13px;
            margin-bottom: 8px;
        }
        
        .footer-date {
            color: #9ca3af;
            font-size: 12px;
            font-weight: 500;
        }
        
        .badge {
            display: inline-block;
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 600;
            margin-left: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        @media (max-width: 600px) {
            body {
                padding: 20px 10px;
            }
            
            .container {
                border-radius: 16px;
            }
            
            .header {
                padding: 30px 20px 20px;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .info-item {
                flex-direction: column;
                text-align: center;
                gap: 8px;
            }
            
            .info-value {
                text-align: center;
                margin-left: 0;
            }
            
            .cta-button {
                padding: 14px 28px;
                font-size: 15px;
            }
        }
    </link>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Codsyn Partnerships</div>
            <h1 class="title">New Partnership Application <span class="badge">New</span></h1>
        </div>

        <div class="content">
            <div class="info-section">
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Company Name</div>
                        <div class="info-value">{{company_name}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Business Type</div>
                        <div class="info-value">{{nature_of_business}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Website</div>
                        <div class="info-value">
                            <a href="{{company_website}}" target="_blank">{{company_website}}</a>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">LinkedIn</div>
                        <div class="info-value">
                            <a href="{{linkedin_profile}}" target="_blank">{{linkedin_profile}}</a>
                        </div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Business Email</div>
                        <div class="info-value">{{business_email}}</div>
                    </div>
                    
                    <div class="info-item">
                        <div class="info-label">Contact Info</div>
                        <div class="info-value">{{contact_info}}</div>
                    </div>
                </div>
            </div>

            <div class="message-section">
                <h3 class="message-title">📄 Partnership Description</h3>
                <div class="message-text">{{description}}</div>
            </div>

            <div class="cta-section">
                <a href="mailto:{{reply_to}}" class="cta-button">
                    📧 Reply to {{company_name}}
                </a>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">This partnership application was submitted via the Codsyn website</p>
            <p class="footer-date">Received on: {{date}}</p>
        </div>
    </div>
</body>
</html>
```

## Variables Available

### Contact Form Variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{phone}}` - Phone number
- `{{service}}` - Selected service
- `{{message}}` - Message content
- `{{reply_to}}` - Reply-to email
- `{{date}}` - Current date (auto-added)

### Partner Form Variables:
- `{{company_name}}` - Company name
- `{{nature_of_business}}` - Business type
- `{{company_website}}` - Company website
- `{{linkedin_profile}}` - LinkedIn profile
- `{{business_email}}` - Business email
- `{{contact_info}}` - Additional contact info
- `{{description}}` - Partnership description
- `{{reply_to}}` - Reply-to email
- `{{date}}` - Current date (auto-added)

## Quick Setup Steps

1. **Create EmailJS Account**: Go to [emailjs.com](https://www.emailjs.com/)
2. **Add Email Service**: Connect your Gmail/Outlook account
3. **Create Contact Template**: Use the contact template above
4. **Create Partner Template**: Use the partner template above
5. **Get IDs**: Copy your Public Key, Service ID, and Template IDs
6. **Update Environment**: Add them to your `.env.local` file
7. **Test Forms**: Both forms should now send emails!
