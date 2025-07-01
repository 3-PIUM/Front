import styled from "styled-components";
import colors from "../../styles/colors";
import { useEffect, useState } from "react";

const HeaderWrap = styled.div<{ hasScrolled: boolean }>`
  position: fixed;
  width: 100%;
  height: 3.75rem;
  padding: 0 1rem;
  display: flex;
  background-color: ${colors.white};
  z-index: 100;
  box-shadow: ${({ hasScrolled }) =>
    hasScrolled ? "0 3px 6px rgba(0, 0, 0, 0.1)" : "none"};
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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50); // 원하는 기준
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderWrap hasScrolled={hasScrolled}>
        <PageName>{pageName}</PageName>
      </HeaderWrap>
    </>
  );
}
