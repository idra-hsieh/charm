"use client";

import { StoredCMIResult } from "@/lib/cmi/api-types";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  result: StoredCMIResult["result"];
  badgeSrc: string;
};

function FamilySlide({ result, badgeSrc }: Props) {
  const tTypes = useTranslations("cmi.types");
  const tFamilies = useTranslations("cmi.families");
  const tUi = useTranslations("cmi.ui");

  const familyBits = result.family.bits;

  return (
    <div className="flex flex-col items-center w-full gap-4 mt-4 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center">
        <p className="mb-2 text-xs font-semibold text-foreground/60 tracking-[0.18em]">
          {tUi("result_header_family_title")}
          {" :"}
        </p>
        <h1 className="text-3xl font-black font-primary tracking-wide text-foreground/95 leading-tight">
          {tFamilies(`${result.family.bits}.name`)}
        </h1>
      </div>

      {/* Main layout */}
      <div className="grid w-full max-w-4xl mx-auto gap-y-6 gap-x-8 grid-cols-1 slide:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] slide:items-center">
        {/* ---------------- LEFT SIDE (Desktop only) ---------------- */}
        <div className="hidden slide:flex flex-col w-full self-center text-xs tracking-wide">
          {/* Desktop: fully left-aligned */}
          <div className="flex flex-col items-start space-y-2">
            <span className="uppercase text-foreground/60">
              {tUi("result_header_essence")}
              {" :"}
            </span>

            {/* Line aligned to the LEFT */}
            <div className="h-[0.5px] w-full bg-gradient-to-l from-accent to-foreground/40" />

            <span className="font-semibold text-accent italic text-left">
              {tFamilies(`${familyBits}.essence`)}
            </span>
          </div>
        </div>

        {/* ---------------- CENTER AVATAR + MOBILE CONTENT ---------------- */}
        <div className="flex flex-col items-center justify-center self-center order-first slide:order-none gap-4">
          {/* Avatar */}
          <div className="relative w-32 h-32 slide:w-48 slide:h-48 drop-shadow-2xl">
            <Image
              src={badgeSrc}
              alt={tTypes(`${result.type.id}.name`)}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Mobile: stacked info under avatar */}
          <div className="flex flex-col w-full text-xs tracking-wide space-y-3 slide:hidden">
            {/* Essence */}
            <div className="flex flex-col items-center text-center gap-1 mb-6">
              <span className="uppercase text-[0.7rem] text-foreground/60 mb-1">
                {tUi("result_header_essence")}
              </span>
              <div className="h-[0.5px] w-full max-w-xs bg-gradient-to-r from-accent to-foreground/40 mb-1" />
              <span className="block max-w-xs mx-auto font-semibold text-accent italic text-balance break-words">
                {tFamilies(`${familyBits}.essence`)}
              </span>
            </div>

            {/* Strategy */}
            <div className="flex flex-col items-center text-center gap-1">
              <span className="uppercase text-[0.7rem] text-foreground/60 mb-1">
                {tUi("result_header_strategy")}
              </span>
              <div className="h-[0.5px] w-full max-w-xs bg-gradient-to-r from-accent to-foreground/40 mb-1" />
              <span className="block max-w-xs mx-auto font-semibold text-accent mb-1 text-balance break-words">
                &quot;{tFamilies(`${familyBits}.strategy`)}&quot;
              </span>
              <p className="max-w-xs mx-auto text-[0.7rem] text-foreground/70 italic leading-snug text-balance break-words">
                {tFamilies(`${familyBits}.strategyDescription`)}
              </p>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE (Desktop only) ---------------- */}
        <div className="hidden slide:flex flex-col w-full self-center text-xs tracking-wide">
          {/* Desktop: fully right-aligned */}
          <div className="flex flex-col items-end space-y-2">
            {/* Title + Strategy on the same line */}
            <div className="flex items-baseline justify-end space-x-1">
              <span className="uppercase text-foreground/60">
                {tUi("result_header_strategy")}
                {" :"}
              </span>

              <span className="font-semibold text-accent">
                &quot;{tFamilies(`${familyBits}.strategy`)}&quot;
              </span>
            </div>

            {/* Line aligned to the RIGHT */}
            <div className="h-[0.5px] w-full bg-gradient-to-r from-accent to-foreground/40" />

            <span className="text-foreground/60 italic text-right">
              {tFamilies(`${familyBits}.strategyDescription`)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FamilySlide;
