import styled from "styled-components";
import TextHeader from "../components/TextHeader";
import Header from "../components/Header";
import colors from "../styles/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 1rem 0 1rem;
`;

const LanguageBox = styled.div<{ $selected: boolean }>`
  display: flex;
  font-size: 1rem;
  color: ${({ $selected }) => ($selected ? colors.mainPink : colors.black)};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  line-height: 2rem;
`;

const Line = styled.hr`
  border: none;
  background-color: ${colors.lightGrey};
  height: 0.5px;
  margin: 0.5rem 0;
`;

export default function SettingLanguange() {
  const [language, setLanguage] = useState("한국어");
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <TextHeader pageName="언어 설정" />
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
    </>
  );
}
