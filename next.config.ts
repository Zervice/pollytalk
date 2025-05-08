import type { NextConfig } from "next";

// Detect if we're using a custom domain based on environment variables
// This will be set in the GitHub Actions workflow
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  // Configure basePath and assetPrefix for GitHub Pages
  // Only use the base path for GitHub Pages, not for custom domains
  basePath: isCustomDomain ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
  assetPrefix: isCustomDomain ? '' : (process.env.NEXT_PUBLIC_BASE_PATH || ''),
  images: {
    unoptimized: true,
  },
};

console.log(`Building with custom domain: ${isCustomDomain}, basePath: ${nextConfig.basePath}`);

export default nextConfig;
