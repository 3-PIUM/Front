import styled from "styled-components";
import colors from "../styles/colors";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 2rem;
  padding: 0 1rem;
  display: flex;
  height: 2.75rem;
  background-color: ${colors.white};
`;

const PageName = styled.div`
  color: ${colors.black};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2.75rem;
`;

interface Titleprops {
  pageName: string;
}

export default function PageTitle({ pageName }: Titleprops) {
  return (
    <>
      <HeaderWrap>
        <PageName>{pageName}</PageName>
      </HeaderWrap>
    </>
  );
}
