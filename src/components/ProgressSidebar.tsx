import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Check, Circle, Sparkles, Target, TrendingUp } from "lucide-react";
import type { AssessmentStep, RiasecScores } from "@/hooks/useAssessment";
import { riasecLabels } from "@/data/quizData";

interface ProgressSidebarProps {
  currentStep: AssessmentStep;
  riasecProgress: number;
  valuesProgress: number;
  bigFiveProgress: number;
  totalProgress: number;
  riasecScores: RiasecScores;
  topRiasecCodes: string[];
  onStepClick: (step: AssessmentStep) => void;
}

export function ProgressSidebar({
  currentStep,
  riasecProgress,
  valuesProgress,
  bigFiveProgress,
  totalProgress,
  riasecScores,
  topRiasecCodes,
  onStepClick,
}: ProgressSidebarProps) {
  const steps: { id: AssessmentStep; label: string; icon: React.ReactNode; progress: number; color: string }[] = [
    { id: "riasec", label: "Interests", icon: <Sparkles className="w-4 h-4" />, progress: riasecProgress, color: "coral" },
    { id: "values", label: "Values", icon: <Target className="w-4 h-4" />, progress: valuesProgress, color: "teal" },
    { id: "bigfive", label: "Personality", icon: <TrendingUp className="w-4 h-4" />, progress: bigFiveProgress, color: "amber" },
  ];

  const getStepStatus = (stepId: AssessmentStep) => {
    const stepOrder: AssessmentStep[] = ["welcome", "riasec", "values", "bigfive", "results"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);
    
    if (stepIndex < currentIndex) {
      const step = steps.find(s => s.id === stepId);
      return step && step.progress === 100 ? "complete" : "partial";
    }
    if (stepIndex === currentIndex) return "active";
    return "upcoming";
  };

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-sidebar border-r border-sidebar-border p-6 h-screen sticky top-0">
      {/* Logo */}
      <div 
        className="mb-8 cursor-pointer hover:opacity-80 transition-opacity" 
        onClick={() => onStepClick("welcome")}
      >
        <h2 className="text-2xl font-display font-bold text-gradient">Manzil</h2>
        <p className="text-sm text-sidebar-foreground/70 mt-1">Your career compass</p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-sidebar-foreground/70">Overall Progress</span>
          <span className="font-semibold text-sidebar-foreground">{Math.round(totalProgress)}%</span>
        </div>
        <Progress value={totalProgress} variant="gradient" className="h-2" />
      </div>

      {/* Steps */}
      <nav className="space-y-2 flex-1">
        {steps.map((step) => {
          const status = getStepStatus(step.id);
          const isClickable = status !== "upcoming";
          
          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={cn(
                "w-full p-4 rounded-xl text-left transition-all duration-200",
                status === "active" && "bg-sidebar-accent shadow-sm",
                status === "complete" && "hover:bg-sidebar-accent/50",
                status === "partial" && "hover:bg-sidebar-accent/50",
                status === "upcoming" && "opacity-50 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  status === "complete" && `bg-${step.color}`,
                  status === "active" && "bg-sidebar-primary",
                  status === "partial" && "bg-muted",
                  status === "upcoming" && "bg-muted"
                )}>
                  {status === "complete" ? (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <span className={cn(
                      status === "active" ? "text-sidebar-primary-foreground" : "text-muted-foreground"
                    )}>
                      {step.icon}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "font-display font-semibold",
                  status === "active" ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                )}>
                  {step.label}
                </span>
              </div>
              
              {step.progress > 0 && (
                <div className="ml-11">
                  <Progress 
                    value={step.progress} 
                    variant={step.color as "coral" | "teal"} 
                    className="h-1.5" 
                  />
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Live RIASEC Preview */}
      {riasecProgress > 0 && (
        <div className="mt-auto pt-6 border-t border-sidebar-border">
          <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider mb-3">
            Your Top Interests
          </h3>
          <div className="space-y-2">
            {topRiasecCodes.slice(0, 3).map((code, index) => {
              const label = riasecLabels[code];
              const score = riasecScores[code as keyof RiasecScores];
              const maxScore = 40; // 8 questions * 5 max
              const percentage = (score / maxScore) * 100;
              
              return (
                <div key={code} className="flex items-center gap-2">
                  <span className={cn(
                    "w-6 h-6 rounded text-xs font-bold flex items-center justify-center",
                    index === 0 && "bg-coral text-primary-foreground",
                    index === 1 && "bg-teal text-secondary-foreground",
                    index === 2 && "bg-amber text-accent-foreground"
                  )}>
                    {code}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-sidebar-foreground">{label?.name}</span>
                      <span className="text-sidebar-foreground/70">{Math.round(percentage)}%</span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-500",
                          index === 0 && "bg-coral",
                          index === 1 && "bg-teal",
                          index === 2 && "bg-amber"
                        )}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}
