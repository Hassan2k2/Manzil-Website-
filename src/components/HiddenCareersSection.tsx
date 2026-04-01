import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  TrendingUp, 
  Globe, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  MapPin,
  GraduationCap,
  Lightbulb,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hiddenCareers, categoryLabels, type HiddenCareer, type MarketInfo } from "@/data/hiddenCareersData";
import { Button } from "@/components/ui/button";

interface HiddenCareersSectionProps {
  topRiasecCodes: string[];
}

const countryFlags: Record<string, string> = {
  Pakistan: "🇵🇰",
  US: "🇺🇸",
  UK: "🇬🇧",
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Dubai: "🇦🇪",
  Germany: "🇩🇪",
  Singapore: "🇸🇬",
};

const demandColors: Record<string, string> = {
  High: "bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30",
  Growing: "bg-teal/20 text-teal border-teal/30",
  Emerging: "bg-amber/20 text-amber border-amber/30",
  Moderate: "bg-muted text-muted-foreground border-border",
};

function MarketCard({ info }: { info: MarketInfo }) {
  return (
    <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{countryFlags[info.country]}</span>
          <span className="font-semibold text-foreground">{info.country}</span>
        </div>
        <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full border", demandColors[info.demandLevel])}>
          {info.demandLevel} Demand
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Salary Range</span>
          <span className="font-semibold text-foreground">{info.salaryRange}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Growth Rate</span>
          <span className="font-semibold text-green-600 dark:text-green-400">{info.growthPercent}</span>
        </div>
        <div className="pt-2 border-t border-border">
          <p className="text-muted-foreground text-xs">{info.opportunities}</p>
        </div>
      </div>
    </div>
  );
}

function HiddenCareerCard({ career }: { career: HiddenCareer }) {
  const [expanded, setExpanded] = useState(false);
  const category = categoryLabels[career.category];
  
  const categoryColorClasses: Record<string, string> = {
    "tech-ai": "from-teal/10 to-cyan-500/10 border-teal/30",
    "green-sustainability": "from-green-500/10 to-emerald-500/10 border-green-500/30",
    "creative-design": "from-coral/10 to-pink-500/10 border-coral/30",
    "policy-social": "from-amber/10 to-orange-500/10 border-amber/30",
  };
  
  const badgeColorClasses: Record<string, string> = {
    "tech-ai": "bg-teal/20 text-teal border-teal/30",
    "green-sustainability": "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    "creative-design": "bg-coral/20 text-coral border-coral/30",
    "policy-social": "bg-amber/20 text-amber border-amber/30",
  };

  return (
    <motion.div 
      layout
      className={cn(
        "rounded-2xl border bg-gradient-to-br overflow-hidden",
        categoryColorClasses[career.category]
      )}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={cn("px-2 py-0.5 text-xs font-medium rounded-full border", badgeColorClasses[career.category])}>
                {category.emoji} {category.label}
              </span>
            </div>
            <h3 className="font-display font-bold text-xl text-foreground">{career.name}</h3>
            <p className="text-muted-foreground italic mt-1">{career.tagline}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground mb-4">{career.description}</p>

        {/* Why Hidden Badge */}
        <div className="p-3 rounded-lg bg-amber/10 border border-amber/20 mb-4">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-semibold text-amber uppercase">Why it's hidden</span>
              <p className="text-sm text-foreground mt-0.5">{career.whyHidden}</p>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">Key Skills</h4>
          <div className="flex flex-wrap gap-2">
            {career.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Entry Paths */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            How to Get Started
          </h4>
          <ul className="space-y-1">
            {career.entryPaths.map((path, i) => (
              <li key={i} className="text-sm text-foreground flex items-start gap-2">
                <span className="text-primary">→</span>
                {path}
              </li>
            ))}
          </ul>
        </div>

        {/* Expand/Collapse for Market Info */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          <Globe className="w-4 h-4" />
          {expanded ? "Hide market details" : "View job market by country"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Market Info Grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <div className="grid sm:grid-cols-2 gap-3">
                {career.marketInfo.map((info) => (
                  <MarketCard key={info.country} info={info} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HiddenCareersSection({ topRiasecCodes }: HiddenCareersSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const categories = Object.entries(categoryLabels);
  
  const filteredCareers = activeCategory 
    ? hiddenCareers.filter(c => c.category === activeCategory)
    : hiddenCareers;

  const displayedCareers = showAll ? filteredCareers : filteredCareers.slice(0, 4);

  return (
    <section className="relative">

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className="rounded-full"
        >
          All Careers
        </Button>
        {categories.map(([key, { label, emoji }]) => (
          <Button
            key={key}
            variant={activeCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(key)}
            className="rounded-full"
          >
            {emoji} {label}
          </Button>
        ))}
      </div>

      {/* Career Cards */}
      <div className="grid gap-6">
        {displayedCareers.map((career) => (
          <HiddenCareerCard key={career.id} career={career} />
        ))}
      </div>

      {/* Show More/Less */}
      {filteredCareers.length > 4 && (
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            onClick={() => setShowAll(!showAll)}
            className="gap-2"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show All {filteredCareers.length} Careers <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-coral/10 border border-primary/20 text-center">
        <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
        <h3 className="font-display font-bold text-lg text-foreground mb-2">
          Want to explore these paths?
        </h3>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto">
          These emerging fields offer exciting opportunities both in Pakistan and globally. 
          Research entry requirements and start building relevant skills today!
        </p>
      </div>
    </section>
  );
}
