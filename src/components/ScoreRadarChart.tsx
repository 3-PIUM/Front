import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Radar,
} from "recharts";
import styled from "styled-components";
import colors from "../styles/colors";

interface IngredientData {
  score: string;
  count: number;
}

interface ScoreRadarChartProps {
  data: IngredientData[];
}

const ChartWrapper = styled.div`
  width: 100%;
  height: 320px;
  /* margin: 1.5rem 0; */
`;

export default function ScoreRadarChart({ data }: ScoreRadarChartProps) {
  const scoreToNum = (score: string): number => {
    if (score.includes("~")) {
      const [start, end] = score.split("~").map(Number);
      return (start + end) / 2;
    }
    return Number(score);
  };

  const sortedData = [...data].sort(
    (a, b) => scoreToNum(a.score) - scoreToNum(b.score)
  );

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={sortedData}
          margin={{ top: 20, right: 0, bottom: 20, left: 40 }}
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
          <PolarAngleAxis dataKey="score" />
          {/* <PolarRadiusAxis angle={30} domain={[0, 15]} tick={false} /> */}

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
