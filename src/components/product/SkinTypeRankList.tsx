import SkinTypeCard from "./SkinTypeCard";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #222;
`;

const SkinTypeRankList = ({ data }: { data: any[] }) => {
  const { t } = useLocale();

  if (!data || data.length === 0) return null;

  return (
    <div>
      <SectionTitle>{t.productDetail.skinReviewSummary}</SectionTitle>
      {data.map((item) => (
        <SkinTypeCard
          key={`${item.title}-${item.rank}`} // 혹시 title이 중복될 수 있으므로
          rank={item.rank}
          title={item.title}
          description={item.description}
          isTop={item.rank === 1}
        />
      ))}
    </div>
  );
};

export default SkinTypeRankList;
