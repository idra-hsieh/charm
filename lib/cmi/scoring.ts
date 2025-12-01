import { Question, ScaleCategory } from "./types";

type Answers = Record<string, number>;

export function calculateCategoryScore(
  category: ScaleCategory,
  questions: Question[],
  answers: Answers
): number {
  // 1. Filter questions for this specific category
  const categoryQuestions = questions.filter((q) => q.category === category);

  // 2. Separate into Left (Weight -1) and Right (Weight 1)
  const leftQuestions = categoryQuestions.filter((q) => q.weight === -1);
  const rightQuestions = categoryQuestions.filter((q) => q.weight === 1);

  // 3. Calculate Sums
  // Default to 3 (Neutral) if unanswered to be safe
  const sumLeft = leftQuestions.reduce((sum, q) => sum + (answers[q.id] || 3), 0);
  const sumRight = rightQuestions.reduce((sum, q) => sum + (answers[q.id] || 3), 0);

  // 4. Calculate Averages
  const avgLeft = leftQuestions.length > 0 ? sumLeft / leftQuestions.length : 0;
  const avgRight = rightQuestions.length > 0 ? sumRight / rightQuestions.length : 0;

  // 5. Calculate Net Difference (Range: -4 to +4)
  const netDiff = avgRight - avgLeft;

  // 6. Scale to -100 to +100
  // Formula: (NetDiff / 4) * 100
  const finalScore = (netDiff / 4) * 100;

  return Math.round(finalScore);
}

// Helper to calculate all scores at once
export function calculateAllScores(questions: Question[], answers: Answers): Record<string, number> {
  const categories: ScaleCategory[] = ["closeness", "control", "selfWorth", "boundary", "growth"];
  const scores: Record<string, number> = {};

  categories.forEach((cat) => {
    scores[cat] = calculateCategoryScore(cat, questions, answers);
  });

  return scores;
}