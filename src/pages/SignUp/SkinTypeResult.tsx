import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../styles/colors";
import Button from "../../components/common/Button";
import { useLocale } from "../../context/LanguageContext";
import Header from "../../components/common/Header";

const Wrap = styled.div`
  overflow: hidden;
  background-color: ${colors.lightGrey};
  height: 100dvh; // dynamic viewport height
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  top: 0;
`;

const HeaderText = styled.div`
  height: 2.75rem;
  color: ${colors.black};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${colors.black};
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;

const ResultImg = styled.img`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResultText = styled.span`
  display: flex;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function SkinTypeResult() {
  const location = useLocation();
  const result = location.state?.result;
  const { t } = useLocale();

  const lang = localStorage.getItem("language");
  const navigate = useNavigate();

  console.log(result); // "건성", "지성" 등

  type Language = "한국어" | "English" | "日本語";
  type SkinType = "건성" | "지성" | "복합성";

  const skinTypeTranslations: Record<SkinType, Record<Language, string>> = {
    건성: {
      한국어: "건성",
      English: "Dry",
      日本語: "乾燥肌",
    },
    지성: {
      한국어: "지성",
      English: "Oily",
      日本語: "脂性肌",
    },
    복합성: {
      한국어: "복합성",
      English: "Combination",
      日本語: "混合肌",
    },
  };

  const translatedResult =
    skinTypeTranslations[result as SkinType]?.[lang as Language] || result;

  return (
    <Wrap>
      <Wrapper>
        <Header bgColor={colors.lightGrey} />
        <HeaderText>{t.survey.skinTypeResult}</HeaderText>
        <ImgWrapper>
          {result === "건성" ? (
            <ResultImg src="/images/SkinType/dry.png" alt="건성 피부" />
          ) : result === "지성" ? (
            <ResultImg src="/images/SkinType/oily.png" alt="지성 피부" />
          ) : result === "복합성" ? (
            <ResultImg
              src="/images/SkinType/combination.png"
              alt="복합성 피부"
            />
          ) : null}
        </ImgWrapper>
        <TextWrapper>
          {lang === "한국어" ? (
            <ResultText>
              당신의 피부 타입은&nbsp;
              <span style={{ fontWeight: 700, color: colors.mainPink }}>
                {translatedResult}
              </span>
              입니다!
            </ResultText>
          ) : lang === "English" ? (
            <ResultText>
              Your skin type is&nbsp;
              <div style={{ fontWeight: 700, color: colors.mainPink }}>
                {translatedResult}
              </div>
            </ResultText>
          ) : (
            <ResultText>
              あなたの肌タイプは
              <div style={{ fontWeight: 700, color: colors.mainPink }}>
                {translatedResult}
              </div>
              です
            </ResultText>
          )}
        </TextWrapper>
      </Wrapper>
      <ButtonWrapper>
        <Button
          label={t.survey.goBackSurvey}
          onClick={() => navigate("/survey")}
        />
      </ButtonWrapper>
    </Wrap>
  );
}
