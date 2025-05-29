import { VscChevronLeft } from "react-icons/vsc";
import styled from "styled-components";
import colors from "../styles/colors";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  height: 2.75rem;
  background-color: ${colors.white};
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
}

export default function TextHeader({ pageName }: Headerprops) {
  return (
    <>
      <HeaderWrap>
        <VscChevronLeft fontSize={"1.8rem"} />
        <PageName>{pageName}</PageName>
      </HeaderWrap>
    </>
  );
}
