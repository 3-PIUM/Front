import styled from "styled-components";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { HiLocationMarker } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import StoreModal from "../modal/StoreModal";
import type { Store } from "../modal/StoreModal";

const HeaderWrap = styled.div<{ hasScrolled: boolean }>`
  position: fixed;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 0 1rem;
  box-sizing: border-box;
  z-index: 100;
  box-shadow: ${({ hasScrolled }) =>
    hasScrolled ? "0 3px 6px rgba(0, 0, 0, 0.1)" : "none"};
`;

const LogoWrap = styled.img`
  display: flex;
  height: 50%;
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

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0.5rem 0 1rem 0;
  padding: 0 1rem;
`;

const SearchInputIcon = styled(FiSearch)<{ clickedBar?: boolean }>`
  position: absolute;
  font-size: 1.2rem;
  top: 50%;
  right: 2rem;
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
  border-radius: 5rem;

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
  onStoreClick?: () => void;
}

const dummyStores: Store[] = [
  {
    name: "강남점",
    distance: "1.2km",
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/oystore/DAEA_1.jpg?rs=800x0",
    status: "영업 중" as const,
    hours: "10:00 - 22:00",
  },
  {
    name: "홍대점",
    distance: "3.5km" as const,
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/oystore/DF31_2025061621351463.png?rs=800x0",
    status: "영업 중",
    hours: "11:00 - 21:00",
  },
  {
    name: "신촌점",
    distance: "10.5km" as const,
    imageUrl:
      "https://image.oliveyoung.co.kr/cfimages/oystore/D288_1.jpg?rs=800x0",
    status: "영업 준비 중",
    hours: "10:30 - 22:00",
  },
];

export default function LogoHeader({}: LogoHeaderProps) {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [openSearchBar, setOpenSearchBar] = useState<boolean>(false);
  const [clickedBar, setClickedBar] = useState<boolean>(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));

  useEffect(() => {
    const storedStore = sessionStorage.getItem("selectedStore");
    if (storedStore) {
      setSelectedStore(JSON.parse(storedStore));
    }
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await axiosInstance.get(
          `/item/advancedSearch/list/${encodeURIComponent(searchTerm)}`,
          {
            params: { size: 5 },
          }
        );
        setSearchResults(res.data.result.itemSearchInfoDTOs || []);
      } catch (err) {
        console.error("검색 실패", err);
      }
    };

    const delay = setTimeout(fetchSearchResults, 200);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderWrap hasScrolled={hasScrolled}>
        <LogoWrap
          src="/images/logo/PIUM_logo.png"
          onClick={() => navigate("/")}
        />
        <RightIcons>
          {isLoggedIn && (
            <IconWrapper onClick={() => setIsStoreModalOpen(true)}>
              <HiLocationMarker size={20} />
            </IconWrapper>
          )}
          {!openSearchBar && (
            <IconWrapper
              onClick={() => {
                setIsSearchOpen(true);
                setOpenSearchBar(true);
                setClickedBar(true);
              }}
            >
              <FiSearch size={20} />
            </IconWrapper>
          )}
          {isLoggedIn && (
            <IconWrapper onClick={() => navigate("/cart")}>
              <FiShoppingCart size={20} />
            </IconWrapper>
          )}
        </RightIcons>
      </HeaderWrap>

      {isStoreModalOpen && (
        <StoreModal
          stores={dummyStores}
          onClose={() => setIsStoreModalOpen(false)}
          onSelect={(store) => {
            console.log("✅ 선택된 매장:", store);
            sessionStorage.setItem("selectedStore", JSON.stringify(store));
            setSelectedStore(store);
            setIsStoreModalOpen(false);
          }}
          selectedStore={selectedStore}
        />
      )}

      {isSearchOpen && (
        <SearchOverlay
          onClick={() => {
            setIsSearchOpen(false);
            setOpenSearchBar(false);
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
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchTerm.trim()) {
                    navigate(`/search/${encodeURIComponent(searchTerm)}`);
                    setIsSearchOpen(false);
                    setOpenSearchBar(false);
                  }
                }}
              />
              <SearchInputIcon
                clickedBar={clickedBar}
                onClick={() => {
                  if (searchTerm.trim()) {
                    navigate(`/search/${encodeURIComponent(searchTerm)}`);
                    setIsSearchOpen(false);
                    setOpenSearchBar(false);
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
