import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import colors from "../styles/colors";
import OilySkin from "../assets/images/SkinType/oily.png";
import { useState, useRef, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import Header from "../components/Header";
import StoreModal from "../components/StoreModal";
import bannerImg from "../assets/images/mbtiBanner.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import surveyImage from "../assets/images/surveyImage.png";
import { useLocale } from "../context/LanguageContext";

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
  /* font-weight: 700; */
`;

const InfoSubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f0e8ba;
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

const RecommandCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;

  // 스크롤바 안 보이게
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const RecommandCategory = styled.div<{ $isActive: boolean }>`
  display: flex;
  padding: 0.375rem 0.75rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ $isActive }) =>
    $isActive ? colors.mainPink : colors.white};
  color: ${({ $isActive }) => ($isActive ? colors.white : colors.black)};
  border-radius: 1.25rem;
  font-size: 0.75rem;
  min-width: max-content;
`;

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
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState("전체");
  const [showStoreModal, setShowStoreModal] = useState(false);
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState<any>(null);
  const { t, setLanguage } = useLocale();

  const tabs = [
    { id: 1, label: "전체", items: [] },
    {
      id: 2,
      label: "스킨케어",
      items: [
        {
          id: 21,
          name: "[하루특가/대용량150ml] 웰라쥬 리얼 히알루로닉 블루 100 앰플 75ml 1+1 기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/400/10/0000/0016/A00000016203553ko.jpg?l=ko",
          discount: 38,
          price: 28400,
        },
        {
          id: 22,
          name: "[6/1 하루특가] [1등세럼] 브링그린 징크테카 트러블세럼 50ml+25리필(+징크테카 S.O.S 스팟 젤)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022651509ko.jpg?l=ko",
          discount: 52,
          price: 26800,
        },
        {
          id: 23,
          name: "[[6월올영픽]토리든 다이브인 저분자 히알루론산 세럼 50ml 리필 한정기획 (+50ml리필+선크림20ml+패드10매)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022648706ko.jpg?l=ko",
          discount: 34,
          price: 23750,
        },
      ],
    },
    {
      id: 3,
      label: "클렌징",
      items: [
        {
          id: 31,
          name: "[스테디셀러특가/4년연속1위] 마녀공장 퓨어 클렌징오일 200mlX2 더블기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0020/A00000020744414ko.jpg?l=ko",
          discount: 38,
          price: 22800,
        },
        {
          id: 32,
          name: "[6/1 하루특가] 6월올영픽]바이오더마 센시비오 H2O 500ml 2입 기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022607007ko.jpg?l=ko",
          discount: 31,
          price: 28600,
        },
        {
          id: 33,
          name: "[천만돌파/1+1] 비플레인 녹두 약산성 클렌징폼 160ml+160ml 기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022260510ko.jpg?l=ko",
          discount: 10,
          price: 23190,
        },
      ],
    },
    {
      id: 4,
      label: "메이크업",
      items: [
        {
          id: 41,
          name: "[6월올영픽/1등쿠션] VDL 커버 스테인 퍼펙팅 쿠션 기획(+미니 프라이머 증정)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0018/A00000018590325ko.png?l=ko",
          discount: 26,
          price: 25100,
        },
        {
          id: 42,
          name: "[6/1하루특가/한정기획] 연작 스킨 퍼펙팅 프로텍티브 베이스프렙 40ml 기획 (선베이스10ml+퍼프)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021394311ko.jpg?l=ko",
          discount: 21,
          price: 35500,
        },
        {
          id: 43,
          name: "[스테디셀러특가/틴뚜링 증정기획] 롬앤 더 쥬시 래스팅 틴트 단품/기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021315357ko.jpg?l=ko",
          discount: 31,
          price: 8900,
        },
      ],
    },
    {
      id: 5,
      label: "선케어",
      items: [
        {
          id: 51,
          name: "[6월 올영픽][1+1+1] 라운드랩 자작나무 수분 선크림 40ml 트리플 기획",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022667504ko.jpg?l=ko",
          discount: 14,
          price: 25650,
        },
        {
          id: 52,
          name: "[스테디셀러특가][베이스착붙] 달바 핑크 톤업 선크림 듀오 기획 (50ml+50ml)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0018/A00000018023782ko.jpg?l=ko",
          discount: 35,
          price: 32900,
        },
        {
          id: 53,
          name: "[6월 올영픽/스테디셀러특가/화잘먹]구달 맑은 어성초 진정 수분 선크림 50ml 1+1 기획 (+포캣 파우치)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021955314ko.jpg?l=ko",
          discount: 20,
          price: 15900,
        },
      ],
    },
    {
      id: 6,
      label: "마스크팩",
      items: [
        {
          id: 61,
          name: "[휴대용케이스 증정] 메디힐 네모패드 100+100매 한정기획 (마데카소사이드, PDRN)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022644572ko.jpg?l=ko",
          discount: 28,
          price: 28330,
        },
        {
          id: 62,
          name: "[아이돌물광/단독기획] 메디큐브 콜라겐 랩핑 마스크 75ml (+브러쉬 증정기획)",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021919307ko.jpg?l=ko",
          discount: 25,
          price: 18700,
        },
        {
          id: 63,
          name: "[31억장 돌파/한정판매] 메디힐 에센셜 마스크팩 10+1매 고기능 7종 택1",
          url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022341444ko.jpg?l=ko",
          discount: 51,
          price: 9800,
        },
      ],
    },
  ];

  const hotItems = [
    {
      id: 71,
      name: "[[6월 올영픽/유트루PICK/1+1최초기획] 스킨푸드 캐롯 카로틴 카밍 워터 패드 60매 더블기획 (본품+본품)",
      url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0022/A00000022493204ko.jpg?l=ko",
      discount: 38,
      price: 25830,
    },
    {
      id: 72,
      name: "[단독기획/대용량] 파티온 노스카나인 트러블 세럼 50ml 리필 기획(+리필40ml+크림10ml)",
      url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0021/A00000021960903ko.jpg?l=ko",
      discount: 40,
      price: 32210,
    },
    {
      id: 73,
      name: "[6월 올영픽/더블한정기획 출시] 어노브 딥 데미지 헤어 트리트먼트 EX 320ml 더블/듀오 기획 5종 택1",
      url: "https://image.oliveyoung.co.kr/cfimages/cf-goods/uploads/images/thumbnails/550/10/0000/0017/A00000017142387ko.jpg?l=ko",
      discount: 31,
      price: 28900,
    },
  ];

  const dummyStores = [
    {
      name: "올리브영 강남점",
      distance: "500m",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 중",
      hours: "10:00 ~ 22:00",
    },
    {
      name: "올리브영 신촌점",
      distance: "1.2km",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 준비 중",
      hours: "11:00 ~ 21:00",
    },
    {
      name: "올리브영 홍대점",
      distance: "4.2km",
      imageUrl:
        "https://image.oliveyoung.co.kr/cfimages/oystore/DD1D_1.jpg?rs=800x0",
      status: "영업 준비 중",
      hours: "11:00 ~ 21:00",
    },
  ];

  const selectedTab = tabs.find((tab) => tab.label === activeTab);

  const allItems = tabs
    .filter((tab) => tab.label !== "전체")
    .flatMap((tab) => tab.items);

  // 배열 섞는 함수
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // 원본 배열 복사
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const showAllItems =
    activeTab === "전체" ? shuffleArray(allItems) : selectedTab?.items ?? [];

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
      } catch (error) {
        console.error("회원 정보 불러오기 실패:", error);
      }
    };
    fetchMemberInfo();
  }, []);

  const mockProducts = [
    { id: 1, name: "선크림" },
    { id: 2, name: "보습 크림" },
    { id: 3, name: "클렌징 오일" },
  ];

  return (
    <Wrapper>
      <Header />
      <LogoHeader
        onStoreClick={() => setShowStoreModal(true)}
        productList={mockProducts}
      />
      {memberInfo?.skinType == null ? (
        <InfoBox>
          <img src={surveyImage} width="60%" />
          <InfoSubTitle>
            <div>{t.home.personalInfo.subtitle.prefix}</div>
            <div>{t.home.personalInfo.subtitle.suffix}</div>
          </InfoSubTitle>
          <InfoBoxBtn onClick={() => navigate("/mypage/skintype")}>
            {t.home.personalInfo.registerSkinType}
          </InfoBoxBtn>
        </InfoBox>
      ) : (
        <PersonalInfo>
          <TextInfo>
            <UserSkin>
              <div>{memberInfo?.nickname ?? "null"}님은</div>
              <SkinType>
                <Highlight>{memberInfo?.skinType ?? "null"} 피부</Highlight>{" "}
                입니다
              </SkinType>
            </UserSkin>
            <RecommendInfo>
              <RecommendTitle>추천 성분</RecommendTitle>
              <Ingredients>히알루론산, 글리세린</Ingredients>
            </RecommendInfo>
          </TextInfo>
          <CharacterBox>
            <CharacterImg src={OilySkin} alt="지성 피부" />
          </CharacterBox>
        </PersonalInfo>
      )}

      <BannerWrap>
        <BannerImage
          src={bannerImg}
          alt="mbti 배너"
          onClick={() => navigate("/mbti")}
        />
      </BannerWrap>
      <RecommandListWrap>
        <RecommandBox>
          <RecommandTitle>
            <div>{memberInfo?.nickname ?? "null"}</div>님을 위한 추천 제품
          </RecommandTitle>
          <RecommandCategoryWrapper>
            {tabs.map((item) => {
              return (
                <RecommandCategory
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.label);
                  }}
                  $isActive={activeTab === item.label}
                >
                  {item.label}
                </RecommandCategory>
              );
            })}
          </RecommandCategoryWrapper>
          <PersonalRecommandList $isScroll={activeTab === "전체"} ref={listRef}>
            {showAllItems.map((product) => (
              <ItemCard
                key={product.id}
                itemName={product.name}
                imageSource={product.url}
                price={product.price}
                discountRate={product.discount}
              />
            ))}
          </PersonalRecommandList>
        </RecommandBox>
        <RecommandBox>
          <RecommandTitle>지금 한국🇰🇷에서 가장 핫한 제품</RecommandTitle>
          <RecommandListWrapper>
            {hotItems.map((hot) => (
              <ItemCard
                key={hot.id}
                itemName={hot.name}
                imageSource={hot.url}
                discountRate={hot.discount}
                price={hot.price}
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
