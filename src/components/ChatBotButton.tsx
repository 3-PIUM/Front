import styled from "styled-components";
import { IoChatboxEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ButtonWrapper = styled.button`
  position: fixed;
  bottom: 6rem;
  right: 1rem;
  z-index: 1000;

  width: 3rem;
  height: 3rem;

  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ChatBotButton() {
  const navigate = useNavigate();

  return (
    <ButtonWrapper onClick={() => navigate("/chatbot")}>
      <IoChatboxEllipses size={25} color="#f43f5e" />
    </ButtonWrapper>
  );
}
