import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, MapPin, Calendar, ExternalLink, Trophy, 
  DollarSign, FileText, GraduationCap, Building2, Users, 
  CheckCircle2, Globe, Clock, Award, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScoredUniversity } from "@/lib/universityMatcher";
import { universities, University } from "@/data/universitiesData";
import { cn } from "@/lib/utils";
import { UniversityLogo } from "@/components/UniversityLogo";

export default function UniversityDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [scoredUniversity, setScoredUniversity] = useState<ScoredUniversity | null>(null);
  const [university, setUniversity] = useState<University | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem(`university-${id}`);
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        // Handle both ScoredUniversity format ({ university: University }) 
        // and direct University format
        if (parsed.university) {
          setUniversity(parsed.university);
          // Only treat it as a ScoredUniversity if it actually contains scoring fields.
          if (
            typeof parsed.score === "number" &&
            typeof parsed.tier === "string" &&
            Array.isArray(parsed.matchReasons)
          ) {
            setScoredUniversity(parsed as ScoredUniversity);
          } else {
            setScoredUniversity(null);
          }
          return; // Exit early since we found the data
        } else if (parsed.id && parsed.name) {
          // It's a direct University object
          setUniversity(parsed as University);
          setScoredUniversity(null);
          return; // Exit early since we found the data
        }
      } catch (e) {
        console.error("Failed to parse university data from sessionStorage:", e);
      }
    }
    
    // Fallback: check static data
    const found = universities.find(u => u.id === id);
    if (found) {
      setUniversity(found);
    }
  }, [id]);

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">University not found</h2>
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const daysUntilDeadline = () => {
    const now = new Date();
    // Note: deadlineDate may be a Date in static data, but becomes a string after JSON serialization.
    // Also, some generated universities may not have a real deadline date.
    const deadline = university.deadlineDate ? new Date(university.deadlineDate as any) : null;
    if (!deadline || Number.isNaN(deadline.getTime())) return Infinity;
    return Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const days = daysUntilDeadline();
  const isUrgent = Number.isFinite(days) && days > 0 && days <= 60;
  const isPast = Number.isFinite(days) && days < 0;

  const scholarships = university.scholarships ?? [];
  const fundingOptions = university.fundingOptions ?? [];
  const majorsOffered = university.majorsOffered ?? [];
  const applicationDeadline = university.applicationDeadline ?? "Check website";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">
                {university.shortName || university.name}
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {university.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 mb-6">
            <UniversityLogo
              name={university.name}
              shortName={university.shortName}
              website={university.website}
              logo={university.logo}
              country={university.country}
              size={64}
              className="rounded-2xl"
            />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                {university.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium text-foreground">
                  {university.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium text-foreground">
                  {university.selectivity}
                </span>
                {university.ranking && (
                  <span className="px-3 py-1 rounded-full bg-amber/10 text-amber text-sm font-medium flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {university.ranking}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className={cn("w-5 h-5", isUrgent ? "text-coral" : "text-muted-foreground")} />
                <span className="text-sm text-muted-foreground">Deadline</span>
              </div>
              <div className={cn(
                "font-bold text-lg",
                isUrgent ? "text-coral" : isPast ? "text-muted-foreground" : "text-foreground"
              )}>
                {isUrgent ? `${days} days left` : isPast ? "Passed" : applicationDeadline.split(",")[0]}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Acceptance</span>
              </div>
              <div className="font-bold text-lg text-foreground">
                {university.acceptanceRate}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5 text-amber" />
                <span className="text-sm text-muted-foreground">Scholarships</span>
              </div>
              <div className="font-bold text-lg text-amber">
                {scholarships.length} Available
              </div>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Int'l Students</span>
              </div>
              <div className="font-bold text-lg text-foreground">
                {university.internationalFriendly ? "Welcome" : "Limited"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Match Reasons */}
        {scoredUniversity?.matchReasons?.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-6 rounded-2xl bg-teal/5 border border-teal/20"
          >
            <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal" />
              Why This is a Match for You
            </h2>
            <ul className="space-y-2">
              {scoredUniversity.matchReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground">
                  <span className="text-teal mt-1">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {/* SPECIAL SCHOLARSHIP & AID CARD */}
        {scholarships.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-8"
          >
            <div className="p-1 rounded-3xl bg-gradient-to-r from-amber via-coral to-amber">
              <div className="p-6 rounded-[22px] bg-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber to-coral flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-2xl text-foreground">
                      Scholarships & Financial Aid
                    </h2>
                    <p className="text-muted-foreground">
                        {scholarships.length} scholarship{scholarships.length > 1 ? "s" : ""} available at {university.shortName || university.name}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {scholarships.map((sch, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-xl bg-gradient-to-r from-amber/5 to-coral/5 border border-amber/20"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber" />
                          <h3 className="font-semibold text-foreground text-lg">{sch.name}</h3>
                        </div>
                        <span className="px-4 py-1.5 rounded-full bg-teal text-primary-foreground text-sm font-bold whitespace-nowrap">
                          {sch.coverage}
                        </span>
                      </div>
                      <p className="text-muted-foreground ml-7 mb-2">{sch.eligibility}</p>
                      {sch.deadline && (
                        <div className="flex items-center gap-1.5 ml-7 text-sm text-coral font-medium mb-3">
                          <Clock className="w-4 h-4" />
                          Deadline: {sch.deadline}
                        </div>
                      )}
                      {sch.applyLink && (
                        <a
                          href={sch.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-7 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber text-accent-foreground text-sm font-semibold hover:bg-amber/80 transition-colors"
                        >
                          Apply for Scholarship
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Funding Options */}
                {fundingOptions.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal" />
                      Other Funding Options
                    </h3>
                    <div className="grid gap-2">
                      {fundingOptions.map((fund, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <div className="font-medium text-foreground text-sm">{fund.type}</div>
                            <div className="text-xs text-muted-foreground">{fund.description}</div>
                          </div>
                          {fund.amount && (
                            <span className="text-sm font-semibold text-teal">{fund.amount}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tuition Fees by Program */}
        {university.tuitionFees && university.tuitionFees.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 p-6 rounded-2xl bg-card border border-border"
          >
            <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Tuition Fees by Program
            </h2>
            <div className="space-y-2">
              {university.tuitionFees.map((fee, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="font-medium text-foreground">{fee.program}</div>
                  <div className="text-right">
                    <div className="font-semibold text-foreground">{fee.localFee}</div>
                    {fee.internationalFee && (
                      <div className="text-xs text-muted-foreground">Int'l: {fee.internationalFee}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              * Fees are approximate and may vary. Please verify with the university.
            </p>
          </motion.div>
        )}

        {/* Programs Offered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8 p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Programs Offered
          </h2>
          <div className="flex flex-wrap gap-2">
            {majorsOffered.map((major) => (
              <span 
                key={major} 
                className="px-3 py-1.5 rounded-lg bg-muted text-sm font-medium text-foreground"
              >
                {major}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Admission Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8 p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Admission Requirements
          </h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground mb-1">Minimum Grades</div>
              <div className="font-medium text-foreground">{university.admissionRequirements.minGrades}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground mb-1">Accepted Curriculums</div>
              <div className="font-medium text-foreground">
                {university.admissionRequirements.acceptedCurriculums.join(", ")}
              </div>
            </div>
            {university.admissionRequirements.entranceTest && (
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">Entrance Test</div>
                <div className="font-medium text-foreground">{university.admissionRequirements.entranceTest}</div>
              </div>
            )}
            {university.admissionRequirements.otherRequirements && university.admissionRequirements.otherRequirements.length > 0 && (
              <div className="p-3 rounded-lg bg-muted/50">
                <div className="text-sm text-muted-foreground mb-1">Other Requirements</div>
                <div className="font-medium text-foreground">
                  {university.admissionRequirements.otherRequirements.join(", ")}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* About University */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-8 p-6 rounded-2xl bg-card border border-border"
        >
          <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            About {university.shortName || university.name}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Type</div>
              <div className="font-medium text-foreground">{university.type}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Selectivity</div>
              <div className="font-medium text-foreground">{university.selectivity}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Int'l Friendly</div>
              <div className="font-medium text-foreground">{university.internationalFriendly ? "Yes" : "Limited"}</div>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="text-sm text-muted-foreground">Int'l Financial Aid</div>
              <div className="font-medium text-foreground">{university.financialAidForInternational ? "Available" : "Limited"}</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="sticky bottom-4 pt-4 space-y-3"
        >
          {university.applyLink && (
            <Button asChild size="lg" variant="hero" className="w-full gap-2 shadow-lg">
              <a href={university.applyLink} target="_blank" rel="noopener noreferrer">
                Apply to {university.shortName || university.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
          <Button asChild size="lg" variant="outline" className="w-full gap-2">
            <a href={university.website} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
