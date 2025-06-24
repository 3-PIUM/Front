import styled from "styled-components";
import LogoHeader from "../components/common/LogoHeader";
import colors from "../styles/colors";
import { useState, useRef, useEffect } from "react";
import ItemCard from "../components/product/ItemCard";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useLocale } from "../context/LanguageContext";
import hotItems from "../data/hotItems.json";
import topRank from "../data/topRankDummyData.json";
import skinType from "../data/language/skinType";
import PersonalRecommended from "../components/PersonalRecommended";
import TopRankItem from "../components/product/TopRankItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.subPink};
  padding: 1.5rem 1rem;
  margin: 44px 1rem 0 1rem;
  border-radius: 1rem;
  color: ${colors.mainPink};
  text-align: center;
  align-items: center;
  gap: 0.8rem;
  font-size: 1rem;
`;

const InfoBoxBtn = styled.button`
  display: flex;
  background-color: ${colors.mainPink};
  border: none;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: ${colors.white};
  font-size: 1rem;
`;

const InfoSubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalInfo = styled.div<{ skinType: string }>`
  display: flex;
  flex-direction: row;
  background-color: ${({ skinType }) =>
    skinType === "지성"
      ? "#FFF6D8"
      : skinType === "건성"
      ? "#FCEBDD"
      : skinType === "복합성"
      ? "#F4F7E8"
      : "#ffffff"};

  margin-top: 1rem;
  padding: 1rem 1.5rem;
  justify-content: space-between;
  margin-top: 44px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;
  padding: 1rem 0;
`;

const UserSkin = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.125rem;
`;

const SkinType = styled.div`
  display: flex;
`;

const Highlight = styled.div`
  color: ${colors.mainPink};
  font-weight: 700;
  font-size: 1.25rem;
`;

const RecommendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecommendTitle = styled.div`
  display: flex;
  font-size: 0.875rem;
`;

const Ingredients = styled.div`
  display: flex;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.mainPink};
`;

const CharacterBox = styled.div`
  display: flex;
`;

const CharacterImg = styled.img`
  width: 10rem;
`;

const RecommandListWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 2rem;
  padding-bottom: 80px;
`;

const RecommandBox = styled.div``;

const RecommandTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 1.125rem;
`;

// const RecommandCategoryWrapper = styled.div`
//   display: flex;
//   flex-wrap: nowrap;
//   overflow-x: auto;
//   gap: 0.5rem;
//   padding: 0.5rem 0;
//   margin-top: 0.5rem;

//   // 스크롤바 안 보이게
//   -ms-overflow-style: none;
//   scrollbar-width: none;
//   &::-webkit-scrollbar {
//     display: none; /* Chrome, Safari, Opera */
//   }
// `;

// const RecommandCategory = styled.div<{ $isActive: boolean }>`
//   display: flex;
//   padding: 0.375rem 0.75rem;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
//   background-color: ${({ $isActive }) =>
//     $isActive ? colors.mainPink : colors.white};
//   color: ${({ $isActive }) => ($isActive ? colors.white : colors.black)};
//   border-radius: 1.25rem;
//   font-size: 0.75rem;
//   min-width: max-content;
//`;

const PersonalRecommandList = styled.div<{ $isScroll: boolean }>`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;

  ${({ $isScroll }) =>
    $isScroll &&
    `
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `}
`;

const BannerWrap = styled.div`
  display: flex;
  padding: 1rem;
`;

const BannerImage = styled.img`
  display: flex;
  width: 100%;
  border-radius: 0.75rem;
`;

const RecommandListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  gap: 0.5rem;
  margin-top: 0.5rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BigListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
  gap: 0.5rem;
  margin-top: 0.5rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState("전체");
  const [showStoreModal, setShowStoreModal] = useState(false);
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const { t, setLanguage, language } = useLocale();

  sessionStorage.removeItem("topClicked");
  sessionStorage.removeItem("categoryName");
  sessionStorage.removeItem("subcategoryName");

  const dummyStores = [
    {
      name: "강남점",
      distance: "500m",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 중",
      hours: "10:00 ~ 22:00",
    },
    {
      name: "신촌점",
      distance: "1.2km",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 준비 중",
      hours: "11:00 ~ 21:00",
    },
    {
      name: "홍대점",
      distance: "4.2km",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 준비 중",
      hours: "11:00 ~ 21:00",
    },
  ];

  // const selectedTab = tabItems.find((tab) => tab.label === activeTab);

  // const allItems = tabItems
  //   .filter((tab) => tab.label !== "전체")
  //   .flatMap((tab) => tab.items);

  // // 배열 섞는 함수
  // function shuffleArray<T>(array: T[]): T[] {
  //   const shuffled = [...array];
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   return shuffled;
  // }

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "전체" && listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, [activeTab]);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axiosInstance.get("/member");
        const result = response.data.result;
        if (result.language === "EN") setLanguage("English");
        if (result.language === "JP") setLanguage("日本語");
        if (result.language === "KR") setLanguage("한국어");
        setMemberInfo(result);
        sessionStorage.setItem("memberInfo", JSON.stringify(result));
      } catch (error) {
        console.error("회원 정보 불러오기 실패:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  console.log(memberInfo);

  const getLocalizedSkinType = (
    originalType: string,
    language: string
  ): string => {
    return skinType[originalType]?.[language] ?? "";
  };

  const mockProducts = [
    { id: 1, name: "선크림" },
    { id: 2, name: "보습 크림" },
    { id: 3, name: "클렌징 오일" },
  ];

  const nickname = JSON.parse(
    sessionStorage.getItem("memberInfo") || "{}"
  ).nickname;

  return (
    <Wrapper>
      <Header />
      <LogoHeader
        onStoreClick={() => setShowStoreModal(true)}
        productList={mockProducts}
      />
      {!memberInfo?.skinType ? (
        <InfoBox>
          <img src="images/CharacterImg/surveyImage.png" width="60%" />
          <InfoSubTitle>
            <div>{t.home.personalInfo.subtitle.prefix}</div>
            <div>{t.home.personalInfo.subtitle.suffix}</div>
          </InfoSubTitle>
          <InfoBoxBtn onClick={() => navigate("/mypage/skintype")}>
            {t.home.personalInfo.registerSkinType}
          </InfoBoxBtn>
        </InfoBox>
      ) : (
        <PersonalInfo skinType={memberInfo?.skinType}>
          <TextInfo>
            <UserSkin>
              <div>{t.home.skinTypeTitle}</div>
              <SkinType>
                <Highlight>
                  {getLocalizedSkinType(memberInfo?.skinType, language)}
                </Highlight>
              </SkinType>
            </UserSkin>
            <RecommendInfo>
              <RecommendTitle>{t.home.skinMBTI}</RecommendTitle>
              <Ingredients>
                {memberInfo?.mbtiCode === ""
                  ? "-"
                  : memberInfo?.mbtiCode.replaceAll(",", "")}
              </Ingredients>
            </RecommendInfo>
          </TextInfo>
          <CharacterBox>
            {memberInfo?.skinType === "복합성" ? (
              <CharacterImg
                src="images/SkinType/combination.png"
                alt="복합성 캐릭터"
              />
            ) : memberInfo?.skinType === "건성" ? (
              <CharacterImg src="images/SkinType/dry.png" alt="건성 캐릭터" />
            ) : (
              <CharacterImg src="images/SkinType/oily.png" alt="지성 캐릭터" />
            )}
          </CharacterBox>
        </PersonalInfo>
      )}

      <BannerWrap>
        <BannerImage
          src={
            language === "한국어"
              ? "/images/Banner/bannerKR.png"
              : language == "English"
              ? "/images/Banner/bannerEN.png"
              : "/images/Banner/bannerJP.png"
          }
          alt="mbti 배너"
          onClick={() => navigate("/mbti")}
        />
      </BannerWrap>
      <RecommandListWrap>
        <PersonalRecommended nickname={nickname} />
        <RecommandBox>
          <RecommandTitle>오늘의 추천 제품</RecommandTitle>
          <BigListWrapper>
            {topRank.map((item) => (
              <ItemCard
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                imageSource={item.url}
                discountRate={item.discount}
                price={item.price}
                size="big"
              />
            ))}
          </BigListWrapper>
        </RecommandBox>
        <RecommandBox>
          <RecommandTitle>TOP 10</RecommandTitle>
          <RecommandListWrapper>
            {topRank.map((item) => (
              <TopRankItem
                key={item.id}
                itemId={item.id}
                itemName={item.name}
                imageSource={item.url}
                discountRate={item.discount}
                price={item.price}
                rank={item.rank}
              />
            ))}
          </RecommandListWrapper>
        </RecommandBox>
      </RecommandListWrap>
      {showStoreModal && (
        <StoreModal
          onClose={() => setShowStoreModal(false)}
          onSelect={(store) => console.log("선택한 매장:", store)}
          stores={dummyStores}
        />
      )}
    </Wrapper>
  );
}
