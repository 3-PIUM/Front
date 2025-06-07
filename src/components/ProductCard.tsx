import styled from "styled-components";
import { useLocale } from "../context/LanguageContext";

const CardWrapper = styled.div`
  width: 100%;
  background: #fff;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const InfoWrapper = styled.div`
  padding: 1rem;
`;

const Brand = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

const Discount = styled.div`
  color: #ff3366;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

interface ProductCardProps {
  brand: string;
  title: string;
  originalPrice: number;
  currentPrice: number;
  imageUrl: string;
  stock: number;
}

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 0.5rem;
`;

const Stock = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #f23477;
  margin-top: 0.5rem;
`;

const ProductCard = ({
  brand,
  title,
  originalPrice,
  currentPrice,
  imageUrl,
  stock,
}: ProductCardProps) => {
  const discountRate = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  const { t } = useLocale();

  return (
    <CardWrapper>
      <ImageWrapper>
        <ProductImage src={imageUrl} />
      </ImageWrapper>
      <InfoWrapper>
        <Brand>{brand}</Brand>
        <Title>{title}</Title>
        <InfoRow>
          <Stock>재고 수량: {stock}개</Stock>
          <PriceWrapper>
            <Discount>{discountRate}%</Discount>
            <Price>{currentPrice.toLocaleString()}원</Price>
          </PriceWrapper>
        </InfoRow>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;
