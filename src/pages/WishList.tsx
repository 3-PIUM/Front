import styled from "styled-components";
import PageTitle from "../components/common/PageTitle";
import ItemCard from "../components/product/ItemCard";
import EmptyWishView from "../components/wishlist/EmptyWishView";
import { useLocale } from "../context/LanguageContext";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import GuestWishList from "../components/wishlist/GuestWishList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 1.5rem;
`;

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0.5rem;
  row-gap: 0.5rem;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 2rem auto 0 auto;
  padding-bottom: 80px;
`;

export default function WishList() {
  sessionStorage.removeItem("topClicked");
  sessionStorage.removeItem("categoryName");
  sessionStorage.removeItem("subcategoryName");
  const { t } = useLocale();
  const [itemList, setItemList] = useState<wishProps[]>();
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchWishlistItem = async () => {
      try {
        const response = await axiosInstance.get("/wishlist/items");
        const list = response.data.result;
        console.log("찜 목록을 불러왔습니다", list);
        setItemList(list);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.log("찜 목록을 불러오지 못했습니다", error);
      }
    };

    fetchWishlistItem();
  }, [refreshTrigger]);

  interface wishItem {
    itemId: number;
    itemName: string;
    mainImageUrl: string;
    originalPrice: number;
    salePrice: number;
    discountRate: number;
    wishStatus: boolean;
  }

  interface wishProps {
    wishListId: number;
    memberId: number;
    createdAt: string;
    item: wishItem;
    mainImageUrl: string;
    discountRate: number;
    salePrice: number;
    originalPrice: number;
    itemName: string;
    itemId: number;
  }

  const handleWishChange = () => {
    setRefreshTrigger((prev) => !prev);
  };

  return (
    <Wrapper>
      <PageTitle pageName={t.wishlist.pageTitle} />
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#D6D6D6",
          marginTop: "3.75rem",
        }}
      />
      {isLoggedIn ? (
        itemList && itemList.length > 0 ? (
          <ItemWrapper>
            {itemList.map((wish: wishProps) => (
              <ItemCard
                key={wish.item.itemId}
                itemName={wish.item.itemName}
                imageSource={wish.item.mainImageUrl}
                discountRate={wish.item.discountRate}
                price={wish.item.salePrice}
                itemId={wish.item.itemId}
                onWishChange={handleWishChange}
                isLoading={isLoading}
              />
            ))}
          </ItemWrapper>
        ) : (
          <EmptyWishView />
        )
      ) : (
        <GuestWishList />
      )}
    </Wrapper>
  );
}
