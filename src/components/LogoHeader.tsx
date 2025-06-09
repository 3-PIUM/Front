import styled from "styled-components";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";
import { HiLocationMarker } from "react-icons/hi";
import { useState } from "react";

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
`;

const LogoWrap = styled.div`
  display: flex;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconWrapper = styled.div`
  font-size: 1.2rem;
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
  padding: 1rem;
  z-index: 100;
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
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;
`;

interface LogoHeaderProps {
  onStoreClick?: () => void; // 모달 제어 함수
  productList: { id: number; name: string }[];
}

export default function LogoHeader({
  onStoreClick,
  productList,
}: LogoHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <HeaderWrap>
        <LogoWrap>로고 이미지</LogoWrap>
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
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              autoFocus
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredList.map((item) => (
              <ResultItem key={item.id}>{item.name}</ResultItem>
            ))}
          </SearchModal>
        </SearchOverlay>
      )}
    </>
  );
}
