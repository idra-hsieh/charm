"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { QUESTIONS, PAGE_SIZE } from "@/lib/cmi/data"; //
import { calculateAllScores } from "@/lib/cmi/scoring"; //
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CMIQuestionCard from "./CMIQuestionCard";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onComplete: (answers: Record<string, number>, email: string, subscribe: boolean) => void;
  onProgressChange?: (data: { current: number; total: number; onPrevious: () => void }) => void;
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const BUTTON_BASE_STYLES = cn(
  "inline-flex items-center justify-center gap-2",
  "rounded-xl px-8 py-5 text-xs font-medium uppercase tracking-[0.16em]",
  "transition-all duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
);

const BUTTON_ACTIVE_STYLES = cn(
  "bg-accent/85 text-background",
  "shadow-[0_6px_16px_rgba(187,147,100,0.28)]",
  "hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(187,147,100,0.35)] hover:bg-accent",
  "active:translate-y-0 active:shadow-[0_3px_10px_rgba(187,147,100,0.25)]"
);

const BUTTON_DISABLED_STYLES = cn(
  "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-[0_6px_16px_rgba(187,147,100,0.28)]"
);

function CMIQuestionnaire({ onComplete, onProgressChange }: Props) {
  const t = useTranslations("cmi.ui");
  
  // State
  const [questions] = useState(() => shuffleArray(QUESTIONS));
  const [subscribe, setSubscribe] = useState(false);
  
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [email, setEmail] = useState("");

  // Derived Data
  const totalPages = Math.ceil(QUESTIONS.length / PAGE_SIZE);
  const isLastPage = currentPage === totalPages - 1;

  // Get questions for the current page from the RANDOMIZED list
  const currentQuestions = useMemo(() => {
    const start = currentPage * PAGE_SIZE;
    return questions.slice(start, start + PAGE_SIZE);
  }, [currentPage, questions]);

  const isPageComplete = currentQuestions.every((q) => answers[q.id] !== undefined);

  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = EMAIL_REGEX.test(email);

  // Handlers
  const handleAnswer = (qId: string, val: number) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));

    // Auto-focus logic relative to the randomized list
    const currentQIndex = questions.findIndex((q) => q.id === qId);
    if (currentQIndex < questions.length - 1) {
      setFocusedIndex(currentQIndex + 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setFocusedIndex(nextPage * PAGE_SIZE); // Focus first Q of next page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const handleNextClick = () => {
    if (!isPageComplete) {
      setShowIncompleteWarning(true);
      setTimeout(() => setShowIncompleteWarning(false), 2500);
      return;
    }
    handleNext();
  };

  const handlePrevious = useCallback(() => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setFocusedIndex(prevPage * PAGE_SIZE);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  const handleFinish = () => {
    // Calculate scores using original constant (IDs match)
    const finalScores = calculateAllScores(QUESTIONS, answers);
    onComplete(finalScores, email, subscribe);
  };

  useEffect(() => {
    if (onProgressChange) {
      onProgressChange({
        current: currentPage + 1,
        total: totalPages,
        onPrevious: handlePrevious,
      });
    }
  }, [currentPage, totalPages, handlePrevious, onProgressChange]);

  // If questions failed to load for some reason, safeguard
  if (!questions.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 pt-10 pb-23">
      {/* Question List */}
      <div className="space-y-6">
        {currentQuestions.map((q, idx) => {
          const globalIndex = currentPage * PAGE_SIZE + idx;
          const isFocused = globalIndex === focusedIndex;

          return (
            <CMIQuestionCard
              key={q.id}
              question={q}
              index={globalIndex + 1}
              isFocused={isFocused}
              selectedValue={answers[q.id]}
              onSelect={(val) => handleAnswer(q.id, val)}
              onFocus={() => setFocusedIndex(globalIndex)}
            />
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-12 flex flex-col items-center gap-6 px-4">
        {!isLastPage ? (
          <div className="relative flex flex-col items-center">
            <Button 
              onClick={handleNextClick}
              size="sm"
              aria-disabled={!isPageComplete}
              className={cn(
                BUTTON_BASE_STYLES,
                BUTTON_ACTIVE_STYLES,
                !isPageComplete && BUTTON_DISABLED_STYLES
              )}
            >
              {t("next_page")} →
            </Button>

            {showIncompleteWarning && (
              <motion.p 
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-6 text-xs text-background/75 tracking-wide whitespace-nowrap"
              >
                {t("warning_incomplete")}
              </motion.p>
            )}
          </div>
        ) : (
          <motion.div 
            animate={{ 
              opacity: isPageComplete ? 1 : 0.4, 
              scale: isPageComplete ? 1 : 0.98,
              boxShadow: isPageComplete 
                ? "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px -5px rgba(187,147,100,0.15)" 
                : "0 0 0px 0px rgba(0,0,0,0)",
              borderColor: isPageComplete ? "rgba(187,147,100, 0.4)" : "rgba(255,255,255, 0.05)",
              backgroundColor: isPageComplete ? "rgba(28, 28, 28, 0.8)" : "rgba(20, 20, 20, 0.4)",
              pointerEvents: isPageComplete ? "auto" : "none"
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-3xl flex flex-col items-center space-y-8 p-10 rounded-2xl border backdrop-blur-sm mt-4"
          >
            <div className="text-center space-y-2">
              <Label htmlFor="email" className="block w-full uppercase text-center text-xl font-semibold tracking-[0.2em] text-background mb-4">
                {t("email_title")}
              </Label>
              <p className="text-xs text-background/80 tracking-widest opacity-70 max-w-[500px]">
                {t("email_desc")}
              </p>
            </div>
            
            <div className="relative w-full group max-w-xl">
              <Input 
                id="email" 
                type="email" 
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "h-9 text-center text-sm tracking-wider backdrop-blur-md",
                  "rounded-xl transition-all duration-300",
                  "hover:-translate-y-[1px] hover:border-accent/50",
                  "focus-visible:ring-0 focus-visible:-translate-y-[1px]",
                  isEmailValid 
                    ? "bg-accent/10 text-background/80 shadow-[0_0_20px_rgba(255,255,255,0.02)] placeholder:text-black/30 border-accent/50 focus-visible:border-accent/50"
                    : "bg-secondary/25 border-background/20 text-background placeholder:text-background/30 focus-visible:border-accent/40 focus-visible:shadow-[0_0_20px_rgba(187,147,100,0.1)]"
                )}
              />
            </div>
              
            <div className="flex items-center justify-center space-x-2.5 group">
                <Checkbox
                  id="newsletter" 
                  checked={subscribe}
                  onCheckedChange={(checked) => setSubscribe(checked as boolean)}
                  className={cn(
                    "border-white/30 data-[state=checked]:bg-accent data-[state=checked]:text-black data-[state=checked]:border-accent",
                    "h-4 w-4 rounded-xs transition-all duration-200",
                    "group-hover:border-accent/70"
                  )}
                />
                <Label
                  htmlFor="newsletter"
                  className={cn(
                    "text-xs font-light cursor-pointer select-none transition-all duration-200 transition-colors",
                    "group-hover:text-background/90",
                    subscribe ? "text-background/90" : "text-background/50"
                  )}
                >
                  {t("marketing_consent")}
                </Label>
            </div>
            
            <Button 
              onClick={handleFinish} 
              disabled={!isEmailValid}
              className={cn(
                BUTTON_BASE_STYLES,
                isEmailValid ? BUTTON_ACTIVE_STYLES : "opacity-30 cursor-not-allowed bg-accent/40 text-white/40 border border-white/5"
              )}
            >
              {t("reveal_results")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CMIQuestionnaire