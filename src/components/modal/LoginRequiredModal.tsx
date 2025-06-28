// import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocale } from "../../context/LanguageContext";

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
  position: relative;
  background-color: white;
  padding: 2.5rem 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
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

export default function LoginRequiredModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Message>{t.mypage.loginRequired}</Message>
        <LoginButton onClick={() => navigate("/login")}>
          {t.mypage.goLogin}
        </LoginButton>
      </ModalBox>
    </Overlay>
  );
}
