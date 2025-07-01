import React, { useEffect, useState, useRef, Suspense } from "react";
import ErrorPage from "../error/ErrorPage";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import ImageNot from "../../components/ingredient/ImageNot";
import RecommendModal from "../../components/modal/RecommendModal";
import LoginRequiredModal from "../../components/modal/LoginRequiredModal";
import AlertModal from "../../components/modal/AlertModal";
import RelatedProductCarousel from "../../components/product/RelatedProduct";

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
const TextIconHeader = React.lazy(
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
  height: 90vh;
  padding-bottom: 4rem;
  position: relative;
  z-index: 0;
`;

const ProductCardWrapper = styled.div`
  flex: 1;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-bottom: 7rem;
`;

const TabMenu = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
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
  font-size: 1rem;
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
  const [_, setSelectedOptionId] = useState<string | null>(null);
  const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
    null
  );
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const [product, setProduct] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const itemId = new URLSearchParams(location.search).get("itemId");
  const { t } = useLocale();

  const [isRecommendOpen, setIsRecommendOpen] = useState(false);
  const [recommendItems, setRecommendItems] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [showOptionAlert, setShowOptionAlert] = useState(false);

  const [showAllReviews, setShowAllReviews] = useState(false);

  const [viewCount, setViewCount] = useState<number | null>(null);
  const [showAllDetailImages, setShowAllDetailImages] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const fetchViewCount = async () => {
      if (!itemId) return;
      try {
        const res = await axiosInstance.get(`/item/${itemId}/view-count`);
        console.log("✅ 조회수 (서버 값):", res.data.result);
        setViewCount(() => {
          const newValue = res.data.result;
          return newValue < 0 ? 0 : newValue;
        });

        setViewCount((prev) => (prev !== null ? prev + 1 : 1));
        console.log("➕ 조회수 1 증가 (프론트 로컬 반영):", viewCount);
      } catch (err) {
        console.error("조회수 가져오기 실패", err);
      }
    };
    fetchViewCount();
  }, [itemId]);

  useEffect(() => {
    const decreaseView = async () => {
      if (!itemId) return;
      console.log("⚠️ 페이지 이탈 - 조회수 감소 시도");
      try {
        const url = `${
          import.meta.env.VITE_APP_BASE_URL
        }/item/view/${itemId}/decrease`;
        navigator.sendBeacon(url);
      } catch (err) {
        console.error("조회수 감소 실패", err);
      }
    };

    const handleBeforeUnload = () => {
      console.log("🧹 beforeunload triggered");
      decreaseView();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      decreaseView();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [itemId]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!itemId) {
        setError("상품 ID가 유효하지 않습니다.");
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
          stock: Math.floor(Math.random() * 100) + 1,
          options: data.options || [],
          veganType: data.veganType,
        });
      } catch (err: any) {
        if (err.response?.status === 500) {
          console.error(
            "\u{1F6A8} 서버 내부 에러 발생. enum 또는 데이터 오류일 수 있음."
          );
        }
        setError("error");
      } finally {
      }
    };
    fetchProduct();
  }, [itemId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const value = localStorage.getItem("skinRegistered");
    setIsSkinRegistered(value === "true");
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const payload = JSON.parse(atob(payloadBase64));
        const memberId = payload.memberId;
        if (memberId) {
          localStorage.setItem("memberId", memberId);
          console.log("memberId 가져오기", memberId);
        }
      } catch (e) {
        console.error("memberId 파싱 실패:", e);
      }
    }
    return () => {
      localStorage.removeItem("scannedProduct");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const wrapper = pageWrapperRef.current;
      if (wrapper) {
        console.log("✅ wrapper 연결됨, 이벤트 등록 시도");

        const handleScroll = () => {
          console.log("📦 스크롤 이벤트 발생 - scrollTop:", wrapper.scrollTop);
          setHasScrolled(wrapper.scrollTop > 0);
        };

        wrapper.addEventListener("scroll", handleScroll);
        console.log("✅ 스크롤 이벤트 리스너 등록 완료");

        clearInterval(interval); // 이벤트 중복 방지
        return () => {
          wrapper.removeEventListener("scroll", handleScroll);
          console.log("🧹 스크롤 이벤트 리스너 제거");
        };
      } else {
        console.log("⌛ wrapper가 아직 null임");
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!itemId) return;
      try {
        const res = await axiosInstance.get(`/review/${itemId}`);
        const reviews = res.data.result.reviews;
        const currentMemberId = res.data.result.currentMemberId;

        const mappedReviews = reviews.map((r: any) => ({
          reviewId: r.reviewId,
          memberName: r.memberName,
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

  const [firstImage, setFirstImage] = useState<string>("");

  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));

  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      if (!isLoggedIn || !itemId) return;
      try {
        const res = await axiosInstance.get("/purchase-history");
        const dateList = res.data.result?.dateInfoList || [];

        let purchased = false;
        for (const dateGroup of dateList) {
          const date = dateGroup.date;
          try {
            const detailRes = await axiosInstance.get(
              "/purchase-history/detail",
              {
                params: { date: date },
              }
            );
            console.log("📦 detailRes 전체 응답:", detailRes.data);
            const detailList = detailRes.data.result?.detailInfoList || [];
            console.log("🔍 날짜별 상세 내역:", date, detailList);

            if (
              detailList.some(
                (item: any) => String(item.itemId) === String(itemId)
              )
            ) {
              purchased = true;
              break;
            }
          } catch (e) {
            console.error(`❌ 상세 내역 불러오기 실패 - ${date}`, e);
          }
        }

        setHasPurchased(purchased);
        console.log("🛒 구매 내역 확인 결과:", purchased);
      } catch (err) {
        console.error("구매 내역 확인 실패", err);
      }
    };

    fetchPurchaseHistory();
  }, [itemId, isLoggedIn]);

  const averageRating = realReviews.length
    ? realReviews.reduce((sum, review) => sum + review.rating, 0) /
      realReviews.length
    : 0;

  if (error) return <ErrorPage />;
  if (!product) return null;

  return (
    <PageWrapper>
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <Suspense fallback={null}>
        <TextIconHeader pageName="" hasScrolled={hasScrolled} />
      </Suspense>
      <ProductCardWrapper ref={pageWrapperRef}>
        <Suspense fallback={null}>
          <ProductCard
            {...product}
            imageUrl={product.imageUrl.mainImage}
            viewCount={viewCount}
          />
        </Suspense>
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
                setSelectedOptionName(name);
              }}
            />
          </Suspense>
        )}

        <div style={{ padding: "0 1rem" }}>
          <Suspense fallback={null}>
            <Button
              label={t.productDetail.addCart}
              onClick={async () => {
                if (product.options.length > 0 && !selectedOptionName) {
                  setShowOptionAlert(true);
                  return;
                }

                try {
                  await axiosInstance.post(
                    `/cart/items/${Number(product.id)}`,
                    {
                      quantity: 1,
                      itemOption:
                        product.options.length > 0
                          ? selectedOptionName
                          : undefined,
                    }
                  );

                  setIsRecommendOpen(true);
                  setIsLoading(true);

                  const recommendRes = await axiosInstance.get(
                    `/item/relatedPurchaseItems/${product.id}`
                  );
                  setRecommendItems(recommendRes.data.result || []);
                  const firstImage = product?.imageUrl?.mainImage || "";
                  setFirstImage(firstImage);

                  setTimeout(() => setIsLoading(false), 500);
                } catch (err: any) {
                  console.error("장바구니 추가 실패", err);
                  alert(
                    err.response?.data?.message ||
                      "장바구니에 추가할 수 없습니다."
                  );
                }
              }}
            />
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
                  const fixedJson = product.imageUrl.detailImages[0].replace(
                    /'/g,
                    '"'
                  );
                  const parsedImages: string[] = JSON.parse(fixedJson);
                  const validUrls = parsedImages.filter(
                    (url: string) => url.trim() !== ""
                  );
                  return validUrls.length > 0 ? (
                    <div>
                      {(showAllDetailImages
                        ? validUrls
                        : validUrls.slice(0, 1)
                      ).map((url: string, idx: number) => (
                        <BannerImage
                          key={idx}
                          src={url}
                          alt={`detail-banner-${idx}`}
                        />
                      ))}
                      {validUrls.length > 1 && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "0.5rem 0",
                          }}
                        >
                          <button
                            onClick={() =>
                              setShowAllDetailImages(!showAllDetailImages)
                            }
                            style={{
                              padding: "0.5rem",
                              width: "90%",
                              border: "1px solid #ccc",
                              borderRadius: "8px",
                              background: "#fff",
                              fontWeight: "bold",
                              fontSize: "0.9rem",
                              cursor: "pointer",
                              color: "#F23477",
                            }}
                          >
                            {t.productDetail.productAccordion}{" "}
                            {showAllDetailImages
                              ? t.productDetail.collapse
                              : t.productDetail.expand}
                          </button>
                        </div>
                      )}
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
            <Suspense fallback={null}>
              <RelatedProductCarousel
                itemId={Number(itemId)}
                lang={t.language}
              />
            </Suspense>
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
              console.log("🛒 hasPurchased 상태:", hasPurchased);

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
                !hasWrittenReview &&
                hasPurchased && (
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
                )
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
                {t.noReview}
              </div>
            ) : (
              <>
                <div
                  style={{
                    maxHeight: showAllReviews ? "auto" : "auto",
                    overflowY: showAllReviews ? "auto" : "visible",
                  }}
                >
                  {[...realReviews]
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .slice(0, showAllReviews ? realReviews.length : 2)
                    .map((r) => (
                      <Suspense key={r.reviewId} fallback={null}>
                        <ReviewCard {...r} itemId={product?.id} />
                      </Suspense>
                    ))}
                </div>
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

        {showOptionAlert && (
          <AlertModal
            message={t.alertModal.noOption}
            onClose={() => setShowOptionAlert(false)}
          />
        )}
        {isRecommendOpen && itemId && isLoggedIn && (
          <RecommendModal
            recommendItems={recommendItems}
            addedItemImage={firstImage}
            onClose={() => setIsRecommendOpen(false)}
            itemId={Number(itemId)}
            isLoading={isLoading}
          />
        )}
        {showLoginModal && (
          <LoginRequiredModal onClose={() => setShowLoginModal(false)} />
        )}
      </ProductCardWrapper>
    </PageWrapper>
  );
}
