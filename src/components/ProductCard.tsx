import styled from "styled-components";

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
}

const ProductCard = ({
  brand,
  title,
  originalPrice,
  currentPrice,
  imageUrl,
}: ProductCardProps) => {
  const discountRate = Math.round(
    ((originalPrice - currentPrice) / originalPrice) * 100
  );

  return (
    <CardWrapper>
      <ImageWrapper>
        <ProductImage src={imageUrl} />
      </ImageWrapper>
      <InfoWrapper>
        <Brand>{brand}</Brand>
        <Title>{title}</Title>
        <PriceWrapper>
          <Discount>{discountRate}%</Discount>
          <Price>{currentPrice.toLocaleString()}원</Price>
        </PriceWrapper>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;
