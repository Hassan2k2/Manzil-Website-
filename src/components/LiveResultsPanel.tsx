import { cn } from "@/lib/utils";
import { riasecLabels } from "@/data/quizData";
import type { RiasecScores, BigFiveScores, MajorResult } from "@/hooks/useAssessment";
import { GraduationCap, TrendingUp } from "lucide-react";

interface LiveResultsPanelProps {
  riasecScores: RiasecScores;
  bigFiveScores: BigFiveScores;
  higherOrderScores: Record<string, number>;
  majorResults: MajorResult[];
  showMajors: boolean;
}

export function LiveResultsPanel({
  riasecScores,
  bigFiveScores,
  higherOrderScores,
  majorResults,
  showMajors,
}: LiveResultsPanelProps) {
  const topMajors = majorResults.slice(0, 3);
  
  return (
    <div className="hidden xl:block w-80 p-6 bg-muted/30 border-l border-border h-screen sticky top-0 overflow-y-auto">
      <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-coral" />
        Live Results
      </h3>

      {/* RIASEC Chart */}
      <div className="mb-6 p-4 bg-card rounded-xl border border-border">
        <h4 className="text-sm font-semibold text-muted-foreground mb-4">Interest Profile</h4>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(riasecScores) as (keyof RiasecScores)[]).map((code) => {
            const score = riasecScores[code];
            const maxScore = 40;
            const percentage = Math.min((score / maxScore) * 100, 100);
            const label = riasecLabels[code];
            
            const colorMap: Record<string, string> = {
              R: "bg-coral",
              I: "bg-teal",
              A: "bg-lavender",
              S: "bg-mint",
              E: "bg-amber",
              C: "bg-sky",
            };
            
            return (
              <div key={code} className="text-center">
                <div className="relative w-12 h-12 mx-auto mb-1">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      className="text-muted"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      strokeWidth="4"
                      strokeDasharray={`${(percentage / 100) * 126} 126`}
                      strokeLinecap="round"
                      className={cn(colorMap[code], "stroke-current")}
                      style={{
                        stroke: `hsl(var(--${label?.color}))`,
                      }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {code}
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground leading-tight block">
                  {label?.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Higher Order Values */}
      {Object.keys(higherOrderScores).some(k => higherOrderScores[k] > 0) && (
        <div className="mb-6 p-4 bg-card rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Core Values</h4>
          <div className="space-y-3">
            {Object.entries(higherOrderScores)
              .sort(([, a], [, b]) => b - a)
              .map(([value, score]) => {
                const maxScore = 15 * 3; // Approximate max
                const percentage = Math.min((score / maxScore) * 100, 100);
                
                return (
                  <div key={value}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{value}</span>
                      <span className="text-muted-foreground">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-teal transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Big Five */}
      {Object.values(bigFiveScores).some(v => v > 0) && (
        <div className="mb-6 p-4 bg-card rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4">Personality Traits</h4>
          <div className="space-y-3">
            {(Object.entries(bigFiveScores) as [keyof BigFiveScores, number][]).map(([trait, score]) => (
              <div key={trait}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-foreground">{trait}</span>
                  <span className="text-muted-foreground">{score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber transition-all duration-500"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Majors Preview */}
      {showMajors && topMajors.length > 0 && (
        <div className="p-4 bg-card rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Top Major Matches
          </h4>
          <div className="space-y-3">
            {topMajors.map((major, index) => (
              <div 
                key={major.id}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-300",
                  index === 0 && "bg-coral/10 border-coral/30",
                  index === 1 && "bg-teal/10 border-teal/30",
                  index === 2 && "bg-amber/10 border-amber/30"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground leading-tight block">
                      {major.name}
                    </span>
                  </div>
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded-full",
                    index === 0 && "bg-coral text-primary-foreground",
                    index === 1 && "bg-teal text-secondary-foreground",
                    index === 2 && "bg-amber text-accent-foreground"
                  )}>
                    {major.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
