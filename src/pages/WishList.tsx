import styled from "styled-components";
import Header from "../components/common/Header";
import PageTitle from "../components/common/PageTitle";
import ItemCard from "../components/product/ItemCard";
import { useLocale } from "../context/LanguageContext";
import { useEffect } from "react";
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

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axiosInstance.get("/member");
        const result = response.data.result;
        console.log(result);
      } catch (error) {
        console.log("회원정보를 불러오지 못했습니다", error);
      }
    };

    fetchMemberInfo();
  }, []);

  return (
    <Wrapper>
      <Header />
      <PageTitle pageName={t.wishlist.pageTitle} />
      <ItemWrapper>
        {wishlist.map((item) => (
          <ItemCard
            key={item.id}
            itemName={item.name}
            imageSource={item.url}
            discountRate={item.discount}
            price={item.price}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
}
