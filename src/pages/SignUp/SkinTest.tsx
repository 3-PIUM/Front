import styled from "styled-components";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import colors from "../../styles/colors";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14rem;
  padding: 0 2rem;
  text-align: center;
  gap: 3rem;
`;

const NumberIndex = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 700;
  color: ${colors.mainPink};
  font-size: 1.5rem;
`;

const Question = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Answer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AnswerItem = styled.div`
  display: flex;
  border: 1px solid ${colors.lightGrey};
  color: ${colors.lightGrey};
  width: 45%;
  justify-content: center;
  padding: 1rem 0;
  border-radius: 1.25rem;
`;

const LoadingText = styled.div`
  display: flex;
  color: ${colors.mainPink};
  margin-top: 6rem;
  justify-content: center;
  align-items: center;
  font-weight: 700;
`;

export default function SkinTest() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [questions, setQuestions] = useState<QuestionGroup[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(
    null
  );
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    const fetchSkinTest = async () => {
      try {
        const response = await axiosInstance.get("/mbti/skin-questions", {
          params: { lang: localStorage.getItem("language") },
        });
        const data = response.data.result;
        setQuestions(data);
        setCurrentQuestionId(data[0].questions[0].id);
      } catch (error) {
        console.error("Error fetching skin test data:", error);
      }
    };

    fetchSkinTest();
  }, []);

  console.log(questions);

  interface QuestionOption {
    nextQuestionId: number;
    text: string;
    value: string;
    result: boolean;
  }

  interface QuestionItem {
    id: number;
    question: string;
    optionO: QuestionOption;
    optionX: QuestionOption;
  }

  interface QuestionGroup {
    type: string;
    questions: QuestionItem[];
  }

  const currentQuestion = questions[0]?.questions.find(
    (q) => q.id === currentQuestionId
  );

  return (
    <Wrapper>
      <Header />
      <TextHeader pageName={t.survey.skinTypeTestTitle} />
      <ContentWrapper>
        {currentQuestion ? (
          <Content key={currentQuestion.id}>
            <NumberIndex>Q{questionNumber}</NumberIndex>
            <Question>{currentQuestion.question}</Question>
            <Answer>
              <AnswerItem
                onClick={() => {
                  const selected = currentQuestion.optionO;
                  if (selected.result) {
                    navigate("/skin-result", {
                      state: { result: selected.value },
                    });
                  } else {
                    setCurrentQuestionId(selected.nextQuestionId);
                    setQuestionNumber((prev) => prev + 1);
                  }
                }}
              >
                {currentQuestion.optionO.text}
              </AnswerItem>

              <AnswerItem
                onClick={() => {
                  const selected = currentQuestion.optionO;
                  if (selected.result) {
                    navigate("/skin-result", {
                      state: { result: selected.value },
                    });
                  } else {
                    setCurrentQuestionId(selected.nextQuestionId);
                    setQuestionNumber((prev) => prev + 1);
                  }
                }}
              >
                {currentQuestion.optionX.text}
              </AnswerItem>
            </Answer>
          </Content>
        ) : (
          <Content>
            <LoadingText>{t.survey.loading}</LoadingText>
          </Content>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}
