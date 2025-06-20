// src/pages/Product/ProductDetail.tsx
import React, { useEffect, useState, useRef, Suspense } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import ImageNot from "../../components/ingredient/ImageNot";

const TextHeader = React.lazy(
  () => import("../../components/common/TextHeader")
);

const ProductCard = React.lazy(
  () => import("../../components/product/ProductCard")
);
const SkinTypeRankList = React.lazy(
  () => import("../../components/product/SkinTypeRankList")
);
const ReviewSatisfactionCard = React.lazy(
  () => import("../../components/review/ReviewSatisfactionCard")
);
const ReviewCard = React.lazy(
  () => import("../../components/review/ReviewCard")
);
const Button = React.lazy(() => import("../../components/common/Button"));
const FullHeader = React.lazy(
  () => import("../../components/common/TextIconHeader ")
);
const IngredientWarningSummary = React.lazy(
  () => import("../../components/ingredient/IngredientWarningSummary")
);
const IngredientScoreSummary = React.lazy(
  () => import("../../components/ingredient/IngredientScoreSummary")
);
const StackedBarChart = React.lazy(
  () => import("../../components/ingredient/StackedBarChart")
);
const ProductOptionSelector = React.lazy(
  () => import("../../components/product/ProductOptionSelector")
);
const ScrollToTopButton = React.lazy(
  () => import("../../components/common/ScrollToTopButton")
);
const Header = React.lazy(() => import("../../components/common/Header"));

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 4rem;
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
  justify-content: center;
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

const SkinTypeWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const ReviewWrapper = styled.div`
  padding: 0 1rem;
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
  const [selectedTab, setSelectedTab] = useState<
    "detail" | "ingredient" | "review"
  >("detail");
  const navigate = useNavigate();
  const location = useLocation();
  const newReview = location.state?.newReview;
  const [isSkinRegistered, setIsSkinRegistered] = useState<boolean | null>(
    null
  );
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
    null
  );
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemId = new URLSearchParams(location.search).get("itemId");
  const { t } = useLocale();

  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!itemId) {
        setError("상품 ID가 유효하지 않습니다.");
        setLoading(false);
        return;
      }
      try {
        const res = await axiosInstance.get(`/item/${itemId}/info`);
        const data = res.data.result;
        setProduct({
          id: data.id,
          name: data.itemName,
          brand: data.brand,
          imageUrl: {
            mainImage: data.itemImages.mainImage,
            detailImages: data.itemImages.detailImages,
          },
          originalPrice: data.originalPrice,
          discountedPrice: data.salePrice,
          discountRate: data.discountRate,
          stock: 4,
          options: data.options || [],
          veganType: data.veganType,
        });
      } catch (err: any) {
        if (err.response?.status === 500) {
          console.error(
            "\u{1F6A8} 서버 내부 에러 발생. enum 또는 데이터 오류일 수 있음."
          );
        }
        setError("상품 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [itemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const value = localStorage.getItem("skinRegistered");
    setIsSkinRegistered(value === "true");
    return () => localStorage.removeItem("scannedProduct");
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!itemId) return;
      try {
        const res = await axiosInstance.get(`/review/${itemId}`);
        const reviews = res.data.result.reviews;
        const currentMemberId = res.data.result.currentMemberId; // assume backend returns this

        const mappedReviews = reviews.map((r: any) => ({
          reviewId: r.reviewId,
          username: r.memberId,
          memberId: r.memberId,
          date: new Date(r.updatedAt).toLocaleDateString(),
          rating: r.rating,
          content: r.content,
          images: r.reviewImages,
          recommend: r.recommend || 0,
          isRecommend: r.isRecommend || false,
          surveyAnswers: r.options?.reduce(
            (acc: Record<string, string>, cur: any) => {
              acc[cur.name] = cur.selectOption;
              return acc;
            },
            {}
          ),
          isMyReview: currentMemberId === r.memberId,
        }));

        setRealReviews(mappedReviews);
      } catch (err) {
        console.error("리뷰 불러오기 실패", err);
      }
    };
    fetchReviews();
  }, [itemId]);

  const [realReviews, setRealReviews] = useState<any[]>([]);
  useEffect(() => {
    if (newReview) {
      setRealReviews((prev) => {
        const isDuplicate = prev.some(
          (review) =>
            review.content === newReview.content &&
            review.username === newReview.username
        );
        return isDuplicate ? prev : [...prev, newReview];
      });
    }
  }, [newReview]);

  const averageRating = realReviews.length
    ? realReviews.reduce((sum, review) => sum + review.rating, 0) /
      realReviews.length
    : 0;

  const handleAddToCart = async () => {
    if (product.options.length > 0 && !selectedOptionName) {
      alert(t.productDetail.selectOption);
      return;
    }

    try {
      await axiosInstance.post(`/cart/items/${Number(product.id)}`, {
        quantity: 1,
        itemOption: product.options.length > 0 ? selectedOptionName : undefined,
      });
      navigate("/cart");
    } catch (err: any) {
      console.error("장바구니 추가 실패", err);
      console.log(product);
      alert(err.response?.data?.message || "장바구니에 추가할 수 없습니다.");
    }
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>로딩 중...</div>
    );
  if (error)
    return (
      <div style={{ padding: "2rem", color: "red", textAlign: "center" }}>
        {error}
      </div>
    );
  if (!product) return null;

  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <FullHeader pageName="" />
      </Suspense>
      <Suspense fallback={null}>
        <TextHeader pageName={t.order.detaiTitle} />
      </Suspense>
      <ProductCardWrapper ref={pageWrapperRef}>
        <Suspense fallback={null}>
          <ProductCard {...product} imageUrl={product.imageUrl.mainImage} />
        </Suspense>
        {/* Option name display (e.g., [브랜드명] 옵션1) */}
        {product.options.length > 0 &&
          selectedOptionName &&
          selectedOptionName !== "default" &&
          selectedOptionName.trim() !== "" && (
            <div
              style={{
                // padding: "0 1rem",
                // marginTop: "0.5rem",
                fontWeight: 500,
              }}
            >
              {/* {[`[${product.brand}] ${selectedOptionName}`]} */}
            </div>
          )}
        {product.options.length > 0 && (
          <Suspense fallback={null}>
            <ProductOptionSelector
              options={product.options.map((opt: string, idx: number) => ({
                id: `option-${idx}`,
                imageUrl: product.imageUrl.mainImage,
                name: `${opt}`,
                discountedPrice: product.discountedPrice,
                discountRate: product.discountRate,
              }))}
              onChange={(id: string, name: string) => {
                setSelectedOptionId(id);
                setSelectedOptionName(name); // name 저장
              }}
            />
          </Suspense>
        )}
        <div style={{ padding: "0 1rem" }}>
          <Suspense fallback={null}>
            <Button label={t.productDetail.addCart} onClick={handleAddToCart} />
          </Suspense>
        </div>
        <TabMenu>
          {(["detail", "ingredient", "review"] as const).map((tab) => (
            <TabButton
              key={tab}
              active={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            >
              {t.productDetail[tab]}
            </TabButton>
          ))}
        </TabMenu>
        {selectedTab === "detail" && (
          <>
            {product.imageUrl.detailImages.length > 0 ? (
              (() => {
                try {
                  const parsedImages: string[] = JSON.parse(
                    product.imageUrl.detailImages[0]
                  );
                  const validUrls = parsedImages.filter(
                    (url: string) => url.trim() !== ""
                  );
                  return validUrls.length > 0 ? (
                    <div style={{ marginBottom: "0rem" }}>
                      {validUrls.map((url: string, idx: number) => (
                        <BannerImage
                          key={idx}
                          src={url}
                          alt={`detail-banner-${idx}`}
                        />
                      ))}
                    </div>
                  ) : (
                    <ImageNot />
                  );
                } catch (e) {
                  console.error("❌ 이미지 파싱 실패:", e);
                  return <ImageNot />;
                }
              })()
            ) : (
              <ImageNot />
            )}
          </>
        )}
        {selectedTab === "ingredient" && isSkinRegistered !== null && (
          <>
            <SkinTypeWrapper>
              <Suspense fallback={null}>
                <IngredientScoreSummary itemId={Number(itemId)} />
              </Suspense>
              <Suspense fallback={null}>
                <IngredientWarningSummary itemId={Number(itemId)} />
              </Suspense>
            </SkinTypeWrapper>
            <SkinTypeWrapper>
              <Suspense fallback={null}>
                <SkinTypeRankList itemId={Number(itemId)} />
              </Suspense>
            </SkinTypeWrapper>
          </>
        )}
        {selectedTab === "review" && (
          <ReviewWrapper>
            <Suspense fallback={null}>
              <ReviewSatisfactionCard score={averageRating} />
            </Suspense>
            <Suspense fallback={null}>
              <StackedBarChart itemId={Number(itemId)} />
            </Suspense>
            {(() => {
              const token = sessionStorage.getItem("accessToken");
              let currentMemberId: number | null = null;
              if (token) {
                try {
                  const payloadBase64 = token.split(".")[1];
                  const payload = JSON.parse(atob(payloadBase64));
                  currentMemberId = payload.memberId ?? null;
                } catch (e) {
                  console.error("토큰 디코딩 실패:", e);
                }
              }

              const hasWrittenReview = realReviews.some(
                (r) => Number(r.memberId) === Number(currentMemberId)
              );

              console.log("✅ currentMemberId:", currentMemberId);
              console.log(
                "✅ review memberId list:",
                realReviews.map((r) => r.memberId)
              );
              console.log("✅ hasWrittenReview:", hasWrittenReview);

              if (hasWrittenReview) {
                return (
                  <ReviewButton
                    style={{
                      backgroundColor: "#eee",
                      color: "#aaa",
                      cursor: "not-allowed",
                      pointerEvents: "none",
                    }}
                  >
                    <Label>{t.productDetail.writeReview}</Label>
                  </ReviewButton>
                );
              }

              return (
                <ReviewButton
                  onClick={() => navigate(`/review-write?itemId=${itemId}`)}
                  style={{
                    backgroundColor: "#f8f8f8",
                    color: "#222",
                    cursor: "pointer",
                  }}
                >
                  <Label>{t.productDetail.writeReview}</Label>
                </ReviewButton>
              );
            })()}
            {realReviews.length === 0 ? (
              <div
                style={{
                  padding: "1rem",
                  color: "#999",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                등록된 리뷰가 없습니다.
              </div>
            ) : (
              <>
                {(showAllReviews
                  ? [...realReviews].reverse()
                  : [...realReviews].slice(0, 2).reverse()
                ).map((r) => (
                  <Suspense key={r.reviewId} fallback={null}>
                    <ReviewCard {...r} itemId={product?.id} />
                  </Suspense>
                ))}
                {realReviews.length > 2 && (
                  <div
                    style={{
                      marginTop: "1rem",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      style={{
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "0.75rem 1.5rem",
                        background: "#fff",
                        color: "#444",
                        fontWeight: "500",
                        cursor: "pointer",
                      }}
                    >
                      {showAllReviews
                        ? t.productDetail.reviewButton.fold
                        : t.productDetail.reviewButton.expand}
                    </button>
                  </div>
                )}
              </>
            )}
          </ReviewWrapper>
        )}
        <Suspense fallback={null}>
          <ScrollToTopButton scrollTargetRef={pageWrapperRef} />
        </Suspense>
      </ProductCardWrapper>
    </PageWrapper>
  );
}
