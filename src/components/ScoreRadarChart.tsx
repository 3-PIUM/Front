import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Radar,
} from "recharts";
import styled from "styled-components";
import colors from "../styles/colors"; // colors.mainPink 등 정의되어 있어야 함

interface IngredientData {
  score: string;
  count: number;
}

interface ScoreRadarChartProps {
  data: IngredientData[];
}

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 1rem; // 전체 여백 제어
`;

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0; // 하단 여백만 1rem 주기
`;

export default function ScoreRadarChart({ data }: ScoreRadarChartProps) {
  const scoreToNum = (score: string): number => {
    if (score.includes("~")) {
      const [start, end] = score.split("~").map(Number);
      return (start + end) / 2;
    }
    return Number(score.replace(/[^0-9]/g, ""));
  };

  const sortedData = [...data].sort(
    (a, b) => scoreToNum(a.score) - scoreToNum(b.score)
  );

  return (
    <ChartWrapper>
      <Title>소비자 리뷰 기반 평가</Title>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={sortedData}
          margin={{ top: 0, right: 20, bottom: 0, left: 20 }} // 여백 최소화
        >
          <defs>
            <linearGradient
              id="bluePinkGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colors.mainPink} />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <PolarGrid />
          <PolarAngleAxis dataKey="score" tick={{ fontSize: 12 }} />
          <Radar
            dataKey="count"
            stroke="url(#bluePinkGradient)"
            fill="url(#bluePinkGradient)"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
