import styled from "styled-components";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../styles/colors";
import { HiLocationMarker } from "react-icons/hi";

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

interface LogoHeaderProps {
  onStoreClick?: () => void; // 모달 제어 함수
}

export default function LogoHeader({ onStoreClick }: LogoHeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <LogoWrap>로고 이미지</LogoWrap>
      <RightIcons>
        <IconWrapper onClick={onStoreClick}>
          <HiLocationMarker size={20} />
        </IconWrapper>
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
