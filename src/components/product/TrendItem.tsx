import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ItemCard from "./ItemCard";
import ItemListTitle from "./ItemListTitle";
import axiosInstance from "../../api/axiosInstance";

const RecommandBox = styled.div``;

const BigListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  width: 100%;
  gap: 1rem;
  margin-top: 0.5rem;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Page = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 0.5rem;
  min-width: 100%;
  scroll-snap-align: start;
  place-items: center;
`;

export default function WeeklyBest() {
  const [title, setTitle] = useState<string | { title: string }>("");
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeeklyBest = async () => {
      try {
        const response = await axiosInstance.get("/item/trend");

        const data = response.data.result;
        setTitle(data.title);
        setItems(data.popularItems);

        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchWeeklyBest();
  }, []);

  return (
    <>
      <RecommandBox>
        <ItemListTitle
          title={typeof title === "string" ? title : title.title}
        />
        <BigListWrapper>
          {Array.from({ length: Math.ceil(items.length / 4) }).map(
            (_, pageIndex) => (
              <Page key={pageIndex}>
                {items.slice(pageIndex * 4, pageIndex * 4 + 4).map((item) => (
                  <ItemCard
                    key={item.itemId}
                    itemId={item.itemId}
                    itemName={item.itemName}
                    imageSource={item.itemImage}
                    discountRate={item.discountRate}
                    price={item.salePrice}
                    size="big"
                    isLoading={isLoading}
                  />
                ))}
              </Page>
            )
          )}
        </BigListWrapper>
      </RecommandBox>
    </>
  );
}
