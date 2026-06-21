const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Log file for cron job
const logFile = path.join(__dirname, '../logs/sitemap-cron.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());
  
  // Ensure logs directory exists
  const logsDir = path.dirname(logFile);
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  
  fs.appendFileSync(logFile, logMessage);
}

async function generateDailySitemap() {
  try {
    log('Starting daily sitemap generation...');
    
    // Run the sitemap generation script
    exec('node scripts/generate-sitemap.js', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
      if (error) {
        log(`Error generating sitemap: ${error.message}`);
        return;
      }
      
      if (stderr) {
        log(`Script stderr: ${stderr}`);
      }
      
      log('Sitemap generation completed successfully');
      log(`Output: ${stdout}`);
      
      // Optionally, ping search engines to notify them of the update
      pingSearchEngines();
    });
    
  } catch (error) {
    log(`Unexpected error: ${error.message}`);
  }
}

function pingSearchEngines() {
  const baseUrl = 'https://codsyn.com';
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${baseUrl}/sitemap.xml`,
    `https://www.bing.com/ping?sitemap=${baseUrl}/sitemap.xml`
  ];
  
  searchEngines.forEach(engine => {
    log(`Pinging search engine: ${engine}`);
    // Note: In a real implementation, you'd use HTTP requests to ping these URLs
    // This is just a placeholder for logging
  });
}

// Run the function
generateDailySitemap();
