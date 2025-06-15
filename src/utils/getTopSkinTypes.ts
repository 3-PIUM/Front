// utils/getTopSkinTypes.ts

const skinTypeDescriptions: Record<string, string> = {
  건성: "보습 성분이 풍부해서 수분 공급에 효과적",
  복합성: "수분 + 진정 + 약한 각질 제거 성분이 균형 있게 구성",
  지성: "가볍고 수분 공급 중심의 성분이 많아 유분보다 수분 공급에 집중",
};

export const getTopSkinTypes = (chartData: any[]) => {
  const skinTypeGroup = chartData.find(
    (group) => group.category === "피부타입"
  );
  if (!skinTypeGroup) return [];

  const entries = Object.entries(skinTypeGroup).filter(
    ([key]) => key !== "category"
  ) as [string, number][];

  const sorted = [...entries].sort(([, a], [, b]) => b - a);

  let rank = 1;
  let prevScore: number | null = null;
  let sameRankCount = 0;

  return sorted.map(([type, score], idx) => {
    if (score !== prevScore) {
      rank = idx + 1;
      sameRankCount = 1;
    } else {
      sameRankCount++;
    }

    prevScore = score;

    return {
      rank,
      title: type,
      description: skinTypeDescriptions[type] || "",
      score,
    };
  });
};
