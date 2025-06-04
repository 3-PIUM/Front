import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";
import ScoreRadarChart from "../components/ScorePieChart";
import TextHeader from "../components/TextHeader";
import ScorePieChart from "../components/ScorePieChart";

const dummyData = [
  {
    score: "9",
    count: 2,
    ingredients: [
      {
        name: "벤조페논-3",
        description: "자외선 차단을 위한 성분이지만 피부 자극 가능성 있음.",
      },
      {
        name: "에탄올",
        description: "피부 건조 유발 가능성이 있는 알코올 성분.",
      },
    ],
  },
  {
    score: "7~8",
    count: 4,
    ingredients: [
      { name: "향료", description: "민감성 피부에 자극이 될 수 있음." },
      {
        name: "다이메티콘",
        description: "호흡기 자극 가능성이 있는 실리콘 계열 성분.",
      },
    ],
  },
  {
    score: "5~6",
    count: 3,
    ingredients: [
      {
        name: "페녹시에탄올",
        description: "방부제로 사용되며 피부 자극 가능성 존재.",
      },
      {
        name: "소듐라우레스설페이트",
        description: "세정력이 강한 계면활성제로 피부 자극 가능성 있음.",
      },
    ],
  },
  {
    score: "3~4",
    count: 1,
    ingredients: [
      {
        name: "부틸렌글라이콜",
        description: "피부에 안전하나 고농도 사용 시 주의 필요.",
      },
      {
        name: "디소듐이디티에이",
        description: "금속 이온을 안정화시키는 성분, 환경에 악영향 가능.",
      },
    ],
  },
  {
    score: "1~2",
    count: 1,
    ingredients: [{ name: "정제수", description: "가장 일반적인 기본 성분." }],
  },
];

const Container = styled.div`
  padding: 4rem 1rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
`;

const Description = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #111;

  p {
    margin-top: 0.2rem;
    font-size: 0.7rem;
    color: #888;
  }
`;

const Section = styled.div`
  margin-top: 1rem;
`;

const ScoreHeader = styled.div<{ active: boolean }>`
  padding: 1rem;
  background-color: ${({ active }) => (active ? "#fff0f5" : "#fff")};
  border: 1px solid ${({ active }) => (active ? colors.mainPink : "#ddd")};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: ${({ active }) => (active ? colors.mainPink : "#000")};
`;

const IngredientBox = styled.div`
  background: #fff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  margin-top: 0.5rem;
`;

const IngredientName = styled.div`
  font-weight: bold;
`;

const IngredientDesc = styled.div`
  font-size: 0.875rem;
  color: #555;
  margin-top: 0.25rem;
`;

const ChartCenterWrapper = styled.div`
  display: flex;
  margin-right: 1rem;
`;

const Highlight = styled.strong`
  color: ${colors.mainPink};
  font-weight: bold;
`;

export default function IngredientDetailPage() {
  const [openScore, setOpenScore] = useState<string | null>("4~3");
  const maxScoreSection = dummyData.reduce((prev, curr) =>
    prev.count > curr.count ? prev : curr
  );

  return (
    <>
      <TextHeader pageName="성분 설명" />
      <Container>
        <Title>성분 스코어</Title>
        <Description>
          이 제품은 <Highlight>{maxScoreSection.score}점</Highlight>대 성분이
          상대적으로 많은 편입니다.
          <br />
          그래프의 점수 클릭 시 성분 확인이 가능합니다.
          <p>* 스코어가 높을수록 주의가 필요한 성분일 확률이 높습니다.</p>
        </Description>

        <ChartCenterWrapper>
          <ScorePieChart
            data={[
              { score: "1~2점", count: 9 },
              { score: "3~4점", count: 3 },
              { score: "5~6점", count: 9 },
              { score: "7~8점", count: 4 },
              { score: "9점", count: 1 },
            ]}
          />
        </ChartCenterWrapper>

        {[...dummyData]
          .sort((a, b) => b.count - a.count)
          .map((section) => (
            <Section key={section.score}>
              <ScoreHeader
                active={openScore === section.score}
                onClick={() =>
                  setOpenScore((prev) =>
                    prev === section.score ? null : section.score
                  )
                }
              >
                <span>{section.score}점</span>
                <span>{section.count}개</span>
              </ScoreHeader>

              {openScore === section.score &&
                section.ingredients.map((ing, idx) => (
                  <IngredientBox key={idx}>
                    <IngredientName>{ing.name}</IngredientName>
                    <IngredientDesc>{ing.description}</IngredientDesc>
                  </IngredientBox>
                ))}
            </Section>
          ))}
      </Container>
    </>
  );
}
