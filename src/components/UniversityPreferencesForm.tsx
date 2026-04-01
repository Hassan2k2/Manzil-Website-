import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Wallet, Globe, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface UniversityPreferences {
  curriculum: string;
  gradeLevel: string;
  fundingNeed: string;
  countryPreferences: string[];
  preferredMajors: string[];
}

interface UniversityPreferencesFormProps {
  suggestedMajors: string[];
  onSubmit: (preferences: UniversityPreferences) => void;
}

const curriculumOptions = [
  { value: "National", label: "National", description: "Matric / Intermediate / FSc" },
  { value: "Cambridge", label: "Cambridge", description: "O Levels / A Levels" },
  { value: "IB", label: "IB", description: "International Baccalaureate" },
];

const fundingOptions = [
  { value: "Full scholarship", label: "Full scholarship" },
  { value: "Partial scholarship", label: "Partial scholarship" },
  { value: "No scholarship", label: "No scholarship" },
];

const countryOptions = [
  { value: "Pakistan", flag: "🇵🇰", available: true },
  { value: "US", flag: "🇺🇸", available: false },
  { value: "UK", flag: "🇬🇧", available: false },
  { value: "Canada", flag: "🇨🇦", available: false },
  { value: "Australia", flag: "🇦🇺", available: false },
  { value: "Europe", flag: "🇪🇺", available: false },
  { value: "Anywhere with good funding", flag: "🌍", available: false },
];

export function UniversityPreferencesForm({ suggestedMajors, onSubmit }: UniversityPreferencesFormProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<UniversityPreferences>({
    curriculum: "",
    gradeLevel: "",
    fundingNeed: "",
    countryPreferences: [],
    preferredMajors: suggestedMajors.slice(0, 3),
  });

  const [customMajor, setCustomMajor] = useState("");

  const handleCurriculumSelect = (value: string) => {
    setPreferences(prev => ({ ...prev, curriculum: value }));
  };

  const handleFundingSelect = (value: string) => {
    setPreferences(prev => ({ ...prev, fundingNeed: value }));
  };

  const handleCountryToggle = (country: string, available: boolean) => {
    if (!available) return; // Don't allow selection of coming soon countries
    
    setPreferences(prev => {
      const current = prev.countryPreferences;
      return {
        ...prev,
        countryPreferences: current.includes(country)
          ? current.filter(c => c !== country)
          : [...current, country]
      };
    });
  };

  const handleMajorToggle = (major: string) => {
    setPreferences(prev => ({
      ...prev,
      preferredMajors: prev.preferredMajors.includes(major)
        ? prev.preferredMajors.filter(m => m !== major)
        : [...prev.preferredMajors, major]
    }));
  };

  const handleAddCustomMajor = () => {
    if (customMajor.trim() && !preferences.preferredMajors.includes(customMajor.trim())) {
      setPreferences(prev => ({
        ...prev,
        preferredMajors: [...prev.preferredMajors, customMajor.trim()]
      }));
      setCustomMajor("");
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return preferences.curriculum !== "";
      case 2: return preferences.fundingNeed !== "";
      case 3: return preferences.countryPreferences.length > 0;
      case 4: return preferences.preferredMajors.length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit(preferences);
    }
  };

  const handleSkipMajors = () => {
    onSubmit({ ...preferences, preferredMajors: [] });
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              s === step ? "w-8 bg-primary" : s < step ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Step 1: Curriculum */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              What curriculum are you studying?
            </h3>
            <p className="text-muted-foreground">Select your current or most recent educational system</p>
          </div>

          <div className="space-y-3">
            {curriculumOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCurriculumSelect(option.value)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  preferences.curriculum === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground">{option.label}</div>
                    <div className="text-sm text-muted-foreground">{option.description}</div>
                  </div>
                  {preferences.curriculum === option.value && <Check className="w-5 h-5 text-primary" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Funding */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              How much financial support will you likely need?
            </h3>
            <p className="text-muted-foreground">This helps match you with realistic options</p>
          </div>

          <div className="space-y-3">
            {fundingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleFundingSelect(option.value)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left",
                  preferences.fundingNeed === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{option.label}</span>
                  {preferences.fundingNeed === option.value && <Check className="w-5 h-5 text-primary" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Country Preferences */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Where would you consider studying?
            </h3>
            <p className="text-muted-foreground">Select all that apply</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {countryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleCountryToggle(option.value, option.available)}
                disabled={!option.available}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all text-left relative",
                  !option.available && "opacity-60 cursor-not-allowed",
                  option.available && preferences.countryPreferences.includes(option.value)
                    ? "border-primary bg-primary/10"
                    : option.available 
                      ? "border-border bg-card hover:border-primary/50"
                      : "border-border bg-muted/50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{option.flag}</span>
                    <span className={cn(
                      "font-medium",
                      option.available ? "text-foreground" : "text-muted-foreground"
                    )}>{option.value}</span>
                  </div>
                  {option.available && preferences.countryPreferences.includes(option.value) && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                  {!option.available && (
                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Major Preferences */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Which fields are you most interested in?
            </h3>
            <p className="text-muted-foreground">Select fields to filter results, or skip to see all universities</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...new Set([...suggestedMajors, ...preferences.preferredMajors])].map((major) => (
              <button
                key={major}
                onClick={() => handleMajorToggle(major)}
                className={cn(
                  "px-4 py-2 rounded-full border-2 transition-all text-sm font-medium",
                  preferences.preferredMajors.includes(major)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                )}
              >
                {major}
                {preferences.preferredMajors.includes(major) && (
                  <Check className="w-4 h-4 ml-1 inline" />
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customMajor}
              onChange={(e) => setCustomMajor(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCustomMajor()}
              placeholder="Add another field..."
              className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={handleAddCustomMajor} variant="outline" size="sm">
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <div className="flex gap-2">
          {step === 1 && (
            <Button
              variant="outline"
              onClick={() => {
                setPreferences(prev => ({ ...prev, curriculum: "" }));
                setStep(2);
              }}
              className="min-w-[100px]"
            >
              Skip
            </Button>
          )}
          {step === 2 && (
            <Button
              variant="outline"
              onClick={() => {
                setPreferences(prev => ({ ...prev, fundingNeed: "" }));
                setStep(3);
              }}
              className="min-w-[100px]"
            >
              Skip
            </Button>
          )}
          {step === 4 && (
            <Button
              variant="outline"
              onClick={handleSkipMajors}
              className="min-w-[100px]"
            >
              Skip
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed() && step !== 4 && step !== 1}
            className="min-w-[120px]"
          >
            {step === 4 ? "Find Universities" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
