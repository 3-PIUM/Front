// src/pages/ProductDetail.tsx
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import ProductCard from "../../components/product/ProductCard";
import SkinTypeRankList from "../../components/product/SkinTypeRankList";
import ReviewSatisfactionCard from "../../components/review/ReviewSatisfactionCard";
import ReviewCard from "../../components/review/ReviewCard";
import Button from "../../components/common/Button";
import { useCartStore } from "../../store/useCartStore";
import FullHeader from "../../components/common/TextIconHeader ";
import IngredientWarningSummary from "../../components/ingredient/IngredientWarningSummary";
import IngredientScoreSummary from "../../components/ingredient/IngredientScoreSummary";
import StackedBarChart from "../../components/ingredient/StackedBarChart";
import ProductOptionSelector from "../../components/product/ProductOptionSelector";
import { useLocale } from "../../context/LanguageContext";
import SkinTypePrompt from "../../components/SkinTypePrompt";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const HeaderBar = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  z-index: 1000; // 다른 요소 위에 표시
  background-color: #fff;
  display: flex;
  justify-content: space-between;

  padding-right: 1.3rem;
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); */
`;

const ProductCardWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
  padding: 0 1rem 8rem;
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
  const [isSkinRegistered, setIsSkinRegistered] = useState<boolean | null>(
    null
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const pageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const value = localStorage.getItem("skinRegistered");
    console.log("skinRegistered:", value);
    setIsSkinRegistered(value === "true");
  }, []);
  const { t } = useLocale();

  const product = location.state?.product ||
    JSON.parse(localStorage.getItem("scannedProduct") || "null") || {
      id: "mock-id",
      name: "샘플 상품입니다",
      brand: "테스트브랜드",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0021/A00000021429012ko.jpg?qt=80",
      originalPrice: 12900,
      discountRate: 20,
      stock: 4,
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

  const dummyOptions = [
    {
      id: "a00",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0018/A00000018590325ko.png?l=ko",
      name: "[기획] A00(+리필+모공브러쉬)",
      // sub: "예약 06.13부터 순차 배송시작",
      price: 27880,
    },
    {
      id: "a01",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0018/A00000018590325ko.png?l=ko",
      name: "[기획] A01(+리필+모공브러쉬)",
      // sub: "예약 06.13부터 순차 배송시작",
      price: 27880,
    },
    {
      id: "a02",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0018/A00000018590325ko.png?l=ko",
      name: "[기획] A02(+리필+모공브러쉬)",
      // sub: "예약 06.13부터 순차 배송시작",
      price: 27880,
    },
  ];

  const mockProducts = [
    { id: 1, name: "피부 보습 크림" },
    { id: 2, name: "자외선 차단제" },
    { id: 3, name: "클렌징 워터" },
    { id: 4, name: "비타민 세럼" },
  ];

  const [realReviews, setRealReviews] = useState<any[]>([]);
  useEffect(() => {
    if (newReview) {
      setRealReviews((prev) => {
        const isDuplicate = prev.some(
          (review) =>
            review.content === newReview.content &&
            review.username === newReview.username
        );
        if (!isDuplicate) return [...prev, newReview];
        return prev;
      });
    }
  }, [newReview]);

  const averageRating =
    realReviews.length > 0
      ? realReviews.reduce((sum, review) => sum + review.rating, 0) /
        realReviews.length
      : 0;

  if (!product) return null;

  return (
    <>
      <PageWrapper>
        <HeaderBar>
          <FullHeader pageName="" productList={mockProducts} />
        </HeaderBar>
        <ProductCardWrapper ref={pageWrapperRef}>
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
            stock={product.stock}
          />

          <ProductOptionSelector
            options={dummyOptions}
            onChange={setSelectedOption}
          />

          <div style={{ padding: "0 1rem" }}>
            <Button
              label={t.productDetail.addCart}
              onClick={() => {
                const selected = dummyOptions.find(
                  (o) => o.id === selectedOption
                );
                if (!selected) {
                  alert(t.productDetail.selectOption);
                  return;
                }

                addItem({
                  ...product,
                  option: selected.name,
                  availableOptions: dummyOptions.map((opt) => opt.name),
                });

                navigate("/cart");
              }}
            />
          </div>

          <TabMenu>
            <TabButton
              active={selectedTab === "detail"}
              onClick={() => setSelectedTab("detail")}
            >
              {t.productDetail.detail}
            </TabButton>
            <TabButton
              active={selectedTab === "ingredient"}
              onClick={() => setSelectedTab("ingredient")}
            >
              {t.productDetail.analysisAndReview}
            </TabButton>
          </TabMenu>

          {selectedTab === "detail" && (
            <div style={{ marginBottom: "3rem" }}>
              <BannerImage
                src="https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000214290/202505231611/crop0/www.themedicube.co.kr/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/f8a9f171c092ffb5025943539c750574.jpg"
                alt="banner"
              />
            </div>
          )}

          {selectedTab === "ingredient" && isSkinRegistered !== null && (
            <>
              <SkinTypeWrapper>
                {!isSkinRegistered ? (
                  <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
                    <SkinTypePrompt
                      onRegister={() => {
                        localStorage.setItem("skinRegistered", "true");
                        setIsSkinRegistered(true);
                        navigate("/mypage/skintype");
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div style={{ marginTop: "0.5rem" }}>
                      <IngredientScoreSummary
                        safe={3}
                        caution={1}
                        harmful={1}
                      />
                      <IngredientWarningSummary />
                      <StackedBarChart />
                      {/* <GroupedDonutChart /> */}
                    </div>
                  </>
                )}
              </SkinTypeWrapper>

              <SkinTypeWrapper>
                <SectionTitle>{t.productDetail.skinReviewSummary}</SectionTitle>
                <SkinTypeRankList />
              </SkinTypeWrapper>

              <ReviewWrapper>
                <SectionTitle>{t.productDetail.review}</SectionTitle>
                <ReviewSatisfactionCard score={averageRating} />
                {/* {aiReviews.map((text, idx) => (
              <AIReviewCard key={idx} content={text} />
            ))} */}

                {realReviews.map((r, idx) => (
                  <ReviewCard key={idx} {...r} />
                ))}
                <ReviewButton onClick={() => navigate("/review-write")}>
                  <Label>{t.productDetail.writeReview}</Label>
                </ReviewButton>
              </ReviewWrapper>
            </>
          )}
          <ScrollToTopButton scrollTargetRef={pageWrapperRef} />
        </ProductCardWrapper>
      </PageWrapper>
    </>
  );
}
