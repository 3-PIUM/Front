import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

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
  padding-top: 2.8rem;
  width: 100%;
`;

const InfoWrapper = styled.div`
  padding: 0.8rem 1rem;
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

const OriginalPrice = styled.div`
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

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

interface ProductCardProps {
  brand: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  imageUrl: string;
  stock: number;
  viewCount: number | null;
}

const ProductCard = ({
  brand,
  name,
  originalPrice,
  discountedPrice,
  discountRate,
  imageUrl,
  stock,
  viewCount,
}: ProductCardProps) => {
  const { t } = useLocale();

  return (
    <CardWrapper>
      <ImageWrapper>
        <ProductImage src={imageUrl} />
      </ImageWrapper>
      <InfoWrapper>
        {viewCount !== null && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "0.4rem",
              marginBottom: "0.5rem",
            }}
          >
            <Brand>{brand}</Brand>
            <span
              style={{
                border: "1px solid #F23477",
                color: "#F23477",
                padding: "0.1rem 0.5rem",
                borderRadius: "999px",
                fontSize: "11px",
                display: "inline-block",
                minWidth: "fit-content",
                marginBottom: "0.4rem",
              }}
            >
              {viewCount}
              {t.viewCountMessage}
            </span>
          </div>
        )}
        {viewCount === null && <Brand>{brand}</Brand>}
        <Title>{name}</Title>
        <InfoRow>
          <Stock>
            {t.productDetail.stockQuantity} {stock}
            {stock === 1
              ? t.productDetail.quantityNumber.one
              : t.productDetail.quantityNumber.more}
          </Stock>
          <PriceWrapper>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              {discountRate > 0 && (
                <OriginalPrice>
                  {originalPrice.toLocaleString()}
                  {t.productDetail.won}
                </OriginalPrice>
              )}
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                {discountRate > 0 && <Discount>{discountRate}%</Discount>}
                <Price>
                  {discountedPrice.toLocaleString()}
                  {t.productDetail.won}
                </Price>
              </div>
            </div>
          </PriceWrapper>
        </InfoRow>
      </InfoWrapper>
    </CardWrapper>
  );
};

export default ProductCard;
