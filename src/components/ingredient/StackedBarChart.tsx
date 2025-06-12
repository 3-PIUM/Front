import React from "react";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

// ===== 스타일 =====
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 2열 구성
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    /* grid-template-columns: repeat(2, 1fr);*/
  }
`;

const ChartGroupWrapper = styled.div`
  /* width: 100%; */
  /* background-color: #f3f3f3; */
  /* border-radius: 10px; */
  /* padding: 1rem; */
`;

const GroupTitle = styled.h3`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #222;
`;

const ChartGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const BarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
`;

const Track = styled.div`
  width: 100%;
  height: 7px;
  background: #eee;
  border-radius: 6px;
  position: relative;
`;

const Fill = styled.div<{ percent: number; color: string }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: ${({ color }) => color};
  border-radius: 6px 0 0 6px;
  position: absolute;
  left: 0;
  top: 0;
`;

const Circle = styled.div<{ left: number; color: string }>`
  width: 13px;
  height: 13px;
  background: ${({ color }) => color};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  left: ${({ left }) => left}%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px ${({ color }) => color};
`;

const Label = styled.div`
  font-size: 11px;
  /* text-align: right; */
  width: 90px;
`;

const Value = styled.div<{ color: string }>`
  font-size: 12px;
  font-weight: bold;
  color: ${({ color }) => color};
  width: 50px;
  text-align: left;
`;

const Highlight = styled.span`
  color: #f23477;
`;

// ===== 데이터 =====
const colorMap: Record<string, string> = {
  건성: "#F23477",
  복합성: "#F884A8",
  지성: "#f9cfdc",
  보습: "#F23477",
  진정: "#F884A8",
  주름미백: "#f9cfdc",
  순함: "#F23477",
  보통: "#F884A8",
  자극: "#f9cfdc",
};

const defaultChartData: ChartDataItem[] = [
  {
    category: "피부타입",
    건성: 0,
    복합성: 0,
    지성: 0,
  },
  {
    category: "피부고민",
    보습: 0,
    진정: 0,
    주름미백: 0,
  },
  {
    category: "자극도",
    순함: 0,
    보통: 0,
    자극: 0,
  },
];

// ===== 컴포넌트 =====
interface ChartDataItem {
  category: string;
  [key: string]: number | string;
}

const StackedBarChart: React.FC<{ data: ChartDataItem[] }> = ({ data }) => {
  const { t } = useLocale();

  const displayData = data.length > 0 ? data : defaultChartData;

  return (
    <Wrapper>
      {displayData.map((group) => (
        <ChartGroupWrapper key={group.category}>
          <GroupTitle>
            <Highlight>{group.category}</Highlight> {t.productDetail.graph}
          </GroupTitle>
          <ChartGroup>
            {Object.entries(group)
              .filter(([key]) => key !== "category")
              .map(([label, percent]) => (
                <BarContainer key={label}>
                  <Label>{label}</Label>
                  <Track>
                    <Fill percent={percent as number} color={colorMap[label]} />
                    <Circle left={percent as number} color={colorMap[label]} />
                  </Track>
                  <Value color={colorMap[label]}>{percent}%</Value>
                </BarContainer>
              ))}
          </ChartGroup>
        </ChartGroupWrapper>
      ))}
    </Wrapper>
  );
};

export default StackedBarChart;
