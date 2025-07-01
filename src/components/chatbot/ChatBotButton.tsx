import styled from "styled-components";
import { IoChatboxEllipses } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginRequiredModal from "../modal/LoginRequiredModal";

const ButtonWrapper = styled.button`
  position: fixed;
  bottom: 6.5rem;
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
  const isLoggedIn = Boolean(sessionStorage.getItem("accessToken"));
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/chatbot");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <ButtonWrapper onClick={handleClick}>
        <IoChatboxEllipses size={25} color="#f43f5e" />
      </ButtonWrapper>
      {showModal && <LoginRequiredModal onClose={() => setShowModal(false)} />}
    </>
  );
}
