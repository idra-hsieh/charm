export type ScaleCategory = "closeness" | "control" | "selfWorth" | "boundary" | "growth";

export type Question = {
  id: string;
  text: string;
  category: ScaleCategory;
  weight: number; // -1 for Left/Negative, 1 for Right/Positive
};

// ... (keep MoneyType and PatternFamily as they were)
export type MoneyType = {
  id: number;
  bits: string;
  name: string;
  tags: string;
  description: string;
  nextSteps: string[];
  coaching: string;
};

export type PatternFamily = {
  bits: string;
  name: string;
  essence: string;
  tension: string;
  growthDirection: string;
  strategy: string;
};