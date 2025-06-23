import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import KR from "../../data/language/kr.json";
import JP from "../../data/language/jp.json";
import EN from "../../data/language/en.json";
import { useEffect } from "react";
import Button from "../../components/common/Button";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  flex: 1;
  padding-top: 44px;
`;

const ContentWrapper = styled.div<{ $bgColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: ${({ $bgColor }) => $bgColor};
  flex: 1;
  padding: 9rem 1rem 0 1rem;
`;

const SeasonImg = styled.img`
  width: 16rem;
  display: flex;
`;

const Title = styled.div<{ $textColor?: string }>`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ $textColor }) => $textColor};
`;

const Description = styled.div`
  display: flex;
  text-align: center;
  padding: 0 1rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function PersonalColorResult() {
  const location = useLocation();
  const { t, language } = useLocale();
  console.log("language", language);

  useEffect(() => {
    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;
    const originalTop = root?.style.paddingTop;
    const originalBottom = root?.style.paddingBottom;

    if (root) {
      root.style.backgroundColor = "transparent";
      root.style.paddingTop = "0";
      root.style.paddingBottom = "0";
    }

    return () => {
      if (root) {
        root.style.backgroundColor = originalBg || "";
        root.style.paddingTop = originalTop || "";
        root.style.paddingBottom = originalBottom || "";
      }
    };
  }, []);

  const { season } = location.state || {};

  const getLangJSON = (lang: string) => {
    switch (lang) {
      case "한국어":
        return KR;
      case "English":
        return EN;
      case "日本語":
        return JP;
      default:
        return KR;
    }
  };

  const languageJson = getLangJSON(language);
  const colorTest = languageJson.colorTest;
  const seasonData = (colorTest.result as Record<string, any>)[season];

  console.log(colorTest);
  console.log(seasonData.textColor);

  return (
    <Wrap>
      <Header bgColor={seasonData.bgColor} />
      <TextHeader
        pageName={t.colorTest.resultTitle}
        bgColor={seasonData.bgColor}
      />
      <ContentWrapper $bgColor={seasonData.bgColor}>
        <SeasonImg src={seasonData.image} alt={`${season} 캐릭터`} />
        <Title $textColor={seasonData.textColor}>{seasonData.label}</Title>
        <Description>{seasonData.description}</Description>
      </ContentWrapper>
      <ButtonWrapper>
        <Button label={t.colorTest.goSurvey} />
      </ButtonWrapper>
    </Wrap>
  );
}
