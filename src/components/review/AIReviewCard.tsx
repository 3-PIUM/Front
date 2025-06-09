import styled from "styled-components";

interface ReviewCardProps {
  content: string;
}

const Card = styled.div`
  border: 1.5px solid #ff4081;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 0.8rem;
`;

const ReviewCard = ({ content }: ReviewCardProps) => {
  return <Card>{content}</Card>;
};

export default ReviewCard;
