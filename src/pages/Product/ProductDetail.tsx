// src/pages/Product/ProductDetail.tsx
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import ProductCard from "../../components/product/ProductCard";
import SkinTypeRankList from "../../components/product/SkinTypeRankList";
import ReviewSatisfactionCard from "../../components/review/ReviewSatisfactionCard";
import ReviewCard from "../../components/review/ReviewCard";
import Button from "../../components/common/Button";
import FullHeader from "../../components/common/TextIconHeader ";
import IngredientWarningSummary from "../../components/ingredient/IngredientWarningSummary";
import IngredientScoreSummary from "../../components/ingredient/IngredientScoreSummary";
import StackedBarChart from "../../components/ingredient/StackedBarChart";
import ProductOptionSelector from "../../components/product/ProductOptionSelector";
import { useLocale } from "../../context/LanguageContext";
import ScrollToTopButton from "../../components/common/ScrollToTopButton";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 5rem;
`;

const HeaderBar = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  z-index: 1000;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding-right: 1.3rem;
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

  useEffect(() => {
    const fetchProduct = async () => {
      if (!itemId) {
        setError("상품 ID가 유효하지 않습니다.");
        setLoading(false);
        return;
      }
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.get(
          `http://localhost:8080/item/${itemId}/info`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = res.data.result;
        setProduct({
          id: data.id,
          name: data.itemName,
          brand: "브랜드명",
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
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:8080/review/${itemId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const reviews = res.data.result.reviews;
        const myMemberId = Number(localStorage.getItem("memberId"));

        const mappedReviews = reviews.map((r: any) => ({
          reviewId: r.reviewId,
          username: r.memberId,
          memberId: r.memberId,
          date: new Date(r.updatedAt).toLocaleDateString(),
          rating: r.rating,
          content: r.content,
          images: r.reviewImages,
          likes: r.recommend || 0,
          liked: r.isRecommended || false,
          surveyAnswers: r.options?.reduce(
            (acc: Record<string, string>, cur: any) => {
              acc[cur.name] = cur.selectOption;
              return acc;
            },
            {}
          ),
          isMyReview: myMemberId === r.memberId,
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
    if (!selectedOptionName) {
      alert(t.productDetail.selectOption);
      return;
    }

    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/cart/items/${Number(product.id)}`,
        {
          quantity: 1,
          itemOption: selectedOptionName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/cart");
    } catch (err: any) {
      console.error("장바구니 추가 실패", err);
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
      <HeaderBar>
        <FullHeader pageName="" productList={[]} />
      </HeaderBar>
      <ProductCardWrapper ref={pageWrapperRef}>
        <ProductCard {...product} imageUrl={product.imageUrl.mainImage} />
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
        <div style={{ padding: "0 1rem" }}>
          <Button label={t.productDetail.addCart} onClick={handleAddToCart} />
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
        {selectedTab === "detail" && product.imageUrl.detailImages && (
          <div style={{ marginBottom: "3rem" }}>
            {product.imageUrl.detailImages.map((url: string, idx: number) => (
              <BannerImage key={idx} src={url} alt={`detail-banner-${idx}`} />
            ))}
          </div>
        )}
        {selectedTab === "ingredient" && isSkinRegistered !== null && (
          <>
            <SkinTypeWrapper>
              <IngredientScoreSummary itemId={Number(itemId)} />
              <IngredientWarningSummary itemId={Number(itemId)} />
            </SkinTypeWrapper>
            <SkinTypeWrapper>
              <SkinTypeRankList itemId={Number(itemId)} />
            </SkinTypeWrapper>
          </>
        )}
        {selectedTab === "review" && (
          <ReviewWrapper>
            <ReviewSatisfactionCard score={averageRating} />
            <StackedBarChart itemId={Number(itemId)} />
            <ReviewButton
              onClick={() => navigate(`/review-write?itemId=${itemId}`)}
            >
              <Label>{t.productDetail.writeReview}</Label>
            </ReviewButton>
            {realReviews.length === 0 ? (
              <div style={{ padding: "1rem", color: "#999" }}>
                등록된 리뷰가 없습니다.
              </div>
            ) : (
              realReviews.map((r, idx) => (
                <ReviewCard key={idx} {...r} itemId={product?.id} />
              ))
            )}
          </ReviewWrapper>
        )}
        <ScrollToTopButton scrollTargetRef={pageWrapperRef} />
      </ProductCardWrapper>
    </PageWrapper>
  );
}
