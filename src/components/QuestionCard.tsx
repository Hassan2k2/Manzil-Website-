import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Star, Heart, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer?: number;
  onAnswer: (value: number) => void;
  onNext: () => void;
  onPrev: () => void;
  sectionName: string;
  sectionColor: "coral" | "teal" | "amber";
}

const ratingLabels = [
  "Not me at all",
  "Rarely me", 
  "Sometimes me",
  "Often me",
  "Totally me! ✨"
];

const encouragements = [
  "You're doing great! 🌟",
  "Keep going, superstar! ⭐",
  "Awesome choice! 🎯",
  "Nice! You're on fire! 🔥",
  "Love the honesty! 💪",
  "That's the spirit! 🚀",
  "Perfect! Keep flowing! 🌊",
  "You've got this! ✨"
];

const funFacts = [
  "Did you know? Self-awareness is the #1 skill employers value!",
  "Fun fact: People who know themselves earn 23% more on average!",
  "Pro tip: There are no wrong answers, just honest ones!",
  "Insight: Your unique combination is what makes you special!",
  "Research shows: Authentic career choices lead to 3x more satisfaction!",
  "Remember: Every answer reveals a piece of your awesome self!"
];

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  onAnswer,
  onNext,
  onPrev,
  sectionName,
  sectionColor,
}: QuestionCardProps) {
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [encouragementText, setEncouragementText] = useState("");
  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    // Show a fun fact every 5 questions
    if (questionNumber % 5 === 1) {
      setFunFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
    }
  }, [questionNumber]);

  const handleAnswer = (value: number) => {
    onAnswer(value);
    // Only show encouragement every 15 questions
    if (questionNumber % 15 === 0) {
      setEncouragementText(encouragements[Math.floor(Math.random() * encouragements.length)]);
      setShowEncouragement(true);
      setTimeout(() => setShowEncouragement(false), 1500);
    }
  };

  const colorClasses = {
    coral: {
      bg: "bg-coral",
      bgLight: "bg-coral-light",
      text: "text-coral",
      border: "border-coral",
      ring: "ring-coral",
      gradient: "from-coral/20 to-coral/5",
    },
    teal: {
      bg: "bg-teal",
      bgLight: "bg-teal-light",
      text: "text-teal",
      border: "border-teal",
      ring: "ring-teal",
      gradient: "from-teal/20 to-teal/5",
    },
    amber: {
      bg: "bg-amber",
      bgLight: "bg-amber-light",
      text: "text-amber",
      border: "border-amber",
      ring: "ring-amber",
      gradient: "from-amber/20 to-amber/5",
    },
  };

  const colors = colorClasses[sectionColor];
  const progress = (questionNumber / totalQuestions) * 100;

  const getIcon = (value: number) => {
    switch (value) {
      case 1: return null;
      case 2: return null;
      case 3: return <Star className="w-4 h-4" />;
      case 4: return <Heart className="w-4 h-4" />;
      case 5: return <Rocket className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      key={questionNumber}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <motion.span 
            className={cn("px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2", colors.bg, "text-primary-foreground")}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {sectionName}
          </motion.span>
          <span className="text-sm text-muted-foreground font-body">
            {questionNumber} of {totalQuestions}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className={cn("h-full rounded-full", colors.bg)}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Fun Fact (shows every 5 questions) */}
      <AnimatePresence>
        {funFact && questionNumber % 5 === 1 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn("mb-4 p-3 rounded-xl bg-gradient-to-r", colors.gradient, "border border-border")}
          >
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Zap className={cn("w-4 h-4", colors.text)} />
              {funFact}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Question Card */}
      <motion.div 
        className="bg-card rounded-2xl p-8 shadow-elevated border border-border relative overflow-hidden"
        whileHover={{ boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
      >
        {/* Floating Encouragement */}
        <AnimatePresence>
          {showEncouragement && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg z-10"
            >
              {encouragementText}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h2 
          className="text-xl md:text-2xl font-display font-bold text-foreground mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {question}
        </motion.h2>

        {/* Rating Buttons */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((value, index) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.2 }}
              onClick={() => handleAnswer(value)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left transition-colors duration-200 flex items-center justify-between group",
                currentAnswer === value
                  ? cn(colors.border, colors.bgLight, "shadow-card")
                  : "border-border bg-background hover:border-muted-foreground/30 hover:bg-muted"
              )}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  animate={currentAnswer === value ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all",
                    currentAnswer === value
                      ? cn(colors.bg, "text-primary-foreground")
                      : "bg-muted text-muted-foreground group-hover:bg-border"
                  )}
                >
                  {value}
                </motion.div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "font-body text-base",
                    currentAnswer === value ? "text-foreground font-semibold" : "text-muted-foreground"
                  )}>
                    {ratingLabels[value - 1]}
                  </span>
                  {currentAnswer === value && getIcon(value) && (
                    <motion.span
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className={colors.text}
                    >
                      {getIcon(value)}
                    </motion.span>
                  )}
                </div>
              </div>
              
              {currentAnswer === value && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={cn("w-3 h-3 rounded-full", colors.bg)} 
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.div 
        className="flex justify-between mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="ghost" onClick={onPrev} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <motion.div
          whileHover={{ scale: currentAnswer ? 1.05 : 1 }}
          whileTap={{ scale: currentAnswer ? 0.95 : 1 }}
        >
          <Button 
            variant={currentAnswer ? "hero" : "soft"} 
            onClick={onNext}
            disabled={!currentAnswer}
            className="gap-2"
          >
            {questionNumber === totalQuestions ? (
              <>
                Finish Section
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}