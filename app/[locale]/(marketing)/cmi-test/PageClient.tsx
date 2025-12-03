"use client";

import CMIQuestionnaire from "@/components/features/cmi/questionnaire/CMIQuestionnaire";
import CMITestHeader from "@/components/features/cmi/questionnaire/CMITestHeader";
import { useState, useCallback } from "react";

import type { Answers } from "@/lib/cmi/scoring";
import type { TraitScoresByTrait, getResult } from "@/lib/cmi/content";
import { useLocale } from "next-intl";
import { CMISubmitPayload } from "@/lib/cmi/api-types";
import { useRouter } from "next/navigation";

type CompletionData = {
  answers: Answers;
  traitScores: TraitScoresByTrait;
  result: ReturnType<typeof getResult>;
  email: string;
  subscribe: boolean;
};

function CMITestPage() {
  const router = useRouter();
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [progress, setProgress] = useState({
    current: 1,
    total: 1,
    onPrevious: () => {},
  });
  
  const handleFinish = async (data: CompletionData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1. Construct the payload matching our API requirement
      const payload: CMISubmitPayload = {
        ...data,
        locale: locale, // Include the current user locale
      };

      // 2. Send data to the backend
      const response = await fetch("/api/cmi/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit results")
      }

      const { code } = await response.json();

      // 3. Redirect to the result page using the unique code
      router.push(`/cmi-test/result/${code}`);

    } catch (error) {
      console.error("Submission error: ", error);
      alert("Something went wrong while saving your results. Please try again.")
      setIsSubmitting(false);
    }
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
      
      {/* TO-DO: loading spinner when isSubmitting is true */}
      <CMIQuestionnaire 
        onComplete={handleFinish} 
        onProgressChange={handleProgressChange}
      />
    </>
  )
}

export default CMITestPage