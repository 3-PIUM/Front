import styled from "styled-components";

interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
  time: string;
  botName?: string;
}

const MessageRow = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-start;
  margin: 1rem 0;
  flex-direction: ${({ $isUser }) => ($isUser ? "row-reverse" : "column")};
`;

const BotRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BotImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const BotName = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: #e91e63;
  margin-top: 0.25rem;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background-color: ${({ $isUser }) => ($isUser ? "#fbe2f6" : "#f2f2f2")};
  color: #000;
  padding: 0.7rem 1rem;
  border-radius: 0.875rem;
  max-width: 16rem;
  font-size: 0.875rem;
  white-space: pre-line;
`;

const TimeText = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  align-self: flex-end;
`;

const ChatMessage = ({ sender, text, time, botName }: ChatMessageProps) => {
  const isUser = sender === "user";
  return isUser ? (
    <MessageRow $isUser={true}>
      <MessageBubble $isUser={true}>{text}</MessageBubble>
      <TimeText>{time}</TimeText>
    </MessageRow>
  ) : (
    <MessageRow $isUser={false}>
      <BotRow>
        <BotImage src="images/CharacterImg/surveyImage.png" alt="bot" />
        <BotName>{botName}</BotName>
      </BotRow>
      <BotRow>
        <MessageBubble
          $isUser={false}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <TimeText>{time}</TimeText>
      </BotRow>
    </MessageRow>
  );
};

export default ChatMessage;
