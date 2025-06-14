import styled from "styled-components";
import colors from "../../styles/colors";
import { FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 6.5rem;
  gap: 0.3rem;
`;

const ImageWrap = styled.div`
  position: relative;
  flex-shrink: 1;
`;

const ItemImage = styled.img`
  display: flex;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 0.625rem;
`;

const Heart = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  z-index: 1000;
`;

const ItemName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
`;

const PriceWrap = styled.div`
  display: flex;
  flex-direction: row;
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

interface ItemProps {
  imageSource: string;
  itemName: string;
  discountRate: number;
  price: number;
  itemId: number;
}

export default function ItemCard({
  imageSource,
  itemName,
  discountRate,
  price,
  itemId,
}: ItemProps) {
  const [isWished, setIsWished] = useState(false);
  const navigate = useNavigate();

  const handleWish = async () => {
    if (!isWished) {
      try {
        await axiosInstance.post("/wishlist", {
          param: {
            itemId: itemId,
          },
        });
        console.log("찜 추가가 됐습니다");
      } catch {}
    } else {
      try {
      } catch {}
    }
  };

  const handleClick = () => {
    const product = {
      id: itemName,
      name: itemName,
      brand: "샘플 브랜드",
      imageUrl: imageSource,
      originalPrice: price,
      discountRate: discountRate,
    };
    navigate("/product-detail", { state: { product } });
  };

  const formattedPrice = price.toLocaleString();

  return (
    <>
      <ItemWrap onClick={handleClick}>
        <ImageWrap>
          <ItemImage src={imageSource} />
          <Heart>
            <FaHeart
              fontSize={"1.4rem"}
              color={isWished ? colors.mainPink : colors.mediumGrey}
              onClick={handleWish}
            />
          </Heart>
        </ImageWrap>
        <ItemName>{itemName}</ItemName>
        <PriceWrap>
          <ItemDiscount>{discountRate}%</ItemDiscount>
          <ItemPrice>{formattedPrice}원</ItemPrice>
        </PriceWrap>
      </ItemWrap>
    </>
  );
}
