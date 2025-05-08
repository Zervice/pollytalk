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
    const isGitHubPages = window.location.hostname.includes('github.io');
    if (isGitHubPages) {
      // Only use the base path for GitHub Pages URLs
      basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    }
  } else {
    // During build/SSR, use the environment variable
    basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  
  // Combine the base path with the asset path
  return `${basePath}/${cleanPath}`;
}
