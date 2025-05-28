import { useState } from "react";
import styled from "styled-components";
import TextHeader from "../components/TextHeader";
import ProductCard from "../components/ProductCard";
import SearchIcon from "../components/SearchIcon";
import CartIcon from "../components/CartIcon";
import SkinTypeRankList from "../components/SkinTypeRankList";

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
        <SkinTypeWrapper>
          <SectionTitle>추천 피부 타입</SectionTitle>
          <SkinTypeRankList />
        </SkinTypeWrapper>
      )}
    </div>
  );
}
