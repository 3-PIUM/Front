// GroupedDonutChart.tsx
import React from "react";
import styled from "styled-components";
import DonutChart from "./DonutChart";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GroupWrapper = styled.div``;

const GroupTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ChartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ChartLabel = styled.div`
  font-size: 14px;
  text-align: center;
`;

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

const data = [
  {
    category: "피부타입",
    건성: 74,
    복합성: 23,
    지성: 3,
  },
  {
    category: "피부고민",
    보습: 74,
    진정: 12,
    주름미백: 14,
  },
  {
    category: "자극도",
    순함: 87,
    보통: 12,
    자극: 1,
  },
];

const GroupedDonutChart: React.FC = () => {
  return (
    <Wrapper>
      {data.map((group) => (
        <GroupWrapper key={group.category}>
          <GroupTitle>{group.category}</GroupTitle>
          <ChartRow>
            {Object.entries(group)
              .filter(([key]) => key !== "category")
              .map(([label, percent]) => (
                <ChartItem key={label}>
                  <DonutChart
                    percent={percent as number}
                    color={colorMap[label]}
                  />
                  <ChartLabel>{label}</ChartLabel>
                </ChartItem>
              ))}
          </ChartRow>
        </GroupWrapper>
      ))}
    </Wrapper>
  );
};

export default GroupedDonutChart;
