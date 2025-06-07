// DonutChart.tsx
import React from "react";
import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

const SVG = styled.svg`
  width: 80px;
  height: 80px;
`;

const Text = styled.text`
  font-size: 16px;
  fill: #333;
  dominant-baseline: middle;
  text-anchor: middle;
`;

interface DonutChartProps {
  percent: number;
  color: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ percent, color }) => {
  const radius = 36;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <ChartWrapper>
      <SVG viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#eee"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          strokeLinecap="round"
        />
        <Text x="50" y="54">
          {percent}%
        </Text>
      </SVG>
    </ChartWrapper>
  );
};

export default DonutChart;
