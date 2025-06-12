import styled from "styled-components";
// import { PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";
import TextHeader from "../../components/common/TextHeader";
import ScorePieChart from "../../components/ingredient/ScorePieChart";
import ScoreBar from "../../components/ingredient/ScoreBar";
import { useLocale } from "../../context/LanguageContext";

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

const Highlight = styled.strong`
  color: #ec4899;
  font-weight: bold;
`;

const Wrapper = styled.div`
  padding: 1.5rem 0rem;
`;

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const IngredientBox = styled.div`
  margin-top: 0.5rem;
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);

  p {
    margin-top: 0.3rem;
    font-size: 0.8rem;
    color: #555;
  }
`;

const ingredientData = [
  {
    score: "9~10",
    percent: 5,
    value: 1,
    color: "#a78bfa",
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
    percent: 20,
    value: 2,
    color: "#38bdf8",
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
    percent: 30,
    value: 5,
    color: "#facc15",
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
    percent: 25,
    value: 3,
    color: "#f472b6",
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
    percent: 20,
    value: 3,
    color: "#ec4899",
    ingredients: [{ name: "정제수", description: "가장 일반적인 기본 성분." }],
  },
];

export default function IngredientDetailPage() {
  const [openScore, setOpenScore] = useState<string | null>(null);
  const totalPercent = ingredientData.reduce((sum, d) => sum + d.percent, 0);
  const maxScoreSection = ingredientData.reduce((prev, curr) =>
    prev.percent > curr.percent ? prev : curr
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { t } = useLocale();

  return (
    <>
      <TextHeader pageName={t.ingredientDetail.ingredientDetail} />
      <Container>
        <Title>{t.ingredientDetail.title}</Title>
        <Description>
          {t.ingredientDetail.summary1}{" "}
          <Highlight>
            {maxScoreSection.score}
            {t.ingredientDetail.scoreUnit}
          </Highlight>
          {t.ingredientDetail.summary2}
          <br />
          {t.ingredientDetail.sub}
          <p>{t.ingredientDetail.warning}</p>
        </Description>
        <Wrapper>
          <ChartWrapper>
            <ScorePieChart data={ingredientData} />
          </ChartWrapper>

          {[...ingredientData]
            .sort((a, b) => b.percent - a.percent)
            .map((item) => (
              <div key={item.score}>
                <ScoreBar
                  score={`${item.score}${t.ingredientDetail.scoreUnit}`}
                  percent={item.percent}
                  color={item.color}
                  active={openScore === item.score}
                  onClick={() =>
                    setOpenScore((prev) =>
                      prev === item.score ? null : item.score
                    )
                  }
                />
                {openScore === item.score &&
                  item.ingredients.map((ing, idx) => (
                    <IngredientBox key={idx}>
                      <strong>{ing.name}</strong>
                      <p>{ing.description}</p>
                    </IngredientBox>
                  ))}
              </div>
            ))}
        </Wrapper>
      </Container>
    </>
  );
}
