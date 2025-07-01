import { useEffect, useState, useRef } from "react";
// Add this line below the other imports
type Timeout = ReturnType<typeof setTimeout>;
import SkinTypeCard from "./SkinTypeCard";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import SkinTypeModal from "../modal/SkinTypeModal";
import { IoIosInformationCircle } from "react-icons/io";

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #222;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const BubbleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 900;
`;

const SpeechBubble = styled.div`
  position: absolute;
  bottom: 2.5rem;
  background: #fff;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  font-weight: 500;
  color: #222;
  width: max-content;
  max-width: 270px;
  text-align: left;
  z-index: 999;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
`;

const ExclamationButton = styled.div`
  display: flex;
  font-size: 23px;
  color: #9a9a9a;
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
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  const speechBubbleRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<Timeout | null>(null);

  useEffect(() => {
    if (showSpeechBubble) {
      // 3초 후 자동 닫기
      timeoutRef.current = setTimeout(() => {
        setShowSpeechBubble(false);
      }, 3000);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        speechBubbleRef.current &&
        !speechBubbleRef.current.contains(e.target as Node)
      ) {
        setShowSpeechBubble(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSpeechBubble]);

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
        <BubbleWrapper ref={speechBubbleRef}>
          {showSpeechBubble && (
            <SpeechBubble>
              {t.reviewSummaryNotice[0]}
              <br />
              {t.reviewSummaryNotice[1]}
            </SpeechBubble>
          )}
          <ExclamationButton
            onClick={() => setShowSpeechBubble(!showSpeechBubble)}
          >
            <IoIosInformationCircle />
          </ExclamationButton>
        </BubbleWrapper>
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
