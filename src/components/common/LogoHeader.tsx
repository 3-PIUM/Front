import styled from "styled-components";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { HiLocationMarker } from "react-icons/hi";
import { useEffect, useState } from "react";
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
  box-sizing: border-box;
  z-index: 100;
`;

const LogoWrap = styled.img`
  display: flex;
  height: 70%;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const SearchOverlay = styled.div`
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

const SearchModal = styled.div`
  background-color: white;
  padding-top: 2.8rem;
  z-index: 100;
  max-height: 80vh;
  overflow-y: auto;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #333;
  border-radius: 4px;

  &:focus {
    border-color: #f23477;
    outline: none;
  }
`;

const ResultItem = styled.div`
  margin: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface SearchResult {
  id: number;
  itemName: string;
}

interface LogoHeaderProps {
  onStoreClick?: () => void; // 모달 제어 함수
}

export default function LogoHeader({ onStoreClick }: LogoHeaderProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchSearch = async () => {
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

    const delay = setTimeout(fetchSearch, 300); // debounce
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <>
      <HeaderWrap>
        <LogoWrap
          src="/images/logo/PIUM_logo.png"
          onClick={() => navigate("/home")}
        />
        <RightIcons>
          <IconWrapper onClick={onStoreClick}>
            <HiLocationMarker size={20} />
          </IconWrapper>
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
              value={searchTerm}
              autoFocus
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchResults.map((item) => (
              <ResultItem
                key={item.id}
                onClick={() => {
                  navigate(`/product-detail/${item.id}`);
                  setIsSearchOpen(false);
                }}
              >
                {item.itemName}
              </ResultItem>
            ))}
          </SearchModal>
        </SearchOverlay>
      )}
    </>
  );
}
