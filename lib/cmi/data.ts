// lib/cmi/data.ts
import { Question, MoneyType, PatternFamily } from "./types";

// 1. PATTERN FAMILIES
export const PATTERN_FAMILIES: Record<string, PatternFamily> = {
  "000": { bits: "000" },
  "001": { bits: "001" },
  "010": { bits: "010" },
  "011": { bits: "011" },
  "100": { bits: "100" },
  "101": { bits: "101" },
  "110": { bits: "110" },
  "111": { bits: "111" }
};

// 2. MONEY TYPES
export const MONEY_TYPES: MoneyType[] = [
  { id: 1, bits: "00000" },
  { id: 2, bits: "00001" },
  { id: 3, bits: "00010" },
  { id: 4, bits: "00011" },
  { id: 5, bits: "00100" },
  { id: 6, bits: "00101" },
  { id: 7, bits: "00110" },
  { id: 8, bits: "00111" },
  { id: 9, bits: "01000" },
  { id: 10, bits: "01001" },
  { id: 11, bits: "01010" },
  { id: 12, bits: "01011" },
  { id: 13, bits: "01100" },
  { id: 14, bits: "01101" },
  { id: 15, bits: "01110" },
  { id: 16, bits: "01111" },
  { id: 17, bits: "10000" },
  { id: 18, bits: "10001" },
  { id: 19, bits: "10010" },
  { id: 20, bits: "10011" },
  { id: 21, bits: "10100" },
  { id: 22, bits: "10101" },
  { id: 23, bits: "10110" },
  { id: 24, bits: "10111" },
  { id: 25, bits: "11000" },
  { id: 26, bits: "11001" },
  { id: 27, bits: "11010" },
  { id: 28, bits: "11011" },
  { id: 29, bits: "11100" },
  { id: 30, bits: "11101" },
  { id: 31, bits: "11110" },
  { id: 32, bits: "11111" }
];

// 3. QUESTIONS
export const QUESTIONS: Question[] = [
  // 1. CLOSENESS SCALE
  { id: "cl1", category: "closeness", weight: -1 },
  { id: "cl2", category: "closeness", weight: -1 },
  { id: "cl3", category: "closeness", weight: 1 },
  { id: "cl4", category: "closeness", weight: 1 },
  { id: "cl5", category: "closeness", weight: 1 },

  // 2. CONTROL SCALE
  { id: "co1", category: "control", weight: -1 },
  { id: "co2", category: "control", weight: -1 },
  { id: "co3", category: "control", weight: 1 },
  { id: "co4", category: "control", weight: 1 },
  { id: "co5", category: "control", weight: 1 },

  // 3. SELF-WORTH SCALE
  { id: "sw1", category: "selfWorth", weight: -1 },
  { id: "sw2", category: "selfWorth", weight: -1 },
  { id: "sw3", category: "selfWorth", weight: 1 },
  { id: "sw4", category: "selfWorth", weight: 1 },
  { id: "sw5", category: "selfWorth", weight: 1 },

  // 4. BOUNDARY SCALE
  { id: "bo1", category: "boundary", weight: -1 },
  { id: "bo2", category: "boundary", weight: -1 },
  { id: "bo3", category: "boundary", weight: 1 },
  { id: "bo4", category: "boundary", weight: 1 },
  { id: "bo5", category: "boundary", weight: 1 },

  // 5. GROWTH SCALE
  { id: "gr1", category: "growth", weight: -1 },
  { id: "gr2", category: "growth", weight: -1 },
  { id: "gr3", category: "growth", weight: 1 },
  { id: "gr4", category: "growth", weight: 1 },
  { id: "gr5", category: "growth", weight: 1 },
];

export const PAGE_SIZE = 5;