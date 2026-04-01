import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles, Brain, Clock, ArrowRight, LogIn, LogOut, User, LayoutDashboard, School, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { SchoolCodeInput } from "@/components/SchoolCodeInput";
import manzilLogo from "@/assets/manzil-logo.jpg";

interface WelcomeScreenProps {
  onStart: () => void;
  onDirectUniversityFinder?: () => void;
  onPreviewResults?: () => void;
  hasExistingSession?: boolean;
  onResume?: () => void;
  resumeProgress?: number;
}

export function WelcomeScreen({ 
  onStart, 
  onDirectUniversityFinder, 
  onPreviewResults,
  hasExistingSession,
  onResume,
  resumeProgress = 0,
}: WelcomeScreenProps) {
  const { user, signOut } = useAuth();
  const { isSchoolAdmin } = useUserRole();
  const { profile, schoolName, joinSchool } = useProfile();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-muted/30 to-primary/10 relative">
      {/* Auth Header */}
      <header className="absolute top-4 right-4 z-50 flex items-center gap-2">
        {onPreviewResults && (
          <Button
            onClick={onPreviewResults}
            variant="outline"
            size="sm"
            className="text-xs bg-amber/10 border-amber/30 hover:bg-amber/20 text-amber"
          >
            🧪 Preview Results (Dev)
          </Button>
        )}
        
        {user ? (
          <div className="flex items-center gap-2">
            {isSchoolAdmin && (
              <Button
                onClick={() => navigate("/school")}
                variant="outline"
                size="sm"
                className="gap-1.5 border-teal/40 text-teal hover:bg-teal/10"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">School Dashboard</span>
              </Button>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground max-w-[150px] truncate">
                {user.email}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => navigate("/auth")}
            variant="outline"
            size="sm"
            className="gap-1.5"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </Button>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10">
          {/* Logo & Title */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl shadow-glow animate-bounce-gentle overflow-hidden ring-4 ring-primary/20">
              <img src={manzilLogo} alt="Manzil Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight">
              <span className="text-gradient">Manzil</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-body max-w-2xl mx-auto px-2 leading-relaxed">
              Discover your path or explore universities directly — <span className="text-gradient font-semibold">it's your journey</span>
            </p>
          </div>

          {/* School Badge - if linked */}
          {user && profile?.school_id && schoolName && (
            <div className="animate-fade-in inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm" style={{ animationDelay: "0.1s" }}>
              <School className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">{schoolName}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </div>
          )}

          {/* School Code Input - for authenticated users without a school */}
          {user && !profile?.school_id && (
            <div className="animate-fade-in max-w-lg mx-auto" style={{ animationDelay: "0.12s" }}>
              <SchoolCodeInput onJoin={joinSchool} variant="card" />
            </div>
          )}

          {/* Resume Session Banner */}
          {hasExistingSession && onResume && (
            <div className="animate-fade-in bg-teal/10 border border-teal/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ animationDelay: "0.15s" }}>
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">You have an unfinished assessment</p>
                  <p className="text-sm text-muted-foreground">{resumeProgress}% complete</p>
                </div>
              </div>
              <Button
                onClick={onResume}
                variant="outline"
                className="border-teal/40 text-teal hover:bg-teal/10 whitespace-nowrap"
              >
                Continue Where I Left Off
              </Button>
            </div>
          )}

          {/* Two Path Options */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {/* Option 1 - Career Discovery */}
            <PathCard
              icon={<Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="Find your ideal majors & careers"
              description="Take our fun quizzes to discover your interests, values, and personality, then see which majors and universities fit you."
              ctaText="Start Your Journey"
              ctaIcon={<Brain className="w-5 h-5" />}
              color="coral"
              timeNote="Takes ~10–15 minutes"
              onClick={onStart}
            />

            {/* Option 2 - Direct University Finder */}
            <PathCard
              icon={<GraduationCap className="w-8 h-8 sm:w-10 sm:h-10" />}
              title="I know my major & career"
              description="Skip the quizzes and jump straight to finding universities and scholarships that match your profile."
              ctaText="Find universities and scholarships"
              ctaIcon={<ArrowRight className="w-5 h-5" />}
              color="teal"
              onClick={onDirectUniversityFinder}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 sm:py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>Built for students. Designed to inspire.</p>
      </footer>
    </div>
  );
}

function PathCard({
  icon,
  title,
  description,
  ctaText,
  ctaIcon,
  color,
  timeNote,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  ctaText: string;
  ctaIcon: React.ReactNode;
  color: "coral" | "teal";
  timeNote?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const colorStyles = {
    coral: {
      iconBg: "bg-coral/10",
      iconText: "text-coral",
      border: "hover:border-coral/40 focus-within:border-coral/40",
      buttonBg: "bg-coral hover:bg-coral/90",
      glow: "hover:shadow-[0_0_30px_rgba(255,127,80,0.15)]",
    },
    teal: {
      iconBg: "bg-teal/10",
      iconText: "text-teal",
      border: "hover:border-teal/40 focus-within:border-teal/40",
      buttonBg: "bg-teal hover:bg-teal/90",
      glow: "hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]",
    },
  };

  const styles = colorStyles[color];

  return (
    <div
      className={`group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-card border-2 border-border shadow-card transition-all duration-300 ${disabled ? 'opacity-75' : `${styles.border} ${styles.glow}`} flex flex-col`}
    >
      
      <div className="flex flex-col items-center text-center space-y-4 sm:space-y-5 flex-1">
        {/* Icon */}
        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${disabled ? 'bg-muted' : styles.iconBg}`}>
          <div className={disabled ? 'text-muted-foreground' : styles.iconText}>{icon}</div>
        </div>

        {/* Content */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl">{title}</h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-1" />

        {/* CTA Button */}
        <Button
          onClick={onClick}
          disabled={disabled}
          className={`w-full ${disabled ? 'bg-muted text-muted-foreground cursor-not-allowed' : `${styles.buttonBg} text-white`} font-semibold py-4 sm:py-6 text-sm sm:text-base rounded-xl transition-transform duration-200 ${!disabled && 'group-hover:scale-[1.02]'}`}
        >
          {ctaText}
          {!disabled && ctaIcon}
        </Button>

        {/* Time Note - fixed height container */}
        <div className="h-5 sm:h-6 flex items-center justify-center">
          {timeNote && (
            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{timeNote}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
