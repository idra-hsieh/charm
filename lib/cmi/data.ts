import { Question, ScaleCategory } from "./types";

export const QUESTIONS: Question[] = [
  // 1. CLOSENESS SCALE
  { id: "cl1", category: "closeness", text: "I often delay opening bills or checking my bank app because I don't want to deal with it.", weight: -1 },
  { id: "cl2", category: "closeness", text: "I prefer to ignore my financial reality and hope things work out on their own.", weight: -1 },
  { id: "cl3", category: "closeness", text: "I check my bank balance constantly, even when I know nothing has changed.", weight: 1 },
  { id: "cl4", category: "closeness", text: "Spending money makes me feel physically nervous, even when I can afford it.", weight: 1 },
  { id: "cl5", category: "closeness", text: "I worry excessively about running out of money, regardless of how much I have saved.", weight: 1 },

  // 2. CONTROL SCALE
  { id: "co1", category: "control", text: "I feel that my financial situation is entirely determined by bad luck or outside forces.", weight: -1 },
  { id: "co2", category: "control", text: "There is no point in making a financial plan because unexpected things always happen.", weight: -1 },
  { id: "co3", category: "control", text: "I have strict spending rules that I cannot bring myself to break, even for special occasions.", weight: 1 },
  { id: "co4", category: "control", text: "If I deviate from my budget even slightly, I feel a strong need to punish myself or cut back immediately.", weight: 1 },
  { id: "co5", category: "control", text: "I struggle to relax because I feel I must monitor every penny to be safe.", weight: 1 },

  // 3. SELF-WORTH SCALE
  { id: "sw1", category: "selfWorth", text: "I often feel 'less than' or ashamed when I compare my possessions to those of my peers.", weight: -1 },
  { id: "sw2", category: "selfWorth", text: "I hide my true financial struggles from others because I fear they will think I am a failure.", weight: -1 },
  { id: "sw3", category: "selfWorth", text: "I secretly feel superior to people who earn less or save less than I do.", weight: 1 },
  { id: "sw4", category: "selfWorth", text: "I believe my net worth is the primary measure of my success and intelligence.", weight: 1 },
  { id: "sw5", category: "selfWorth", text: "I feel that having money makes someone a better or more important person.", weight: 1 },

  // 4. BOUNDARY SCALE
  { id: "bo1", category: "boundary", text: "I often lend money or pay for others just to keep the peace, even when I can't afford it.", weight: -1 },
  { id: "bo2", category: "boundary", text: "I find it extremely difficult to say 'no' to financial requests from family or friends.", weight: -1 },
  { id: "bo3", category: "boundary", text: "I keep my income and spending habits a complete secret from everyone, including close partners.", weight: 1 },
  { id: "bo4", category: "boundary", text: "I dislike accepting gifts or help because I don't want to feel indebted to anyone.", weight: 1 },
  { id: "bo5", category: "boundary", text: "I prefer transaction-based relationships where everything is split evenly so I don't get taken advantage of.", weight: 1 },

  // 5. GROWTH SCALE
  { id: "gr1", category: "growth", text: "I rarely look for new ways to improve my finances because I prefer staying in my comfort zone.", weight: -1 },
  { id: "gr2", category: "growth", text: "I stick to the financial habits I learned years ago, even if there might be better options now.", weight: -1 },
  { id: "gr3", category: "growth", text: "I feel restless and dissatisfied even when I meet my goals because I know I could always optimize further.", weight: 1 },
  { id: "gr4", category: "growth", text: "I spend a significant portion of my free time constantly researching how to maximize returns.", weight: 1 },
  { id: "gr5", category: "growth", text: "I struggle to celebrate financial wins because I am already focused on the next target.", weight: 1 },
];

export const PAGE_SIZE = 10;