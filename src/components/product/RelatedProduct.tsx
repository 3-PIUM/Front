import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ItemCard from "./ItemCard";

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
        const res = await axiosInstance.get(`/item/relatedViewItems/${itemId}`);
        setProducts(res.data.result || []);
      } catch (err) {
        console.error("관련 상품 불러오기 실패", err);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    fetchRelated();
  }, [itemId, lang]);

  return (
    <Section>
      <Divider />
      <Header>
        <Title>{t.relatedProducts}</Title>
      </Header>
      <ProductList>
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  width: "100px",
                  minWidth: "100px",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0.25rem 0",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "10px",
                    marginBottom: "0.2rem",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <div
                  style={{
                    width: "100px",
                    height: "14px",
                    backgroundColor: "#f0f0f0",
                    marginBottom: "4px",
                    borderRadius: "4px",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <div
                  style={{
                    width: "60px",
                    height: "14px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    animation: "pulse 1.5s infinite",
                  }}
                />
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.itemId}
                onClick={() =>
                  navigate(`/product-detail?itemId=${product.itemId}`)
                }
                style={{ cursor: "pointer" }}
              >
                <ItemCard
                  itemId={product.itemId}
                  itemName={product.itemName}
                  imageSource={product.itemImage}
                  discountRate={product.discountRate || 0}
                  price={product.salePrice}
                  wishStatus={product.wishStatus}
                  isLoading={false}
                />
              </div>
            ))}
      </ProductList>
    </Section>
  );
};

export default RelatedProductCarousel;