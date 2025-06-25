import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchHeader from "../../components/common/SearchHeader";
import { styled } from "styled-components";
import axiosInstance from "../../api/axiosInstance";
import ItemCard from "../../components/product/ItemCard";
import Header from "../../components/common/Header";
import { FiSearch } from "react-icons/fi";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  padding: 44px 1rem 1rem 1rem;
  position: fixed;
  top: 44px;
  width: 100%;
  background-color: ${colors.white};
  z-index: 99;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInputIcon = styled(FiSearch)<{ clickedBar?: boolean }>`
  position: absolute;
  font-size: 1.2rem;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: ${colors.black};
  pointer-events: auto;
`;

const SearchInput = styled.input<{ clickedBar?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 3rem;
  background-color: #eeeeee;

  &:focus {
    border-color: #f23477;
    outline: none;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin: 7rem 0 1rem 0;
`;

const HighlightText = styled.div`
  display: flex;
  font-weight: 700;
  color: ${colors.mainPink};
`;

const ItemWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 80px;
`;

export default function SearchPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { t } = useLocale();
  const [inputValue, setInputValue] = useState(keyword || "");

  useEffect(() => {
    if (keyword) {
      console.log("검색어:", decodeURIComponent(keyword));
    }
    if (keyword) {
      const fetchSearchItems = async () => {
        try {
          const params: any = {};
          params.size = 50;
          const decodeKeyword = decodeURIComponent(keyword);
          const response = await axiosInstance.get(
            `/item/advancedSearch/list/${decodeKeyword}`,
            {
              params,
            }
          );
          const items = response.data.result.itemSearchInfoDTOs;
          setItems(items);
          setTimeout(() => setIsLoading(false), 500);
        } catch (error) {
          console.error(error);
        }
      };
      fetchSearchItems();
    }
  }, [keyword]);

  return (
    <Wrapper>
      <Header />
      <SearchHeader pageName="" />
      <SearchWrapper>
        <SearchInputWrapper>
          <SearchInput
            type="text"
            placeholder={t?.search?.placeholder || ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                navigate(`/search/${encodeURIComponent(inputValue.trim())}`);
              }
            }}
          />
          <SearchInputIcon
            onClick={() => {
              navigate(`/search/${encodeURIComponent(inputValue.trim())}`);
            }}
          />
        </SearchInputWrapper>
      </SearchWrapper>
      <TextWrapper>
        <HighlightText>"{keyword}"</HighlightText> &nbsp; 검색 결과
      </TextWrapper>
      <ItemWrapper>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            imageSource={item.itemImage}
            itemName={item.itemName}
            price={item.salePrice}
            itemId={item.id}
            discountRate={
              item.originalPrice
                ? Math.round((1 - item.salePrice / item.originalPrice) * 100)
                : 0
            }
            wishStatus={item.wishStatus}
            isLoading={isLoading}
          />
        ))}
      </ItemWrapper>
    </Wrapper>
  );
}
