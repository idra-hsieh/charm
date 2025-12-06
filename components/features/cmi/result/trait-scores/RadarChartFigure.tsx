"use client";

import { useTranslations } from "next-intl";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { TraitScoresByTrait } from "@/lib/cmi/content";
import { Trait } from "@/lib/cmi/types";

interface RadarChartFigureProps {
  traitScores: TraitScoresByTrait;
}

const TRAITS: Trait[] = [
  "closeness",
  "control",
  "selfWorth",
  "boundary",
  "growth",
];

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--accent)",
  },
} satisfies ChartConfig;

// Helper to capitalize first letter
const capitalize = (s: string) => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function RadarChartFigure({
  traitScores,
}: RadarChartFigureProps) {
  const t = useTranslations("cmi.traits");

  // Transform data
  const chartData = TRAITS.map((trait) => {
    const scoreData = traitScores[trait];
    const rawDirection = scoreData.rawDirection;
    const calculatedScore = Math.round(((rawDirection + 1) / 2) * 100);

    // 1. Determine the specific pole label
    let textKey = "mid";
    if (!scoreData.isBalancedZone) {
      textKey = scoreData.dominant;
    }
    const resultLabel = t(`${trait}.${textKey}`);

    // 2. Capitalize the trait name
    const traitName = capitalize(t(`${trait}.traitLabel`));

    return {
      trait: traitName,
      score: calculatedScore,
      resultLabel: resultLabel,
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px] w-full mb-5"
    >
      <RadarChart data={chartData}>
        <Tooltip
          cursor={false}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border bg-popover p-2 shadow-sm text-xs">
                  <div className="font-semibold text-foreground mb-1">
                    {data.trait}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    <span className="font-medium text-muted-foreground capitalize">
                      {data.resultLabel}:
                    </span>
                    <span className="font-medium text-foreground">
                      {data.score}%
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />

        <PolarGrid className="opacity-40" />

        <PolarAngleAxis
          dataKey="trait"
          tick={{ fontSize: 12, fill: "var(--background)", opacity: 0.8 }}
        />

        {/* Hidden axis to enforce 0-100 scale */}
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />

        <Radar
          dataKey="score"
          fill="var(--accent)"
          fillOpacity={0.5}
          stroke="var(--accent)"
          strokeWidth={2}
          dot={{
            r: 4,
            fillOpacity: 1,
            fill: "var(--accent)",
            strokeWidth: 0,
          }}
          activeDot={{
            r: 6,
            strokeWidth: 0,
            className: "animate-pulse",
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
}