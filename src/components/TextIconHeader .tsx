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
  padding: 0 12px;
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
  gap: 12px;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

interface FullHeaderProps {
  pageName: string;
}

export default function FullHeader({ pageName }: FullHeaderProps) {
  const navigate = useNavigate();

  return (
    <HeaderWrap>
      <LeftIcon onClick={() => navigate(-1)}>
        <VscChevronLeft size={24} />
      </LeftIcon>
      <Title>{pageName}</Title>
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
