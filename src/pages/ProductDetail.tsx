// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkinTypeRankList from "../components/SkinTypeRankList";
import ReviewSatisfactionCard from "../components/ReviewSatisfactionCard";
import AIReviewCard from "../components/AIReviewCard";
import ReviewCard from "../components/ReviewCard";
import Button from "../components/Button";
import { useCartStore } from "../store/useCartStore";
import FullHeader from "../components/TextIconHeader ";

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.3rem;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: space-around;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#e6005a" : "#aaa")};
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.active ? "#e6005a" : "transparent")};
  background: none;
  cursor: pointer;
`;

const BannerImage = styled.img`
  width: 100%;
  display: block;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 0.8rem;
  color: #222;
`;

const SkinTypeWrapper = styled.div`
  padding: 1rem;
`;

const ReviewWrapper = styled.div`
  padding: 0 1rem 5rem;
`;

const ReviewButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 1rem;
  border-radius: 12px;
  margin-top: 0.9rem;
  gap: 0.5rem;
`;

const Label = styled.span`
  font-size: 1rem;
  color: #222;
`;

export default function ProductDetail() {
  const [selectedTab, setSelectedTab] = useState<"detail" | "ingredient">(
    "detail"
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCartStore();
  const newReview = location.state?.newReview;

  const product = location.state?.product ||
    JSON.parse(localStorage.getItem("scannedProduct") || "null") || {
      id: "mock-id",
      name: "샘플 상품입니다",
      brand: "테스트브랜드",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0021/A00000021429012ko.jpg?qt=80",
      originalPrice: 12900,
      discountRate: 20,
    };

  useEffect(() => {
    if (!product) {
      alert("잘못된 접근입니다.");
      navigate("/");
    }
  }, [product, navigate]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("scannedProduct");
    };
  }, []);

  const aiReviews = [
    "정말 효과가 좋아요! 피부가 촉촉해졌어요",
    "향도 좋고 발림성도 마음에 들어요",
    "자극 없이 순해서 민감한 피부도 쓸 수 있어요",
  ];

  const [realReviews, setRealReviews] = useState<any[]>([]);
  useEffect(() => {
    if (newReview) {
      setRealReviews((prev) => [...prev, newReview]);
    }
  }, [newReview]);

  if (!product) return null;

  return (
    <div>
      <HeaderBar>
        <FullHeader pageName="" />
      </HeaderBar>

      <ProductCard
        brand={product.brand}
        title={product.name}
        originalPrice={product.originalPrice}
        currentPrice={
          product.originalPrice && product.discountRate
            ? Math.round(
                product.originalPrice * (1 - product.discountRate / 100)
              )
            : 0
        }
        imageUrl={product.imageUrl}
      />

      <div style={{ padding: "0 1rem" }}>
        <Button
          label="장바구니 담기"
          onClick={() => {
            addItem(product);
            navigate("/cart");
          }}
        />
      </div>

      <TabMenu>
        <TabButton
          active={selectedTab === "detail"}
          onClick={() => setSelectedTab("detail")}
        >
          상세페이지
        </TabButton>
        <TabButton
          active={selectedTab === "ingredient"}
          onClick={() => setSelectedTab("ingredient")}
        >
          성분 분석 & 리뷰
        </TabButton>
      </TabMenu>

      {selectedTab === "detail" && (
        <BannerImage
          src="https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000214290/202505231611/crop0/www.themedicube.co.kr/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/f8a9f171c092ffb5025943539c750574.jpg"
          alt="banner"
        />
      )}

      {selectedTab === "ingredient" && (
        <>
          <SkinTypeWrapper>
            <SectionTitle>추천 피부 타입</SectionTitle>
            <SkinTypeRankList />
          </SkinTypeWrapper>

          <ReviewWrapper>
            <SectionTitle>리뷰</SectionTitle>
            <ReviewSatisfactionCard score={4.62} />
            {aiReviews.map((text, idx) => (
              <AIReviewCard key={idx} content={text} />
            ))}
            <ReviewButton onClick={() => navigate("/review-write")}>
              <Label>리뷰 작성</Label>
            </ReviewButton>
            {realReviews.map((r, idx) => (
              <ReviewCard key={idx} {...r} />
            ))}
          </ReviewWrapper>
        </>
      )}
    </div>
  );
}
