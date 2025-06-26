import styled from "styled-components";
import SelectButton from "./../SelectForm/SelectButton";
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
  grid-template-columns: repeat(3, calc((100% - 2 * 0.75rem) / 3));
  gap: 0.75rem;
  margin-top: 2rem;
`;

interface issueProps {
  skinIssue: string[] | null;
  setSkinIssue: (value: string[]) => void;
}

export default function SurveyStep2({ skinIssue, setSkinIssue }: issueProps) {
  const { t } = useLocale();
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    let newSelected: number[];

    if (selected.includes(id)) {
      newSelected = selected.filter((item) => item !== id);
    } else {
      newSelected = [...selected, id];
    }

    setSelected(newSelected);
    setSkinIssue(newSelected.map(String));
    sessionStorage.setItem(
      "skinConcern",
      JSON.stringify(newSelected.map(String))
    );
  };

  interface ConcernProps {
    value: string;
    name: string;
    id: number;
  }

  useEffect(() => {
    if (skinIssue) {
      setSelected(skinIssue.map((id) => Number(id)));
    }
  }, [skinIssue]);

  return (
    <>
      <Wrapper>
        <TitleWrapper>{t.survey.survey2.title}</TitleWrapper>
        <AnswerWrapper>
          {t.mypage.skinConcernsItem.map((item: ConcernProps) => (
            <SelectButton
              key={item.id}
              buttonName={item.name}
              size="small"
              isActivated={selected.includes(item.id)}
              onClick={() => toggleSelection(item.id)}
            />
          ))}
        </AnswerWrapper>
      </Wrapper>
    </>
  );
}
