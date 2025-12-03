"use client";

import CMIQuestionnaire from "@/components/features/cmi/questionnaire/CMIQuestionnaire";
import CMITestHeader from "@/components/features/cmi/questionnaire/CMITestHeader";
import { useState, useCallback } from "react";

import type { Answers } from "@/lib/cmi/scoring";
import type { TraitScoresByTrait, getResult } from "@/lib/cmi/content";

type CompletionData = {
  answers: Answers;
  traitScores: TraitScoresByTrait;
  result: ReturnType<typeof getResult>;
  email: string;
  subscribe: boolean;
};

function CMITestPage() {
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const [progress, setProgress] = useState({
    current: 1,
    total: 1,
    onPrevious: () => {},
  });
  
  const handleFinish = (data: CompletionData) => {
    const { answers: finalAnswers, email } = data; // Destructure the relevant parts

    setAnswers(finalAnswers);
    // TO-DO: Send email to backend API (now with the correctly extracted 'email')
    setIsFinished(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProgressChange = useCallback((data: { current: number; total: number; onPrevious: () => void }) => {
    setProgress(data);
  }, []);
  
  return (
    <>
      <CMITestHeader 
        current={progress.current} 
        total={progress.total} 
        onPrevious={progress.onPrevious} 
      />
      
      <CMIQuestionnaire 
        onComplete={handleFinish} 
        onProgressChange={handleProgressChange}
      />
    </>
  )
}

export default CMITestPage