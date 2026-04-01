import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MajorResult, RiasecScores, BigFiveScores } from "@/hooks/useAssessment";
import { useAIMajorScoring } from "@/hooks/useAIMajorScoring";
import { toast } from "sonner";
import { majors } from "@/data/careersData";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalPathwaysModule } from "@/components/GlobalPathways";
import {
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Trophy,
  RefreshCw,
  Sparkles,
  Lightbulb,
  Gift,
  Star,
  Building2,
  Briefcase,
} from "lucide-react";
import { useMemo, useState } from "react";

interface ResultsScreenProps {
  majorResults: MajorResult[];
  riasecScores: RiasecScores;
  topRiasecCodes: string[];
  higherOrderScores: Record<string, number>;
  bigFiveScores: BigFiveScores;
  onRestart: () => void;
  onUniversityFinder?: () => void;
}

export function ResultsScreen({
  majorResults,
  riasecScores,
  topRiasecCodes,
  higherOrderScores,
  bigFiveScores,
  onRestart,
  onUniversityFinder,
}: ResultsScreenProps) {
  const [expandedMajor, setExpandedMajor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"results" | "universities">("results");

  // AI scoring for majors (disabled if AI credits are unavailable)
  const { aiMajorScores } = useAIMajorScoring({
    topRiasecCodes,
    riasecScores,
    higherOrderScores,
    bigFiveScores,
    enabled: false,
  });

  const finalMajorResults = useMemo<MajorResult[]>(() => {
    if (!aiMajorScores) return majorResults;

    const merged = majorResults.map((m) => {
      const s = aiMajorScores[m.id];
      return s ? { ...m, score: Math.round(s.score) } : m;
    });

    const sorted = merged.slice().sort((a, b) => b.score - a.score);
    return sorted.map((m, index) => ({
      ...m,
      fitType: index < 5 ? ("top" as const) : index < 10 ? ("good" as const) : ("not-fit" as const),
    }));
  }, [majorResults, aiMajorScores]);

  const topMajors = useMemo(() => finalMajorResults.filter((m) => m.fitType === "top").slice(0, 5), [finalMajorResults]);
  const goodMajors = useMemo(() => finalMajorResults.filter((m) => m.fitType === "good").slice(0, 5), [finalMajorResults]);
  const notFitMajors = useMemo(() => finalMajorResults.filter((m) => m.fitType === "not-fit").slice(0, 5), [finalMajorResults]);

  const suggestedMajors = useMemo(() => {
    return topMajors.map(m => m.name);
  }, [topMajors]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 mb-6 animate-bounce-gentle">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Here Are Your Final Results! 🎉
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Based on your interests, values, and personality — here's what fits YOU best.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab("results")}
              className={cn(
                "px-6 py-2.5 rounded-full font-medium transition-all",
                activeTab === "results"
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
              )}
            >
              Major Results
            </button>
            <button
              onClick={onUniversityFinder}
              className="px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            >
              <Building2 className="w-4 h-4" />
              Find Universities
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Top 5 Majors */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🔥</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Top 5 Majors (Strongest Fit)</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-12">
            These degrees fit how you think, what you care about, and how you work with people.
          </p>
          
          <div className="space-y-6">
            {topMajors.map((major, i) => {
              const majorData = majors.find(m => m.id === major.id);
              return (
                <DetailedMajorCard 
                  key={major.id} 
                  major={major}
                  majorData={majorData}
                  rank={i + 1}
                  expanded={expandedMajor === major.id}
                  onToggle={() => setExpandedMajor(expandedMajor === major.id ? null : major.id)}
                  variant="top"
                />
              );
            })}
          </div>
        </section>

        {/* Good Fit Majors */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⭐</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Good Fit Majors (Still Strong)</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-12">
            These match you well — just not as tightly as the top five.
          </p>
          
          <div className="space-y-6">
            {goodMajors.map((major, i) => {
              const majorData = majors.find(m => m.id === major.id);
              return (
                <GoodFitMajorCard 
                  key={major.id} 
                  major={major}
                  majorData={majorData}
                  rank={i + 6}
                />
              );
            })}
          </div>
        </section>

        {/* Not a Fit Majors */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🚫</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">Majors That Are NOT a Good Fit</h2>
          </div>
          <p className="text-muted-foreground mb-8 ml-12">
            These don't align well with your profile — choosing them may feel frustrating over time.
          </p>
          
          <div className="space-y-4">
            {notFitMajors.map((major) => {
              const majorData = majors.find(m => m.id === major.id);
              // Use personalized mismatch reasons, fallback to static whyNot if empty
              const reasons = major.mismatchReasons && major.mismatchReasons.length > 0 
                ? major.mismatchReasons 
                : majorData?.whyNot?.slice(0, 3) || [];
              return (
                <div 
                  key={major.id}
                  className="p-5 rounded-xl bg-muted/50 border border-border"
                >
                  <div className="flex items-start gap-3">
                    <X className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-bold text-lg text-foreground">{major.name}</h4>
                      <p className="text-sm font-medium text-muted-foreground mt-1 mb-2">Why this might not suit you:</p>
                      <ul className="space-y-1">
                        {reasons.map((reason, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-muted-foreground">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* Restart */}
        <section className="text-center py-8">
          <Button variant="outline" size="lg" onClick={onRestart} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Take Assessment Again
          </Button>
        </section>
      </div>
    </div>
  );
}

function DetailedMajorCard({ 
  major, 
  majorData,
  rank,
  expanded,
  onToggle,
  variant
}: { 
  major: MajorResult;
  majorData?: typeof majors[0];
  rank: number;
  expanded: boolean;
  onToggle: () => void;
  variant: "top" | "good";
}) {
  const rankEmojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"];
  
  return (
    <div className="rounded-2xl border border-coral/30 bg-gradient-to-br from-coral/5 to-amber/5 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-2xl mr-2">{rankEmojis[rank - 1]}</span>
            <span className="font-display font-bold text-2xl text-foreground">{major.name}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Overall Fit Score</div>
            <div className="text-2xl font-bold text-coral">{major.score} / 100</div>
          </div>
        </div>

        {/* Why this fits you */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-coral" />
            Why this fits you:
          </h4>
          <ul className="space-y-2 ml-7">
            {majorData?.whyFits?.map((reason, i) => (
              <li key={i} className="text-foreground flex items-start gap-2">
                <Check className="w-4 h-4 text-coral flex-shrink-0 mt-1" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* What this major gives you */}
        <div className="mb-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Gift className="w-5 h-5 text-teal" />
            What this major gives you:
          </h4>
          <ul className="space-y-2 ml-7">
            {majorData?.whatGives?.map((item, i) => (
              <li key={i} className="text-foreground flex items-start gap-2">
                <Star className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Why you won't find it boring */}
        <div className="p-4 rounded-xl bg-amber/10 border border-amber/30">
          <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber" />
            Why you won't find it boring:
          </h4>
          <p className="text-foreground ml-7">{majorData?.whyNotBoring}</p>
        </div>

        {/* Expand for more */}
        <button
          onClick={onToggle}
          className="mt-4 flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? "Show less" : "View skills & careers"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="px-6 pb-6 pt-0 border-t border-border/50 mt-2">
          <div className="pt-4 grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Skills You'll Develop</h4>
              <div className="flex flex-wrap gap-2">
                {major.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Related Careers</h4>
              <div className="flex flex-wrap gap-2">
                {major.careers.map((career) => (
                  <span key={career} className="px-3 py-1 bg-muted rounded-full text-sm text-foreground">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GoodFitMajorCard({ 
  major, 
  majorData,
  rank,
}: { 
  major: MajorResult;
  majorData?: typeof majors[0];
  rank: number;
}) {
  const [showCareers, setShowCareers] = useState(false);

  return (
    <div className="rounded-2xl border border-teal/30 bg-gradient-to-br from-teal/5 to-lavender/5 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-teal text-secondary-foreground flex items-center justify-center text-lg font-bold">
              {rank}
            </span>
            <h4 className="font-display font-bold text-xl text-foreground">{major.name}</h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal text-secondary-foreground text-sm font-bold">
            {major.score}/100
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Good fit because:</p>
            <ul className="space-y-1">
              {majorData?.whyFits?.slice(0, 2).map((reason, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Why it's slightly lower:</p>
            <ul className="space-y-1">
              {majorData?.whyNot?.slice(0, 2).map((reason, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Career Paths Toggle */}
        {major.careers && major.careers.length > 0 && (
          <button
            onClick={() => setShowCareers(!showCareers)}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            {showCareers ? "Hide career paths" : "View career paths"}
            {showCareers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Expanded Career Paths */}
      <AnimatePresence>
        {showCareers && major.careers && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-teal/20">
              <div className="flex flex-wrap gap-2">
                {major.careers.map((career) => (
                  <span key={career} className="px-3 py-1.5 bg-teal/10 text-teal rounded-full text-sm font-medium">
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
