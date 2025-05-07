import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Configure basePath and assetPrefix for GitHub Pages
  // The following values will be replaced by GitHub Actions during deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
