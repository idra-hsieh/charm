export type ScaleCategory = "closeness" | "control" | "selfWorth" | "boundary" | "growth";

export type Question = {
  id: string;
  category: ScaleCategory;
  weight: number; // -1 for Left/Negative, 1 for Right/Positive
};

export type MoneyType = {
  id: number;
  bits: string;
};

export type PatternFamily = {
  bits: string;
};