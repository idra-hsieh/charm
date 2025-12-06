"use client";

import CMIResultBody from "@/components/features/cmi/result/CMIResultBody";
import CMIResultFooter from "@/components/features/cmi/result/CMIResultFooter";
import CMIResultHeader from "@/components/features/cmi/result/CMIResultHeader";
import CMITraitScores from "@/components/features/cmi/result/CMITraitScores";
import { StoredCMIResult } from "@/lib/cmi/api-types";

interface Props {
  resultData: StoredCMIResult;
}

export default function PageClient({ resultData }: Props) {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#050505] to-[#40403F] text-foreground pb-20">
       <div className="w-full">
          {/* 1. Header Section */}
          <div className="mb-12">
            <CMIResultHeader resultData={resultData} />
          </div>

          {/* 2. Body Section (Sidebar + Content) */}
          <div className="mb-12">
            <CMIResultBody resultData={resultData} />
          </div>

          {/* 3. Trait Scores */}
          <div className="mb-12">
            <CMITraitScores traitScores={resultData.traitScores} />
          </div>

          {/* 4. Footer */}
          <CMIResultFooter resultData={resultData} />
       </div>
    </main>
  );
}