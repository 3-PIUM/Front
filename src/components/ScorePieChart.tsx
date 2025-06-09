import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";

interface IngredientData {
  score: string;
  percent: number;
  value: number;
  color: string;
}

interface ScorePieChartProps {
  data: IngredientData[];
}

const ChartWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
  margin-right: 6px;
`;

const ValueText = styled.span`
  font-weight: 500;
  color: #333;
`;

const ScorePieChart = ({ data }: ScorePieChartProps) => {
  // 차트에 들어갈 데이터는 percent 기반
  const chartData = data.map(({ score, percent, color }) => ({
    name: score,
    value: percent,
    fill: color,
  }));

  return (
    <ChartWrapper>
      <PieChart width={180} height={180}>
        <Pie
          data={chartData}
          dataKey="value"
          innerRadius={40}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          cornerRadius={5}
          labelLine={false}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-out"
        >
          {chartData.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>

      <LegendWrapper>
        {data.map((item, idx) => (
          <LegendItem key={idx}>
            <Dot color={item.color} />
            <ValueText>
              {item.score} - {item.value}개
            </ValueText>
          </LegendItem>
        ))}
      </LegendWrapper>
    </ChartWrapper>
  );
};

export default ScorePieChart;
