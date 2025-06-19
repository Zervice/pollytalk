'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const GITHUB_API_URL = 'https://api.github.com/repos/Zervice/pollytalk/releases/latest';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubRelease {
  assets: GitHubAsset[];
}

interface DownloadUrlContextType {
  downloadUrl: string;
  loading: boolean;
  error: string | null;
}

const DownloadUrlContext = createContext<DownloadUrlContextType | undefined>(undefined);

interface ProviderProps { children: ReactNode; lazy?: boolean }
export const DownloadUrlProvider = ({ children, lazy = false }: ProviderProps) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(!lazy);
  const [error, setError] = useState<string | null>(null);

  // if lazy, delay the fetch until user explicitly requests (e.g., component becomes visible)
  useEffect(() => {
    if (lazy) return;
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch latest release from GitHub');
        }
        const data: GitHubRelease = await response.json();
        const apkAsset = data.assets.find((asset: GitHubAsset) => asset.name.endsWith('.apk'));
        if (apkAsset && apkAsset.browser_download_url) {
          setDownloadUrl(apkAsset.browser_download_url);
        } else {
          throw new Error('No .apk asset found in the latest release');
        }
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        if (process.env.NODE_ENV === 'development') {
          // Log detail only in dev to avoid noisy errors in production pages like Subscription
          console.warn('DownloadUrlProvider:', errorMessage)
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, []);

  return (
    <DownloadUrlContext.Provider value={{ downloadUrl, loading, error }}>
      {children}
    </DownloadUrlContext.Provider>
  );
};

export const useDownloadUrl = () => {
  const context = useContext(DownloadUrlContext);
  if (context === undefined) {
    throw new Error('useDownloadUrl must be used within a DownloadUrlProvider');
  }
  return context;
};
