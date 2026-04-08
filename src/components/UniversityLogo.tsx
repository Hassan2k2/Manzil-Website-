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

const DEFAULT_SIZE = 64;
const DEFAULT_WIDTH = 88;

// Removed countryFlags as Windows fails to render them, showing 'PK' instead

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
  // width can be dynamically customized, otherwise default to a landscape format
  const w = DEFAULT_WIDTH;
  const h = size;
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

  const fallbackText = (shortName?.trim() || name.trim() || "U").slice(0, 2).toUpperCase();

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden flex items-center justify-center shrink-0 bg-white dark:bg-slate-800 border shadow-sm",
        className
      )}
      style={{ width: w, height: h, minWidth: w, minHeight: h }}
      aria-label={`${name} logo`}
    >
      {!src && (
        <span className="text-xl font-bold tracking-wider text-muted-foreground">{fallbackText}</span>
      )}

      {src && (
        <img
          key={src}
          src={src}
          alt={`${name} logo`}
          className={cn("w-full h-full object-contain scale-[1.15]", imgClassName)}
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
