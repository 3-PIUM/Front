import styled from "styled-components";
import { FiSend } from "react-icons/fi";

interface ChatInputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InputContainer = styled.form`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  background-color: #fff;
  z-index: 999;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 1.25rem;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #e91e63;
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  margin-left: 0.5rem;
  color: #f43f5e;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ChatInputBox = ({ value, onChange, onSubmit }: ChatInputBoxProps) => {
  return (
    <InputContainer onSubmit={onSubmit}>
      <ChatInput
        type="text"
        value={value}
        onChange={onChange}
        placeholder="메시지를 입력하세요"
      />
      <SendButton type="submit">
        <FiSend />
      </SendButton>
    </InputContainer>
  );
};

export default ChatInputBox;
