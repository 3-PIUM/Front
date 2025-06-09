import styled from "styled-components";
import Header from "../../components/common/Header";
import colors from "../../styles/colors";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SurveyStep1 from "../../components/Survey/SurveyStep1";
import SurveyStep2 from "../../components/Survey/SurveyStep2";
import SurveyStep3 from "../../components/Survey/SurveyStep3";
import Button from "../../components/common/Button";
import StepIndicator from "../../components/StepIndicator";

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

export default function WelcomePage() {
  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState<String | null>("");
  const [personalColor, setPersonalColor] = useState<String | null>("");
  const [concern, setConcern] = useState<String[] | null>([]);
  const navigate = useNavigate();

  const goFinish = () => {
    navigate("/welcome");
  };

  return (
    <>
      <Wrap>
        <Header />
        <SkipWrapper>
          <TextWrapper>
            <Link to="/welcome">
              <SkipText>건너뛰기</SkipText>
            </Link>
          </TextWrapper>
        </SkipWrapper>
        <StepIndicator currentStep={step} />
        <SurveyWrapper>
          <SlideContainer step={step}>
            <SlidePage>
              <SurveyStep1 />
            </SlidePage>
            <SlidePage>
              <SurveyStep2 />
            </SlidePage>
            <SlidePage>
              <SurveyStep3 />
            </SlidePage>
          </SlideContainer>
        </SurveyWrapper>
        <ButtonWrapper>
          {step === 1 && <Button label="다음" onClick={() => setStep(2)} />}

          {step === 2 && (
            <>
              <Button
                label="이전 질문"
                width="48vw"
                backgroundColor={colors.white}
                color={colors.darkGrey}
                border="1px solid #7F7F7F"
                onClick={() => setStep(1)}
              />
              <Button label="다음" width="48vw" onClick={() => setStep(3)} />
            </>
          )}

          {step === 3 && (
            <>
              <Button
                label="이전 질문"
                width="48vw"
                backgroundColor={colors.white}
                color={colors.darkGrey}
                border="1px solid #7F7F7F"
                onClick={() => setStep(2)}
              />
              <Button label="등록하기" width="48vw" onClick={goFinish} />
            </>
          )}
        </ButtonWrapper>
      </Wrap>
    </>
  );
}
