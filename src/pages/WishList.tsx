import styled from "styled-components";
import Header from "../components/common/Header";
import PageTitle from "../components/common/PageTitle";
import ItemCard from "../components/product/ItemCard";
import { useLocale } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

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
        const list = response.data.result;
        console.log("찜 목록을 불러왔습니다", list);
        setItemList(list);
      } catch (error) {
        console.log("찜 목록을 불러오지 못했습니다", error);
      }
    };

    fetchWishlistItem();
  }, []);

  interface wishItem {
    itemId: number;
    itemName: string;
    mainImageUrl: string;
    originalPrice: number;
    salePrice: number;
    discountRate: number;
  }

  interface wishProps {
    wishListId: number;
    memberId: number;
    createdAt: string;
    item: wishItem;
  }

  return (
    <Wrapper>
      <Header />
      <PageTitle pageName={t.wishlist.pageTitle} />
      <ItemWrapper>
        {itemList?.map((wish: wishProps) => (
          <ItemCard
            key={wish.item.itemId}
            itemName={wish.item.itemName}
            imageSource={wish.item.mainImageUrl}
            discountRate={wish.item.discountRate}
            price={wish.item.salePrice}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
}
