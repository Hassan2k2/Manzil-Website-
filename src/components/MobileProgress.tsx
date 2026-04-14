import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { AssessmentStep } from "@/hooks/useAssessment";
import { Sparkles, Target, TrendingUp } from "lucide-react";

interface MobileProgressProps {
  currentStep: AssessmentStep;
  totalProgress: number;
  onHomeClick?: () => void;
}

export function MobileProgress({ currentStep, totalProgress, onHomeClick }: MobileProgressProps) {
  const steps = [
    { id: "riasec", label: "Interests", icon: <Sparkles className="w-4 h-4" /> },
    { id: "values", label: "Values", icon: <Target className="w-4 h-4" /> },
    { id: "bigfive", label: "Personality", icon: <TrendingUp className="w-4 h-4" /> },
  ];

  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <h1 
          className="text-lg font-display font-bold text-gradient cursor-pointer"
          onClick={onHomeClick}
        >
          Manzil
        </h1>
        <span className="text-sm text-muted-foreground">{Math.round(totalProgress)}% complete</span>
      </div>
      <Progress value={totalProgress} variant="gradient" className="h-1.5 mb-3" />
      
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-1.5 text-xs font-medium transition-colors",
              i <= currentIndex ? "text-foreground" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center",
              i < currentIndex && "bg-teal text-secondary-foreground",
              i === currentIndex && "bg-coral text-primary-foreground",
              i > currentIndex && "bg-muted"
            )}>
              {step.icon}
            </div>
            <span className="hidden sm:inline">{step.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
