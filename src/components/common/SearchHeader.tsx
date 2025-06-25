import { useEffect, useState } from "react";
import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
// import { FaLeaf } from "react-icons/fa";

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

// const TextWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   width: auto;
//   position: absolute;
//   left: 50%;

//   transform: translateX(-50%);
//   gap: 0.5rem;
// `;

// const LeafWrap = styled.div`
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

// const Title = styled.h1`
//   display: flex;
//   font-size: 16px;
//   font-weight: 700;
//   color: ${colors.black};
// `;

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

// const SearchOverlay = styled.div`
//   position: fixed;
//   top: 44px;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.3);
//   z-index: 999;
// `;

// const SearchModal = styled.div`
//   background-color: white;
//   padding: 1rem;
//   z-index: 1000;
//   max-height: 80vh;
//   overflow-y: auto;
// `;

// const SearchInput = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   font-size: 1rem;
//   border: 1px solid #333;
//   border-radius: 4px;
//   margin-bottom: 1rem;

//   &:focus {
//     border-color: #f23477;
//     outline: none;
//   }
// `;

// const SearchResultItem = styled.div`
//   padding: 0.5rem 0;
//   border-bottom: 1px solid #eee;
//   font-size: 14px;
//   cursor: pointer;

//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

interface FullHeaderProps {
  pageName: string;
  isVegan?: boolean;
  backPath?: string;
}

// interface SearchResult {
//   id: number;
//   itemName: string;
//   itemImage: string;
//   originalPrice: number;
//   salePrice: number;
//   discountRate: number;
// }

export default function SearchHeader({ backPath }: FullHeaderProps) {
  const navigate = useNavigate();
  //   const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLocale();

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
        <RightIcons>
          <IconWrapper onClick={() => navigate("/cart")}>
            <FiShoppingCart size={20} />
          </IconWrapper>
        </RightIcons>
      </HeaderWrap>
    </>
  );
}
