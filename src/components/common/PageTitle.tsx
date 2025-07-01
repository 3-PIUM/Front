import styled from "styled-components";
import colors from "../../styles/colors";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 3.75rem;
  padding: 0 1rem;
  display: flex;
  background-color: ${colors.white};
  z-index: 100;
`;

const PageName = styled.div`
  color: ${colors.black};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 3.75rem;
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
