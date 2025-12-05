"use client";

import React, { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TraitScoresByTrait } from "@/lib/cmi/content";
import { Trait } from "@/lib/cmi/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  traitScores: TraitScoresByTrait;
}

const TRAITS: Trait[] = ["closeness", "control", "selfWorth", "boundary", "growth"];

export default function CMITraitScores({ traitScores }: Props) {
  const t = useTranslations("cmi.traits");
  const [activeTrait, setActiveTrait] = useState<Trait>("closeness");

  const activeScore = traitScores[activeTrait];

  // Calculate 0-100 axis score
  const calculateAxisPercent = (direction: number) => {
    return Math.round(((direction + 1) / 2) * 100);
  };

  const activePercent = calculateAxisPercent(activeScore.rawDirection);

  // Determine display text key
  let textKey = "mid";
  if (!activeScore.isBalancedZone) {
    textKey = activeScore.dominant; 
  }

  // Helper function for description
  const renderDescription = (key: string, prefixText?: string) => {
    const content = t.raw(key);
    const paragraphClass = "leading-loose text-md text-foreground/70 mb-4 last:mb-0";

    if (!Array.isArray(content)) {
      return (
        <p className={paragraphClass}>
           {prefixText && <span className="font-semibold text-foreground/90">{prefixText}</span>}
           {t(key)}
        </p>
      );
    }

    return content.map((paragraph, index) => (
      <p key={index} className={paragraphClass}>
        {index === 0 && prefixText && (
          <span className="font-semibold text-foreground/90">{prefixText}</span>
        )}
        {paragraph as string}
      </p>
    ));
  };

  const resultLabel = t(`${activeTrait}.${textKey}`);
  const traitName = t(`${activeTrait}.traitLabel`);
  const signature = t(`${activeTrait}.signature`);

  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="flex flex-wrap justify-center gap-3 mb-7">
        <h1 className="font-primary text-background text-3xl font-semibold tracking-wider">
          Your Trait Scores
        </h1>
      </div>

      {/* 1. Navigation Tabs - Updated Strategy
         Removed 'max-w-[600px]'. Now uses a logic-based break inside the loop.
         This guarantees 3 items on top and 2 on bottom regardless of text length (CN/JP/EN).
      */}
      <div className="flex flex-wrap justify-center gap-3 mb-10 w-full mx-auto">
        {TRAITS.map((trait, index) => {
          const score = traitScores[trait];
          const percent = calculateAxisPercent(score.rawDirection);
          const isActive = activeTrait === trait;

          return (
            <Fragment key={trait}>
              <button
                onClick={() => setActiveTrait(trait)}
                className={cn(
                  // Layout
                  "flex items-center justify-center gap-2 whitespace-nowrap",
                  "rounded-full border px-4 py-2 text-sm font-secondary text-center",
                  
                  // Colors & Transitions
                  "border-foreground/20 text-foreground/85",
                  "hover:border-accent/70 hover:bg-marble hover:shadow-md hover:-translate-y-[1.5px] transition capitalize",
                  
                  // Active State
                  isActive
                    ? "bg-marble border-primary text-foreground/80 shadow-md font-semibold"
                    : "bg-background/10 border-accent/80 text-background hover:font-medium hover:bg-background/15"
                )}
              >
                <span>{t(`${trait}.traitLabel`)}</span>
                <span
                  className={cn(
                    "text-xs px-1.5 py-0.5 rounded-md",
                    isActive
                      ? "bg-accent text-white"
                      : "bg-foreground/15 text-current opacity-70"
                  )}
                >
                  {percent}%
                </span>
              </button>

              {index === 2 && <div className="w-full lg:hidden" />}
            </Fragment>
          );
        })}
      </div>

      {/* 2. Content Card */}
      <div className="w-full rounded-3xl overflow-hidden shadow-2xl animate-fade-in [animation-duration:100ms]">
        <div
          key={activeTrait}
          className="bg-marble relative p-10 slide:p-14 min-h-[450px] flex flex-col items-center text-center animate-fade-in [animation-duration:400ms]"
        >
          <div className="text-[#050505] w-full max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Trait Name & Percent + SHADCN TOOLTIP */}
            <div className="flex items-center justify-center gap-2 mb-3 text-foreground/80 relative">
              <h3 className="text-2xl font-primary font-bold tracking-wide capitalize">
                {traitName}
                {" : "}
              </h3>
              <span className="text-2xl font-primary font-black">
                {activePercent}%
              </span>

              {/* Tooltip Implementation */}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help ml-0.5 p-0.5 hover:text-accent transition-colors text-foreground/40">
                      <CircleHelp size={20} />
                    </div>
                  </TooltipTrigger>
                  
                  <TooltipContent 
                    side="right" 
                    className="shadow-xl max-w-xs p-4 rounded-xl backdrop-blur-sm"
                  >
                    <p className="mb-1 text-sm font-semibold text-accent font-secondary capitalize">
                      {traitName}
                    </p>
                    <p className="text-xs leading-relaxed font-secondary opacity-90">
                      {signature}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>

            {/* Pole Label */}
            <p className="flex items-center mb-8 text-2xl font-primary text-accent tracking-wide uppercase font-[1000]">
              {resultLabel}
            </p>

            {/* Slider Visualization - TARGET STYLE */}
            <div className="w-full max-w-[600px] mb-2">
              <div className="relative h-4 bg-black/10 rounded-full w-full">
                {/* Midpoint Marker */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-black/20" />
                
                {/* Target Indicator (Option 2) */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-700 ease-out"
                  style={{ left: `${activePercent}%` }}
                >
                  {/* Outer Ring */}
                  <div className="w-8 h-8 rounded-full bg-accent/40 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-sm">
                    {/* Inner Solid Dot */}
                    <div className="w-4 h-4 bg-accent rounded-full shadow-sm ring-2 ring-white" />
                  </div>
                </div>

              </div>
            </div>

            {/* Axis Labels */}
            <div className="w-full max-w-[600px] flex justify-between text-xs font-bold uppercase tracking-widest mt-3 opacity-60">
              <span>{t(`${activeTrait}.low`)}</span>
              <span>{t(`${activeTrait}.mid`)}</span>
              <span>{t(`${activeTrait}.high`)}</span>
            </div>

            {/* Description Text */}
            <div className="mt-15 text-left w-full max-w-[600px]">
              <div className="font-secondary">
                {renderDescription(
                  `${activeTrait}.${textKey}Desc`, 
                  `Scoring ${activePercent}% in ${traitName}, `
                )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}