import TextHeader from "../../components/common/TextHeader";
import styled from "styled-components";
import { useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";

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
  padding: 0 1rem;
  align-items: center;
  margin-top: 8rem;
`;

const TypeText = styled.div`
  display: flex;
  color: ${colors.white};
  background-color: ${colors.mainPink};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 5rem 1rem;
  margin-top: 2rem;
`;

const QTitle = styled.div`
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1rem;
  font-weight: 600;
`;

const AWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  gap: 3rem;
`;

const ATitle = styled.div`
  display: flex;
  background-color: ${colors.white}70;
  color: ${colors.mainPink};
  border-radius: 1rem;
  justify-content: center;
  padding: 0.8rem 1rem;
  text-align: center;
`;

interface Question {
  id: number;
  question: string;
  type: string;
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

export default function MbtiQuestion() {
  const { t } = useLocale();
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(16);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [skinType, setSkinType] = useState<string | null>(null);
  const [moisture, setMoisture] = useState<string | null>(null);
  const [reactivity, setReactivity] = useState<string | null>(null);
  const [pigment, setPigment] = useState<string | null>(null);
  const [questionMap, setQuestionMap] = useState<Map<string, Question[]>>(
    new Map()
  );
  const navigate = useNavigate();
  const [typeOrder, setTypeOrder] = useState<string[]>([]);

  useEffect(() => {
    const fetchMBTIQuestions = async () => {
      try {
        const response = await axiosInstance.get("/mbti/questions", {
          params: {
            lang: localStorage.getItem("language"),
          },
        });

        const raw = response.data.result;

        const map = new Map<string, Question[]>();
        const detectedTypes: string[] = [];

        raw.forEach((category: any) => {
          const typedQuestions = category.questions.map((q: any) => ({
            ...q,
            type: category.type,
          }));
          map.set(category.type, typedQuestions);
          detectedTypes.push(category.type);
        });

        setQuestionMap(map);
        setTypeOrder(detectedTypes);

        const firstType = detectedTypes[0];
        const firstQuestion = map.get(firstType)?.[0];
        if (firstQuestion) {
          setCurrentQuestionId(firstQuestion.id);
        }
      } catch (err) {
        console.error("질문 불러오기 실패", err);
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

  useEffect(() => {
    const allQuestions = Array.from(questionMap.values()).flat();
    const q = allQuestions.find((q) => q.id === currentQuestionId);
    setCurrentQuestion(q || null);
  }, [currentQuestionId, questionMap]);

  const handleAnswerClick = (
    value: string,
    nextId: number,
    isResult: boolean,
    type: string
  ) => {
    if (isResult) {
      if (type === "SKINTYPE") setSkinType(value);
      if (type === "PIGMENT") setPigment(value);
      if (type === "MOISTURE") setMoisture(value);
      if (type === "REACTIVITY") setReactivity(value);

      return;
    } else {
      setCurrentQuestionId(nextId);
    }
  };

  useEffect(() => {
    if (!typeOrder.length || questionMap.size === 0) return;

    const answerMap: Record<string, string | null> = {
      SKINTYPE: skinType,
      PIGMENT: pigment,
      MOISTURE: moisture,
      REACTIVITY: reactivity,
    };

    const answers = typeOrder.map((type) => answerMap[type]);
    const answeredCount = answers.filter(Boolean).length;

    if (answeredCount < typeOrder.length) {
      const nextType = typeOrder[answeredCount];
      const nextQuestion = questionMap.get(nextType)?.[0];
      if (nextQuestion) {
        setCurrentQuestionId(nextQuestion.id);
      }
    }

    if (answeredCount === typeOrder.length) {
      navigate("/mbti/result", {
        state: {
          skinType,
          pigment,
          moisture,
          reactivity,
        },
      });
    }
  }, [skinType, pigment, moisture, reactivity, questionMap, typeOrder]);

  return (
    <Wrap>
      <TextHeader pageName={t.mbti.pageTitle} bgColor="transparent" />
      <Wrapper>
        {currentQuestion && (
          <>
            <TypeText>{currentQuestion.type}</TypeText>
            <ContentWrap>
              <QTitle>{currentQuestion.question}</QTitle>
              <AWrap>
                <ATitle
                  onClick={() =>
                    handleAnswerClick(
                      currentQuestion.optionO.value,
                      currentQuestion.optionO.nextQuestionId,
                      currentQuestion.optionO.result,
                      currentQuestion.type
                    )
                  }
                >
                  {currentQuestion.optionO.text}
                </ATitle>
                <ATitle
                  onClick={() =>
                    handleAnswerClick(
                      currentQuestion.optionX.value,
                      currentQuestion.optionX.nextQuestionId,
                      currentQuestion.optionX.result,
                      currentQuestion.type
                    )
                  }
                >
                  {currentQuestion.optionX.text}
                </ATitle>
              </AWrap>
            </ContentWrap>
          </>
        )}
      </Wrapper>
    </Wrap>
  );
}
