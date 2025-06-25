import styled from "styled-components";

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  width: 85%;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Message = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ConfirmButton = styled.button`
  background-color: #f23477;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
`;

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <Overlay>
      <ModalBox>
        <Message>{message}</Message>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalBox>
    </Overlay>
  );
};

export default AlertModal;
