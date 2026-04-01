import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, Globe, BookOpen, Pencil, Check, ChevronDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UniversityPreferences } from "@/components/UniversityPreferencesForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditableProfileSectionProps {
  preferences: UniversityPreferences;
  suggestedMajors: string[];
  onUpdate: (newPreferences: UniversityPreferences) => void;
}

const curriculumOptions = [
  { value: "National", label: "National", description: "Matric / Intermediate / FSc" },
  { value: "Cambridge", label: "Cambridge", description: "O Levels / A Levels" },
  { value: "IB", label: "IB", description: "International Baccalaureate" },
];

const fundingOptions = [
  { value: "Full scholarship required", label: "Full scholarship" },
  { value: "Partial scholarship preferred", label: "Partial scholarship" },
  { value: "Can self-fund locally", label: "Self-fund locally" },
  { value: "Can self-fund internationally", label: "Self-fund internationally" },
];

const countryOptions = [
  { value: "Pakistan", flag: "🇵🇰" },
  { value: "US", flag: "🇺🇸" },
  { value: "UK", flag: "🇬🇧" },
  { value: "Canada", flag: "🇨🇦" },
  { value: "Anywhere with good funding", flag: "🌍" },
];

function DropdownSelect({
  value,
  options,
  onSelect,
  placeholder,
}: {
  value: string;
  options: { value: string; label: string }[];
  onSelect: (val: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedLabel = options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/80 hover:bg-muted text-sm font-medium text-foreground transition-colors"
      >
        {selectedLabel}
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-full left-0 mt-1 z-50 min-w-[180px] rounded-lg border border-border bg-card shadow-lg overflow-hidden"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSelect(option.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between",
                    value === option.value && "bg-primary/10 text-primary"
                  )}
                >
                  {option.label}
                  {value === option.value && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MajorsPopup({
  selectedMajors,
  availableMajors,
  onUpdate,
}: {
  selectedMajors: string[];
  availableMajors: string[];
  onUpdate: (majors: string[]) => void;
}) {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedMajors);
  const [open, setOpen] = useState(false);

  const handleToggle = (major: string) => {
    setLocalSelected(prev =>
      prev.includes(major) ? prev.filter(m => m !== major) : [...prev, major]
    );
  };

  const handleSave = () => {
    onUpdate(localSelected);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      setLocalSelected(selectedMajors);
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left w-full group">
          <div className="flex items-center justify-between mb-1">
            <div className="text-sm text-muted-foreground">Majors</div>
            <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="font-semibold text-foreground text-sm">
            {selectedMajors.length > 0 
              ? selectedMajors.slice(0, 2).join(", ") + (selectedMajors.length > 2 ? ` +${selectedMajors.length - 2}` : "")
              : "Select majors"}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Select Your Preferred Majors
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Choose the majors you're interested in. Universities will be filtered based on these selections.
          </p>
          <div className="flex flex-wrap gap-2">
            {availableMajors.map((major) => (
              <button
                key={major}
                onClick={() => handleToggle(major)}
                className={cn(
                  "px-3 py-1.5 rounded-full border-2 transition-all text-sm font-medium",
                  localSelected.includes(major)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                )}
              >
                {major}
                {localSelected.includes(major) && <Check className="w-3 h-3 ml-1 inline" />}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={localSelected.length === 0}>
            Apply ({localSelected.length})
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CountriesMultiSelect({
  selected,
  onUpdate,
}: {
  selected: string[];
  onUpdate: (countries: string[]) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleToggle = (country: string) => {
    if (country === "Anywhere with good funding") {
      onUpdate(selected.includes(country) ? [] : [country]);
    } else if (selected.includes("Anywhere with good funding")) {
      onUpdate([country]);
    } else {
      onUpdate(
        selected.includes(country)
          ? selected.filter(c => c !== country)
          : [...selected, country]
      );
    }
  };

  const displayText = selected.length === 0 
    ? "Select countries"
    : selected.includes("Anywhere with good funding")
    ? "Anywhere"
    : selected.slice(0, 2).map(c => countryOptions.find(o => o.value === c)?.flag).join(" ") + 
      (selected.length > 2 ? ` +${selected.length - 2}` : "");

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/80 hover:bg-muted text-sm font-medium text-foreground transition-colors"
      >
        {displayText}
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-full left-0 mt-1 z-50 min-w-[200px] rounded-lg border border-border bg-card shadow-lg overflow-hidden"
            >
              {countryOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                  className={cn(
                    "w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors flex items-center justify-between gap-2",
                    selected.includes(option.value) && "bg-primary/10 text-primary"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span>{option.flag}</span>
                    <span>{option.value}</span>
                  </span>
                  {selected.includes(option.value) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EditableProfileSection({ 
  preferences, 
  suggestedMajors,
  onUpdate 
}: EditableProfileSectionProps) {
  const handleCurriculumChange = (curriculum: string) => {
    onUpdate({ ...preferences, curriculum });
  };

  const handleFundingChange = (fundingNeed: string) => {
    onUpdate({ ...preferences, fundingNeed });
  };

  const handleCountriesChange = (countryPreferences: string[]) => {
    onUpdate({ ...preferences, countryPreferences });
  };

  const handleMajorsChange = (preferredMajors: string[]) => {
    onUpdate({ ...preferences, preferredMajors });
  };

  return (
    <div className="mb-8 p-6 rounded-2xl bg-card border border-border">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Curriculum */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground mb-1.5">Curriculum</div>
          <DropdownSelect
            value={preferences.curriculum}
            options={curriculumOptions}
            onSelect={handleCurriculumChange}
            placeholder="Select"
          />
        </div>

        {/* Funding */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground mb-1.5">Funding</div>
          <DropdownSelect
            value={preferences.fundingNeed}
            options={fundingOptions}
            onSelect={handleFundingChange}
            placeholder="Select"
          />
        </div>

        {/* Countries */}
        <div className="p-3 rounded-lg bg-muted/50">
          <div className="text-sm text-muted-foreground mb-1.5">Countries</div>
          <CountriesMultiSelect
            selected={preferences.countryPreferences}
            onUpdate={handleCountriesChange}
          />
        </div>

        {/* Majors */}
        <MajorsPopup
          selectedMajors={preferences.preferredMajors}
          availableMajors={suggestedMajors}
          onUpdate={handleMajorsChange}
        />
      </div>
    </div>
  );
}
