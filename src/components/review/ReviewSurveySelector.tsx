import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Question {
  id: string;
  title: string;
  options: string[];
}

interface Props {
  questions: Question[];
  onChange: (answers: Record<string, string>) => void;
  initialAnswers?: Record<string, string>; // 추가
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const QuestionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const QuestionTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  /* text-align: center; */
`;

const OptionGroup = styled.div`
  display: flex;
  justify-content: space-between; // 양 끝 정렬
  width: 100%;
`;

const OptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Circle = styled.div<{ selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ selected }) => (selected ? "#f23477" : "#ccc")};
  background-color: ${({ selected }) => (selected ? "#f23477" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
`;

const OptionLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 12px;
  text-align: center;
  color: #333;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
  margin-top: 1.5rem;
`;

const ReviewSurveySelector: React.FC<Props> = ({
  questions,
  onChange,
  initialAnswers = {},
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // 최초 마운트 시 1회만 초기화되게
  useEffect(() => {
    setAnswers(initialAnswers);
    onChange(initialAnswers);
  }, []);

  const handleSelect = (questionId: string, option: string) => {
    const updated = { ...answers, [questionId]: option };
    setAnswers(updated);
    onChange(updated);
  };

  return (
    <Wrapper>
      {questions.map((q, idx) => (
        <div key={q.id}>
          <QuestionBlock>
            <QuestionTitle>{q.title}</QuestionTitle>
            <OptionGroup>
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <OptionItem key={opt} onClick={() => handleSelect(q.id, opt)}>
                    <Circle selected={isSelected}>
                      {isSelected && <InnerDot />}
                    </Circle>
                    <OptionLabel>{opt}</OptionLabel>
                  </OptionItem>
                );
              })}
            </OptionGroup>
          </QuestionBlock>
          {idx !== questions.length - 1 && <Divider />}
        </div>
      ))}
    </Wrapper>
  );
};

export default ReviewSurveySelector;
