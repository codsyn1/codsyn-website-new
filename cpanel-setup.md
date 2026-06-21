# cPanel Deployment and Sitemap Setup Guide

## 1. Deploy to cPanel

### Build the application:
```bash
npm run build
```

### Upload to cPanel:
1. Connect to your cPanel account
2. Go to File Manager
3. Navigate to `public_html/`
4. Upload your built Next.js application
5. Extract if uploaded as ZIP

### Configure Node.js in cPanel:
1. Go to cPanel > Setup Node.js App
2. Create a new application:
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: `codsyn-website`
   - Application URL: your domain or subdomain
   - Application startup file: `server.js`
3. Save and restart the application

## 2. Set Up Daily Sitemap Generation

### Method 1: Using cPanel Cron Jobs (Recommended)

1. **Go to cPanel > Cron Jobs**
2. **Add a new cron job** with these settings:
   - **Common Settings**: Once a day
   - **Minute**: 0
   - **Hour**: 2 (2:00 AM server time)
   - **Day**: *
   - **Month**: *
   - **Weekday**: *
   - **Command**: 
     ```
     cd /home/YOUR_USERNAME/public_html/codsyn-website && /usr/local/bin/npm run sitemap:cron
     ```

3. **Replace `YOUR_USERNAME`** with your actual cPanel username

### Method 2: Alternative Cron Command

If the above doesn't work, try:
```
cd /home/YOUR_USERNAME/public_html/codsyn-website && /usr/bin/node scripts/daily-sitemap-cron.js
```

## 3. Verify Sitemap

After setting up the cron job:

1. **Manual test**: Run `npm run sitemap` in your project directory
2. **Check the sitemap**: Visit `https://yourdomain.com/sitemap.xml`
3. **Check logs**: The cron job will create logs in `logs/sitemap-cron.log`

## 4. Common cPanel Issues

### Node.js Path Issues
If npm doesn't work, find the correct path:
```bash
which npm
which node
```

### Permission Issues
Make sure these directories are writable:
- `public/` (for sitemap.xml)
- `logs/` (for cron logs)

### Server Time Zone
Check your server's timezone in cPanel > Server Information

## 5. Alternative: Manual Sitemap Updates

If cron jobs don't work, you can manually update:
1. SSH into your server
2. Run: `npm run sitemap`
3. Or set up a simple PHP script to trigger it

## 6. Submit to Search Engines

Once your sitemap is live:
1. Google Search Console: Add `https://yourdomain.com/sitemap.xml`
2. Bing Webmaster Tools: Add your sitemap
3. Update robots.txt to include: `Sitemap: https://yourdomain.com/sitemap.xml`
