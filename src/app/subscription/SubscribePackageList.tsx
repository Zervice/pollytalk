"use client";

import { useEffect, useState } from "react";
import { paymentApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n-context";

interface Package {
  id: number;
  name: string;
  salePrice: number;
  originalPrice: number;
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
        const list = await paymentApi.getPackages("subscribe", "web");
        // If onSales flag isn't reliable, just take all subscribe packages
        setPkgs(list);
      } catch (err: any) {
        setError(err?.message || "Failed to load packages");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSubscribe = async (pkg: Package) => {
    try {
      const { url } = await paymentApi.createSubscriptionSession(pkg.id);
      window.location.href = url;
    } catch (err: any) {
      alert(err?.message || "Failed to create checkout session");
    }
  };

  if (loading) return <div className="h-10" />;
  if (error) return <p className="text-destructive text-sm">{error}</p>;
  if (!pkgs.length) return <p className="text-muted-foreground text-sm">No subscription plans are currently available.</p>;

  const subscribeNowLabelRaw = t("subscription.subscribeNow");
  const subscribeNowLabel = subscribeNowLabelRaw === "subscription.subscribeNow" ? "Subscribe Now" : subscribeNowLabelRaw;

  return (
    <div className="flex flex-col items-center gap-6">
      {pkgs.map((p) => (
        <div
          key={p.id}
          className="w-full max-w-md border border-border rounded-lg p-6 flex flex-col items-center"
        >
          <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
          <p className="text-foreground text-2xl font-bold mb-4">
            ${(p.salePrice / 100).toFixed(2)} / {p.subscribe?.unit || "month"}
          </p>
          <Button onClick={() => handleSubscribe(p)}>{subscribeNowLabel}</Button>
        </div>
      ))}
    </div>
  );
}
