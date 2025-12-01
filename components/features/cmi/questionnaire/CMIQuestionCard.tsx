"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface Props {
  question: { id: string }; 
  index: number;
  isFocused: boolean;
  selectedValue?: number;
  onSelect: (val: number) => void;
  onFocus: () => void;
}

function CMIQuestionCard({ 
  question, index, isFocused, selectedValue, onSelect, onFocus 
}: Props) {
  const tQuestions = useTranslations("cmi.questions");
  const tUi = useTranslations("cmi.ui");
    
  const ref = useRef<HTMLDivElement>(null);

  // Auto-scroll when focused
  useEffect(() => {
    if (isFocused && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isFocused]);
    
    const disagreeActive = selectedValue != undefined && selectedValue <= 2;
    const agreeActive = selectedValue !== undefined && selectedValue >= 4;

  return (
    <motion.div
      ref={ref}
      onClick={onFocus}
      animate={{ 
        opacity: isFocused ? 1 : 0.65, 
        scale: isFocused ? 1 : 0.98,
        // filter: isFocused ? "blur(0px)" : "blur(1px)"
      }}
      className={cn(
        "relative p-8 rounded-xl border transition-all duration-500 cursor-pointer",
        isFocused 
          ? "bg-marble border-accent shadow-2xl z-10" 
          : "bg-marble border-transparent z-0 hover:border-accent hover:-translate-y-[1.5px]"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h3 className="text-foreground/80 font-secondary font-semibold text-sm font-light leading-snug flex-1 tracking-wide">
          {index}. {" "}
          {tQuestions(question.id)}
        </h3>

        {/* Likert Scale */}
        <div className="flex items-center gap-4 shrink-0">
            
          {/* DISAGREE label */}
        <span
            className={cn(
              "text-accent/90 text-[11px] uppercase tracking-[0.16em] transition-all duration-200",
              disagreeActive && "text-accent font-semibold"
            )}
        >
            {tUi('disagree')}
        </span>
          
          <div className="flex gap-4 justify-center items-center">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent focusing the card again if handled by parent
                  onSelect(val);
                }}
                className={cn(
                // base
                "relative flex items-center justify-center w-6 rounded-full border cursor-pointer",
                "transition-all duration-200 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                
                // shape
                val === 3
                    ? "w-6 h-8"
                    : val === 2 || val === 4
                        ? "w-6 h-10"
                        : "w-6 h-12",

                // state
                selectedValue === val 
                    ? "bg-accent border-accent scale-105 shadow-[0_8px_20px_rgba(187,147,100,0.35)]"
                    : "bg-background/95 border-accent/30 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:bg-accent/10 hover:border-accent/70 hover:-translate-y-[1px] active:scale-95"
                )}
                aria-label={`Select option ${val}`}
              />
            ))}
          </div>

          {/* AGREE label */}
          <span
            className={cn(
              "text-accent/90 text-[11px] uppercase tracking-[0.16em] transition-all duration-200",
              agreeActive && "text-accent font-semibold"
            )}
          >
            {tUi('agree')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default CMIQuestionCard