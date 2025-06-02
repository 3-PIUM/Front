import styled from "styled-components";
import Header from "../components/Header";
import TextHeader from "../components/TextHeader";
import colors from "../styles/colors";
import PersonalColorButton from "../components/PersonalColorButton";
import { Link } from "react-router-dom";
import { useState } from "react";

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
];

export default function SettingPersonalColor() {
  const [selected, setSelected] = useState<String>();

  return (
    <>
      <Header />
      <TextHeader pageName="퍼스널컬러" />
      <Wrapper>
        <AnswerWrapper>
          {Options.map((item) => (
            <PersonalColorButton
              buttonName={item.name}
              isActivated={selected === item.name}
              colors={item.colors}
              onClick={() => setSelected(item.name)}
            />
          ))}
        </AnswerWrapper>
        <Link to="">
          <SkinTestWrapper>
            잘 모르겠다면? 퍼스널 컬러 진단을 받아보세요
          </SkinTestWrapper>
        </Link>
      </Wrapper>
    </>
  );
}
