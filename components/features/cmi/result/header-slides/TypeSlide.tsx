"use client";

import { StoredCMIResult } from "@/lib/cmi/api-types";
import Image from "next/image";
import { useTranslations } from "next-intl";

type Props = {
  result: StoredCMIResult["result"];
  avatarSrc: string;
};

function TypeSlide({ result, avatarSrc }: Props) {
  const tTypes = useTranslations("cmi.types");
  const tFamilies = useTranslations("cmi.families");
  const tUi = useTranslations("cmi.ui");

  const typeBits = result.type.bits;
  const familyBits = result.family.bits;

  return (
    <div className="flex flex-col items-center w-full gap-4 mt-4 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center">
        <p className="mb-2 text-[10px] sm:text-xs font-semibold text-foreground/60 tracking-[0.18em]">
          {tUi("result_header_type_title")}
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-foreground leading-tight">
          {tTypes(`${result.type.id}.name`)}
        </h1>
      </div>

      {/* Main layout */}
      <div className="grid w-full max-w-4xl mx-auto gap-y-6 gap-x-8 grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] md:items-center">

        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="flex flex-col w-full self-center mb-2 md:mb-7 space-y-8 md:space-y-10 items-center md:items-start">
          
          {/* Group 1: Indicator */}
          <div className="flex flex-col w-full md:max-w-none">
            {/* Left-aligned text on desktop */}
            <div className="flex items-baseline justify-center md:justify-start gap-1 text-xs tracking-wide text-center md:text-left">
              <span className="uppercase text-foreground/60">
                {tUi("result_header_bits")}
              </span>
              <span className="font-semibold text-accent">{typeBits}</span>
            </div>

            {/* Top line: same width as bottom, but shifted LEFT on desktop */}
            <div className="mt-2 h-[0.5px] w-full 
                bg-gradient-to-r from-accent to-foreground/40
                md:translate-x-[-8px] md:w-[calc(100%-8px)]" />
          </div>

          {/* Group 2: Pattern Family */}
          <div className="flex flex-col w-full md:max-w-none">
            {/* Left-aligned text on desktop */}
            <div className="flex items-baseline justify-center md:justify-start gap-1 text-xs tracking-wide text-center md:text-left">
              <span className="uppercase text-foreground/60">
                {tUi("result_header_family")}
              </span>
              <span className="font-semibold text-accent">
                {tFamilies(`${familyBits}.name`)}
              </span>
            </div>

            {/* Bottom line: same width as top, but shifted RIGHT on desktop */}
            <div className="mt-2 h-[0.5px] w-full 
                bg-gradient-to-r from-accent to-foreground/40
                md:translate-x-[8px] md:w-[calc(100%-8px)]" />
          </div>
        </div>

        {/* ---------------- CENTER AVATAR ---------------- */}
        <div className="flex items-center justify-center self-center order-first md:order-none">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 drop-shadow-2xl">
            <Image
              src={avatarSrc}
              alt={tTypes(`${result.type.id}.name`)}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* ---------------- RIGHT SIDE ---------------- */}
        <div className="flex flex-col w-full self-center text-[11px] sm:text-xs tracking-wide">

          {/* Mobile: inline layout */}
          <div className="flex justify-center md:hidden items-baseline gap-1 text-center">
            <span className="uppercase text-foreground/60">
              {tUi("result_header_growth")}
            </span>
            <span className="font-semibold text-accent italic">
              {tFamilies(`${familyBits}.growthDirection`)}
            </span>
          </div>

          <div className="h-[0.5px] w-full bg-gradient-to-r from-accent to-foreground/40 my-2 md:hidden" />

          {/* Desktop: fully right-aligned */}
          <div className="hidden md:flex flex-col items-end space-y-2">
            <span className="uppercase text-foreground/60">
              {tUi("result_header_growth")}
            </span>

            {/* Line aligned to the RIGHT */}
            <div className="h-[0.5px] w-full bg-gradient-to-l from-accent to-foreground/40" />

            <span className="font-semibold text-accent italic text-right">
              {tFamilies(`${familyBits}.growthDirection`)}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TypeSlide;
