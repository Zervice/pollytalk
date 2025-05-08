import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Prepends the base path to asset URLs
 * This ensures assets work correctly when deployed to GitHub Pages or with a custom domain
 */
export function getAssetPath(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if we're on a custom domain or the GitHub Pages domain
  let basePath = '';
  
  if (typeof window !== 'undefined') {
    // Client-side detection
    const hostname = window.location.hostname;
    
    // Only use the base path for GitHub Pages URLs
    // Explicitly check for github.io domain and NOT for custom domains
    const isGitHubPages = hostname.includes('github.io');
    const isCustomDomain = !isGitHubPages && !hostname.includes('localhost');
    
    if (isGitHubPages) {
      // For GitHub Pages URLs, use the repository name as base path
      basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    } else if (isCustomDomain) {
      // For custom domains, don't use any base path
      basePath = '';
    } else {
      // For local development, use the environment variable
      basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    }
    
    // Debug information
    console.debug(`Asset path for ${path} on ${hostname}: ${basePath}/${cleanPath}`);
  } else {
    // During build/SSR, use the environment variable
    basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  
  // Combine the base path with the asset path
  return `${basePath}/${cleanPath}`;
}
