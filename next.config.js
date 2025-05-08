/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
  // This is important for GitHub Pages to handle client-side routing correctly
  experimental: {
    appDir: true,
  },
  env: {
    // Expose environment variables to the browser
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    NEXT_PUBLIC_CUSTOM_DOMAIN: process.env.NEXT_PUBLIC_CUSTOM_DOMAIN || 'false',
  },
}

module.exports = nextConfig
