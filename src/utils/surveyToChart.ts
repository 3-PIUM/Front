// utils/surveyToChart.ts
export const surveyAnswersToChartData = (answers: Record<string, string>) => {
  const base = {
    피부타입: { 건성: 0, 복합성: 0, 지성: 0 },
    피부고민: { 보습: 0, 진정: 0, 주름미백: 0 },
    자극도: { 순함: 0, 보통: 0, 자극: 0 },
  };

  if (answers.skinType) {
    const key = answers.skinType.replace("에 좋아요", "");
    base.피부타입[key] += 1;
  }

  if (answers.skinConcern) {
    const key = answers.skinConcern.replace("에 좋아요", "").replace("/", "");
    base.피부고민[key] += 1;
  }

  if (answers.sensitivity) {
    const map: Record<string, string> = {
      "자극없이 순해요": "순함",
      보통이에요: "보통",
      "자극이 느껴져요": "자극",
    };
    const key = map[answers.sensitivity];
    base.자극도[key] += 1;
  }

  return Object.entries(base).map(([category, values]) => ({
    category,
    ...values,
  }));
};
