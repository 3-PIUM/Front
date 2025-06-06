import styled from "styled-components";
import TextHeader from "../../components/TextHeader";
import Header from "../../components/Header";
import colors from "../../styles/colors";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  height: 90vh;
  overflow: hidden;
`;

const Space = styled.div`
  display: flex;
  width: 100%;
  height: 0.5rem;
  background-color: #f5f5f5;
  margin-top: 3rem;
`;

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  background-color: ${colors.white};
  width: 100%;
`;

const LanguageBox = styled.div<{ $selected: boolean }>`
  display: flex;
  font-size: 1rem;
  height: 3.5rem;
  line-height: 3.5rem;
  align-items: center;
  color: ${({ $selected }) => ($selected ? colors.mainPink : colors.black)};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  line-height: 2rem;
`;

const Line = styled.hr`
  border: none;
  background-color: ${colors.lightGrey};
  height: 0.5px;
`;

export default function SettingLanguange() {
  const [language, setLanguage] = useState("한국어");
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;

    if (root) root.style.backgroundColor = "#f5f5f5"; // 원하는 색상으로 설정

    return () => {
      if (root) root.style.backgroundColor = originalBg || ""; // 원상복구
    };
  }, []);

  return (
    <Wrap>
      <Header />
      <TextHeader pageName="언어 설정" />
      <Space />
      <LanguageWrapper>
        <LanguageBox
          $selected={language === "한국어"}
          onClick={() => {
            setLanguage("한국어");
            navigate(-1);
          }}
        >
          한국어
        </LanguageBox>
        <Line />
        <LanguageBox
          $selected={language === "English"}
          onClick={() => {
            setLanguage("English");
            navigate(-1);
          }}
        >
          English
        </LanguageBox>
        <Line />
        <LanguageBox
          $selected={language === "日本語"}
          onClick={() => {
            setLanguage("日本語");
            navigate(-1);
          }}
        >
          日本語
        </LanguageBox>
      </LanguageWrapper>
    </Wrap>
  );
}
