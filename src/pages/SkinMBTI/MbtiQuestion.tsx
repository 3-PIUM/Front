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
  //전체 질문
  const [questionsList, setQuestionsList] = useState<
    {
      type: string;
      questions: {
        map(arg0: (q: Question) => void): unknown;
        question: string;
        nextQuestionId: number | null;
        isResult: boolean;
        value: string;
      };
    }[]
  >([]);
  //현재 인덱스
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(16);

  interface Question {
    id: number;
    question: string;
    optionO: {
      text: string;
      value: string;
      nextQuestionId: number;
      result: boolean;
    };
    optionX: {
      text: string;
      value: string;
      nextQuestionId: number;
      result: boolean;
    };
  }

  useEffect(() => {
    const fetchMBTIQuestions = async () => {
      try {
        const response = await axiosInstance.get("/mbti/questions", {
          params: {
            lang: localStorage.getItem("language"),
          },
        });
        const data = response.data.result;
        setQuestionsList(data);
      } catch (error) {
        console.log("mbti 질문 가져오는데 실패했습니다", error);
      }
    };
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

  // const handleAnswerClick = (ans: string) => {
  //   if (ans.isResult === true) {
  //   }
  //   setCurrentIndex(ans.nextQuestionId - 1);
  // };
  console.log("questionsList", questionsList);

  return (
    <Wrap>
      <TextHeader pageName={t.mbti.pageTitle} bgColor="transparent" />
      <Wrapper>
        {questionsList.map((category) => {
          return (
            <>
              <div>{category.type}</div>
              {category.questions.map((q: Question) => {
                return (
                  <>
                    <div>{q.question}</div>
                    <div>
                      <div onClick={() => {}}>{q.optionO.text}</div>
                      <div onClick={() => {}}>{q.optionX.text}</div>
                    </div>
                  </>
                );
              })}
            </>
          );
        })}
      </Wrapper>
      {/* <Wrapper>
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
      </Wrapper> */}
    </Wrap>
  );
}
