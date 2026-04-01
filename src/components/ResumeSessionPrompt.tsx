import { Button } from "@/components/ui/button";
import { RefreshCw, Play, Clock } from "lucide-react";
import manzilLogo from "@/assets/manzil-logo.jpg";

interface ResumeSessionPromptProps {
  onResume: () => void;
  onStartFresh: () => void;
  lastStep: string;
  progress: number;
}

const stepLabels: Record<string, string> = {
  riasec: "Interests Quiz",
  "riasec-results": "Interests Results",
  values: "Values Quiz",
  "values-results": "Values Results",
  bigfive: "Personality Quiz",
  "bigfive-results": "Personality Results",
  results: "Final Results",
};

export function ResumeSessionPrompt({
  onResume,
  onStartFresh,
  lastStep,
  progress,
}: ResumeSessionPromptProps) {
  const stepLabel = stepLabels[lastStep] || lastStep;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-primary/10">
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-md mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl shadow-glow overflow-hidden ring-4 ring-primary/20">
            <img src={manzilLogo} alt="Manzil Logo" className="w-full h-full object-cover" />
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-display font-bold">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">
              We found your previous session. Would you like to continue where you left off?
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Your Progress</span>
              <span className="font-semibold text-primary">{progress}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-coral to-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Last section: {stepLabel}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onResume}
              className="w-full bg-coral hover:bg-coral/90 text-white font-semibold py-6 text-base rounded-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Continue Where I Left Off
            </Button>

            <Button
              onClick={onStartFresh}
              variant="outline"
              className="w-full font-semibold py-6 text-base rounded-xl border-2"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Start Fresh
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>Your progress is automatically saved</p>
      </footer>
    </div>
  );
}
