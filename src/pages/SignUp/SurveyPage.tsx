import styled from "styled-components";
import Header from "../../components/common/Header";
import colors from "../../styles/colors";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SurveyStep1 from "../../components/Survey/SurveyStep1";
import SurveyStep2 from "../../components/Survey/SurveyStep2";
import SurveyStep3 from "../../components/Survey/SurveyStep3";
import Button from "../../components/common/Button";
import StepIndicator from "../../components/Survey/StepIndicator";
import { useLocale } from "../../context/LanguageContext";
import axios from "axios";

const Wrap = styled.div`
  width: 100vw;
`;

const SkipWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: 2rem;
  font-size: 0.875rem;
  align-items: center;
  color: ${colors.darkGrey};
  padding: 0 1rem;
`;

const TextWrapper = styled.div`
  display: flex;
`;

const SkipText = styled.div`
  display: flex;
  font-weight: 700;
`;

const SurveyWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

interface SlideContainerProps {
  step: number;
}

const SlideContainer = styled.div<SlideContainerProps>`
  display: flex;
  width: 200vw;
  transition: transform 0.5s ease;
  transform: ${({ step }) => `translateX(-${(step - 1) * 100}vw)`};
`;

const SlidePage = styled.div`
  flex-shrink: 0;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1rem;
  bottom: 2rem;
  gap: 0.5rem;
`;

export default function SurveyPage() {
  const [step, setStep] = useState<number>(() => {
    const saved = sessionStorage.getItem("surveyStep");
    return saved ? parseInt(saved) : 1;
  });
  const [skinType, setSkinType] = useState<string | null>(() => {
    const savedSkinType = sessionStorage.getItem("skinType");
    return savedSkinType ? savedSkinType : null;
  });
  const [personalColor, setPersonalColor] = useState<string | null>(null);
  const [skinIssue, setSkinIssue] = useState<string[] | null>(null);
  const navigate = useNavigate();
  const { t } = useLocale();

  const storedDataRaw = sessionStorage.getItem("signupData");
  const storedData = storedDataRaw ? JSON.parse(storedDataRaw) : null;

  const goFinish = async () => {
    try {
      const response = await axios.post(
        "http://13.125.104.137:8080/member/join",
        {
          nickname: storedData.nickname,
          birth: storedData.birth,
          email: storedData.email,
          password: storedData.password,
          gender: storedData.gender,
          area: storedData.area,
          language: storedData.lang,
          skinType: skinType,
          personalType: personalColor,
          skinIssue: skinIssue,
        }
      );
      console.log("성공");
      console.log(response);
      navigate("/welcome");
      sessionStorage.removeItem("signupData");
      sessionStorage.removeItem("language");
      sessionStorage.removeItem("skinType");
      sessionStorage.removeItem("personalColor");
      sessionStorage.removeItem("surveyStep");
      sessionStorage.removeItem("skinType");
      sessionStorage.removeItem("skinConcern");
      sessionStorage.removeItem("personalColor");
    } catch (error) {
      console.log("실패", error);
    }
  };

  console.log(skinType);

  useEffect(() => {
    if (personalColor) {
      setPersonalColor(personalColor);
    }
  }, [personalColor]);

  useEffect(() => {
    sessionStorage.setItem("surveyStep", step.toString());
  }, [step]);

  useEffect(() => {
    const savedStep = sessionStorage.getItem("surveyStep");
    if (savedStep) {
      setStep(parseInt(savedStep));
    }
    const storedSkinType = sessionStorage.getItem("skinType");
    if (storedSkinType) setSkinType(storedSkinType);

    const storedSkinIssue = sessionStorage.getItem("skinConcern");
    if (storedSkinIssue) {
      try {
        const parsed = JSON.parse(storedSkinIssue);
        const stringIssue = parsed.map((id: number) => String(id));
        setSkinIssue(stringIssue);
      } catch (e) {
        console.error("skinConcern 파싱 오류", e);
      }
    }

    const storedPersonalColor = sessionStorage.getItem("personalColor");
    if (storedPersonalColor) setPersonalColor(storedPersonalColor);
  }, []);

  return (
    <>
      <Wrap>
        <Header />
        <SkipWrapper>
          <TextWrapper>
            <Link to="/welcome">
              <SkipText>{t.survey.skipBtn}</SkipText>
            </Link>
          </TextWrapper>
        </SkipWrapper>
        <StepIndicator currentStep={step} />
        <SurveyWrapper>
          <SlideContainer step={step}>
            <SlidePage>
              <SurveyStep1 skinType={skinType} setSkinType={setSkinType} />
            </SlidePage>
            <SlidePage>
              <SurveyStep2 skinIssue={skinIssue} setSkinIssue={setSkinIssue} />
            </SlidePage>
            <SlidePage>
              <SurveyStep3
                personalColor={personalColor}
                setPersonalColor={setPersonalColor}
              />
            </SlidePage>
          </SlideContainer>
        </SurveyWrapper>
        <ButtonWrapper>
          {step === 1 && (
            <Button label={t.survey.nextBtn} onClick={() => setStep(2)} />
          )}

          {step === 2 && (
            <>
              <Button
                label={t.survey.previousBtn}
                width="48vw"
                backgroundColor={colors.white}
                color={colors.darkGrey}
                border="1px solid #7F7F7F"
                onClick={() => setStep(1)}
              />
              <Button
                label={t.survey.nextBtn}
                width="48vw"
                onClick={() => setStep(3)}
              />
            </>
          )}

          {step === 3 && (
            <>
              <Button
                label={t.survey.previousBtn}
                width="48vw"
                backgroundColor={colors.white}
                color={colors.darkGrey}
                border="1px solid #7F7F7F"
                onClick={() => setStep(2)}
              />
              <Button label={t.survey.apply} width="48vw" onClick={goFinish} />
            </>
          )}
        </ButtonWrapper>
      </Wrap>
    </>
  );
}
