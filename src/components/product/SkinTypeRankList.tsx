import { useEffect, useState } from "react";
import SkinTypeCard from "./SkinTypeCard";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import SkinTypeModal from "../model/SkinTypeModal";

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
`;

const EmptyMessage = styled.p`
  font-size: 14px;
  color: #666;
  margin: 1rem 0;
`;

const Select = styled.select`
  padding: 0.3rem 0rem;
  font-size: 14px;
  margin-left: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface AiSummary {
  id: number;
  ranking: number;
  title: string;
  content: string;
  itemOption: string;
  originalContent: string;
}

interface Props {
  itemId: number;
}

const SkinTypeRankList = ({ itemId }: Props) => {
  const { t } = useLocale();
  const [data, setData] = useState<AiSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [modalContent, setModalContent] = useState<string | null>(null);

  // useEffect 내부에서 option 리스트 생성
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axiosInstance.get(`/item/${itemId}/ai-summary`);
        const list = res.data.result.aiSummaryList || [];

        setData(list);

        const optionList: string[] = Array.from(
          new Set(list.map((item: any) => item.itemOption).filter(Boolean))
        );
        setOptions(optionList);

        if (optionList.length > 0) {
          setSelectedOption(optionList[0]);
        }
      } catch (err) {
        console.error("AI 요약 불러오기 실패", err);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) fetchSummary();
  }, [itemId]);

  // 필터링된 데이터
  const filteredByOption = selectedOption
    ? data.filter((d) => d.itemOption === selectedOption)
    : data;

  const hasRanking = filteredByOption.some(
    (item) => item.ranking && item.ranking > 0
  );

  const filteredData = hasRanking
    ? filteredByOption.filter((item) => item.ranking && item.ranking > 0)
    : filteredByOption;

  if (loading) return null;

  if (!data || data.length === 0) {
    return <EmptyMessage>{t.productDetail.noSkinTypeReview}</EmptyMessage>;
  }

  return (
    <div>
      <TitleWrapper>
        <SectionTitle>{t.productDetail.skinReviewSummary}</SectionTitle>
        {options.length > 0 && (
          <Select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        )}
      </TitleWrapper>

      {filteredData.map((item) => (
        <div
          key={item.id}
          onClick={() =>
            setModalContent(item.originalContent || "상세 요약이 없습니다.")
          }
        >
          <SkinTypeCard
            rank={item.ranking}
            title={item.title}
            description={item.content}
            isTop={item.ranking === 1}
          />
        </div>
      ))}
      {modalContent && (
        <SkinTypeModal
          content={modalContent}
          onClose={() => setModalContent(null)}
        />
      )}
    </div>
  );
};

export default SkinTypeRankList;
