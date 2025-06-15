import { useEffect, useState } from "react";
import SkinTypeCard from "./SkinTypeCard";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import axios from "axios";

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #222;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin: 1rem 0;
`;

interface AiSummary {
  id: number;
  ranking: number;
  title: string;
  content: string;
}

interface Props {
  itemId: number;
}

const SkinTypeRankList = ({ itemId }: Props) => {
  const { t } = useLocale();
  const [data, setData] = useState<AiSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/item/${itemId}/ai-summary`
        );
        setData(res.data.result.aiSummaryList);
      } catch (err) {
        console.error("AI 요약 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };
    if (itemId) fetchSummary();
  }, [itemId]);

  if (loading) return null;

  if (!data || data.length === 0) {
    return <EmptyMessage>{t.productDetail.noSkinTypeReview}</EmptyMessage>;
  }

  return (
    <div>
      <SectionTitle>{t.productDetail.skinReviewSummary}</SectionTitle>
      {data.map((item) => (
        <SkinTypeCard
          key={`${item.title}-${item.ranking}`}
          rank={item.ranking}
          title={item.title}
          description={item.content}
          isTop={item.ranking === 1}
        />
      ))}
    </div>
  );
};

export default SkinTypeRankList;
