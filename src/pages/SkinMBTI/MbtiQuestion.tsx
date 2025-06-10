import TextHeader from "../../components/common/TextHeader";
import styled from "styled-components";
import { useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-image: linear-gradient(to bottom right, #ffb199, #ebd7f5),
    linear-gradient(to top right, #ffd3ad, #fbd6e5);
  background-blend-mode: lighten;
  padding-top: 44px;
`;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0 1rem;
  align-items: center;
  margin: 8rem 0;
`;

const TestCategory = styled.div`
  display: flex;
  width: fit-content;
  font-size: 0.8rem;
  border: 1px solid;
  border-radius: 1rem;
  font-weight: 700;
  background-color: #a6ff83;
  padding: 0.5rem;
  justify-content: center;
`;

const TestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 4rem 0;
`;

const Question = styled.div`
  display: flex;
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
  padding: 0 1rem;
`;

const Answer = styled.div<{ isox: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: ${({ isox }) => (isox ? "row" : "column")};
  gap: 1rem;
  align-items: center;
  padding: 1rem;
`;

const AnswerBtn = styled.button`
  display: flex;
  background-color: ${colors.white};
  border: none;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 1rem 1rem;
  width: 100%;
  justify-content: center;
`;

export default function MbtiQuestion() {
  const { t } = useLocale();
  const [questionsList, setQuestionsList] = useState<
    {
      id: number;
      content: string;
      answers: {
        answer: string;
        nextQuestionId: number | null;
        isResult: boolean;
      }[];
    }[]
  >([]);

  const [pigmentQuestions, setPigmentQuestions] = useState<
    {
      id: number;
      content: string;
      answers: {
        answer: string;
        nextQuestionId: number | null;
        isResult: boolean;
      }[];
    }[]
  >([]);

  const [moistureQuestions, setMoistureQuestions] = useState<
    {
      id: number;
      content: string;
      answers: {
        answer: string;
        nextQuestionId: number | null;
        isResult: boolean;
      }[];
    }[]
  >([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = pigmentQuestions[currentIndex];

  useEffect(() => {
    const fetchMBTIQuestions = async () => {
      try {
        const response = await axiosInstance.get("/mbti/questions", {
          params: {
            axis: "PIGMENT",
            lang: localStorage.getItem("language"),
          },
        });
        const questions = response.data.result.questions;
        console.log("성공", questions);
        setPigmentQuestions(questions);
        setQuestionsList(questions);
      } catch (error) {
        console.log("mbti 질문 가져오는데 실패했습니다", error);
      }
    };

    console.log(localStorage.getItem("language"));

    fetchMBTIQuestions();

    const root = document.getElementById("root");
    const originalBg = root?.style.backgroundColor;
    const originalTop = root?.style.paddingTop;
    const originalBottom = root?.style.paddingBottom;

    if (root) {
      root.style.backgroundColor = "transparent";
      root.style.paddingTop = "0";
      root.style.paddingBottom = "0";
    }

    return () => {
      if (root) {
        root.style.backgroundColor = originalBg || "";
        root.style.paddingTop = originalTop || "";
        root.style.paddingBottom = originalBottom || "";
      }
    };
  }, []);

  const handleAnswerClick = (ans: string) => {
    if (ans.isResult === true) {
    }
    setCurrentIndex(ans.nextQuestionId - 1);
  };

  return (
    <Wrap>
      <TextHeader pageName={t.mbti.pageTitle} bgColor="transparent" />
      <Wrapper>
        <TestCategory>색소 VS 구조</TestCategory>
        {currentQuestion ? (
          <TestWrapper>
            <Question>{currentQuestion.content}</Question>
            {(() => {
              const isox = currentQuestion.answers.every(
                (a) => a.answer === "O" || a.answer === "X"
              );
              return (
                <Answer isox={isox}>
                  {currentQuestion.answers.map((ans, idx) => {
                    return (
                      <AnswerBtn
                        key={idx}
                        onClick={() => handleAnswerClick(ans)}
                      >
                        {ans.answer}
                      </AnswerBtn>
                    );
                  })}
                </Answer>
              );
            })()}
          </TestWrapper>
        ) : (
          <div>완료</div>
        )}
      </Wrapper>
    </Wrap>
  );
}
