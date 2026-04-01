import { University } from "@/data/universitiesData";
import { UniversityPreferences } from "@/components/UniversityPreferencesForm";
import { Lock, Calendar, MapPin, GraduationCap, Wallet, ExternalLink, Star, Clock, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UniversityLogo } from "@/components/UniversityLogo";

interface UniversityResultsProps {
  universities: University[];
  preferences: UniversityPreferences;
  isLocked: boolean;
  onUnlock?: () => void;
}

export function UniversityResults({ universities, preferences, isLocked, onUnlock }: UniversityResultsProps) {
  const upcomingDeadlines = universities.filter(uni => {
    const now = new Date();
    const deadline = new Date(uni.deadlineDate);
    const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil > 0 && daysUntil <= 90;
  });

  const countryFlags: Record<string, string> = {
    "Pakistan": "🇵🇰",
    "UK": "🇬🇧",
    "US": "🇺🇸",
    "Europe": "🇪🇺",
    "Middle East": "🇦🇪",
    "Canada": "🇨🇦",
    "Australia": "🇦🇺",
  };

  if (isLocked) {
    return (
      <div className="relative">
        {/* Blurred preview */}
        <div className="space-y-4 filter blur-sm pointer-events-none select-none">
          {universities.slice(0, 4).map((uni) => (
            <div
              key={uni.id}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <UniversityLogo
                    name={uni.name}
                    shortName={uni.shortName}
                    website={uni.website}
                    logo={uni.logo}
                    country={uni.country}
                    size={48}
                    className="rounded-xl shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground">{uni.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {uni.location}
                    </p>
                  </div>
                </div>
                {uni.ranking && (
                  <span className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {uni.ranking}
                  </span>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-coral mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Deadline</div>
                    <div className="text-muted-foreground">{uni.applicationDeadline}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Wallet className="w-4 h-4 text-teal mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Funding</div>
                    <div className="text-muted-foreground">{uni.fundingOptions[0]?.type}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <GraduationCap className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground">Min Grades</div>
                    <div className="text-muted-foreground">{uni.admissionRequirements.minGrades}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm rounded-2xl">
          <div className="text-center p-8 max-w-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-coral mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              {universities.length} Universities Match Your Profile
            </h3>
            <p className="text-muted-foreground mb-6">
              Unlock to see personalized university recommendations with deadlines, scholarships, and admission requirements.
            </p>
            <Button
              onClick={onUnlock}
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-coral hover:opacity-90"
            >
              <Star className="w-4 h-4" />
              Unlock Premium Access
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Get complete access to university matching, deadline tracking, and scholarship finder
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Urgent Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <div className="p-4 rounded-xl bg-coral/10 border border-coral/30">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-coral" />
            <h4 className="font-semibold text-foreground">Upcoming Deadlines</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {upcomingDeadlines.slice(0, 5).map((uni) => (
              <span
                key={uni.id}
                className="px-3 py-1.5 rounded-lg bg-coral/20 text-sm font-medium text-foreground"
              >
                {uni.name.split('(')[0].trim()} - {uni.applicationDeadline}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* University List */}
      <div className="space-y-4">
        {universities.map((uni, index) => (
          <UniversityCard key={uni.id} university={uni} rank={index + 1} />
        ))}
      </div>

      {universities.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No universities match your current preferences. Try adjusting your criteria.</p>
        </div>
      )}
    </div>
  );
}

function UniversityCard({ university: uni, rank }: { university: University; rank: number }) {
  const countryFlags: Record<string, string> = {
    "Pakistan": "🇵🇰",
    "UK": "🇬🇧",
    "US": "🇺🇸",
    "Europe": "🇪🇺",
    "Middle East": "🇦🇪",
    "Canada": "🇨🇦",
    "Australia": "🇦🇺",
  };

  const daysUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(uni.deadlineDate);
    return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = daysUntilDeadline();
  const isUrgent = days > 0 && days <= 30;
  const isPast = days < 0;

  return (
    <div className={cn(
      "p-6 rounded-2xl border bg-card transition-all hover:shadow-lg",
      isUrgent ? "border-coral/50" : "border-border"
    )}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
            {rank}
          </span>
          <UniversityLogo
            name={uni.name}
            shortName={uni.shortName}
            website={uni.website}
            logo={uni.logo}
            country={uni.country}
            size={48}
            className="rounded-xl shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xl">{countryFlags[uni.country]}</span>
              <h3 className="font-display font-bold text-lg text-foreground">{uni.name}</h3>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                uni.type === "Public" ? "bg-teal/20 text-teal" : "bg-lavender/20 text-lavender"
              )}>
                {uni.type}
              </span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {uni.location}
            </p>
          </div>
        </div>
        {uni.ranking && (
          <span className="px-3 py-1 rounded-full bg-amber/10 text-amber text-xs font-medium flex items-center gap-1 whitespace-nowrap">
            <Trophy className="w-3 h-3" />
            {uni.ranking}
          </span>
        )}
      </div>

      {/* Key Info Grid */}
      <div className="grid md:grid-cols-3 gap-4 mb-4 text-sm">
        <div className="flex items-start gap-2">
          <Calendar className={cn("w-4 h-4 mt-0.5", isUrgent ? "text-coral" : "text-muted-foreground")} />
          <div>
            <div className="font-medium text-foreground">Application Deadline</div>
            <div className={cn(isUrgent ? "text-coral font-semibold" : isPast ? "text-muted-foreground line-through" : "text-muted-foreground")}>
              {uni.applicationDeadline}
              {isUrgent && ` (${days} days left!)`}
              {isPast && " (Passed)"}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Wallet className="w-4 h-4 text-teal mt-0.5" />
          <div>
            <div className="font-medium text-foreground">Funding Available</div>
            <div className="text-muted-foreground">
              {uni.fundingOptions.map(f => f.type).join(", ")}
            </div>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <GraduationCap className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="font-medium text-foreground">Min Grades Required</div>
            <div className="text-muted-foreground">{uni.admissionRequirements.minGrades}</div>
          </div>
        </div>
      </div>

      {/* Scholarships */}
      {uni.scholarships.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-muted/50">
          <div className="text-sm font-medium text-foreground mb-2 flex items-center gap-1">
            <Star className="w-4 h-4 text-amber" />
            Scholarships
          </div>
          <div className="space-y-1">
            {uni.scholarships.slice(0, 2).map((sch, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium text-foreground">{sch.name}:</span>{" "}
                <span className="text-muted-foreground">{sch.coverage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Majors */}
      <div className="mb-4">
        <div className="text-sm font-medium text-foreground mb-2">Popular Programs</div>
        <div className="flex flex-wrap gap-1.5">
          {uni.majorsOffered.slice(0, 6).map((major) => (
            <span key={major} className="px-2 py-1 rounded-md bg-muted text-xs text-foreground">
              {major}
            </span>
          ))}
          {uni.majorsOffered.length > 6 && (
            <span className="px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
              +{uni.majorsOffered.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="text-sm text-muted-foreground mb-4">
        <span className="font-medium text-foreground">Requirements:</span>{" "}
        {uni.admissionRequirements.acceptedCurriculums.join(", ")}
        {uni.admissionRequirements.entranceTest && ` • ${uni.admissionRequirements.entranceTest}`}
      </div>

      {/* Action */}
      <a
        href={uni.website}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        Visit Website
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
