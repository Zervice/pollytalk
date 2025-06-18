'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const GITHUB_API_URL = 'https://api.github.com/repos/Zervice/pollytalk/releases/latest';

interface DownloadUrlContextType {
  downloadUrl: string;
  loading: boolean;
  error: string | null;
}

const DownloadUrlContext = createContext<DownloadUrlContextType | undefined>(undefined);

export const DownloadUrlProvider = ({ children }: { children: ReactNode }) => {
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch latest release from GitHub');
        }
        const data = await response.json();
        const apkAsset = data.assets.find((asset: any) => asset.name.endsWith('.apk'));
        if (apkAsset && apkAsset.browser_download_url) {
          setDownloadUrl(apkAsset.browser_download_url);
        } else {
          throw new Error('No .apk asset found in the latest release');
        }
      } catch (e: any) {
        console.error(e);
        setError(e.message);
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
