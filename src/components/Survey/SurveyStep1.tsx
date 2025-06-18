import styled from "styled-components";
import SelectButton from "../SelectForm/SelectButton";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";
import { useState } from "react";
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
  font-size: 0.75rem;
  color: ${colors.mediumGrey};
  text-decoration: underline;
  justify-content: center;
`;

interface skinProps {
  skinType: string | null;
  setSkinType: (value: string) => void;
}

export default function SurveyStep1({ skinType, setSkinType }: skinProps) {
  const [selected, setSelected] = useState<string>(skinType || "");
  const { t } = useLocale();

  interface SkinTypeOption {
    id: number;
    option: string;
    value: string;
  }

  return (
    <>
      <Wrapper>
        <TitleWrapper>{t.survey.survey1.title}</TitleWrapper>
        <AnswerWrapper>
          {t.mypage.skinType.options.map((item: SkinTypeOption) => (
            <SelectButton
              key={item.id}
              size="large"
              buttonName={item.option}
              isActivated={selected === item.option}
              onClick={() => {
                setSelected(item.option);
                setSkinType(item.value);
              }}
            />
          ))}
        </AnswerWrapper>
        <SkinTestWrapper>
          <Link to="/skintest">{t.survey.survey1.goTestTitle}</Link>
        </SkinTestWrapper>
      </Wrapper>
    </>
  );
}
