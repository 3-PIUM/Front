import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: bold;
`;

const ViewAll = styled.span`
  font-size: 0.75rem;
  color: #aaa;
`;

const ScoreBox = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 1rem;
`;

const ScoreCard = styled.div<{ bgColor: string; borderColor: string }>`
  flex: 1;
  background-color: ${({ bgColor }) => bgColor};
  border: 0.5px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  padding: 0.6rem 0;
  text-align: center;
`;

const Score = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.2rem;
  font-weight: bold;
`;

const Label = styled.div<{ color: string }>`
  font-size: 0.8rem;
  color: ${({ color }) => color};
  margin-top: 0.25rem;
`;

const SkeletonBox = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: 1rem;
`;

const SkeletonCard = styled.div`
  flex: 1;
  height: 64px;
  border-radius: 10px;
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
`;

interface IngredientScoreSummaryProps {
  itemId: number;
}

export default function IngredientScoreSummary({
  itemId,
}: IngredientScoreSummaryProps) {
  const navigate = useNavigate();
  const { t } = useLocale();

  const [scores, setScores] = useState({
    safe: 0,
    caution: 0,
    harmful: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchScoreCounts = async () => {
      try {
        const res = await axiosInstance.get(`/item/${itemId}/score/count`);
        const result = res.data.result;
        setScores({
          safe: result.safeCount,
          caution: result.cautionCount,
          harmful: result.dangerCount,
        });
      } catch (error) {
        console.error("성분 점수 불러오기 실패", error);
      }
      setIsLoading(false);
    };

    if (itemId) {
      fetchScoreCounts();
    }
  }, [itemId]);

  return (
    <Wrapper>
      <Header>
        <Title>{t.productDetail.scoreTitle}</Title>
        <ViewAll
          onClick={() => navigate(`/ingredient-detail?itemId=${itemId}`)}
        >
          {t.productDetail.viewAll} &gt;
        </ViewAll>
      </Header>
      {isLoading ? (
        <SkeletonBox>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </SkeletonBox>
      ) : (
        <ScoreBox>
          <ScoreCard bgColor="#e6f8e6" borderColor="#34c759">
            <Score color="#34c759">{scores.safe}</Score>
            <Label color="#34c759">{t.ingredient.safeLabel}</Label>
          </ScoreCard>
          <ScoreCard bgColor="#fff9e6" borderColor="#f9c846">
            <Score color="#f9c846">{scores.caution}</Score>
            <Label color="#f9c846">{t.ingredient.cautionLabel}</Label>
          </ScoreCard>
          <ScoreCard bgColor="#ffe6e6" borderColor="#ff3b30">
            <Score color="#ff3b30">{scores.harmful}</Score>
            <Label color="#ff3b30">{t.ingredient.harmfulLabel}</Label>
          </ScoreCard>
        </ScoreBox>
      )}
    </Wrapper>
  );
}
