"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoredCMIResult } from "@/lib/cmi/api-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  resultData: StoredCMIResult;
}

const TRAITS = ["closeness", "control", "selfWorth", "boundary", "growth"] as const;

// Design System: Button styles shared with CMIQuestionnaire for visual consistency
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

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <motion.div
      className="flex items-start gap-5 w-full"
      initial={{ opacity: 0, x: 8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <span className="mt-[8px] inline-block h-1.5 w-1.5 rounded-full bg-accent" />

      <div className="flex flex-wrap items-baseline gap-x-2 text-left">
        <span className="text-xs uppercase tracking-[0.15em] text-background/60 font-medium">
          {label}:
        </span>
        <span className="text-sm font-[500] text-accent tracking-[0.05em]">
          {value}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * CMIResultFooter
 * Displays the result summary (visuals + stats) and handles the lead generation funnel (email capture).
 * Currently mocks the submission process with a "feature under development" feedback state.
 */
function CMIResultFooter({ resultData }: Props) {
  // I18n Namespaces
  const tUi = useTranslations("cmi.ui");
  const tTypes = useTranslations("cmi.types");
  const tFamilies = useTranslations("cmi.families");
  const tPlaceholder = useTranslations("placeholder");
  const locale = useLocale();
  
  // Local State
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [showDevMessage, setShowDevMessage] = useState(false);

  // Validation
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = EMAIL_REGEX.test(email);

  // Handler: Mock submission logic for MVP
  const handleSubmit = () => {
    // 1. Validate inputs
    if (!isEmailValid || !agreed) {
      setShowEmailWarning(true);
      setShowDevMessage(false); // Ensure states don't conflict
      setTimeout(() => setShowEmailWarning(false), 2500);
      return;
    }

    // 2. Mock success feedback (Feature disabled)
    // TO-DO: Replace with actual API call to link email with result ID
    setShowEmailWarning(false);
    setShowDevMessage(true);
    
    // Auto-dismiss dev message after 3s to reset UI state
    setTimeout(() => setShowDevMessage(false), 3000);

    console.log("[Mock Submit] Linking email:", email, "to result ID:", resultData.code);
  };

  // Data Processing: Date formatting
  const formattedDate = new Date(resultData.createdAt).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Data Processing: Normalize trait scores (handling raw vs. calculated objects)
  const calculateScore = (val: unknown): number => {
    if (typeof val === "number") return Math.round(val);
    
    if (typeof val === "object" && val !== null && "rawDirection" in val) {
      const obj = val as { rawDirection: number };
      return Math.round(((obj.rawDirection + 1) / 2) * 100);
    }
    
    return 0;
  };

  const formattedScores = TRAITS.map((trait) => {
    const key = trait as keyof typeof resultData.result.traitScores;
    const traitData = resultData.result.traitScores[key];
    return calculateScore(traitData);
  }).join(" / ");

  // Helper: Renders polymorphic translation content (string | array)
  const renderDescription = () => {
    const content = tUi.raw("result_footer_desc") as string | string[];

    if (Array.isArray(content)) {
      return content.map((paragraph, index) => (
        <p key={index} className="leading-relaxed">
          {paragraph}
        </p>
      ));
    }

    return <p>{content}</p>;
  };

  return (
    <section className="w-full px-4 py-10 flex flex-col items-center gap-12">
      
      {/* SECTION 1: Visualization & Metadata */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center px-4">
        {/* Left: Dynamic App Preview */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[4/3] md:aspect-auto md:h-[300px] flex items-center justify-center md:justify-start md:pl-6"
        >
          <div className="relative w-full h-full max-w-[500px]">
            <Image 
              src="/images/app-views.png"
              alt="App Dashboard Preview"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Right: Technical Stats */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 text-left w-full max-w-sm pl-6 md:pl-15"
        >
          <InfoRow 
            label={tUi("result_footer_label_date")} 
            value={formattedDate} 
          />
          <InfoRow 
            label={tUi("result_footer_label_code")} 
            value={resultData.code} 
          />
          <InfoRow 
            label={tUi("result_footer_label_type")} 
            value={tTypes(`${resultData.result.type.id}.name`)} 
          />
          <InfoRow 
            label={tUi("result_footer_label_family")} 
            value={tFamilies(`${resultData.result.family.bits}.name`)} 
          />
          <InfoRow 
            label={tUi("result_footer_label_scores")} 
            value={formattedScores} 
          />
        </motion.div>
      </div>

      {/* SECTION 2: Lead Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn(
            "w-full max-w-3xl flex flex-col items-center space-y-8 p-10 mt-4",
            "rounded-2xl border backdrop-blur-sm",
            "shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),_0_0_20px_-5px_rgba(187,147,100,0.15)]",
            "border-accent/40 bg-[#1c1c1c]/80"
        )}
      >
        
        {/* Header & Dynamic Description */}
        <div className="text-center space-y-4">
          <h2 className="block w-full uppercase text-center text-xl font-semibold tracking-[0.2em] text-background mb-4">
            {tUi("result_footer_title")}
          </h2>
          
          <div className="text-xs text-background/80 tracking-widest opacity-70 max-w-[500px] mx-auto space-y-3">
            {renderDescription()}
          </div>
        </div>

        {/* Input Form */}
        <div className="w-full max-w-xl flex flex-col gap-6">
          
          <div className="relative w-full group">
            <Input
              id="footer-email"
              type="email"
              placeholder={tUi("result_footer_email_label")}
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

          {/* Compliance Checkbox */}
          {/* Layout: items-start ensures checkbox aligns with first line of text on mobile */}
          <div className="flex items-start justify-center gap-2 group text-left px-4">
            <Checkbox
              id="footer-terms"
              checked={agreed}
              onCheckedChange={(c) => setAgreed(c as boolean)}
              className={cn(
                  "mt-[0.5px] shrink-0", // Visual alignment with text-xs line-height
                  "border-white/30 data-[state=checked]:bg-accent data-[state=checked]:text-black data-[state=checked]:border-accent",
                  "h-4 w-4 rounded-xs transition-all duration-200",
                  "group-hover:border-accent/70"
              )}
            />
            <Label
              htmlFor="footer-terms"
              className={cn(
                "block leading-normal",
                "text-xs font-light cursor-pointer select-none transition-colors",
                "text-background/50 group-hover:text-background/90",
                agreed && "text-background/90"
              )}
            >
               {/* Content flow concatenation to prevent unwanted whitespace/blocks */}
              {tUi("result_footer_agree_pre")}{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
                {tUi("result_footer_privacy")}
              </Link>
               {" "}{tUi("result_footer_and")}{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-white transition-colors">
                {tUi("result_footer_terms")}
              </Link>
               {" "}{tUi("result_footer_agree_suffix")}
            </Label>
          </div>

          {/* Action & Feedback Area */}
          <div className="relative flex flex-col items-center w-full">
              <Button
                  onClick={handleSubmit}
                  aria-disabled={!isEmailValid || !agreed}
                  className={cn(
                      BUTTON_BASE_STYLES,
                      "w-full rounded-full",
                      isEmailValid && agreed
                          ? BUTTON_ACTIVE_STYLES 
                          : "opacity-30 cursor-not-allowed bg-accent/40 text-white/40 border border-white/5"
                  )}
              >
              {tUi("result_footer_cta")}
              </Button>

              {/* Dynamic Feedback: Warning vs Dev Placeholder */}
              {(showEmailWarning || showDevMessage) && (
                <motion.p 
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={showEmailWarning ? "warning" : "dev"} 
                  className="absolute top-full mt-5 text-xs text-background/75 tracking-wide whitespace-nowrap translate-y-18"
                >
                  {showEmailWarning 
                    ? tUi("result_footer_warning") 
                    : tPlaceholder("description")}
                </motion.p>
              )}
          </div>

        </div>

      </motion.div>
    </section>
  );
}

export default CMIResultFooter;