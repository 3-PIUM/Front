import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ItemCard from "./product/ItemCard";
import axiosInstance from "../api/axiosInstance";
import { useLocale } from "../context/LanguageContext";
import colors from "../styles/colors";

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

const PersonalRecommandList = styled.div<{ $isScroll: boolean }>`
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

interface PersonalRecommendedProps {
  nickname?: string;
}

export default function PersonalRecommended({
  nickname,
}: PersonalRecommendedProps) {
  const { t } = useLocale();
  const [activeTab, setActiveTab] = useState("전체");
  const [items, setItems] = useState<any[]>([]); // 아이템 상태를 별도로 관리

  // // 배열 섞는 함수
  // function shuffleArray<T>(array: T[]): T[] {
  //   const shuffled = [...array];
  //   for (let i = shuffled.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  //   }
  //   return shuffled;
  // }

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axiosInstance.get("/member");
        const data = response.data;
        console.log(data);
      } catch (error) {
        console.error("멤버 정보를 가져오는 중 오류 발생:", error);
      }
    };
    fetchMember();
  }, []);

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "전체" && listRef.current) {
      listRef.current.scrollLeft = 0;
    }

    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("item/list", {
          params: {
            category: activeTab === "전체" ? null : activeTab,
          },
        });
        const data = response.data.result;
        setItems(data);
      } catch (error) {
        console.error("아이템을 가져오는 중 오류 발생:", error);
      }
    };
    fetchItems();
  }, [activeTab]);

  console.log(items);

  const handleActiveTabValue = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <RecommandBox>
      <RecommandTitle>
        <div>{nickname ?? "null"}</div>님을 위한 추천 제품
      </RecommandTitle>
      <RecommandCategoryWrapper>
        {t.home.recommended.map(
          (item: { name: string; value: string; id: number }) => {
            return (
              <RecommandCategory
                key={item.id}
                onClick={() => handleActiveTabValue(item.value)}
                $isActive={activeTab === item.name}
              >
                {item.name}
              </RecommandCategory>
            );
          }
        )}
      </RecommandCategoryWrapper>
      <PersonalRecommandList $isScroll={activeTab === "전체"} ref={listRef}>
        {items.map((product) => (
          <ItemCard
            key={product.id}
            itemName={product.itemName}
            imageSource={product.itemImage}
            price={product.salePrice}
            discountRate={
              product.originalPrice
                ? Math.round(
                    (1 - product.salePrice / product.originalPrice) * 100
                  )
                : 0
            }
            itemId={product.id}
          />
        ))}
      </PersonalRecommandList>
    </RecommandBox>
  );
}
