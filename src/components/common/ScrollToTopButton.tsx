import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";

const TopButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 5rem;
  right: 1rem;
  padding: 0.7rem 1rem;
  background-color: #ff4081;
  color: white;
  border: none;
  border-radius: 999px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  font-size: 14px;
  z-index: 1000;
  transition: opacity 0.3s;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
`;

interface Props {
  scrollTargetRef: React.RefObject<HTMLDivElement | null>;
}
export default function ScrollToTopButton({ scrollTargetRef }: Props) {
  const scrollToTop = () => {
    scrollTargetRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    console.log("스크롤 위치:", window.scrollY); // 여기가 0만 찍히는지 확인
    setVisible(window.scrollY > 300);
  };

  const { t } = useLocale();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 일단 조건 없이 항상 보이게
  return (
    <TopButton onClick={scrollToTop} $visible={true}>
      ↑ {t.scroll.top}
    </TopButton>
  );
}
