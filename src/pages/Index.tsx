import { useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAssessment } from "@/hooks/useAssessment";
import { useAssessmentSession } from "@/hooks/useAssessmentSession";
import { useSaveUserActivity } from "@/hooks/useSaveUserActivity";
import { useAuth } from "@/contexts/AuthContext";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { ProgressSidebar } from "@/components/ProgressSidebar";
import { LiveResultsPanel } from "@/components/LiveResultsPanel";
import { ResultsScreen } from "@/components/ResultsScreen";
import { MobileProgress } from "@/components/MobileProgress";
import { SectionResultsScreen } from "@/components/SectionResultsScreen";
import { GlobalPathwaysModule } from "@/components/GlobalPathways";
import { UniversityFinderModule } from "@/components/UniversityFinder";
import { ResumeSessionPrompt } from "@/components/ResumeSessionPrompt";
import { toast } from "sonner";

const Index = () => {
  const {
    currentStep,
    riasecIndex,
    valuesIndex,
    bigFiveIndex,
    riasecAnswers,
    valuesAnswers,
    bigFiveAnswers,
    riasecScores,
    topRiasecCodes,
    valuesScores,
    higherOrderScores,
    bigFiveScores,
    majorResults,
    riasecProgress,
    valuesProgress,
    bigFiveProgress,
    totalProgress,
    answerRiasec,
    answerValues,
    answerBigFive,
    goToStep,
    nextQuestion,
    prevQuestion,
    riasecQuestions,
    valuesQuestions,
    bigFiveQuestions,
    goToUniversityFinder,
    restoreSession,
    skipToResults,
  } = useAssessment();

  const {
    isLoading: sessionLoading,
    hasExistingSession,
    resumeSession,
    initSession,
    saveProgress,
    markCompleted,
  } = useAssessmentSession();

  const { saveUserActivity } = useSaveUserActivity();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const hasTriggeredSaveRef = useRef(false);

  // University Finder is locked globally EXCEPT for whitelisted emails and FULL_ACCESS schools (like LAL)
  const UNLOCKED_EMAILS = ["oneirraza@gmail.com", "rkonnections@mock.com", "hassanmehmod2002@gmail.com"];
  const lockUniversityFinder = !UNLOCKED_EMAILS.includes(user?.email ?? "") && user?.schoolTier !== "FULL_ACCESS";

  // Handle direct university finder - require sign-in first, and block for QUIZ_ONLY
  const handleUniversityFinder = useCallback(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (lockUniversityFinder) {
      // Silently no-op — the UI should never call this when locked, but be defensive
      return;
    }
    goToUniversityFinder();
  }, [user, navigate, goToUniversityFinder, lockUniversityFinder]);

  // Read view parameter to restore university finder state when navigating back
  useEffect(() => {
    if (searchParams.get("view") === "finder") {
      if (lockUniversityFinder) {
        // Strip the param but do NOT navigate to university-finder
        setSearchParams({}, { replace: true });
        return;
      }
      if (currentStep !== "university-finder") {
        goToUniversityFinder();
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, currentStep, goToUniversityFinder, setSearchParams, lockUniversityFinder]);

  // Redirect stale university-finder state back to welcome for locked users
  useEffect(() => {
    if (lockUniversityFinder && currentStep === "university-finder") {
      goToStep("welcome");
      toast("University Finder isn't available on your plan yet.");
    }
  }, [lockUniversityFinder, currentStep, goToStep]);

  // Save progress whenever answers or step changes
  useEffect(() => {
    if (currentStep !== "welcome" && currentStep !== "university-finder") {
      saveProgress({
        current_step: currentStep,
        riasec_answers: riasecAnswers,
        values_answers: valuesAnswers,
        big_five_answers: bigFiveAnswers,
        riasec_scores: riasecScores,
        top_riasec_codes: topRiasecCodes,
        value_scores: valuesScores,
        higher_order_scores: higherOrderScores,
        big_five_scores: bigFiveScores,
        major_results: majorResults,
        career_results: [],
      });
    }
  }, [currentStep, riasecAnswers, valuesAnswers, bigFiveAnswers, riasecScores, topRiasecCodes, valuesScores, higherOrderScores, bigFiveScores, majorResults, saveProgress]);

  // Mark completed and save user activity when reaching results
  useEffect(() => {
    if (currentStep === "results") {
      markCompleted();
      
      // Save user activity (only once per assessment)
      if (!hasTriggeredSaveRef.current) {
        hasTriggeredSaveRef.current = true;
        saveUserActivity({
          riasecAnswers,
          valuesAnswers,
          bigFiveAnswers,
          majorResults,
        });
      }
    }
  }, [currentStep, markCompleted, saveUserActivity, riasecAnswers, valuesAnswers, bigFiveAnswers, majorResults]);


  // Handle starting fresh - require sign-in first
  const handleStart = useCallback(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (totalProgress > 0) {
      goToStep("riasec");
      return;
    }
    goToStep("riasec");
    initSession();
  }, [user, navigate, initSession, goToStep, totalProgress]);

  // Handle resuming session - restore immediately
  const handleResume = useCallback(() => {
    if (resumeSession && restoreSession) {
      restoreSession({
        currentStep: resumeSession.current_step as any,
        riasecAnswers: resumeSession.riasec_answers || {},
        valuesAnswers: resumeSession.values_answers || {},
        bigFiveAnswers: resumeSession.big_five_answers || {},
      });
    }
  }, [resumeSession, restoreSession]);

  // Welcome screen - always show it first
  if (currentStep === "welcome") {
    if (sessionLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      );
    }

    return (
      <WelcomeScreen 
        onStart={handleStart} 
        onDirectUniversityFinder={handleUniversityFinder}
        onPreviewResults={user?.email === "oneirraza@gmail.com" ? skipToResults : undefined}
        hasExistingSession={hasExistingSession || totalProgress > 0}
        lockUniversityFinder={lockUniversityFinder}
        onResume={() => {
          if (totalProgress > 0) {
            goToStep("riasec");
          } else {
            handleResume();
          }
        }}
        resumeProgress={Math.max(
          Math.round(totalProgress), 
          hasExistingSession && resumeSession ? Math.round(
            ((Object.keys(resumeSession.riasec_answers || {}).length +
              Object.keys(resumeSession.values_answers || {}).length +
              Object.keys(resumeSession.big_five_answers || {}).length) /
              (riasecQuestions.length + valuesQuestions.length + bigFiveQuestions.length)) * 100
          ) : 0
        )}
      />
    );
  }

  // Direct University Finder (no quiz results)
  if (currentStep === "university-finder") {
    return (
      <div className="min-h-screen bg-background">
        <UniversityFinderModule 
          onBack={() => goToStep("welcome")}
        />
      </div>
    );
  }

  // Section Results screens
  if (currentStep === "riasec-results") {
    return (
      <SectionResultsScreen
        section="riasec"
        riasecScores={riasecScores}
        topRiasecCodes={topRiasecCodes}
        onContinue={() => goToStep("values")}
      />
    );
  }

  if (currentStep === "values-results") {
    return (
      <SectionResultsScreen
        section="values"
        valuesScores={valuesScores}
        higherOrderScores={higherOrderScores}
        onContinue={() => goToStep("bigfive")}
      />
    );
  }

  if (currentStep === "bigfive-results") {
    return (
      <SectionResultsScreen
        section="bigfive"
        bigFiveScores={bigFiveScores}
        onContinue={() => goToStep("results")}
      />
    );
  }

  // Final Results screen
  if (currentStep === "results") {
    return (
      <ResultsScreen
        majorResults={majorResults}
        riasecScores={riasecScores}
        topRiasecCodes={topRiasecCodes}
        higherOrderScores={higherOrderScores}
        bigFiveScores={bigFiveScores}
        onRestart={() => {
          window.location.reload();
        }}
        onUniversityFinder={() => goToStep("university-finder")}
        lockUniversityFinder={lockUniversityFinder}
      />
    );
  }

  // Quiz screens
  const getCurrentQuestion = () => {
    if (currentStep === "riasec") {
      return {
        question: riasecQuestions[riasecIndex],
        index: riasecIndex,
        total: riasecQuestions.length,
        answer: riasecAnswers[riasecQuestions[riasecIndex]?.id],
        onAnswer: (value: number) => answerRiasec(riasecQuestions[riasecIndex].id, value),
        sectionName: "Interests (RIASEC)",
        sectionColor: "coral" as const,
      };
    }
    if (currentStep === "values") {
      return {
        question: valuesQuestions[valuesIndex],
        index: valuesIndex,
        total: valuesQuestions.length,
        answer: valuesAnswers[valuesQuestions[valuesIndex]?.id],
        onAnswer: (value: number) => answerValues(valuesQuestions[valuesIndex].id, value),
        sectionName: "Personal Values",
        sectionColor: "teal" as const,
      };
    }
    return {
      question: bigFiveQuestions[bigFiveIndex],
      index: bigFiveIndex,
      total: bigFiveQuestions.length,
      answer: bigFiveAnswers[bigFiveQuestions[bigFiveIndex]?.id],
      onAnswer: (value: number) => answerBigFive(bigFiveQuestions[bigFiveIndex].id, value),
      sectionName: "Personality Traits",
      sectionColor: "amber" as const,
    };
  };

  const current = getCurrentQuestion();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <ProgressSidebar
        currentStep={currentStep}
        riasecProgress={riasecProgress}
        valuesProgress={valuesProgress}
        bigFiveProgress={bigFiveProgress}
        totalProgress={totalProgress}
        riasecScores={riasecScores}
        topRiasecCodes={topRiasecCodes}
        onStepClick={goToStep}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Progress */}
        <MobileProgress 
          currentStep={currentStep} 
          totalProgress={totalProgress} 
          onHomeClick={() => goToStep("welcome")} 
        />

        {/* Question Area */}
        <div className="flex-1 flex items-center justify-center p-6 pt-28 lg:pt-6">
          <QuestionCard
            question={current.question.text}
            questionNumber={current.index + 1}
            totalQuestions={current.total}
            currentAnswer={current.answer}
            onAnswer={current.onAnswer}
            onNext={nextQuestion}
            onPrev={prevQuestion}
            sectionName={current.sectionName}
            sectionColor={current.sectionColor}
          />
        </div>
      </main>

      {/* Live Results Panel - Development only */}
      {import.meta.env.DEV && (
        <LiveResultsPanel
          riasecScores={riasecScores}
          bigFiveScores={bigFiveScores}
          higherOrderScores={higherOrderScores}
          majorResults={majorResults}
          showMajors={bigFiveProgress > 0}
        />
      )}
    </div>
  );
};

export default Index;
