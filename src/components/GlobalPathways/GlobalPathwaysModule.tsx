import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ArrowLeft, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { universities } from "@/data/universitiesData";
import { UniversityPreferences, UniversityPreferencesForm } from "@/components/UniversityPreferencesForm";
import { matchUniversities } from "@/lib/universityMatcher";
import { EditableProfileSection } from "./EditableProfileSection";
import { UniversityList } from "./UniversityList";
import { majors } from "@/data/careersData";
import { cn } from "@/lib/utils";
import { useSaveUniversityMatches } from "@/hooks/useSaveUniversityMatches";

interface GlobalPathwaysModuleProps {
  suggestedMajors: string[];
  onBack?: () => void;
}

export function GlobalPathwaysModule({ suggestedMajors, onBack }: GlobalPathwaysModuleProps) {
  const [step, setStep] = useState<"preferences" | "results">("preferences");
  const [preferences, setPreferences] = useState<UniversityPreferences | null>(null);
  const { saveMatches } = useSaveUniversityMatches();
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [fundingOnly, setFundingOnly] = useState(false);

  // Get all major names for the popup
  const allMajorNames = useMemo(() => {
    const names = majors.map(m => m.name);
    // Add suggested majors that might not be in the list
    suggestedMajors.forEach(sm => {
      if (!names.includes(sm)) names.push(sm);
    });
    return names;
  }, [suggestedMajors]);

  const handlePreferencesSubmit = (prefs: UniversityPreferences) => {
    setPreferences(prefs);
    setStep("results");
  };

  const handleBackToPreferences = () => {
    setStep("preferences");
  };

  const handlePreferencesUpdate = (newPrefs: UniversityPreferences) => {
    setPreferences(newPrefs);
  };

  // Compute matched universities based on current preferences
  const matchedUniversities = useMemo(() => {
    if (!preferences) return [];
    return matchUniversities(universities, preferences);
  }, [preferences]);

  // Save matches when they change (for logged-in users)
  useEffect(() => {
    if (matchedUniversities.length > 0 && preferences) {
      saveMatches(matchedUniversities, preferences);
    }
  }, [matchedUniversities, preferences, saveMatches]);

  // Apply additional filters to matched universities
  const filteredUniversities = useMemo(() => {
    return matchedUniversities.filter(item => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          item.university.name.toLowerCase().includes(query) ||
          item.university.location.toLowerCase().includes(query) ||
          item.university.majorsOffered.some(m => m.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }
      
      // Country filter (additional to preferences)
      if (selectedCountries.length > 0 && !selectedCountries.includes(item.university.country)) {
        return false;
      }
      
      // Funding filter
      if (fundingOnly && !item.fundingMatch) {
        return false;
      }
      
      return true;
    });
  }, [matchedUniversities, searchQuery, selectedCountries, fundingOnly]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCountries([]);
    setFundingOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedCountries.length > 0 || fundingOnly;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {(step === "results" || onBack) && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={step === "results" ? handleBackToPreferences : onBack}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl text-foreground">Global Pathways</h1>
                  <p className="text-sm text-muted-foreground">
                    {step === "preferences" ? "Find your perfect university match" : `${filteredUniversities.length} universities found`}
                  </p>
                </div>
              </div>
            </div>
            
            {step === "results" && (
              <div className="flex items-center gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search universities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
                  />
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1 text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {step === "preferences" && (
          <motion.div
            key="preferences"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Discover Your University Match
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Tell us about your academic background and preferences. We'll match you with universities 
                across Pakistan, US, UK, and Canada based on your profile.
              </p>
            </div>
            
            <UniversityPreferencesForm
              suggestedMajors={suggestedMajors}
              onSubmit={handlePreferencesSubmit}
            />
          </motion.div>
        )}

        {step === "results" && preferences && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-4 py-8"
          >
            {/* Mobile Search */}
            <div className="sm:hidden mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search universities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Editable Profile Section */}
            <EditableProfileSection
              preferences={preferences}
              suggestedMajors={allMajorNames}
              onUpdate={handlePreferencesUpdate}
            />

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setFundingOnly(!fundingOnly)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  fundingOnly 
                    ? "bg-teal text-primary-foreground" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                💰 With Funding
              </button>
              {[
                { country: "Pakistan", flag: "🇵🇰", available: true },
                { country: "US", flag: "🇺🇸", available: false },
                { country: "UK", flag: "🇬🇧", available: false },
                { country: "Canada", flag: "🇨🇦", available: false },
                { country: "Australia", flag: "🇦🇺", available: false },
                { country: "Europe", flag: "🇪🇺", available: false },
                { country: "Anywhere", flag: "🌍", available: false },
              ].map(({ country, flag, available }) => (
                <button
                  key={country}
                  onClick={() => {
                    if (!available) return;
                    setSelectedCountries(prev => 
                      prev.includes(country) 
                        ? prev.filter(c => c !== country)
                        : [...prev, country]
                    );
                  }}
                  disabled={!available}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                    !available && "opacity-60 cursor-not-allowed",
                    available && selectedCountries.includes(country)
                      ? "bg-primary text-primary-foreground" 
                      : available
                        ? "bg-muted text-muted-foreground hover:bg-muted/80"
                        : "bg-muted/50 text-muted-foreground"
                  )}
                >
                  {flag} {country}
                  {!available && <span className="ml-1 text-xs">(Soon)</span>}
                </button>
              ))}
            </div>

            {/* Results */}
            <UniversityList universities={filteredUniversities} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
