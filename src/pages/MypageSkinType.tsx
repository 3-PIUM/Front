import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";
import SelectButton from "../components/SelectButton";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TextHeader from "../components/TextHeader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 1rem 0 1rem;
  width: 100%;
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

export default function SettingSkinType() {
  const [selected, setSelected] = useState<string>("건성");

  return (
    <>
      <Header />
      <TextHeader pageName="피부 타입" />
      <Wrapper>
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
