import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";

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

const LogoWrap = styled.div`
  display: flex;
`;

const RightIcons = styled.div`
  display: flex;
  gap: 12px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

export default function LogoHeader() {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <LogoWrap>로고 이미지</LogoWrap>
      <RightIcons>
        <IconWrapper>
          <FiSearch size={20} />
        </IconWrapper>
        <IconWrapper onClick={() => navigate("/cart")}>
          <FiShoppingCart size={20} />
        </IconWrapper>
      </RightIcons>
    </HeaderWrap>
  );
}
