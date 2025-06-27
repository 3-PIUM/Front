import { FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

interface RelatedProduct {
  itemId: number;
  itemName: string;
  itemImage: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
  wishStatus: boolean;
}

interface RelatedProductCarouselProps {
  itemId: number;
  lang: string;
}

const Section = styled.section`
  margin: 0.5rem 0;
`;

const Divider = styled.div`
  height: 10px;
  background-color: #f1f2f4;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
`;

const Title = styled.h2`
  padding: 0rem 0.8rem;
  font-size: 1rem;
  font-weight: bold;
`;

const ProductList = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0 1rem;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProductCard = styled.div`
  width: calc((100% - 3rem) / 3);
  min-width: 100px;
  background: white;
  border-radius: 12px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const WishIcon = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: ${({ $active }) => ($active ? "#f23477" : "#ccc")};
  font-size: 1rem;
`;

const Image = styled.img`
  width: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 0.1rem;
`;

const DiscountRate = styled.span`
  color: #e60023;
  font-weight: bold;
`;

const Name = styled.p`
  width: 100px;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 0.4rem 0 0.2rem;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

const DiscountedPrice = styled.span`
  font-weight: bold;
  color: #111;
  font-size: 0.75rem;
`;

const RelatedProductCarousel = ({
  itemId,
  lang,
}: RelatedProductCarouselProps) => {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [products, setProducts] = useState<RelatedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!itemId) return;
      try {
        const res = await axiosInstance.get(
          `/item/relatedViewItems/${itemId}`,
          {
            params: { lang },
          }
        );
        setProducts(res.data.result || []);
      } catch (err) {
        console.error("관련 상품 불러오기 실패", err);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchRelated();
  }, [itemId, lang]);

  if (isLoading) {
    return (
      <Section>
        <Divider />
        <Header>
          <Title>{t.relatedProducts}</Title>
        </Header>
        <ProductList>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCard key={index}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  background: "#eee",
                  borderRadius: 10,
                  marginBottom: 4,
                }}
              />
              <div
                style={{
                  width: 100,
                  height: 14,
                  background: "#eee",
                  borderRadius: 4,
                  marginBottom: 6,
                }}
              />
              <div
                style={{
                  width: 60,
                  height: 12,
                  background: "#eee",
                  borderRadius: 4,
                }}
              />
            </ProductCard>
          ))}
        </ProductList>
      </Section>
    );
  }

  return (
    <Section>
      <Divider />
      <Header>
        <Title>{t.relatedProducts}</Title>
      </Header>
      <ProductList>
        {products.map((product) => (
          <ProductCard
            key={product.itemId}
            onClick={() => navigate(`/product-detail?itemId=${product.itemId}`)}
          >
            <div style={{ position: "relative" }}>
              <Image src={product.itemImage} alt={product.itemName} />
              <WishIcon $active={product.wishStatus}>
                {product.wishStatus ? <FaHeart /> : <FaRegHeart />}
              </WishIcon>
            </div>
            <Name>{product.itemName}</Name>
            <Price>
              {product.discountRate > 0 && (
                <DiscountRate>{product.discountRate}%</DiscountRate>
              )}
              <DiscountedPrice>
                {product.salePrice.toLocaleString()}
                {t.productDetail.won}
              </DiscountedPrice>
            </Price>
          </ProductCard>
        ))}
      </ProductList>
    </Section>
  );
};

export default RelatedProductCarousel;
