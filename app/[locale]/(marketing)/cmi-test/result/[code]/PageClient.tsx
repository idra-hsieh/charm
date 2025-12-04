"use client";

import { StoredCMIResult } from "@/lib/cmi/api-types";
import { useTranslations } from "next-intl";

interface Props {
  resultData: StoredCMIResult;
}

export default function PageClient({ resultData }: Props) {
  const t = useTranslations("cmi.traits");
  
  // Destructure for easier access
  const { code, email, result } = resultData;

  return (
    <div className="container mx-auto max-w-4xl py-12 md:py-24">
        {/* Temporary Debug View to confirm connectivity */}
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h1 className="mb-4 text-2xl font-bold">Test Result Found</h1>
            
            <div className="space-y-2">
                <p><span className="font-semibold">Code:</span> {code}</p>
                <p><span className="font-semibold">Email:</span> {email}</p>
                <p><span className="font-semibold">Type:</span> {result.family.bits}</p>
            </div>

            <div className="mt-8 rounded bg-muted p-4">
                <p className="text-sm text-muted-foreground mb-2">Full Data Payload (Debug):</p>
                <pre className="overflow-auto text-xs">
                    {JSON.stringify(resultData, null, 2)}
                </pre>
            </div>
        </div>
    </div>
  );
}