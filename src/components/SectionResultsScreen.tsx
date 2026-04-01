import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { riasecLabels, higherOrderValues } from "@/data/quizData";
import type { RiasecScores, BigFiveScores, ValueScores } from "@/hooks/useAssessment";
import { 
  Compass, 
  Heart, 
  Brain, 
  ArrowRight,
  Sparkles,
  Star,
  Zap,
  Target,
  Rocket,
  Trophy,
  Flame,
  Crown
} from "lucide-react";
import { motion } from "framer-motion";

interface SectionResultsScreenProps {
  section: "riasec" | "values" | "bigfive";
  riasecScores?: RiasecScores;
  topRiasecCodes?: string[];
  valuesScores?: ValueScores;
  higherOrderScores?: Record<string, number>;
  bigFiveScores?: BigFiveScores;
  onContinue: () => void;
}

export function SectionResultsScreen({
  section,
  riasecScores,
  topRiasecCodes = [],
  valuesScores,
  higherOrderScores = {},
  bigFiveScores,
  onContinue,
}: SectionResultsScreenProps) {
  if (section === "riasec") {
    return <RiasecResults riasecScores={riasecScores!} topRiasecCodes={topRiasecCodes} onContinue={onContinue} />;
  }
  
  if (section === "values") {
    return <ValuesResults valuesScores={valuesScores!} higherOrderScores={higherOrderScores} onContinue={onContinue} />;
  }
  
  return <BigFiveResults bigFiveScores={bigFiveScores!} onContinue={onContinue} />;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const
  }
};

