import styled from "styled-components";
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import TextHeader from "../components/TextHeader";
import profileImg from "../assets/images/surveyImage.png";

const ChatPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 93vh;
`;

const DateText = styled.div`
  text-align: center;
  margin: 1rem 0 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const ChatContent = styled.div`
  flex: 1;
  padding: 4rem 1rem;
  overflow-y: auto;
  background-color: #fefefe;
`;

const MessageRow = styled.div<{ isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  flex-direction: ${({ isUser }) => (isUser ? "row-reverse" : "column")};
`;

const BotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-left: 1rem; */
`;

const BotImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const BotName = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: #e91e63;
  margin-top: 4px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${({ isUser }) => (isUser ? "#d2e3fc" : "#f2f2f2")};
  color: #000;
  padding: 10px 14px;
  border-radius: 14px;
  max-width: 260px;
  font-size: 14px;
  white-space: pre-line;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: #999;
  margin-left: 0.4rem;
  align-self: flex-end;
`;

const InputContainer = styled.form`
  display: flex;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  color: #f43f5e;
  font-size: 1.5rem;
  cursor: pointer;
`;

const SuggestionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SuggestionButton = styled.button`
  background-color: #ffe4ec;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  color: #111;
  font-size: 0.9rem;
  cursor: pointer;
`;

interface Message {
  sender: "user" | "bot";
  text: string;
  time: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "안녕하세요, 피움 챗봇입니다 💕 \n무엇이 궁금하신가요? \n빠르게 답변 도와드릴게요 😊",
      time: "17:15",
    },
  ]);
  const [input, setInput] = useState("");
  const today = new Date();
  const week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const formattedDate = `${today.getFullYear()}.${String(
    today.getMonth() + 1
  ).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")} ${
    week[today.getDay()]
  }`;

  const botReply = (message: string): string => {
    if (message.includes("제품"))
      return "피부 타입을 알려주시면 제품을 추천해드릴게요!";
    if (message.includes("예산"))
      return "예산 범위를 알려주세요. 추천드릴게요!";
    if (message.includes("피부진단"))
      return "피부 상태를 입력해주세요: 건성, 지성, 복합성";
    return "죄송해요, 조금 더 구체적으로 말씀해주실 수 있을까요?";
  };

  const getTime = () => {
    const now = new Date();
    return (
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0")
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input, time: getTime() };
    const response = { sender: "bot", text: botReply(input), time: getTime() };
    setMessages((prev) => [...prev, userMessage, response]);
    setInput("");
  };

  return (
    <ChatPageContainer>
      <TextHeader pageName="챗봇" />
      <ChatContent>
        <DateText>{formattedDate}</DateText>
        {messages.map((msg, idx) => (
          <MessageRow key={idx} isUser={msg.sender === "user"}>
            {msg.sender === "bot" && (
              <BotRow>
                <BotImage src={profileImg} alt="bot" />
                <BotName>피움 챗봇</BotName>
              </BotRow>
            )}
            <BotRow>
              <MessageBubble isUser={msg.sender === "user"}>
                {msg.text}
              </MessageBubble>
              <TimeText>{msg.time}</TimeText>
            </BotRow>
          </MessageRow>
        ))}

        {messages.length === 1 && (
          <SuggestionButtons>
            <SuggestionButton onClick={() => setInput("제품 추천")}>
              제품 추천
            </SuggestionButton>
            <SuggestionButton onClick={() => setInput("예산 추천")}>
              예산 추천
            </SuggestionButton>
          </SuggestionButtons>
        )}
      </ChatContent>

      <InputContainer onSubmit={handleSubmit}>
        <ChatInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <SendButton type="submit">
          <FiSend />
        </SendButton>
      </InputContainer>
    </ChatPageContainer>
  );
}
