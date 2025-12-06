"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StoredCMIResult } from "@/lib/cmi/api-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  resultData: StoredCMIResult;
}

// 1. Define the standard order of traits
const TRAITS = ["closeness", "control", "selfWorth", "boundary", "growth"] as const;

function CMIResultFooter({ resultData }: Props) {
  const tUi = useTranslations("cmi.ui");
  const tTypes = useTranslations("cmi.types");
  const tFamilies = useTranslations("cmi.families");
  
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    console.log("Linking email:", email, "to result ID:", resultData.code);
  };

  // Format Date
  const formattedDate = new Date(resultData.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  // 2. Helper to calculate 0-100 score from raw direction (-1 to 1)
  // FIX: Replaced 'any' with 'unknown' and added strict type narrowing
  const calculateScore = (val: unknown): number => {
    // If it's already a simple number
    if (typeof val === "number") return Math.round(val);
    
    // If it's an object with rawDirection (standard CMI structure)
    if (typeof val === "object" && val !== null && "rawDirection" in val) {
      // Cast safely now that we checked the property exists
      const obj = val as { rawDirection: number };
      return Math.round(((obj.rawDirection + 1) / 2) * 100);
    }
    
    return 0;
  };

  // 3. Map over the fixed TRAITS order
  const formattedScores = TRAITS.map((trait) => {
    // FIX: Assert trait is a valid key to avoid index errors
    const key = trait as keyof typeof resultData.result.traitScores;
    const traitData = resultData.result.traitScores[key];
    return calculateScore(traitData);
  }).join(" / ");

  return (
    <section className="w-full px-4 py-12 flex flex-col items-center gap-12">
      
      {/* --- TOP SECTION: Image & Stats --- */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-20 items-cente px-4">
        
        {/* Left: App Views Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[4/3] md:aspect-auto md:h-[300px] flex items-center justify-center md:justify-end"
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

        {/* Right: Test Summary Data */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4 text-left pl-4 md:pl-0"
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


      {/* --- BOTTOM SECTION: Email Capture Card --- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={cn(
          "w-full max-w-4xl relative overflow-hidden",
          "rounded-3xl border border-white/10",
          "bg-[#23211f] shadow-2xl", 
          "p-8 md:p-12 lg:px-20 lg:py-16"
        )}
      >
        <div className="flex flex-col space-y-8">
          
          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-primary font-semibold tracking-wide text-background/90">
              {tUi("result_footer_title")}
            </h2>
            <p className="text-base tracking-wide text-background/60 leading-relaxed max-w-2xl">
              {tUi("result_footer_desc")}
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6 w-full mt-4">
            
            {/* Email Input */}
            <div className="space-y-2">
              <Label 
                htmlFor="footer-email" 
                className="text-xs text-white/60 ml-1 uppercase tracking-wider"
              >
                {tUi("result_footer_email_label")}
              </Label>
              <Input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  "h-12 rounded-lg border-white/10",
                  "bg-black text-white placeholder:text-white/20", 
                  "focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-[#c19d71]/50 focus-visible:border-[#c19d71]/50"
                )}
              />
            </div>

            {/* Checkbox Agreement */}
            <div className="flex items-start md:items-center space-x-3 group">
              <Checkbox
                id="footer-terms"
                checked={agreed}
                onCheckedChange={(c) => setAgreed(c as boolean)}
                className={cn(
                    "border-white/30 data-[state=checked]:bg-accent data-[state=checked]:border-accent",
                    "h-4 w-4 rounded-xs transition-all duration-200",
                    "group-hover:border-accent/70"
                )}
              />
              <Label
                htmlFor="footer-terms"
                className={cn(
                  "text-xs font-light cursor-pointer select-none transition-all duration-200 transition-colors",
                  "text-background/50 group-hover:text-background/90 group-hover:font-medium",
                  agreed ? "text-background/90" : "text-background/50"
                )}
              >
                {tUi("result_footer_agree_pre")}{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
                  {tUi("result_footer_privacy")}
                </Link>
                {" "}{tUi("result_footer_and")}{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-white transition-colors">
                  {tUi("result_footer_terms")}
                </Link>
                {tUi("result_footer_agree_suffix")}
              </Label>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleSubmit}
              disabled={!email || !agreed}
              className={cn(
                "w-full rounded-full bg-accent/85 text-background",
                "shadow-[0_6px_16px_rgba(187,147,100,0.28)]",
                "hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(187,147,100,0.35)] hover:bg-accent",
                "active:translate-y-0 active:shadow-[0_3px_10px_rgba(187,147,100,0.25)]"
              )}
            >
              {tUi("result_footer_cta")}
            </Button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

// Helper component for the stats rows
function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className="text-xs uppercase tracking-[0.15em] text-background/60 font-medium">
        {label}:
      </span>
      <span className="text-sm font-[500] text-accent tracking-[0.05em]">
        {value}
      </span>
    </div>
  );
}

export default CMIResultFooter;