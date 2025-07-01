import styled, { keyframes } from "styled-components";
import colors from "../../styles/colors";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useLocale } from "../../context/LanguageContext";
import { useWishlist } from "../../context/WishlistContext";
import { useEffect } from "react";

const shimmer = keyframes`
  0% {
    background-position: -100%;
  }
  100% {
    background-position: 100%;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const ItemWrap = styled.div<{ size?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  @media (max-width: 430px) {
    width: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
  }
  @media (max-width: 400px) {
    width: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
  }
  @media (max-width: 375px) {
    width: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
  }
`;

const ImageWrap = styled.div<{ size?: string }>`
  position: relative;
  flex-shrink: 1;
  background-color: #f5f5f5;
  border-radius: 0.625rem;
  overflow: hidden;

  @media (max-width: 430px) {
    width: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
    height: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
  }
  @media (max-width: 400px) {
    width: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
    height: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
  }
  @media (max-width: 375px) {
    width: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
    height: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
  }
`;

const ItemImage = styled.img<{ $isLoading: boolean; size?: string }>`
  border-radius: 0.625rem;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  transition: opacity 0.3s ease;

  @media (max-width: 430px) {
    width: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
    height: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
  }
  @media (max-width: 400px) {
    width: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
    height: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
  }
  @media (max-width: 375px) {
    width: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
    height: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
  }
`;

const SkeletonImage = styled(SkeletonBase)<{ size?: string }>`
  border-radius: 0.625rem;

  @media (max-width: 430px) {
    width: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
    height: ${({ size }) => (size === "big" ? "11rem" : "8rem")};
  }
  @media (max-width: 400px) {
    width: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
    height: ${({ size }) => (size === "big" ? "10rem" : "7rem")};
  }
  @media (max-width: 375px) {
    width: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
    height: ${({ size }) => (size === "big" ? "9.5rem" : "6.5rem")};
  }
`;

const Heart = styled.div`
  display: flex;
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
  z-index: 50;
`;

const ItemName = styled.div<{ size?: string }>`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ size }) => (size === "big" ? "1rem" : "0.75rem")};
  font-weight: ${({ size }) => (size === "big" ? "500" : "")};
`;

const PriceWrap = styled.div<{ size?: string }>`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-size: ${({ size }) => (size === "big" ? "0.9rem" : "0.8rem")};
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
  onWishChange?: () => void;
  size?: string;
  isLoading: boolean;
}

export default function ItemCard({
  imageSource,
  itemName,
  discountRate,
  price,
  itemId,
  onWishChange,
  size,
  isLoading,
}: ItemProps) {
  const navigate = useNavigate();
  const { t } = useLocale();

  // 찜 전역 관리
  const { toggleWishlist, isWishlisted } = useWishlist();

  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));

  useEffect(() => {
    console.log("전역 찜 상태:", isWishlisted(itemId));
  }, [isWishlisted, itemId]);

  const handleWish = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (!isWishlisted(itemId)) {
      try {
        const response = await axiosInstance.post(`/wishlist/${itemId}`);
        toggleWishlist(itemId);
        onWishChange?.();
        console.log("찜 추가가 됐습니다", response.data);
      } catch {
        console.error("찜 추가에 실패했습니다");
      }
    } else {
      try {
        await axiosInstance.delete(`/wishlist/${itemId}`);
        toggleWishlist(itemId);
        onWishChange?.();
        console.log("찜 취소가 됐습니다");
      } catch {
        console.error("찜 취소에 실패했습니다");
      }
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
    navigate(`/product-detail?itemId=${itemId}`, {
      state: { product },
    });
  };

  const formattedPrice = price.toLocaleString();

  return (
    <>
      {isLoading ? (
        <ItemWrap onClick={handleClick} size={size}>
          <ImageWrap size={size}>
            <SkeletonImage size={size} />
          </ImageWrap>
          <SkeletonBase
            style={{
              width: "100%",
              height: "0.75rem",
              borderRadius: "4px",
              marginTop: "0.3rem",
            }}
          />
          <SkeletonBase
            style={{
              width: "80%",
              height: "0.75rem",
              borderRadius: "4px",
              marginTop: "0.3rem",
            }}
          />
        </ItemWrap>
      ) : (
        <ItemWrap onClick={handleClick} size={size}>
          <ImageWrap size={size}>
            <ItemImage src={imageSource} $isLoading={isLoading} size={size} />
            {isLoggedIn && (
              <Heart>
                <FaHeart
                  fontSize={"1.4rem"}
                  color={
                    isWishlisted(itemId) ? colors.mainPink : colors.mediumGrey
                  }
                  onClick={handleWish}
                />
              </Heart>
            )}
          </ImageWrap>
          <ItemName size={size}>{itemName}</ItemName>
          <PriceWrap size={size}>
            {discountRate > 0 && <ItemDiscount>{discountRate}%</ItemDiscount>}
            <ItemPrice>
              {formattedPrice}
              {t.pos.won}
            </ItemPrice>
          </PriceWrap>
        </ItemWrap>
      )}
    </>
  );
}
