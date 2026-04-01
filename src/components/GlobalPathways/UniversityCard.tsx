import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ScoredUniversity } from "@/lib/universityMatcher";
import { 
  MapPin, Calendar, ExternalLink, DollarSign, GraduationCap, ChevronRight, Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UniversityLogo } from "@/components/UniversityLogo";

interface UniversityCardProps {
  scoredUniversity: ScoredUniversity;
  rank: number;
}

const countryFlags: Record<string, string> = {
  "Pakistan": "🇵🇰",
  "UK": "🇬🇧",
  "US": "🇺🇸",
  "Canada": "🇨🇦",
};

export function UniversityCard({ scoredUniversity, rank }: UniversityCardProps) {
  const navigate = useNavigate();
  const { university: uni, matchReasons, fundingMatch } = scoredUniversity;

  const daysUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(uni.deadlineDate);
    return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = daysUntilDeadline();
  const isUrgent = days > 0 && days <= 60;
  const isPast = days < 0;

  // Get relevant programs matching user's majors
  const relevantPrograms = matchReasons
    .filter(r => r.startsWith("Offers:"))
    .map(r => r.replace("Offers: ", ""))
    .join(", ");

  // Get tuition for relevant programs or first available
  const getDisplayTuition = () => {
    if (!uni.tuitionFees || uni.tuitionFees.length === 0) {
      return null;
    }
    // Try to find a matching program
    const relevantProgramsList = relevantPrograms.split(", ").filter(p => p);
    for (const program of relevantProgramsList) {
      const match = uni.tuitionFees.find(t => 
        t.program.toLowerCase().includes(program.toLowerCase()) ||
        program.toLowerCase().includes(t.program.toLowerCase())
      );
      if (match) return match;
    }
    // Return first available
    return uni.tuitionFees[0];
  };

  const displayTuition = getDisplayTuition();

  const handleCardClick = () => {
    sessionStorage.setItem(`university-${uni.id}`, JSON.stringify(scoredUniversity));
    navigate(`/university/${uni.id}`);
  };

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(uni.website, "_blank");
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="rounded-2xl border bg-card overflow-hidden transition-all border-border hover:shadow-lg hover:border-primary/30 cursor-pointer group"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <UniversityLogo
              name={uni.name}
              shortName={uni.shortName}
              website={uni.website}
              logo={uni.logo}
              country={uni.country}
              size={40}
              className="rounded-lg shrink-0"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {uni.shortName || uni.name}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{uni.location.split(",")[0]}</span>
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          {/* Deadline */}
          <div className="p-2.5 rounded-lg bg-muted/50">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Calendar className={cn("w-3.5 h-3.5", isUrgent ? "text-coral" : "text-muted-foreground")} />
              <span className="text-xs text-muted-foreground">Deadline</span>
            </div>
            <div className={cn(
              "font-medium",
              isUrgent ? "text-coral" : isPast ? "text-muted-foreground line-through" : "text-foreground"
            )}>
              {isUrgent ? `${days} days left` : isPast ? "Passed" : uni.applicationDeadline.split(",")[0]}
            </div>
          </div>

          {/* Acceptance Rate */}
          <div className="p-2.5 rounded-lg bg-muted/50">
            <div className="flex items-center gap-1.5 mb-0.5">
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Acceptance</span>
            </div>
            <div className="font-medium text-foreground">
              {uni.acceptanceRate}
            </div>
          </div>

          {/* Tuition Fee */}
          <div className="p-2.5 rounded-lg bg-muted/50">
            <div className="flex items-center gap-1.5 mb-0.5">
              <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tuition</span>
            </div>
            <div className="font-medium text-foreground text-xs">
              {displayTuition ? displayTuition.localFee : "See details"}
            </div>
          </div>

          {/* Website */}
          <button
            onClick={handleWebsiteClick}
            className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-left"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">Website</span>
            </div>
            <div className="font-medium text-primary text-sm">
              Visit →
            </div>
          </button>
        </div>

        {/* Relevant Programs */}
        {relevantPrograms && (
          <div className="mb-3">
            <div className="text-xs text-muted-foreground mb-1.5">Relevant Programs</div>
            <div className="flex flex-wrap gap-1.5">
              {relevantPrograms.split(", ").map((program, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-md bg-teal/10 text-teal text-xs font-medium"
                >
                  {program}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scholarships Preview */}
        {uni.scholarships.length > 0 && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-amber/5 border border-amber/20">
            <Award className="w-4 h-4 text-amber shrink-0" />
            <span className="text-xs text-foreground">
              <span className="font-semibold text-amber">{uni.scholarships.length}</span> scholarship{uni.scholarships.length > 1 ? "s" : ""} available
            </span>
          </div>
        )}

        {/* View Details CTA */}
        <div className="pt-3 mt-3 border-t border-border/50">
          <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors text-center">
            Click to view full details & scholarships
          </div>
        </div>
      </div>
    </motion.div>
  );
}
