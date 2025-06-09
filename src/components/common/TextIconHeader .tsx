import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";

const HeaderWrap = styled.div`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 0 1rem;
  box-sizing: border-box;
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
  margin-right: -0.9rem;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

interface FullHeaderProps {
  pageName: string;
}

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
  /* border-radius: 8px; */
  /* margin: 1rem; */
  z-index: 1000;
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

interface FullHeaderProps {
  pageName: string;
  productList: { id: number; name: string }[];
}

export default function FullHeader({ pageName, productList }: FullHeaderProps) {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredList = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const { t } = useLocale();

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
            {filteredList.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </SearchModal>
        </SearchOverlay>
      )}
    </>
  );
}