function RiasecResults({
  riasecScores, 
  topRiasecCodes, 
  onContinue 
}: { 
  riasecScores: RiasecScores; 
  topRiasecCodes: string[]; 
  onContinue: () => void;
}) {
  const hollandCode = topRiasecCodes.slice(0, 3).join("");
  const funMessages: Record<string, { title: string; emoji: string; description: string }> = {
    R: { 
      title: "The Maker",
      emoji: "🔧", 
      description: "You love getting your hands dirty and seeing real results. Building, fixing, creating - that's your zone!" 
    },
    I: { 
      title: "The Thinker",
      emoji: "🧠", 
      description: "Complex puzzles and big questions are your jam. You're the one asking 'but why?' and loving it!" 
    },
    A: { 
      title: "The Creator",
      emoji: "🎨", 
      description: "The world is your canvas! Ideas flow freely and you see possibilities everywhere others don't." 
    },
    S: { 
      title: "The Helper",
      emoji: "💙", 
      description: "Making others feel good makes YOU feel amazing. You're the heart of every group!" 
    },
    E: { 
      title: "The Leader",
      emoji: "🚀", 
      description: "You love taking charge and making things happen. Born to lead, inspire, and win!" 
    },
    C: { 
      title: "The Organizer",
      emoji: "📊", 
      description: "Order and precision are your superpowers. Chaos? Not on your watch!" 
    },
  };

  const topThree = topRiasecCodes.slice(0, 3);
  const gradients = [
    "from-coral via-coral-dark to-amber",
    "from-teal via-teal-dark to-mint", 
    "from-lavender via-lavender-dark to-coral"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-coral/5 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <motion.div 
        className="max-w-2xl w-full text-center space-y-6 md:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-coral to-amber text-primary-foreground shadow-2xl shadow-coral/30"
            animate={floatAnimation}
          >
            <Compass className="w-12 h-12" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <span className="bg-gradient-to-r from-coral via-amber to-teal bg-clip-text text-transparent">
              You Did It! 
            </span>
            <span className="ml-2">🎉</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
            variants={itemVariants}
          >
            We just unlocked your interest DNA. Here's what makes you tick:
          </motion.p>
        </motion.div>

        {/* Holland Code Badge - Animated */}
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-coral/20 via-amber/20 to-teal/20 blur-xl rounded-3xl" />
          <div className="relative inline-flex items-center gap-4 bg-card/80 backdrop-blur-sm px-8 py-5 rounded-2xl border-2 border-coral/30 shadow-xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Crown className="w-8 h-8 text-amber" />
            </motion.div>
            <div className="text-left">
              <span className="text-sm font-medium text-muted-foreground">Your Holland Code</span>
              <div className="font-display font-bold text-3xl md:text-4xl tracking-wider">
                {hollandCode.split('').map((code, i) => (
                  <motion.span 
                    key={i}
                    className={cn(
                      "inline-block",
                      i === 0 && "text-coral",
                      i === 1 && "text-teal",
                      i === 2 && "text-amber"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                  >
                    {code}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Interests - Cards with Animations */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-coral" />
            Your Top 3 Interests
          </h2>
          <div className="grid gap-4">
            {topThree.map((code, i) => {
              const label = riasecLabels[code];
              const info = funMessages[code];
              const score = riasecScores[code as keyof RiasecScores];
              
              return (
                <motion.div 
                  key={code}
                  className={cn(
                    "relative p-5 md:p-6 rounded-2xl text-left overflow-hidden",
                    "bg-gradient-to-r text-primary-foreground",
                    gradients[i],
                    "shadow-xl"
                  )}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated background particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <motion.span 
                        className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl shadow-lg"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                      >
                        {info.emoji}
                      </motion.span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                            #{i + 1}
                          </span>
                          <span className="font-display font-bold text-lg opacity-90">{info.title}</span>
                        </div>
                        <h3 className="font-display font-bold text-xl">{label?.name}</h3>
                        <p className="text-sm opacity-90 mt-1">{info.description}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <motion.div 
                        className="text-3xl font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.2, type: "spring" }}
                      >
                        {score}
                      </motion.div>
                      <p className="text-xs opacity-80">points</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Fun Fact Box */}
        <motion.div 
          className="bg-gradient-to-br from-muted/50 to-muted/30 p-5 rounded-2xl border border-border/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-6 h-6 text-amber flex-shrink-0" />
            </motion.div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Fun fact!</h3>
              <p className="text-muted-foreground text-sm">
                Your code <span className="font-bold text-coral">{hollandCode}</span> is like your career fingerprint! 
                People with similar codes often end up loving the same types of work. Pretty cool, right? 🎯
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <Button 
            onClick={onContinue} 
            size="lg" 
            className="gap-3 text-lg px-10 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all"
          >
            <span>Next: Discover Your Values</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.p 
          className="text-sm text-muted-foreground"
          variants={itemVariants}
        >
          2 more quick sections — you're crushing it! 💪
        </motion.p>
      </motion.div>
    </div>
  );
}

function ValuesResults({ 
  valuesScores, 
  higherOrderScores, 
  onContinue 
}: { 
  valuesScores: ValueScores; 
  higherOrderScores: Record<string, number>;
  onContinue: () => void;
}) {
  const topHigherOrder = Object.entries(higherOrderScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2);

  const valueDescriptions: Record<string, { emoji: string; title: string; description: string; meaning: string; color: string }> = {
    "Self-Transcendence": {
      emoji: "🌍",
      title: "The World Changer",
      description: "Caring for others & making a difference",
      meaning: "You find deep fulfillment in helping others and making the world better. Careers with social impact will absolutely light you up!",
      color: "from-teal via-mint to-teal-dark"
    },
    "Self-Enhancement": {
      emoji: "🏆",
      title: "The Achiever",
      description: "Success, recognition & personal growth",
      meaning: "You're driven to succeed and make your mark. Competitive environments and leadership roles are where you'll thrive!",
      color: "from-coral via-amber to-coral-dark"
    },
    "Openness to Change": {
      emoji: "✨",
      title: "The Explorer",
      description: "Freedom, adventure & new experiences",
      meaning: "You crave novelty and independence. Careers offering variety, creativity, and autonomy will keep you energized!",
      color: "from-lavender via-coral to-lavender-dark"
    },
    "Conservation": {
      emoji: "🏛️",
      title: "The Guardian",
      description: "Stability, tradition & security",
      meaning: "You value security and doing things right. Stable careers with clear structures feel like home to you!",
      color: "from-amber via-coral to-amber-dark"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-teal/5 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <motion.div 
        className="max-w-2xl w-full text-center space-y-6 md:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-teal to-mint text-primary-foreground shadow-2xl shadow-teal/30"
            animate={floatAnimation}
          >
            <Heart className="w-12 h-12" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <span className="bg-gradient-to-r from-teal via-mint to-lavender bg-clip-text text-transparent">
              Values Unlocked!
            </span>
            <span className="ml-2">💫</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
            variants={itemVariants}
          >
            Now we know what truly matters to you. This is your internal compass!
          </motion.p>
        </motion.div>

        {/* Core Values Cards */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center justify-center gap-2">
            <Target className="w-5 h-5 text-teal" />
            Your Core Values
          </h2>
          <div className="grid gap-4">
            {topHigherOrder.map(([value, score], i) => {
              const info = valueDescriptions[value];
              
              return (
                <motion.div 
                  key={value}
                  className={cn(
                    "relative p-5 md:p-6 rounded-2xl text-left overflow-hidden",
                    "bg-gradient-to-r text-primary-foreground",
                    info?.color || "from-teal to-mint",
                    "shadow-xl"
                  )}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div 
                      className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-3">
                      <motion.span 
                        className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        {info?.emoji}
                      </motion.span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold mb-1 inline-block">
                              #{i + 1} VALUE
                            </span>
                            <h3 className="font-display font-bold text-2xl">{info?.title}</h3>
                          </div>
                          <motion.div 
                            className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.2, type: "spring" }}
                          >
                            <Trophy className="w-7 h-7" />
                          </motion.div>
                        </div>
                        <p className="text-sm opacity-90">{info?.description}</p>
                      </div>
                    </div>
                    <p className="text-sm opacity-95 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                      {info?.meaning}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div 
          className="bg-gradient-to-br from-muted/50 to-muted/30 p-5 rounded-2xl border border-border/50 backdrop-blur-sm"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-6 h-6 text-teal flex-shrink-0" />
            </motion.div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground">Why this matters 🎯</h3>
              <p className="text-muted-foreground text-sm">
                Your values are like your internal GPS. When your work aligns with what you truly care about, 
                you'll feel <span className="font-bold text-teal">energized</span> instead of drained. This is key to loving what you do!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <Button 
            onClick={onContinue} 
            size="lg" 
            className="gap-3 text-lg px-10 py-6 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all"
          >
            <span>Final Section: Your Personality</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.p 
          className="text-sm text-muted-foreground"
          variants={itemVariants}
        >
          Just 1 more section — you're almost there! 🎯
        </motion.p>
      </motion.div>
    </div>
  );
}

function BigFiveResults({ 
  bigFiveScores, 
  onContinue 
}: { 
  bigFiveScores: BigFiveScores; 
  onContinue: () => void;
}) {
  const traitInfo: Record<string, { emoji: string; title: string; high: string; low: string; color: string }> = {
    Openness: {
      emoji: "🎨",
      title: "Imagination",
      high: "Imaginative & curious — you LOVE exploring new ideas and experiences!",
      low: "Practical & grounded — you prefer tried-and-true approaches that work!",
      color: "from-lavender via-coral to-lavender-dark"
    },
    Conscientiousness: {
      emoji: "🎯",
      title: "Organization",
      high: "Organized & disciplined — you get things done and done RIGHT!",
      low: "Flexible & spontaneous — you go with the flow and adapt quickly!",
      color: "from-teal via-mint to-teal-dark"
    },
    Extraversion: {
      emoji: "⚡",
      title: "Energy Style",
      high: "Outgoing & energetic — people give you POWER!",
      low: "Reserved & thoughtful — you recharge in your own space!",
      color: "from-coral via-amber to-coral-dark"
    },
    Agreeableness: {
      emoji: "🤝",
      title: "Team Style",
      high: "Cooperative & warm — you're a natural team player who brings harmony!",
      low: "Independent & direct — you challenge ideas and think for yourself!",
      color: "from-mint via-teal to-mint-dark"
    },
    Neuroticism: {
      emoji: "🧘",
      title: "Emotional Style",
      high: "Emotionally aware — you feel things deeply and that's a strength!",
      low: "Calm & stable — you stay cool under pressure like a pro!",
      color: "from-amber via-coral to-amber-dark"
    }
  };

  const sortedTraits = (Object.entries(bigFiveScores) as [keyof BigFiveScores, number][])
    .sort(([, a], [, b]) => b - a);

  const strongestTrait = sortedTraits[0];
  const secondStrongest = sortedTraits[1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-amber/5 flex items-center justify-center p-4 md:p-6 overflow-hidden">
      <motion.div 
        className="max-w-2xl w-full text-center space-y-6 md:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Header */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <motion.div 
            className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-amber to-coral text-primary-foreground shadow-2xl shadow-amber/30"
            animate={floatAnimation}
          >
            <Brain className="w-12 h-12" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-display font-bold"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <span className="bg-gradient-to-r from-amber via-coral to-lavender bg-clip-text text-transparent">
              All Done!
            </span>
            <span className="ml-2">🚀</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto"
            variants={itemVariants}
          >
            We've mapped your unique personality. Here's what makes you, YOU!
          </motion.p>
        </motion.div>

        {/* Top 2 Traits - Hero Cards */}
        <motion.div className="space-y-4" variants={itemVariants}>
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center justify-center gap-2">
            <Rocket className="w-5 h-5 text-amber" />
            Your Standout Traits
          </h2>
          <div className="grid gap-4">
            {[strongestTrait, secondStrongest].map(([trait, score], i) => {
              const info = traitInfo[trait];
              const isHigh = score >= 60;
              
              return (
                <motion.div 
                  key={trait}
                  className={cn(
                    "relative p-5 md:p-6 rounded-2xl text-left overflow-hidden",
                    "bg-gradient-to-r text-primary-foreground",
                    info.color,
                    "shadow-xl"
                  )}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Animated glow */}
                  <motion.div 
                    className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative flex items-start gap-4">
                    <motion.span 
                      className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl shadow-lg"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      {info.emoji}
                    </motion.span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">
                          {isHigh ? "HIGH" : score >= 40 ? "BALANCED" : "LOW"}
                        </span>
                        <span className="text-sm opacity-80">{score}%</span>
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-1">{trait}</h3>
                      <p className="text-sm opacity-95">
                        {isHigh ? info.high : info.low}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Full Breakdown */}
        <motion.div 
          className="bg-card/80 backdrop-blur-sm p-5 rounded-2xl border border-border/50 shadow-lg"
          variants={itemVariants}
        >
          <h3 className="font-semibold text-foreground mb-4 text-left flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber" />
            Your Complete Profile
          </h3>
          <div className="space-y-4">
            {sortedTraits.map(([trait, score], index) => {
              const info = traitInfo[trait];
              return (
                <motion.div 
                  key={trait} 
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <span className="text-2xl">{info.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{trait}</span>
                      <span className="text-sm font-bold text-muted-foreground">{score}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        className={cn(
                          "h-full rounded-full",
                          score >= 60 && "bg-gradient-to-r from-teal to-mint",
                          score >= 40 && score < 60 && "bg-gradient-to-r from-amber to-coral",
                          score < 40 && "bg-muted-foreground"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Magic Message */}
        <motion.div 
          className="bg-gradient-to-r from-coral/10 via-teal/10 to-lavender/10 p-5 rounded-2xl border border-coral/30 backdrop-blur-sm"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-7 h-7 text-coral flex-shrink-0" />
            </motion.div>
            <div className="text-left">
              <h3 className="font-semibold text-foreground text-lg">Time for the magic! ✨</h3>
              <p className="text-muted-foreground">
                We've combined your <span className="font-bold text-coral">interests</span>, <span className="font-bold text-teal">values</span>, and <span className="font-bold text-amber">personality</span> to 
                find majors and careers that are genuinely right for YOU. Get ready for some eye-opening recommendations!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div variants={itemVariants} className="pt-2">
          <Button 
            onClick={onContinue} 
            size="lg" 
            className="gap-3 text-lg px-10 py-6 bg-gradient-to-r from-coral to-amber hover:from-coral-dark hover:to-amber-dark shadow-xl shadow-coral/30 hover:shadow-2xl hover:shadow-coral/40 transition-all"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Trophy className="w-6 h-6" />
            </motion.div>
            <span>See My Results!</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
