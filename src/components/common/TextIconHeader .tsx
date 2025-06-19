import { useEffect, useState } from "react";
import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 0 1rem;
  z-index: 999;
`;

const LeftIcon = styled.div`
  cursor: pointer;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  color: ${colors.black};
`;

const RightIcons = styled.div`
  display: flex;
  gap: 1rem;
  /* margin-right: -0.9rem; */
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

const SearchOverlay = styled.div`
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const SearchModal = styled.div`
  background-color: white;
  padding: 1rem;
  z-index: 1000;
  max-height: 80vh;
  overflow-y: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  margin-bottom: 1rem;

  &:focus {
    border-color: #f23477;
    outline: none;
  }
`;

const SearchResultItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  cursor: pointer;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface FullHeaderProps {
  pageName: string;
}

interface SearchResult {
  id: number;
  itemName: string;
  itemImage: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
}

export default function FullHeader({ pageName }: FullHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const { t } = useLocale();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axiosInstance.get(
          `http://localhost:8080/item/search/list/${encodeURIComponent(
            searchTerm
          )}?page=0`
        );
        setSearchResults(res.data.result.itemSearchInfoDTOs || []);
      } catch (err) {
        console.error("검색 실패", err);
      }
    };

    const delay = setTimeout(fetchSearchResults, 300); // 디바운싱
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <>
      <HeaderWrap>
        <LeftIcon onClick={() => navigate(-1)}>
          <VscChevronLeft size={24} />
        </LeftIcon>
        <Title>{pageName}</Title>
        <RightIcons>
          <IconWrapper onClick={() => setIsSearchOpen(true)}>
            <FiSearch size={20} />
          </IconWrapper>
          <IconWrapper onClick={() => navigate("/cart")}>
            <FiShoppingCart size={20} />
          </IconWrapper>
        </RightIcons>
      </HeaderWrap>

      {isSearchOpen && (
        <SearchOverlay onClick={() => setIsSearchOpen(false)}>
          <SearchModal onClick={(e) => e.stopPropagation()}>
            <SearchInput
              type="text"
              placeholder={t?.search?.placeholder || ""}
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.map((item) => (
              <SearchResultItem
                key={item.id}
                onClick={() => navigate(`/product-detail/${item.id}`)}
              >
                {item.itemName}
              </SearchResultItem>
            ))}
          </SearchModal>
        </SearchOverlay>
      )}
    </>
  );
}
