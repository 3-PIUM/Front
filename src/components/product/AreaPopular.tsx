import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ItemListTitle from "./ItemListTitle";
import { styled } from "styled-components";
import axiosInstance from "../../api/axiosInstance";

const RecommandBox = styled.div``;

const BigListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export default function AreaPopular() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get("/item/areaPopular");
        const data = response.data.result;
        setTitle(data.title);
        setItems(data.popularItems);

        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <RecommandBox>
        <ItemListTitle title={title} />
        <BigListWrapper>
          {items.map((item) => (
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
        </BigListWrapper>
      </RecommandBox>
    </>
  );
}
