import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, ChevronDown, Award, Building2, TrendingUp } from "lucide-react";
import { University } from "@/data/universitiesData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { UniversityLogo } from "@/components/UniversityLogo";

interface UniversityFinderCardProps {
  university: University;
  rank?: number;
}

export function UniversityFinderCard({ university, rank }: UniversityFinderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  // Handle navigation - save virtual universities to sessionStorage
  const handleViewDetails = () => {
    // Save to sessionStorage so detail page can retrieve it
    sessionStorage.setItem(`university-${university.id}`, JSON.stringify({ university }));
    navigate(`/university/${university.id}`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Public":
        return "bg-teal/10 text-teal border-teal/30";
      case "Private":
        return "bg-coral/10 text-coral border-coral/30";
      default:
        return "bg-amber/10 text-amber border-amber/30";
    }
  };

  const getSelectivityColor = (selectivity: string) => {
    switch (selectivity) {
      case "Most Selective":
        return "bg-coral/10 text-coral";
      case "Highly Selective":
        return "bg-amber/10 text-amber";
      case "Selective":
        return "bg-primary/10 text-primary";
      default:
        return "bg-teal/10 text-teal";
    }
  };

  return (
    <motion.div
      layout
      className="bg-card rounded-xl border border-border hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
    >
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex gap-4">
          {/* Logo */}
          <div className="shrink-0">
            <UniversityLogo
              name={university.name}
              shortName={university.shortName}
              website={university.website}
              logo={university.logo}
              country={university.country}
              size={56}
              className="rounded-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-foreground text-lg leading-tight">
                  {university.shortName || university.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {university.name !== university.shortName && university.name}
                </p>
              </div>
              {rank && (
                <span className="shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                  #{rank}
                </span>
              )}
            </div>

            {/* Location & Type */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {university.location}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium border",
                  getTypeColor(university.type)
                )}
              >
                {university.type}
              </span>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-medium",
                  getSelectivityColor(university.selectivity)
                )}
              >
                {university.selectivity}
              </span>
            </div>

            {/* Key Stats */}
            <div className="flex flex-wrap gap-3 mt-3 text-xs">
              {university.ranking && (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <TrendingUp className="w-3 h-3" />
                  {university.ranking}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {university.applicationDeadline}
              </span>
              {university.acceptanceRate && (
                <span className="text-muted-foreground">
                  {university.acceptanceRate} acceptance
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Majors Preview */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {university.majorsOffered.slice(0, 4).map((major) => (
              <span
                key={major}
                className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground"
              >
                {major}
              </span>
            ))}
            {university.majorsOffered.length > 4 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground">
                +{university.majorsOffered.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Funding Highlight */}
        {university.fundingOptions.length > 0 && (
          <div className="mt-3 p-2 rounded-lg bg-teal/5 border border-teal/20">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-teal shrink-0" />
              <span className="text-xs text-teal font-medium">
                {university.fundingOptions[0].type}: {university.fundingOptions[0].description}
              </span>
            </div>
          </div>
        )}

        {/* Expand Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1 transition-colors"
        >
          {expanded ? "Show Less" : "View Details"}
          <ChevronDown
            className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")}
          />
        </button>

          {/* Expanded Content */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border pt-4 mt-2 space-y-4"
          >
            {/* All Majors */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Programs Offered</h4>
              <div className="flex flex-wrap gap-1.5">
                {university.majorsOffered.map((major) => (
                  <span
                    key={major}
                    className="px-2 py-1 rounded-md text-xs bg-primary/10 text-primary"
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>

            {/* Admission Requirements */}
            {university.admissionRequirements?.entranceTest && university.admissionRequirements.entranceTest !== "Check website" && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Admission Requirements</h4>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-muted/50 border border-border">
                    <div className="text-xs font-medium text-foreground">Test Required</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {university.admissionRequirements.entranceTest}
                    </div>
                  </div>
                  {university.admissionRequirements.minGrades &&
                   !["Flexible", "Top tier (A*/A)", "Strong (B+/A)", "Average (C-B)"].includes(university.admissionRequirements.minGrades) && (
                    <div className="p-2 rounded-lg bg-muted/50 border border-border">
                      <div className="text-xs font-medium text-foreground">Eligibility</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {university.admissionRequirements.minGrades}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tuition Fees */}
            {university.tuitionFees && university.tuitionFees.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Tuition Fees</h4>
                <div className="space-y-1">
                  {university.tuitionFees.slice(0, 3).map((fee) => (
                    <div
                      key={fee.program}
                      className="flex justify-between text-xs text-muted-foreground"
                    >
                      <span>{fee.program}</span>
                      <span className="font-medium text-foreground">{fee.localFee}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scholarships */}
            {university.scholarships.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Scholarships</h4>
                <div className="space-y-2">
                  {university.scholarships.slice(0, 2).map((scholarship) => (
                    <div
                      key={scholarship.name}
                      className="p-2 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="font-medium text-sm text-foreground">
                        {scholarship.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Coverage: {scholarship.coverage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleViewDetails}>
                View Full Details
              </Button>
              {university.applyLink && (
                <Button asChild size="sm" className="flex-1 gap-1">
                  <a href={university.applyLink} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
