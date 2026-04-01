import { useState, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { universities } from "@/data/universitiesData";

export interface UniversityFilters {
  search: string;
  majors: string[];
  countries: string[];
  cities: string[];
  types: ("Public" | "Private" | "Semi-Government")[];
  budgetRange: "any" | "under500k" | "500k-1m" | "1m-2m" | "over2m";
  rankings: string[];
  institutes: string[];
}

interface UniversityFiltersProps {
  filters: UniversityFilters;
  onChange: (filters: UniversityFilters) => void;
  availableMajors: string[];
  availableCities: string[];
  availableRankings: string[];
  availableInstitutes: string[];
  loadingProgramsData?: boolean;
  resultCount: number;
}

const countryOptions = [
  { value: "Pakistan", label: "Pakistan", available: true },
  { value: "US", label: "United States", available: false },
  { value: "UK", label: "United Kingdom", available: false },
  { value: "Canada", label: "Canada", available: false },
  { value: "Australia", label: "Australia", available: false },
  { value: "Europe", label: "Europe", available: false },
  { value: "Anywhere with good funding", label: "Anywhere", available: false },
];

// Will be populated from Supabase data, these are fallback major cities
const fallbackCitiesInPakistan = [
  "Lahore",
  "Karachi", 
  "Islamabad",
  "Rawalpindi",
  "Peshawar",
  "Faisalabad",
  "Multan",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Gujranwala",
  "Bahawalpur",
  "Sukkur",
  "Abbottabad",
  "Mardan",
];

const topMajors = [
  "Computer Science",
  "Business Administration",
  "Medicine",
  "Engineering",
  "Economics",
  "Law",
  "Psychology",
  "Accounting & Finance",
  "Data Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Architecture",
  "Pharmacy",
  "Biology",
];

const typeOptions: { value: "Public" | "Private" | "Semi-Government"; label: string }[] = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
  { value: "Semi-Government", label: "Semi-Govt" },
];

const budgetOptions = [
  { value: "any", label: "Any" },
  { value: "under500k", label: "< 500K" },
  { value: "500k-1m", label: "500K–1M" },
  { value: "1m-2m", label: "1M–2M" },
  { value: "over2m", label: "> 2M" },
];

// Helper to extract city from location string
function extractCity(location: string): string {
  const parts = location.split(",");
  return parts[0].trim();
}

