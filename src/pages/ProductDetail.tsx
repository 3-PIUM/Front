import { useState } from "react";
import styled from "styled-components";
import TextHeader from "../components/TextHeader";
import ProductCard from "../components/ProductCard";
import SearchIcon from "../components/SearchIcon";
import CartIcon from "../components/CartIcon";
import SkinTypeRankList from "../components/SkinTypeRankList";
import ReviewSatisfactionCard from "../components/ReviewSatisfactionCard";
import AIReviewCard from "../components/AIReviewCard";
import ReviewCard from "../components/ReviewCard";

// 스타일 컴포넌트
const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.3rem;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1rem;
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
  outline: none;
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
  padding: 0 1rem 0.5rem 1rem;
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
  flex: 1;
  font-size: 1rem;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProductDetail() {
  const [selectedTab, setSelectedTab] = useState<"detail" | "ingredient">(
    "detail"
  );

  const mockData = {
    brand: "넘버즈인",
    title:
      "[밀도탄력/피디알엔] 차앤박 더마앤서 액티브 부스트 PDRN앰플 30ml 기획 (+15ml 증정)",
    originalPrice: 418500,
    currentPrice: 339000,
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/10/0000/0021/A00000021429012ko.jpg?qt=80",
  };

  const bannerImageUrls = [
    "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000214290/202505231611/crop0/www.themedicube.co.kr/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/f8a9f171c092ffb5025943539c750574.jpg?created=202505231611",
    "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000214290/202505231611/crop1/www.themedicube.co.kr/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/f8a9f171c092ffb5025943539c750574.jpg?created=202505231611",
    "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/crop/A000000214290/202505231611/crop0/image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/html/attached/2025/05/07/f49_07165109.jpg?created=202505231611",
  ];

  const aiReviews = [
    "정말 효과가 좋아요! 피부가 촉촉해졌어요",
    "향도 좋고 발림성도 마음에 들어요",
    "자극 없이 순해서 민감한 피부도 쓸 수 있어요",
  ];

  const realReviews = [
    {
      username: "김**",
      date: "2025.05.14",
      rating: 5,
      content: "정말 효과가 좋아요! 피부가 촉촉해졌어요",
      images: [
        "https://image.oliveyoung.co.kr/uploads/images/gdasEditor/2025/05/06/2433061b71734e70b7701509b6ea84a11746527933972.png?RS=640x0&SF=webp",
        "https://image.oliveyoung.co.kr/uploads/images/gdasEditor/2025/05/06/2433061b71734e70b7701509b6ea84a11746527933972.png?RS=640x0&SF=webp",
      ],
      likes: 0,
      isMyReview: true,
    },
    {
      username: "이**",
      date: "2025.05.14",
      rating: 4,
      content: "정말 효과가 좋아요! 피부가 촉촉해졌어요",
      images: [
        "https://image.oliveyoung.co.kr/uploads/images/gdasEditor/2025/05/06/2433061b71734e70b7701509b6ea84a11746527933972.png?RS=640x0&SF=webp",
        "https://image.oliveyoung.co.kr/uploads/images/gdasEditor/2025/05/06/2433061b71734e70b7701509b6ea84a11746527933972.png?RS=640x0&SF=webp",
      ],
      likes: 2,
      isMyReview: false,
    },
  ];

  return (
    <div>
      <HeaderBar>
        <TextHeader pageName="" />
        <IconGroup>
          <SearchIcon />
          <CartIcon />
        </IconGroup>
      </HeaderBar>
      <ProductCard
        brand={mockData.brand}
        title={mockData.title}
        originalPrice={mockData.originalPrice}
        currentPrice={mockData.currentPrice}
        imageUrl={mockData.imageUrl}
      />

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
        <>
          {bannerImageUrls.map((url, index) => (
            <BannerImage key={index} src={url} alt={`배너 ${index + 1}`} />
          ))}
        </>
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

            {aiReviews.map((text, index) => (
              <AIReviewCard key={index} content={text} />
            ))}

            <ReviewButton>
              <Label>리뷰 작성</Label>
            </ReviewButton>

            {realReviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </ReviewWrapper>
        </>
      )}
    </div>
  );
}
