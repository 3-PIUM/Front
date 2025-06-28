import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 90%;
`;

const Message = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
`;

const LoginButton = styled.button`
  background-color: #f43f5e;
  color: white;
  font-weight: bold;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  font-size: 0.9rem;
`;

export default function LoginRequiredModal() {
  const navigate = useNavigate();

  return (
    <Overlay>
      <ModalBox>
        <Message>로그인이 필요합니다</Message>
        <LoginButton onClick={() => navigate("/")}>로그인하러 가기</LoginButton>
      </ModalBox>
    </Overlay>
  );
}
