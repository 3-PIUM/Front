import styled from "styled-components";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";
import PersonalColorButton from "../SelectForm/PersonalColorButton";
import { useEffect, useState } from "react";
import { useLocale } from "../../context/LanguageContext";

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
  font-size: 0.825rem;
  color: ${colors.mediumGrey};
  text-decoration: underline;
  justify-content: center;
`;

interface personalColorProps {
  personalColor: string | null;
  setPersonalColor: (value: string) => void;
}

export default function SurveyStep2({
  personalColor,
  setPersonalColor,
}: personalColorProps) {
  const [selected, setSelected] = useState<String>();
  const { t } = useLocale();

  interface personalProps {
    id: number;
    option: string;
    value: string;
    colors: string[];
  }

  useEffect(() => {
    if (personalColor) {
      setSelected(personalColor);
    }
  }, [personalColor]);

  return (
    <>
      <Wrapper>
        <TitleWrapper>{t.survey.survey3.title}</TitleWrapper>
        <AnswerWrapper>
          {t.mypage.personalColor.options.map((item: personalProps) => (
            <PersonalColorButton
              key={item.id}
              buttonName={item.option}
              isActivated={selected === item.value}
              colors={item.colors}
              onClick={() => {
                setSelected(item.value);
                setPersonalColor(item.value);
                sessionStorage.setItem("personalColor", item.value);
              }}
            />
          ))}
        </AnswerWrapper>
        <Link to="/personal-test">
          <SkinTestWrapper>{t.survey.survey3.goTestTitle}</SkinTestWrapper>
        </Link>
      </Wrapper>
    </>
  );
}
