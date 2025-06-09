import SkinTypeCard from "./SkinTypeCard";

const skinTypeData = [
  {
    rank: 1,
    title: "복합성",
    description: "수분 + 진정 + 약한 각질 제거 성분이 균형 있게 구성",
  },
  {
    rank: 2,
    title: "건성",
    description: "보습 성분이 풍부해서 수분 공급에 효과적",
  },
  {
    rank: 3,
    title: "지성",
    description:
      "가볍고 수분 공급 중심의 성분이 많아 유분보다 수분 공급에 집중",
  },
];

const SkinTypeRankList = () => {
  return (
    <div>
      {skinTypeData.map((item) => (
        <SkinTypeCard
          key={item.rank}
          rank={item.rank}
          title={item.title}
          description={item.description}
          isTop={item.rank === 1}
        />
      ))}
    </div>
  );
};

export default SkinTypeRankList;
