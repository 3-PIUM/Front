import styled from "styled-components";
import SelectButton from "../components/SelectButton";
import { useState } from "react";
import Header from "../components/Header";
import TextHeader from "../components/TextHeader";

const Wrapper = styled.div`
  padding: 3rem 1rem 0 1rem;
  width: 100%;
  padding-right: 1rem;
`;

const AnswerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // 한 줄에 2개
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
    name: "블랙헤드",
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

export default function SettingSkinConcern() {
  const [selected, setSelected] = useState<String[]>(["탄력", "블랙헤드"]);

  const toggleSelection = (name: string) => {
    if (selected?.includes(name)) {
      setSelected(selected.filter((item) => item !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <>
      <Header />
      <TextHeader pageName="피부 고민" />
      <Wrapper>
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
