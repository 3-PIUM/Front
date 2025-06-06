import styled from "styled-components";
import SelectButton from "./../SelectButton";
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
  grid-template-columns: repeat(3, calc((100% - 2 * 0.75rem) / 3));
  gap: 0.75rem;
  margin-top: 2rem;
`;

const Options = [
  {
    id: 1,
    name: "잡티",
  },
  {
    id: 2,
    name: "미백",
  },
  {
    id: 3,
    name: "주름",
  },
  {
    id: 4,
    name: "모공",
  },
  {
    id: 5,
    name: "탄력",
  },
  {
    id: 6,
    name: "홍조",
  },
  {
    id: 7,
    name: "각질",
  },
  {
    id: 8,
    name: "트러블",
  },
  {
    id: 9,
    name: "블렉헤드",
  },
  {
    id: 10,
    name: "피지과다",
  },
  {
    id: 11,
    name: "민감성",
  },
  {
    id: 12,
    name: "아토피",
  },
  {
    id: 13,
    name: "다크서클",
  },
];

export default function SurveyStep1() {
  const [selected, setSelected] = useState<String[]>([]);

  const toggleSelection = (name: string) => {
    if (selected?.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <>
      <Wrapper>
        <TitleWrapper>피부 고민이 있으신가요?</TitleWrapper>
        <AnswerWrapper>
          {Options.map((item) => (
            <SelectButton
              buttonName={item.name}
              size="small"
              isActivated={selected.includes(item.name)}
              onClick={() => toggleSelection(item.name)}
            />
          ))}
        </AnswerWrapper>
      </Wrapper>
    </>
  );
}
