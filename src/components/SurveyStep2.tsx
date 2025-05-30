import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../styles/colors";
import StepIndicator from "./StepIndicator";
import PersonalColorButton from "./PersonalColorButton";
import Button from "./Button";

const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1rem;
`;

const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // 한 줄에 2개
  gap: 0.75rem;
  margin-top: 2rem;
`;

const SkinTestWrapper = styled.div`
  display: flex;
  margin-top: 3rem;
  font-size: 0.75rem;
  color: ${colors.mediumGrey};
  text-decoration: underline;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;
  padding-right: 1rem;
  gap: 0.5rem;
`;

const Options = [
  {
    id: 1,
    name: "봄 웜",
    colors: ["#FFD8A9", "#FFC0A9", "#FFE6CC"],
  },
  {
    id: 2,
    name: "여름 쿨",
    colors: ["#C3D5FF", "#E0B5DB", "#A4B8D1"],
  },
  {
    id: 3,
    name: "가을 웜",
    colors: ["#CFA36E", "#A06045", "#E2C1A0"],
  },
  {
    id: 4,
    name: "겨울 쿨",
    colors: ["#C5CBE1", "#B4A4DD", "#333C57"],
  },
  {
    id: 5,
    name: "잘 모르겠어요 😂",
  },
];

interface SurveyProps {
  goBefore?: () => void;
  goNext?: () => void;
}

export default function SurveyStep2() {
  return (
    <>
      <Wrapper>
        <TitleWrapper>퍼스널 컬러에 대해 알려주세요!</TitleWrapper>
        <AnswerWrapper>
          {Options.map((item) => (
            <PersonalColorButton buttonName={item.name} colors={item.colors} />
          ))}
        </AnswerWrapper>
        <Link to="">
          <SkinTestWrapper>
            잘 모르겠다면? 피부 타입 진단으로 시작해보세요
          </SkinTestWrapper>
        </Link>
      </Wrapper>
      {/* <ButtonWrapper>
        <Button
          label="이전 질문"
          width="48vw"
          backgroundColor={colors.white}
          color={colors.darkGrey}
          border="1px solid #7F7F7F"
          onClick={goBefore}
        />
        <Button label="다음" width="48vw" onClick={goNext} />
      </ButtonWrapper> */}
    </>
  );
}
