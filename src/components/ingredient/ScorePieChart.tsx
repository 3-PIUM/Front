import { createGlobalStyle } from "styled-components";
import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

interface IngredientData {
  score: string;
  percent: number;
  value: number;
  color: string;
}

interface ScorePieChartProps {
  data: IngredientData[];
  isLoading?: boolean;
}

const GlobalStyle = createGlobalStyle`
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ChartContainer = styled.div``;

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

const ScorePieChart = ({ data, isLoading }: ScorePieChartProps) => {
  if (isLoading) {
    return (
      <>
        <GlobalStyle />
        <ChartContainer>
          <ChartWrapper>
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                animation: "pulse 1.5s infinite",
              }}
            />
            <LegendWrapper>
              {Array(3)
                .fill(null)
                .map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "140px",
                      height: "16px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                ))}
            </LegendWrapper>
          </ChartWrapper>
        </ChartContainer>
      </>
    );
  }

  const chartData = data.map(({ score, percent, color }) => ({
    name: score,
    value: percent,
    fill: color,
  }));
  const { t } = useLocale();

  return (
    <ChartContainer>
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
                {`${item.score}${t.ingredientDetail.scoreUnit}`} -{" "}
                {`${item.value}${
                  item.value === 1
                    ? t.ingredientDetail.quantityNumber.one
                    : t.ingredientDetail.quantityNumber.more
                }`}
              </ValueText>
            </LegendItem>
          ))}
        </LegendWrapper>
      </ChartWrapper>
    </ChartContainer>
  );
};

export default ScorePieChart;
