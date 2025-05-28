import { VscChevronLeft } from "react-icons/vsc";
import styled from "styled-components";
import colors from "../styles/colors";

const HeaderWrap = styled.div`
  padding: 0 1rem;
  display: flex;
  align-items: center;
`;

const PageName = styled.div`
  color: ${colors.black};
  font-size: 1.125rem;
  font-weight: 700;
  background-color: aliceblue;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
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
