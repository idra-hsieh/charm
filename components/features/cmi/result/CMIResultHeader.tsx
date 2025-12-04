"use client";

import { Button } from "@/components/ui/button";
import { StoredCMIResult } from "@/lib/cmi/api-types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Copy, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TypeSlide from "./header-slides/TypeSlide";
import FamilySlide from "./header-slides/FamilySlide";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

interface Props {
  resultData: StoredCMIResult;
}

// Map 3-bit family code to image index (000 → 01, ... 111 → 08)
const getFamilyImageIndex = (bits: string) => {
  const num = parseInt(bits, 2) + 1;
  return num.toString().padStart(2, "0");
};

const FAMILY_NAMES_EN = [
  "TheReflectors",
  "TheIdealists",
  "TheOrganizers",
  "TheEvaluators",
  "TheEmpaths",
  "ThePerformers",
  "TheGuardians",
  "TheBuilders",
];

const SLIDES = ["type", "family"] as const;
type SlideId = (typeof SLIDES)[number];

function CMIResultHeader({ resultData }: Props) {
  const { result, code } = resultData;
  const tUi = useTranslations("cmi.ui");
  const [currentSlide, setCurrentSlide] = useState<SlideId>("type");

  const familyBits = result.family.bits;
  const familyIndex = parseInt(familyBits, 2);
  const familyNameEn = FAMILY_NAMES_EN[familyIndex];

  const avatarSrc = `/images/avatars/${getFamilyImageIndex(
    familyBits
  )}-${familyNameEn}.png`;
  const badgeSrc = `/images/family-badges/${getFamilyImageIndex(
    familyBits
  )}-${familyNameEn}.png`;

  const goToNext = () => {
    const currentIndex = SLIDES.indexOf(currentSlide);
    const nextIndex = (currentIndex + 1) % SLIDES.length;
    setCurrentSlide(SLIDES[nextIndex]);
  };

  const goToPrev = () => {
    const currentIndex = SLIDES.indexOf(currentSlide);
    const prevIndex = (currentIndex - 1 + SLIDES.length) % SLIDES.length;
    setCurrentSlide(SLIDES[prevIndex]);
  };

  return (
    <section className={cn(
      "relative w-full overflow-hidden rounded-b-3xl shadow-2xl",
      "bg-background text-foreground",
      "min-h-[520px] sm:min-h-[540px]",
      "md:h-[450px]"
    )}>
      {/* Background */}
      <div className="absolute inset-0 bg-marble bg-cover bg-center z-0" />

      {/* ← LEFT ARROW */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full 
                  hover:bg-white/40 transition-all text-foreground/30 hover:text-foreground hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} strokeWidth={1.5} />
      </button>

      {/* → RIGHT ARROW */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full 
                  hover:bg-white/40 transition-all text-foreground/30 hover:text-foreground hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={40} strokeWidth={1.5} />
      </button>

      {/* Main frame (centers content, prevents arrows from blocking content) */}
      <div className="relative z-20 w-full max-w-5xl mx-auto h-full flex flex-col justify-between py-6 px-6">

        {/* Slide content */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {currentSlide === "type" ? (
                <TypeSlide result={result} avatarSrc={avatarSrc} />
              ) : (
                <FamilySlide result={result} badgeSrc={badgeSrc} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots + CTA */}
        <TooltipProvider>
          <div className="flex flex-col items-center gap-4 text-center mt-7 md:mt-0">
            {/* Button row */}
            <div className="relative flex justify-center">
              <Button
                variant="default"
                size="sm"
                className="rounded-full px-4 py-2 text-xs font-bold shadow-xl hover:-translate-y-[1px] transition-all bg-foreground/80 hover:bg-foreground text-background"
              >
                {tUi("result_header_create_account")}
              </Button>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={16}
                    className="absolute -right-7 top-1/2 -translate-y-1/2 text-foreground hover:text-accent transition-colors cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="max-w-[350px] text-xs leading-snug"
                >
                  <p className="text-xs">
                    {tUi("result_header_create_account_info")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Code row */}
            <div className="relative flex justify-center text-xs font-mono text-foreground/50 uppercase mb-1">
              {/* main content that should be centered */}
              <div className="flex items-center gap-2">
                <span>{tUi("result_header_test_code")}</span>
                <span className="font-bold select-all text-accent tracking-wider">
                  {code}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="hover:text-accent transition-colors"
                  title="Copy Code"
                >
                  <Copy size={12} />
                </button>
              </div>

              {/* tooltip icon, not counted in centering */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={14}
                    className="absolute -right-6 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-accent transition-colors cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={8}
                  className="max-w-[350px] text-xs leading-snug"
                >
                  <p className="text-xs">
                    {tUi("result_header_test_code_info")}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </TooltipProvider>


      </div>
    </section>
  );
}

export default CMIResultHeader;
