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

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
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
  const [items, setItems] = useState<any[]>([]);

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

  const handleActiveTabValue = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  return (
    <RecommandBox>
      <RecommandTitle>
        <div>{nickname}</div>님을 위한 추천 제품
      </RecommandTitle>
      <RecommandCategoryWrapper>
        {t.home.recommended.map(
          (item: { name: string; value: string; id: number }) => {
            return (
              <RecommandCategory
                key={item.id}
                onClick={() => handleActiveTabValue(item.value)}
                $isActive={activeTab === item.value}
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
            wishStatus={product.wishStatus}
          />
        ))}
      </PersonalRecommandList>
    </RecommandBox>
  );
}
