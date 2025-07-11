"use client";

import { useEffect, useState } from "react";
import { paymentApi, API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n-context";

interface Package {
  id: number | string;
  name: string;
  salePrice: number | string;
  originalPrice: number | string;
  properties?: { description?: string };
  description?: string; // optional flat field
  subscribe?: { studyHours: number; validityPeriod: number; unit: string } | null;
}

export default function SubscribePackageList() {
  const { t } = useI18n();
  const [pkgs, setPkgs] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await paymentApi.getPackages("subscribe", "web");
        const list = raw as Package[];
        setPkgs(list);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load packages");
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Determine recommended package (middle price) once packages are fetched
  const recommendedId = pkgs.length
    ? [...pkgs]
        .sort((a, b) => Number(a.salePrice) - Number(b.salePrice))[Math.floor(pkgs.length / 2)]?.id
    : null;

  const handleSubscribe = (pkg: Package) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('Please sign in first');
      return;
    }
    // Build a form to POST so that browser handles the 302 redirect properly
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${API_BASE_URL}/web/payment/subscription`;
    form.style.display = 'none';

    const idInput = document.createElement('input');
    idInput.name = 'id';
    idInput.value = String(pkg.id);
    form.appendChild(idInput);

    const tokenInput = document.createElement('input');
    tokenInput.name = 'token';
    tokenInput.value = token;
    form.appendChild(tokenInput);

    document.body.appendChild(form);
    form.submit();
  };

  if (loading) return <div className="h-10" />;
  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!pkgs.length) return <p className="text-muted-foreground text-sm">No subscription plans are currently available.</p>;

  const subscribeNowLabelRaw = t("subscription.subscribeNow");
  const subscribeNowLabel = subscribeNowLabelRaw === "subscription.subscribeNow" ? "Subscribe Now" : subscribeNowLabelRaw;

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      {pkgs.map((p) => (
        <div
          key={p.id}
          className={`border rounded-lg p-6 flex flex-col items-center text-center transition-shadow ${
            p.id === recommendedId || p.name.toLowerCase() === 'aggressive'
              ? 'border-primary ring-2 ring-primary shadow-lg'
              : 'border-border'
          }`}
        >
          {(p.id === recommendedId || p.name.toLowerCase() === 'aggressive') && (
            <span className="mb-2 inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">Recommended</span>
          )}
          <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
          <p className="text-muted-foreground text-sm mb-1">
            {(p.subscribe?.studyHours ?? 0) <= 0 ? 'Unlimited' : `${p.subscribe?.studyHours} hours`} • {p.subscribe?.validityPeriod ?? '?'} {p.subscribe?.unit || 'month'}{p.subscribe?.validityPeriod === 1 ? '' : 's'}
          </p>
          {(p.properties?.description || p.description) && (
            <p className="text-muted-foreground text-xs mb-2 whitespace-pre-line min-h-[5rem]">{p.properties?.description || p.description}</p>
          )}
          <div className="flex items-center gap-2 mb-4">
            {Number(p.originalPrice) !== Number(p.salePrice) && (
              <span className="text-muted-foreground text-sm line-through">${(Number(p.originalPrice) / 100).toFixed(2)}</span>
            )}
            <span className="text-foreground text-xl font-bold">${(Number(p.salePrice) / 100).toFixed(2)}</span>
          </div>
          <Button size="sm" onClick={() => handleSubscribe(p)}>{subscribeNowLabel}</Button>
        </div>
      ))}
    </div>
  );
}