export function UniversityFilters({
  filters,
  onChange,
  availableMajors,
  availableCities,
  availableInstitutes,
  loadingProgramsData = false,
  resultCount,
}: UniversityFiltersProps) {
  const [majorSearch, setMajorSearch] = useState("");
  const [instituteSearch, setInstituteSearch] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Only Pakistani universities are supported for now.
  const pakistaniUniversities = useMemo(() => {
    return universities.filter((u) => u.country === "Pakistan");
  }, []);

  // Get cities - use Supabase cities if available, otherwise use fallback
  const filteredCities = useMemo(() => {
    // If we have cities from props (Supabase), use those
    if (availableCities.length > 0) {
      return availableCities;
    }
    // Get cities that actually have universities from static data
    const citiesWithUnis = new Set<string>();
    pakistaniUniversities.forEach((uni) => {
      if (filters.countries.length === 0 || filters.countries.includes(uni.country)) {
        citiesWithUnis.add(extractCity(uni.location));
      }
    });
    // Return fallback cities that have universities
    return fallbackCitiesInPakistan.filter(city => citiesWithUnis.has(city));
  }, [filters.countries, pakistaniUniversities, availableCities]);

  // Get majors - combine top majors with available ones
  const displayMajors = useMemo(() => {
    const allMajors = new Set([...topMajors, ...availableMajors]);
    return Array.from(allMajors).sort((a, b) => {
      // Prioritize top majors
      const aIsTop = topMajors.includes(a);
      const bIsTop = topMajors.includes(b);
      if (aIsTop && !bIsTop) return -1;
      if (!aIsTop && bIsTop) return 1;
      return a.localeCompare(b);
    });
  }, [availableMajors]);

  // Clear cities when country changes
  const handleCountryToggle = (country: string, available = true) => {
    if (!available) return;
    const current = filters.countries;
    const updated = current.includes(country)
      ? current.filter((v) => v !== country)
      : [...current, country];
    
    // Clear cities that don't belong to the new country selection
    const newValidCities = filters.cities.filter((city) => {
      return pakistaniUniversities.some(
        (uni) =>
          extractCity(uni.location) === city &&
          (updated.length === 0 || updated.includes(uni.country))
      );
    });

    onChange({ ...filters, countries: updated, cities: newValidCities });
  };

  const toggleArrayFilter = <K extends keyof UniversityFilters>(
    key: K,
    value: UniversityFilters[K] extends (infer T)[] ? T : never
  ) => {
    const current = filters[key] as unknown[];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const clearAllFilters = () => {
    onChange({
      search: "",
      majors: [],
      countries: [],
      cities: [],
      types: [],
      budgetRange: "any",
      rankings: [],
      institutes: [],
    });
    setMajorSearch("");
    setInstituteSearch("");
  };

  const hasActiveFilters =
    filters.search ||
    filters.majors.length > 0 ||
    filters.countries.length > 0 ||
    filters.cities.length > 0 ||
    filters.types.length > 0 ||
    filters.budgetRange !== "any" ||
    filters.institutes.length > 0;

  const filteredMajors = displayMajors.filter((m) =>
    m.toLowerCase().includes(majorSearch.toLowerCase())
  );

  const filteredInstitutes = availableInstitutes.filter((i) =>
    i.toLowerCase().includes(instituteSearch.toLowerCase())
  );

  const activeFilterCount =
    filters.majors.length +
    filters.countries.length +
    filters.cities.length +
    filters.types.length +
    filters.institutes.length +
    (filters.budgetRange !== "any" ? 1 : 0);

  // Show institute filter only when Pakistan is selected (or no country filter)
  const showInstituteFilter = filters.countries.length === 0 || filters.countries.includes("Pakistan");

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search universities, majors, or locations..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-12 h-14 text-base bg-background border-2 border-border/50 rounded-2xl focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Country Dropdown */}
        <FilterDropdown
          label="Country"
          value={
            filters.countries.length > 0
              ? filters.countries
                  .map((c) => countryOptions.find((o) => o.value === c)?.label)
                  .filter(Boolean)
                  .join(", ")
              : null
          }
          isOpen={openDropdown === "country"}
          onToggle={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
          onClose={() => setOpenDropdown(null)}
        >
          <div className="p-2 space-y-1">
            {countryOptions.map((country) => (
              <DropdownItem
                key={country.value}
                label={country.label}
                isSelected={filters.countries.includes(country.value)}
                disabled={!country.available}
                badge={!country.available ? "Coming Soon" : undefined}
                onClick={() => handleCountryToggle(country.value, country.available)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* City Dropdown - Only shows cities from selected countries */}
        <FilterDropdown
          label="City"
          value={filters.cities.length > 0 ? `${filters.cities.length} selected` : null}
          isOpen={openDropdown === "city"}
          onToggle={() => setOpenDropdown(openDropdown === "city" ? null : "city")}
          onClose={() => setOpenDropdown(null)}
          disabled={filters.countries.length === 0}
          hint={filters.countries.length === 0 ? "Select country first" : undefined}
        >
          <div className="p-2 space-y-1 max-h-48 overflow-y-auto">
            {filteredCities.map((city) => (
              <DropdownItem
                key={city}
                label={city}
                isSelected={filters.cities.includes(city)}
                onClick={() => toggleArrayFilter("cities", city)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Type Dropdown */}
        <FilterDropdown
          label="Type"
          value={filters.types.length > 0 ? filters.types.join(", ") : null}
          isOpen={openDropdown === "type"}
          onToggle={() => setOpenDropdown(openDropdown === "type" ? null : "type")}
          onClose={() => setOpenDropdown(null)}
        >
          <div className="p-2 space-y-1">
            {typeOptions.map((type) => (
              <DropdownItem
                key={type.value}
                label={type.label}
                isSelected={filters.types.includes(type.value)}
                onClick={() => toggleArrayFilter("types", type.value)}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Budget Dropdown */}
        <FilterDropdown
          label="Budget"
          value={filters.budgetRange !== "any" ? budgetOptions.find(o => o.value === filters.budgetRange)?.label : null}
          isOpen={openDropdown === "budget"}
          onToggle={() => setOpenDropdown(openDropdown === "budget" ? null : "budget")}
          onClose={() => setOpenDropdown(null)}
        >
          <div className="p-2 space-y-1">
            {budgetOptions.map((option) => (
              <DropdownItem
                key={option.value}
                label={option.label}
                isSelected={filters.budgetRange === option.value}
                onClick={() => {
                  onChange({ ...filters, budgetRange: option.value as UniversityFilters["budgetRange"] });
                  setOpenDropdown(null);
                }}
              />
            ))}
          </div>
        </FilterDropdown>

        {/* Major Dropdown */}
        <FilterDropdown
          label="Major"
          value={filters.majors.length > 0 ? `${filters.majors.length} selected` : null}
          isOpen={openDropdown === "major"}
          onToggle={() => setOpenDropdown(openDropdown === "major" ? null : "major")}
          onClose={() => setOpenDropdown(null)}
          wide
        >
          <div className="p-3">
            <Input
              type="text"
              placeholder="Search majors..."
              value={majorSearch}
              onChange={(e) => setMajorSearch(e.target.value)}
              className="h-9 text-sm mb-3"
            />
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {filteredMajors.slice(0, 15).map((major) => (
                <button
                  key={major}
                  onClick={() => toggleArrayFilter("majors", major)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    filters.majors.includes(major)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {major}
                </button>
              ))}
            </div>
          </div>
        </FilterDropdown>

        {/* Institute Dropdown - Only shows when Pakistan is selected */}
        {showInstituteFilter && availableInstitutes.length > 0 && (
          <FilterDropdown
            label={loadingProgramsData ? "Loading..." : "Institute"}
            value={filters.institutes.length > 0 ? `${filters.institutes.length} selected` : null}
            isOpen={openDropdown === "institute"}
            onToggle={() => setOpenDropdown(openDropdown === "institute" ? null : "institute")}
            onClose={() => setOpenDropdown(null)}
            wide
            disabled={loadingProgramsData}
          >
            <div className="p-3">
              <Input
                type="text"
                placeholder="Search institutes..."
                value={instituteSearch}
                onChange={(e) => setInstituteSearch(e.target.value)}
                className="h-9 text-sm mb-3"
              />
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {filteredInstitutes.slice(0, 20).map((institute) => (
                  <button
                    key={institute}
                    onClick={() => toggleArrayFilter("institutes", institute)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      filters.institutes.includes(institute)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="truncate">{institute}</span>
                      {filters.institutes.includes(institute) && (
                        <span className="w-2 h-2 rounded-full bg-primary shrink-0 ml-2" />
                      )}
                    </span>
                  </button>
                ))}
                {filteredInstitutes.length === 0 && (
                  <p className="text-sm text-muted-foreground py-2 text-center">No institutes found</p>
                )}
              </div>
            </div>
          </FilterDropdown>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Results Count & Clear */}
        <div className="flex items-center gap-4">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all
            </button>
          )}
          <div className="text-sm font-semibold text-foreground">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.countries.map((country) => (
            <ActiveTag
              key={`country-${country}`}
              label={countryOptions.find(c => c.value === country)?.label || country}
              onRemove={() => handleCountryToggle(country, true)}
            />
          ))}
          {filters.cities.map((city) => (
            <ActiveTag
              key={`city-${city}`}
              label={city}
              onRemove={() => toggleArrayFilter("cities", city)}
            />
          ))}
          {filters.types.map((type) => (
            <ActiveTag
              key={`type-${type}`}
              label={type}
              onRemove={() => toggleArrayFilter("types", type)}
            />
          ))}
          {filters.budgetRange !== "any" && (
            <ActiveTag
              label={`Budget: ${budgetOptions.find(b => b.value === filters.budgetRange)?.label}`}
              onRemove={() => onChange({ ...filters, budgetRange: "any" })}
            />
          )}
          {filters.majors.map((major) => (
            <ActiveTag
              key={`major-${major}`}
              label={major}
              onRemove={() => toggleArrayFilter("majors", major)}
            />
          ))}
          {filters.institutes.map((institute) => (
            <ActiveTag
              key={`institute-${institute}`}
              label={institute}
              onRemove={() => toggleArrayFilter("institutes", institute)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Filter Dropdown Component
function FilterDropdown({
  label,
  value,
  isOpen,
  onToggle,
  onClose,
  children,
  disabled = false,
  hint,
  wide = false,
}: {
  label: string;
  value: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  hint?: string;
  wide?: boolean;
}) {
  return (
    <div className="relative">
      <button
        onClick={disabled ? undefined : onToggle}
        disabled={disabled}
        title={hint}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border",
          disabled
            ? "bg-muted/30 text-muted-foreground/50 border-transparent cursor-not-allowed"
            : value
            ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
            : "bg-card text-foreground border-border hover:border-primary/30 hover:bg-muted/50"
        )}
      >
        <span>{value || label}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div
            className={cn(
              "absolute top-full left-0 mt-2 z-50 bg-popover border border-border rounded-xl shadow-xl animate-fade-in",
              wide ? "w-72" : "w-48"
            )}
          >
            {children}
          </div>
        </>
      )}
    </div>
  );
}

// Dropdown Item Component
function DropdownItem({
  label,
  isSelected,
  disabled = false,
  badge,
  onClick,
}: {
  label: string;
  isSelected: boolean;
  disabled?: boolean;
  badge?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
        disabled
          ? "text-muted-foreground/60 cursor-not-allowed"
          : isSelected
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-muted"
      )}
    >
      <span>{label}</span>
      <span className="flex items-center gap-2">
        {badge && (
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
        {isSelected && <div className="w-2 h-2 rounded-full bg-primary" />}
      </span>
    </button>
  );
}

// Active Tag Component
function ActiveTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}