/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  // Environment variables
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    NEXT_PUBLIC_CUSTOM_DOMAIN: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN || 'false',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://core.pollytalkie.com/pollytalk',
  },
  // Disable React StrictMode for production builds on Cloudflare
  reactStrictMode: process.env.NODE_ENV !== 'production',
  // Cloudflare specific settings
  experimental: {
    // Disable CSS optimization to avoid critters issues
    optimizeCss: false,
    // Reduce bundle size
    optimizePackageImports: ['react', 'react-dom', 'framer-motion', 'lucide-react']
  }
}

module.exports = nextConfig
