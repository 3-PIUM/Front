import { styled } from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

const rankColors = [
  "#F23477", // 1위
  "#F75A8B", // 2위
  "#FB8FA8", // 3위
  "#FDC3D2", // 4위
  "#fcdae6", // 5위
];

const RankTitle = styled.div<{ color: string }>`
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  width: 10%;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color};
`;

const ItemImage = styled.img`
  display: flex;
  width: 25%;
  height: 25%;
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 1rem 0 1rem 1rem;
  justify-content: center;
`;

const PriceWrap = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
`;

const ItemDiscount = styled.div`
  display: flex;
  color: ${colors.mainPink};
`;

const ItemPrice = styled.div`
  display: flex;
`;

const ItemName = styled.div`
  display: flex;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
`;

interface ItemProps {
  imageSource: string;
  itemName: string;
  discountRate: number;
  price: number;
  itemId: number;
  wishStatus?: boolean;
  onWishChange?: () => void;
  rank: string;
}

export default function TopRankItem({
  imageSource,
  itemName,
  discountRate,
  price,
  itemId,
  wishStatus,
  onWishChange,
  rank,
}: ItemProps) {
  const { t } = useLocale();
  return (
    <Wrapper>
      <RankTitle color={rankColors[Number(rank) - 1]}>{rank}</RankTitle>

      <ItemImage src={imageSource} />
      <ItemInfo>
        <ItemName>{itemName}</ItemName>
        <PriceWrap>
          <ItemDiscount>{discountRate}%</ItemDiscount>
          <ItemPrice>{price}원</ItemPrice>
        </PriceWrap>
      </ItemInfo>
    </Wrapper>
  );
}
