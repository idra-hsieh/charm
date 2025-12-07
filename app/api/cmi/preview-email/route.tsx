import { render } from "@react-email/render";
import CMIResultEmail from "@/components/emails/CMIResultEmail";
import { buildResultEmailContent } from "@/lib/cmi/email";
import { getResult, TraitScoresByTrait } from "@/lib/cmi/content";
import { Pole, Trait } from "@/lib/cmi/types";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { StoredCMIResult } from "@/lib/cmi/api-types";

const makeScore = (trait: Trait, rawDirection: number) => {
  const highPercent = Math.round(((rawDirection + 1) / 2) * 100);
  const lowPercent = 100 - highPercent;

  const dominant: Pole = rawDirection >= 0 ? "high" : "low";

  return {
    trait,
    rawDirection,
    dominant,
    lowPercent,
    highPercent,
    isBalancedZone: Math.abs(rawDirection) < 0.2,
  };
};

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") || "en";
  const code = req.nextUrl.searchParams.get("code") || "IOIOIO";
  const baseUrl = req.nextUrl.origin;

  // If a code is supplied, try to pull real data from Supabase; otherwise use mock.
  let templateData;
  if (supabaseAdmin && req.nextUrl.searchParams.has("code")) {
    const { data, error } = await supabaseAdmin
      .from("cmi_results")
      .select("code, email, locale, subscribe, answers, trait_scores, result, created_at")
      .eq("code", code)
      .single();

    if (!error && data) {
      const record: StoredCMIResult = {
        code: data.code,
        email: data.email,
        subscribe: data.subscribe,
        locale: data.locale,
        answers: data.answers,
        traitScores: data.trait_scores,
        result: data.result,
        createdAt: new Date(data.created_at).getTime(),
      };

      templateData = await buildResultEmailContent({
        locale: record.locale || locale,
        code: record.code,
        result: record.result,
        traitScores: record.traitScores,
        createdAt: record.createdAt,
        baseUrl,
      });
    }
  }

  if (!templateData) {
    const mockTraitScores: TraitScoresByTrait = {
      closeness: makeScore("closeness", 0.35),
      control: makeScore("control", -0.1),
      selfWorth: makeScore("selfWorth", 0.55),
      boundary: makeScore("boundary", -0.25),
      growth: makeScore("growth", 0.72),
    };

    const mockResult = getResult(mockTraitScores);
    templateData = await buildResultEmailContent({
      locale,
      code,
      result: mockResult,
      traitScores: mockTraitScores,
      createdAt: Date.now(),
      baseUrl,
    });
  }

  const html = await render(<CMIResultEmail {...templateData} />);

  return new Response(html, {
    headers: { "Content-Type": "text/html" },
  });
}
