import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

const Wrapper = styled.div`
  /* padding: 1rem; */
`;

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

interface IngredientScoreSummaryProps {
  safe: number;
  caution: number;
  harmful: number;
}

export default function IngredientScoreSummary({
  safe,
  caution,
  harmful,
}: IngredientScoreSummaryProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  return (
    <Wrapper>
      <Header>
        <Title>{t.productDetail.scoreTitle}</Title>
        <ViewAll onClick={() => navigate("/ingredient-detail")}>
          {t.productDetail.viewAll} &gt;
        </ViewAll>
      </Header>
      <ScoreBox>
        <ScoreCard bgColor="#e6f8e6" borderColor="#34c759">
          <Score color="#34c759">{safe}</Score>
          <Label color="#34c759">안전 성분</Label>
        </ScoreCard>
        <ScoreCard bgColor="#fff9e6" borderColor="#f9c846">
          <Score color="#f9c846">{caution}</Score>
          <Label color="#f9c846">주의 성분</Label>
        </ScoreCard>
        <ScoreCard bgColor="#ffe6e6" borderColor="#ff3b30">
          <Score color="#ff3b30">{harmful}</Score>
          <Label color="#ff3b30">위험 성분</Label>
        </ScoreCard>
      </ScoreBox>
    </Wrapper>
  );
}
