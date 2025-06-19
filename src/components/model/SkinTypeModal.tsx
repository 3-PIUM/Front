// SkinTypeModal.tsx
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalBox = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
`;

const Content = styled.p`
  font-size: 14px;
  color: #333;
  white-space: pre-line;
  text-align: left;
`;

const CloseButton = styled.button`
  margin-top: 1.5rem;
  background: none;
  border: none;
  color: #e6005a;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const SkinTypeModal = ({
  content,
  onClose,
}: {
  content: string;
  onClose: () => void;
}) => {
  return (
    <Overlay>
      <ModalBox>
        <Title>AI 리뷰 요약</Title>
        <Content>{content}</Content>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default SkinTypeModal;
