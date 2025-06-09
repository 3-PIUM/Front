import styled from "styled-components";

const Wrapper = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  background-color: ${({ $active }) => ($active ? "#f9f5ff" : "#fff")};
  border: 1px solid ${({ $active }) => ($active ? "#c4b5fd" : "#eee")};
  border-radius: 12px;
  margin-top: 0.8rem;
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const BarWrapper = styled.div`
  width: 100%;
  max-width: 140px; // 여기서 조정 가능
  margin: 0 1rem;
`;

const Bar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #eee;
  border-radius: 5px;
`;

const BarFill = styled.div<{ percent: number; color: string }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: 5px;
`;

const PercentText = styled.div`
  width: 40px;
  text-align: right;
  font-size: 13px;
  font-weight: bold;
`;

interface Props {
  score: string;
  percent: number;
  color: string;
  active: boolean;
  onClick: () => void;
}

export default function ScoreBar({
  score,
  percent,
  color,
  active,
  onClick,
}: Props) {
  return (
    <Wrapper onClick={onClick} $active={active}>
      <Left>
        <Dot style={{ backgroundColor: color }} />
        <Label>{score}</Label>
      </Left>
      <BarWrapper>
        <Bar>
          <BarFill percent={percent} color={color} />
        </Bar>
      </BarWrapper>
      <PercentText>{percent}%</PercentText>
    </Wrapper>
  );
}
