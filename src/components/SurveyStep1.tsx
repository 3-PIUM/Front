import styled from "styled-components";
import SelectButton from "./SelectButton";
import { Link } from "react-router-dom";
import colors from "../styles/colors";
import { useState } from "react";

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

const Options = [
  {
    id: 1,
    option: "건성",
  },
  {
    id: 2,
    option: "중성",
  },
  {
    id: 3,
    option: "지성",
  },
  {
    id: 4,
    option: "복합성",
  },
  {
    id: 5,
    option: "민감성",
  },
  {
    id: 6,
    option: "약건성",
  },
  {
    id: 7,
    option: "트러블성",
  },
];

export default function SurveyStep1() {
  const [selected, setSelected] = useState<string>();

  return (
    <>
      <Wrapper>
        <TitleWrapper>피부 타입에 대해 알려주세요!</TitleWrapper>
        <AnswerWrapper>
          {Options.map((item) => (
            <SelectButton
              key={item.id}
              size="large"
              buttonName={item.option}
              isActivated={selected === item.option}
              onClick={() => setSelected(item.option)}
            />
          ))}
        </AnswerWrapper>
        <SkinTestWrapper>
          <Link to="">
            잘 모르겠다면? 피부 타입 진단으로 시작해보세요{" "}
            <SkinTestWrapper></SkinTestWrapper>
          </Link>
        </SkinTestWrapper>
      </Wrapper>
    </>
  );
}
