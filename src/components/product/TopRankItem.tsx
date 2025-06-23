import { styled } from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

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
  width: 55%;
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

const Heart = styled.div`
  display: flex;
  width: 10%;
  justify-content: center;
  align-items: center;
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
  const [isWished, setIsWished] = useState(wishStatus ?? false);

  const handleWish = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isWished) {
      try {
        const response = await axiosInstance.post(`/wishlist/${itemId}`);
        setIsWished(true);
        console.log("찜 추가가 됐습니다", response.data);
      } catch {
        console.error("찜 추가에 실패했습니다");
      }
    } else {
      try {
        await axiosInstance.delete(`/wishlist/${itemId}`);
        console.log("찜 취소가 됐습니다");
        setIsWished(false);
        onWishChange?.();
      } catch {
        console.error("찜 취소에 실패했습니다");
      }
    }
  };

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
      <Heart>
        <FaHeart
          fontSize={"1.4rem"}
          color={isWished ? colors.mainPink : colors.mediumGrey}
          onClick={handleWish}
        />
      </Heart>
    </Wrapper>
  );
}
