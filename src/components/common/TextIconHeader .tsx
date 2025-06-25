import { useEffect, useState } from "react";
import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import { FaLeaf } from "react-icons/fa";

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
  display: flex;
  cursor: pointer;
  flex: 1;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  width: auto;
  position: absolute;
  left: 50%;

  transform: translateX(-50%);
  gap: 0.5rem;
`;

const LeafWrap = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Title = styled.h1`
  display: flex;
  font-size: 16px;
  font-weight: 700;
  color: ${colors.black};
`;

const RightIcons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
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

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const SearchInputIcon = styled(FiSearch)<{ clickedBar?: boolean }>`
  position: absolute;
  font-size: 1.2rem;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: ${({ clickedBar }) => (clickedBar ? colors.mainPink : "#333")};
  pointer-events: auto;
`;

const SearchInput = styled.input<{ clickedBar?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid
    ${({ clickedBar }) => (clickedBar ? colors.mainPink : "#333")};
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

interface FullHeaderProps {
  pageName: string;
  isVegan?: boolean;
  backPath?: string;
}

interface SearchResult {
  id: number;
  itemName: string;
  itemImage: string;
  originalPrice: number;
  salePrice: number;
  discountRate: number;
}

export default function FullHeader({
  pageName,
  isVegan,
  backPath,
}: FullHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [clickedBar, setClickedBar] = useState<boolean>(false);
  const { t } = useLocale();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/item/advancedSearch/list/${encodeURIComponent(searchTerm)}`
        );
        setSearchResults(res.data.result.itemSearchInfoDTOs || []);
      } catch (err) {
        console.error("검색 실패", err);
      }
    };

    const delay = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <>
      <HeaderWrap>
        <LeftIcon
          onClick={() => {
            if (backPath) {
              navigate(backPath);
            } else {
              navigate(-1);
            }
          }}
        >
          <VscChevronLeft size={24} />
        </LeftIcon>

        <TextWrapper>
          {isVegan && (
            <LeafWrap>
              <FaLeaf style={{ fontSize: "1rem", color: "#6DBE45" }} />
            </LeafWrap>
          )}

          <Title>{pageName}</Title>
        </TextWrapper>

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
        <SearchOverlay
          onClick={() => {
            setIsSearchOpen(false);
          }}
        >
          <SearchModal onClick={(e) => e.stopPropagation()}>
            <SearchInputWrapper>
              <SearchInput
                type="text"
                placeholder={t?.search?.placeholder || ""}
                value={searchTerm}
                autoFocus
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setClickedBar(true)}
                clickedBar={clickedBar}
              />
              <SearchInputIcon
                clickedBar={clickedBar}
                onClick={() => {
                  if (searchTerm.trim()) {
                    navigate(`/search/${encodeURIComponent(searchTerm)}`);
                    setIsSearchOpen(false);
                  }
                }}
              />
            </SearchInputWrapper>
            {searchResults.map((item) => (
              <ResultItem
                key={item.id}
                onClick={() => {
                  navigate(`/product-detail?itemId=${item.id}`);
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
