import styled from "styled-components";

interface SkinTypeCardProps {
  rank: number | null;
  title: string;
  description: string;
  isTop: boolean;
}

const Card = styled.div<{ isTop: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: ${({ isTop }) => (isTop ? "1.5px solid #ff4081" : "1px solid #ccc")};
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  box-shadow: ${({ isTop }) =>
    isTop ? "0 4px 12px rgba(255, 64, 129, 0.2)" : "none"};
`;

const Medal = styled.span`
  font-size: 2rem;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 1;
`;

const Title = styled.div<{ isTop: boolean }>`
  font-weight: bold;
  font-size: 18px;
  color: ${({ isTop }) => (isTop ? "#ff4081" : "#333")};
`;

const Description = styled.p`
  font-size: 14px;
  color: #444;
  margin-top: 0.4rem;
  line-height: 1.5;
  word-break: keep-all;
  white-space: pre-wrap;
  text-align: right;
`;

const SkinTypeCard = ({
  rank,
  title,
  description,
  isTop,
}: SkinTypeCardProps) => {
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <Card isTop={isTop}>
      {rank !== null && rank >= 1 && rank <= 3 && (
        <Medal>{medals[rank - 1]}</Medal>
      )}
      <TextBox>
        <Title isTop={isTop}>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
    </Card>
  );
};

export default SkinTypeCard;
