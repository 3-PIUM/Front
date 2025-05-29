// ReviewSatisfactionCard.tsx
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

// styled-components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8f8f8;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

const Label = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #222;
  /* font-weight: bold; */
`;

const Score = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff4081;
`;

const StarIcon = styled(FaStar)`
  color: #faca15;
  font-size: 2rem;
`;

interface ReviewSatisfactionCardProps {
  score: number;
}

const ReviewSatisfactionCard = ({ score }: ReviewSatisfactionCardProps) => {
  return (
    <Wrapper>
      <Label>제품 만족도</Label>
      <Score>{score.toFixed(2)}</Score>
      <StarIcon />
    </Wrapper>
  );
};

export default ReviewSatisfactionCard;
