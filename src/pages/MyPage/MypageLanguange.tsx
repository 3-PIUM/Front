import styled from "styled-components";
import TextHeader from "../../components/TextHeader";
import Header from "../../components/Header";
import colors from "../../styles/colors";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const { t, language, setLanguage } = useLocale();
  const [clickedLanguage, setClickedLanguage] = useState(language);
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState<any>(null);

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;

    if (root) root.style.backgroundColor = "#f5f5f5"; // 원하는 색상으로 설정

    const fetchMemberData = async () => {
      try {
        const response = await axiosInstance.get("/member");
        const result = response.data.result;
        setMemberInfo(result);
      } catch (error) {
        console.log("정보 불러오는데 실패하였습니다", error);
      }
    };

    fetchMemberData();

    return () => {
      if (root) root.style.backgroundColor = originalBg || ""; // 원상복구
    };
  }, []);

  console.log(memberInfo);

  const handleChangeLanguage = (lang: string) => {
    setLanguage(lang);
    setClickedLanguage(lang);
    console.log("토큰 확인", sessionStorage.getItem("accessToken"));

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
      <Header />
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
