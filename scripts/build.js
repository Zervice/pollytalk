const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local if it exists
const envPath = path.join(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  console.log('Loading environment variables from .env.local');
  dotenv.config({ path: envPath });
} else {
  console.log('No .env.local file found. Using environment variables from the system.');
}

// Check if we have a CNAME file (indicating a custom domain)
const cnameFile = path.join(__dirname, '../public/CNAME');
const hasCustomDomain = fs.existsSync(cnameFile);

// Set environment variables
if (hasCustomDomain) {
  console.log(`Custom domain detected: ${fs.readFileSync(cnameFile, 'utf8').trim()}`);
  process.env.NEXT_PUBLIC_CUSTOM_DOMAIN = 'true';
  
  // For custom domains, we don't use a base path
  process.env.NEXT_PUBLIC_BASE_PATH = '';
} else {
  console.log('No custom domain detected, using GitHub Pages URL');
  process.env.NEXT_PUBLIC_CUSTOM_DOMAIN = 'false';
  
  // For GitHub Pages, we use the repository name as the base path
  // This is typically set in the GitHub Actions workflow
  // For local builds, you can set it manually or default to empty
  if (!process.env.NEXT_PUBLIC_BASE_PATH) {
    // Try to detect the repository name from git
    try {
      const repoUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
      const repoName = repoUrl.split('/').pop().replace('.git', '');
      process.env.NEXT_PUBLIC_BASE_PATH = `/${repoName}`;
      console.log(`Detected repository name: ${repoName}`);
    } catch (error) {
      console.warn('Could not detect repository name from git:', error.message);
      process.env.NEXT_PUBLIC_BASE_PATH = '';
    }
  }
}

// Check for API server environment variables
if (!process.env.NEXT_PUBLIC_API_URL) {
  console.log('No API URL set, using default: https://api.pollytalkie.com/');
  process.env.NEXT_PUBLIC_API_URL = 'https://api.pollytalkie.com/';
}

console.log(`Building with: NEXT_PUBLIC_CUSTOM_DOMAIN=${process.env.NEXT_PUBLIC_CUSTOM_DOMAIN}, NEXT_PUBLIC_BASE_PATH=${process.env.NEXT_PUBLIC_BASE_PATH}`);
console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);



// Run the blog page generator
console.log('Generating static blog pages...');
try {
  // Generate blog pages
  execSync('node ./scripts/generate-blog-pages.js', { stdio: 'inherit' });
  console.log('Blog pages generated successfully');
} catch (error) {
  console.error('Blog page generation failed:', error.message);
  process.exit(1);
}

// Run the Next.js build
try {
  // Build the application
  execSync('next build', { stdio: 'inherit' });
  
  // Create .nojekyll file to disable Jekyll processing
  execSync('touch ./out/.nojekyll', { stdio: 'inherit' });
  
  // Copy 404.html for client-side routing
  execSync('cp ./public/404.html ./out/', { stdio: 'inherit' });
  
  // If we have a CNAME file, make sure it's copied to the output directory
  if (hasCustomDomain) {
    execSync('cp ./public/CNAME ./out/', { stdio: 'inherit' });
    console.log('Copied CNAME file to output directory');
  }
  
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
