import styled from "styled-components";
import { useState, useEffect, Suspense, lazy } from "react";
import { useLocale } from "../../context/LanguageContext";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const TextHeader = lazy(() => import("../../components/common/TextHeader"));
const ScorePieChart = lazy(
  () => import("../../components/ingredient/ScorePieChart")
);
const ScoreBar = lazy(() => import("../../components/ingredient/ScoreBar"));
const Header = lazy(() => import("../../components/common/Header"));

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

const scoreColorMap: Record<string, string> = {
  "1~2": "#ec4899",
  "3~4": "#f472b6",
  "5~6": "#facc15",
  "7~8": "#38bdf8",
  "9~10": "#a78bfa",
};

function getScoreRange(score: number): string {
  if (score >= 9) return "9~10";
  if (score >= 7) return "7~8";
  if (score >= 5) return "5~6";
  if (score >= 3) return "3~4";
  return "1~2";
}

export default function IngredientDetailPage() {
  const { t } = useLocale();
  const location = useLocation();
  const itemId = Number(new URLSearchParams(location.search).get("itemId"));
  const [openScore, setOpenScore] = useState<string | null>(null);
  const [groupedData, setGroupedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/item/${itemId}/score`);
        const rankingList = res.data.result.rankingList;

        const grouped: Record<string, any> = {};
        for (const item of rankingList) {
          const score = item.ranking;
          const range = getScoreRange(score);
          if (!grouped[range]) {
            grouped[range] = {
              score: range,
              percent: 0,
              value: 0,
              color: scoreColorMap[range],
              ingredients: [],
            };
          }
          grouped[range].value += 1;
          grouped[range].ingredients.push({
            name: item.name,
            description: item.effect,
          });
        }

        const total = rankingList.length;
        const result = Object.values(grouped).map((group: any) => ({
          ...group,
          percent: Math.round((group.value / total) * 100),
        }));

        setGroupedData(result);
        setIsLoading(false);
      } catch (err) {
        console.error("성분 스코어 불러오기 실패", err);
      }
    };

    if (itemId) fetchData();
  }, [itemId]);

  const maxScoreSection =
    groupedData.length > 0
      ? groupedData.reduce((prev, curr) =>
          prev.percent > curr.percent ? prev : curr
        )
      : null;

  return (
    <>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <TextHeader pageName={t.ingredientDetail.ingredientDetail} />
      </Suspense>
      <Container>
        <Title>{t.ingredientDetail.title}</Title>
        <Description>
          {t.ingredientDetail.summary1}{" "}
          <Highlight>
            {maxScoreSection
              ? `${maxScoreSection.score}${t.ingredientDetail.scoreUnit}`
              : "-"}
          </Highlight>
          {t.ingredientDetail.summary2}
          <br />
          {t.ingredientDetail.sub}
          <p>{t.ingredientDetail.warning}</p>
        </Description>

        <Wrapper>
          {groupedData.length > 0 && (
            <ChartWrapper>
              <Suspense
                fallback={
                  <div
                    style={{
                      height: "200px",
                      background: "#f3f3f3",
                      borderRadius: "8px",
                    }}
                  />
                }
              >
                <ScorePieChart data={groupedData} isLoading={isLoading} />
              </Suspense>
            </ChartWrapper>
          )}

          {groupedData
            .sort((a, b) => b.percent - a.percent)
            .map((item) => (
              <div key={item.score}>
                <Suspense
                  fallback={
                    <div
                      style={{
                        backgroundColor: "#eee",
                        height: "60px",
                        borderRadius: "10px",
                        marginBottom: "0.8rem",
                      }}
                    />
                  }
                >
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
                    isLoading={isLoading}
                  />
                </Suspense>
                {openScore === item.score &&
                  item.ingredients.map((ing: any, idx: number) => (
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
