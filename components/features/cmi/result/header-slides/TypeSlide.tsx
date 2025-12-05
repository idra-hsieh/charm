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
        <p className="mb-2 text-xs font-semibold text-foreground/60 tracking-[0.18em]">
          {tUi("result_header_type_title")}
          {" :"}
        </p>
        <h1 className="text-3xl font-black font-primary tracking-wide text-foreground/95 leading-tight">
          {tTypes(`${result.type.id}.name`)}
        </h1>
      </div>

      {/* Main layout */}
      <div className="grid w-full max-w-4xl mx-auto gap-y-6 gap-x-8 grid-cols-1 slide:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.1fr)] slide:items-center">
        {/* ---------------- LEFT SIDE (Desktop only) ---------------- */}
        <div className="hidden slide:flex flex-col w-full self-center mb-8 space-y-10 text-xs tracking-wide">
          {/* Group 1: Indicator */}
          <div className="flex flex-col w-full">
            <div className="flex items-baseline justify-start gap-1 text-xs tracking-wide text-left">
              <span className="uppercase text-foreground/60">
                {tUi("result_header_bits")}
                {" :"}
              </span>
              <span className="font-semibold text-accent">{typeBits}</span>
            </div>
            <div className="mt-2 h-[0.5px] w-full bg-gradient-to-r from-accent to-foreground/40 translate-x-[-8px] w-[calc(100%-8px)]" />
          </div>

          {/* Group 2: Pattern Family */}
          <div className="flex flex-col w-full">
            <div className="translate-x-[16px]">
              <div className="flex items-baseline justify-start gap-1 text-xs tracking-wide text-left">
                <span className="uppercase text-foreground/60">
                  {tUi("result_header_family")}
                  {" :"}
                </span>
                <span className="font-semibold text-accent">
                  {tFamilies(`${familyBits}.name`)}
                </span>
              </div>
              <div className="mt-2 h-[0.5px] w-full bg-gradient-to-r from-foreground/50 to-accent" />
            </div>
          </div>
        </div>

        {/* ---------------- CENTER AVATAR + MOBILE CONTENT ---------------- */}
        <div className="flex flex-col items-center justify-center self-center order-first slide:order-none gap-4">
          {/* Avatar */}
          <div className="relative w-32 h-32 slide:w-48 slide:h-48 drop-shadow-2xl">
            <Image
              src={avatarSrc}
              alt={tTypes(`${result.type.id}.name`)}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Mobile: stacked info under avatar */}
          <div className="flex flex-col w-full text-xs tracking-wide space-y-3 slide:hidden">
            {/* Bits */}
            <div className="flex flex-col items-center text-center gap-1 mb-4">
              <span className="uppercase text-[0.7rem] text-foreground/60 mb-1">
                {tUi("result_header_bits")}
              </span>
              <div className="h-[0.5px] w-full max-w-xs bg-gradient-to-r from-accent to-foreground/40 mb-1" />
              <span className="block max-w-xs mx-auto font-semibold text-accent text-balance break-words">
                {typeBits}
              </span>
            </div>

            {/* Family */}
            <div className="flex flex-col items-center text-center gap-1 mb-5">
              <span className="uppercase text-[0.7rem] text-foreground/60 mb-1">
                {tUi("result_header_family")}
              </span>
              <div className="h-[0.5px] w-full max-w-xs bg-gradient-to-r from-foreground/50 to-accent mb-1" />
              <span className="block max-w-xs mx-auto font-semibold text-accent text-balance break-words">
                {tFamilies(`${familyBits}.name`)}
              </span>
            </div>

            {/* Growth */}
            <div className="flex flex-col items-center text-center gap-1">
              <span className="uppercase text-[0.7rem] text-foreground/60 mb-1">
                {tUi("result_header_growth")}
              </span>
              <div className="h-[0.5px] w-full max-w-xs bg-gradient-to-r from-accent to-foreground/40 mb-1" />
              <span className="block max-w-xs mx-auto font-semibold text-accent text-balance break-words">
                {tFamilies(`${familyBits}.growthDirection`)}
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE (Desktop only) ---------------- */}
        <div className="hidden slide:flex flex-col w-full self-center text-xs tracking-wide">
          <div className="flex flex-col items-end space-y-2">
            <span className="uppercase text-foreground/60">
              {tUi("result_header_growth")}
              {" :"}
            </span>

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
