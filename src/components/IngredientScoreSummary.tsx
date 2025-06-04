import styled from "styled-components";

const Wrapper = styled.div`
  /* padding: 1rem; */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
`;

const ViewAll = styled.span`
  font-size: 0.9rem;
  color: #aaa;
`;

const ScoreBox = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const ScoreCard = styled.div<{ bgColor: string; borderColor: string }>`
  flex: 1;
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 12px;
  padding: 0.75rem 0;
  text-align: center;
`;

const Score = styled.div`
  color: #000;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Label = styled.div`
  font-size: 0.8rem;
  color: #555;
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
  return (
    <Wrapper>
      <Header>
        <Title>성분 스코어</Title>
        <ViewAll>전체 성분 보기 &gt;</ViewAll>
      </Header>
      <ScoreBox>
        <ScoreCard bgColor="#e6f8e6" borderColor="#34c759">
          <Score>{safe}</Score>
          <Label>안전 성분</Label>
        </ScoreCard>
        <ScoreCard bgColor="#fff9e6" borderColor="#f9c846">
          <Score>{caution}</Score>
          <Label>주의 성분</Label>
        </ScoreCard>
        <ScoreCard bgColor="#ffe6e6" borderColor="#ff3b30">
          <Score>{harmful}</Score>
          <Label>위험 성분</Label>
        </ScoreCard>
      </ScoreBox>
    </Wrapper>
  );
}
