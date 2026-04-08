import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type UniversityLogoProps = {
  name: string;
  shortName?: string;
  website?: string;
  logo?: string;
  country?: string;
  size?: number;
  className?: string;
  imgClassName?: string;
};

const DEFAULT_SIZE = 56;

const countryFlags: Record<string, string> = {
  Pakistan: "🇵🇰",
  UK: "🇬🇧",
  US: "🇺🇸",
  Canada: "🇨🇦",
  Europe: "🇪🇺",
  "Middle East": "🇦🇪",
  Australia: "🇦🇺",
};

function getDomainFromUrl(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

// Favicon service removed to prevent Google logos from displaying for fallback search URLs.

function buildClearbitUrl(domain: string) {
  return `https://logo.clearbit.com/${domain}`;
}

export function UniversityLogo({
  name,
  shortName,
  website,
  logo,
  country,
  size = DEFAULT_SIZE,
  className,
  imgClassName,
}: UniversityLogoProps) {
  const domain = useMemo(() => getDomainFromUrl(website), [website]);

  const sources = useMemo(() => {
    const srcs: string[] = [];
    if (logo) srcs.push(logo);
    if (domain && !domain.includes("google.com")) {
      const clearbit = buildClearbitUrl(domain);
      if (!srcs.includes(clearbit)) srcs.push(clearbit);
    }
    // De-dupe
    return Array.from(new Set(srcs));
  }, [logo, domain]);

  const [srcIndex, setSrcIndex] = useState(0);
  const src = sources[srcIndex] ?? null;

  // If the university changes (or its logo sources change), restart the load sequence.
  useEffect(() => {
    setSrcIndex(0);
  }, [logo, domain]);

  const fallbackText = (shortName?.trim()?.[0] || name.trim()?.[0] || "U").toUpperCase();
  const flag = country ? countryFlags[country] : undefined;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-white shrink-0",
        "flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      aria-label={`${name} logo`}
    >
      {/* Fallback only shown when no image loads */}
      {!src && (
        <span className="text-lg font-bold text-gray-500">{flag ?? fallbackText}</span>
      )}

      {src && (
        <img
          key={src}
          src={src}
          alt={`${name} logo`}
          className={cn("w-full h-full object-contain p-1.5", imgClassName)}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => {
            // Advance to the next source; if none remain, remove the <img> entirely.
            setSrcIndex((i) => (i + 1 <= sources.length ? i + 1 : i));
          }}
        />
      )}
    </div>
  );
}
