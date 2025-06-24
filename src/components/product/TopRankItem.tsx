import { styled } from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const rankColors = [
  "#F23477",
  "#F75A8B",
  "#FB8FA8",
  "#F75A8B",
  "#FB8FA8",
  "#b6b6b6",
  "#b6b6b6",
  "#b6b6b6",
  "#b6b6b6",
  "#b6b6b6",
];

const RankTitle = styled.div<{ color: string }>`
  display: flex;
  font-size: 1.2rem;
  font-weight: 700;
  width: 10%;
  justify-content: baseline;
  align-items: center;
  color: ${(props) => props.color};

  .medal {
    font-size: 1.8rem;
  }
`;

const ItemImage = styled.img`
  display: flex;
  width: 25%;
  height: 25%;
  border-radius: 0.5rem;
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
  font-size: 0.9rem;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
`;

interface ItemProps {
  imageSource: string;
  itemName: string;
  discountRate: number;
  price: number;
  itemId: number;
  wishStatus?: boolean;
  onWishChange?: () => void;
  rank: number;
}

export default function TopRankItem({
  imageSource,
  itemName,
  discountRate,
  price,
  rank,
}: ItemProps) {
  const { t } = useLocale();
  const formattedPrice = price.toLocaleString();

  return (
    <Wrapper>
      <RankTitle color={rankColors[Number(rank) - 1]}>
        {rank === 1 || rank === 2 || rank === 3 ? (
          <span className="medal">
            {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
          </span>
        ) : (
          rank
        )}
      </RankTitle>
      <ItemImage src={imageSource} />
      <ItemInfo>
        <ItemName>{itemName}</ItemName>
        <PriceWrap>
          <ItemDiscount>{discountRate}%</ItemDiscount>
          <ItemPrice>
            {formattedPrice}
            {t.pos.won}
          </ItemPrice>
        </PriceWrap>
      </ItemInfo>
    </Wrapper>
  );
}
