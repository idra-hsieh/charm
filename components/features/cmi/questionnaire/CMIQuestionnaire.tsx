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

interface Props {
  onComplete: (answers: Record<string, number>, email: string) => void;
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

export default function CMIQuestionnaire({ onComplete, onProgressChange }: Props) {
  const t = useTranslations("cmi.ui");
  
  // State
  const [questions] = useState(() => shuffleArray(QUESTIONS));
  
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
  const canFinish = isPageComplete && email.length > 5 && email.includes("@");

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
    onComplete(finalScores, email);
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
      <div className="mt-12 flex flex-col items-center gap-6 px-4 md:px-2">
        {!isLastPage ? (
          <div className="relative flex flex-col items-center">
            <Button 
              onClick={handleNextClick}
              size="sm"
              aria-disabled={!isPageComplete}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "rounded-xl px-8 py-5 text-xs font-medium uppercase tracking-[0.16em]",
                // colors
                "bg-accent/85 text-background",
                // subtle elevation
                "shadow-[0_6px_16px_rgba(187,147,100,0.28)]",
                // transitions
                "transition-all duration-200 ease-out",
                // hover / active (only when completed)
                isPageComplete
                  ? "hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(187,147,100,0.35)] hover:bg-accent"
                  : "",
                "active:translate-y-0 active:shadow-[0_3px_10px_rgba(187,147,100,0.25)]",
                // focus
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                // pseudo-disabled to show reminder message when clicking next page before completing
                !isPageComplete &&
                  "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-[0_6px_16px_rgba(187,147,100,0.28)]"
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#1c1c1c] p-8 rounded-2xl border border-white/10 shadow-2xl space-y-6"
          >
            <div className="space-y-2 text-center md:text-left">
              <Label htmlFor="email" className="text-xl font-primary text-white">
                {t("email_title")}
              </Label>
              <p className="text-sm text-white/50">
                {t("email_desc")}
              </p>
            </div>
            
            <Input 
              id="email" 
              type="email" 
              placeholder={t("email_placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-white/20 text-white h-12 text-lg"
            />
            
            <Button 
              onClick={handleFinish} 
              disabled={!canFinish}
              className="w-full h-14 rounded-full text-lg bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20 font-semibold"
            >
              {t("reveal_results")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
