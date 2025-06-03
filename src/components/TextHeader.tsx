import { VscChevronLeft } from "react-icons/vsc";
import styled from "styled-components";
import colors from "../styles/colors";
import { useNavigate } from "react-router-dom";

const HeaderWrap = styled.div<{ bgColor?: string }>`
  position: fixed;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  height: 2.75rem;
  background-color: ${({ bgColor }) => bgColor || colors.white};
`;

const PageName = styled.div`
  color: ${colors.black};
  font-size: 1.125rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  font-weight: 700;
`;

interface Headerprops {
  pageName: string;
  bgColor?: string;
}

export default function TextHeader({ pageName, bgColor }: Headerprops) {
  const navigate = useNavigate();

  return (
    <>
      <HeaderWrap bgColor={bgColor}>
        <VscChevronLeft fontSize={"1.8rem"} onClick={() => navigate(-1)} />
        <PageName>{pageName}</PageName>
      </HeaderWrap>
    </>
  );
}
