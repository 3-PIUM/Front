import styled from "styled-components";

interface StarRatingProps {
  rating: number;
}

const StarContainer = styled.div`
  display: flex;
  gap: 0.001rem;
`;

const Star = styled.span<{ filled: boolean }>`
  font-size: 0.8rem;
  color: ${({ filled }) => (filled ? "#FFD700" : "#ccc")};
  cursor: default;
`;

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <StarContainer>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} filled={i <= rating}>
          ★
        </Star>
      ))}
    </StarContainer>
  );
};

export default StarRating;
