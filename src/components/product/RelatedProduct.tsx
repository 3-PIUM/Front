import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

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

export interface RelatedProduct {
  id: number;
  name: string;
  imageUrl: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
}

const dummyProducts: RelatedProduct[] = [
  {
    id: 1,
    name: "니베아 맨 센서티브 쉐이빙 폼 200ml",
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0000/A00000000232607ko.jpg?l=ko",
    originalPrice: 6500,
    discountedPrice: 5200,
    discountRate: 0,
  },
  {
    id: 2,
    name: "[1+1기획] 쉐이크베이크 젤펜 젤 아이라이너13 COLOR",
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0000/A00000000232607ko.jpg?l=ko",
    originalPrice: 19800,
    discountedPrice: 10900,
    discountRate: 45,
  },
  {
    id: 8800100104989,
    name: "[프로폴리스 추출물 함유] 덴티스테 브레스케어 스프레이 15ml",
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0020/A000000200357102ko.jpg?l=ko",
    originalPrice: 9800,
    discountedPrice: 8700,
    discountRate: 11,
  },
  {
    id: 8800100104989,
    name: "[프로폴리스 추출물 함유] 덴티스테 브레스케어 스프레이 15ml",
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0020/A000000200357102ko.jpg?l=ko",
    originalPrice: 9800,
    discountedPrice: 8700,
    discountRate: 11,
  },
];

const RelatedProductCarousel = () => {
  const navigate = useNavigate();
  const { t } = useLocale();
  return (
    <Section>
      <Divider />
      <Header>
        <Title>{t.relatedProducts}</Title>
      </Header>
      <ProductList>
        {dummyProducts.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => navigate(`/product-detail?itemId=${product.id}`)}
          >
            <Image src={product.imageUrl} alt={product.name} />
            <Name>{product.name}</Name>
            <Price>
              {product.discountRate > 0 && (
                <DiscountRate>{product.discountRate}%</DiscountRate>
              )}
              <DiscountedPrice>
                {product.discountedPrice.toLocaleString()}
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
