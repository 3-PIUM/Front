import React from "react";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
`;

const ChartGroupWrapper = styled.div``;

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
  width: 11px;
  height: 11px;
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

const getColorByPercent = (percent: number) => {
  if (percent >= 60) return "#F23477";
  else if (percent >= 30) return "#F884A8";
  else return "#f9cfdc";
};
interface ChartDataItem {
  category: string;
  [key: string]: number | string;
}

const StackedBarChart: React.FC<{ itemId: number }> = ({ itemId }) => {
  const { t } = useLocale();

  const [chartData, setChartData] = React.useState<ChartDataItem[]>([]);

  React.useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await fetch(`http://localhost:8080/item/${itemId}/graph`);
        const json = await res.json();
        const list = json.result.graphList as {
          name: string;
          optionName: string;
          percentage: number;
        }[];

        const grouped: Record<string, Record<string, number>> = {};
        list.forEach(({ name, optionName, percentage }) => {
          if (!grouped[name]) grouped[name] = {};
          grouped[name][optionName] = percentage;
        });

        const result: ChartDataItem[] = Object.entries(grouped).map(
          ([category, values]) => ({ category, ...values })
        );
        setChartData(result);
      } catch (err) {
        console.error("그래프 불러오기 실패", err);
      }
    };
    fetchGraph();
  }, [itemId]);

  return (
    <Wrapper>
      {chartData.map((group) => (
        <ChartGroupWrapper key={group.category}>
          <GroupTitle>
            <Highlight>{group.category}</Highlight> {t.productDetail.graph}
          </GroupTitle>
          <ChartGroup>
            {Object.entries(group)
              .filter(([key]) => key !== "category")
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .map(([label, percent]) => (
                <BarContainer key={label}>
                  <Label>{label}</Label>
                  <Track>
                    <Fill
                      percent={percent as number}
                      color={getColorByPercent(percent as number)}
                    />
                    <Circle
                      left={percent as number}
                      color={getColorByPercent(percent as number)}
                    />
                  </Track>
                  <Value color={getColorByPercent(percent as number)}>
                    {percent}%
                  </Value>
                </BarContainer>
              ))}
          </ChartGroup>
        </ChartGroupWrapper>
      ))}
    </Wrapper>
  );
};

export default StackedBarChart;
