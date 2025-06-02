import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styled from "styled-components";
import colors from "../styles/colors";

interface IngredientData {
  score: string;
  count: number;
}

interface ScorePieChartProps {
  data: IngredientData[];
}

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const scoreColors = [
  colors.mainPink, // 1~2점
  "#f472b6", // 3~4점
  "#facc15", // 5~6점
  "#38bdf8", // 7~8점
  "#a78bfa", // 9점
];

export default function ScorePieChart({ data }: ScorePieChartProps) {
  const sortedData = [...data].sort((a, b) => a.score.localeCompare(b.score));

  // 커스텀 라벨 렌더러
  const renderCustomizedLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, outerRadius, index, score } = props;
    const radius = outerRadius + 12;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={scoreColors[index % scoreColors.length]}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="14px"
      >
        {score}
      </text>
    );
  };

  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={sortedData}
            dataKey="count"
            nameKey="score"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={renderCustomizedLabel}
            labelLine={false}
            startAngle={90}
            endAngle={-270}
          >
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={scoreColors[index % scoreColors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
