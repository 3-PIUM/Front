import { useEffect, useState } from "react";
import ItemListTitle from "./ItemListTitle";
import axiosInstance from "../../api/axiosInstance";
import { styled } from "styled-components";
import TopRankItem from "./TopRankItem";

const RecommandBox = styled.div``;

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

export default function Top10() {
  const [title, setTitle] = useState<string | { title: string }>("");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTop10 = async () => {
      try {
        const items = await axiosInstance.get("/item/popular");
        const top10 = items.data.result;
        const popularitems = top10.popularItems;
        const title = top10.title;
        setItems(popularitems);
        setTitle(title);
        console.log(top10);

        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.error(error);
      }
    };
    getTop10();
  }, []);

  return (
    <>
      <RecommandBox>
        <ItemListTitle
          title={typeof title === "string" ? title : title.title}
        />
        <RecommandListWrapper>
          {items.map(
            (
              item: {
                itemId: number;
                itemName: string;
                discountRate: number;
                itemImage: string;
                salePrice: number;
                originalPrice: number;
              },
              index: number
            ) => (
              <TopRankItem
                key={item.itemId}
                itemId={item.itemId}
                itemName={item.itemName}
                imageSource={item.itemImage}
                discountRate={item.discountRate}
                price={item.salePrice}
                rank={index + 1}
                isLoading={isLoading}
              />
            )
          )}
        </RecommandListWrapper>
      </RecommandBox>
    </>
  );
}
