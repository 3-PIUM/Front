import styled from "styled-components";
import Header from "../components/common/Header";
import PageTitle from "../components/common/PageTitle";
import ItemCard from "../components/product/ItemCard";
import { useLocale } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import wishlist from "../data/wishlist.json";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin-top: 3.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 80px;
`;

export default function WishList() {
  const { t } = useLocale();
  const [itemList, setItemList] = useState<wishProps[]>();

  useEffect(() => {
    const fetchWishlistItem = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/items");
        const list = response.data.result.wishListItemList;
        console.log("찜 목록을 불러왔습니다", list);
        setItemList(list);
      } catch (error) {
        console.log("찜 목록을 불러오지 못했습니다", error);
      }
    };

    fetchWishlistItem();
  }, []);

  interface wishProps {
    itemId: number;
    itemName: string;
    url: string;
    originalPrice: number;
    salePrice: number;
  }

  return (
    <Wrapper>
      <Header />
      <PageTitle pageName={t.wishlist.pageTitle} />
      <ItemWrapper>
        {itemList?.map((wish: wishProps) => (
          <ItemCard
            key={wish.itemId}
            itemName={wish.itemName}
            imageSource={wish.url}
            discountRate={
              ((wish.originalPrice - wish.salePrice) / wish.originalPrice) * 100
            }
            price={wish.salePrice}
          />
        ))}
        {/* {wishlist.map((item) => (
          <ItemCard
            key={item.id}
            itemName={item.name}
            imageSource={item.url}
            discountRate={item.discount}
            price={item.price}
          />
        ))} */}
      </ItemWrapper>
    </Wrapper>
  );
}
