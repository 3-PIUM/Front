import styled from "styled-components";
import TextHeader from "../../components/common/TextHeader";
import colors from "../../styles/colors";
import { useEffect } from "react";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";

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
  margin-top: 4.5rem;
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
  const { t, language, setLanguage } = useLocale();

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;

    if (root) root.style.backgroundColor = "#f5f5f5";

    return () => {
      if (root) root.style.backgroundColor = originalBg || "";
    };
  }, []);

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    const editMemberInfo = async () => {
      try {
        await axiosInstance.patch("/member", {
          language: lang,
        });
      } catch (error) {
        console.log("회원정보 수정에 실패하였습니다", error);
      }
    };
    editMemberInfo();
  };

  return (
    <Wrap>
      <TextHeader pageName={t.mypage.languageSetting} />
      <Space />
      <LanguageWrapper>
        <LanguageBox
          $selected={language === "한국어"}
          onClick={() => {
            handleChangeLanguage("한국어");
          }}
        >
          한국어
        </LanguageBox>
        <Line />
        <LanguageBox
          $selected={language === "English"}
          onClick={() => {
            handleChangeLanguage("English");
          }}
        >
          English
        </LanguageBox>
        <Line />
        <LanguageBox
          $selected={language === "日本語"}
          onClick={() => {
            handleChangeLanguage("日本語");
          }}
        >
          日本語
        </LanguageBox>
      </LanguageWrapper>
    </Wrap>
  );
}
