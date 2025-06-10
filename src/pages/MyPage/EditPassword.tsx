import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import Button from "../../components/common/Button";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import PasswordInput from "../../components/SignUpForm/PasswordInput";
import { useLocale } from "../../context/LanguageContext";
import { useState } from "react";
import styled from "styled-components";
import colors from "../../styles/colors";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0 1rem;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${colors.white};
  opacity: 1;
  display: flex;
  gap: 2rem;
  flex-direction: column;
  width: 100%;
  margin: 1rem;
  padding: 3rem 1rem;
  text-align: center;
  border-radius: 1rem;
`;

const ModalButton = styled.button`
  padding: 1rem;
  font-size: 0.825rem;
  background-color: ${colors.mainPink};
  color: ${colors.white};
  border: none;
  border-radius: 3rem;
`;

export default function EditPassword() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string | null>(null);

  const isPasswordMatch = password === secondPassword;

  const goSave = async () => {
    const fetchPassword = async () => {
      try {
        await axiosInstance.patch("/member/new-password", {
          password: password,
        });
        setShowModal(true);
        navigate("/mypage");
      } catch (error) {
        console.log("비밀번호 변경에 실패했습니다:", error);
      }
    };

    fetchPassword();
  };

  return (
    <>
      <Wrap>
        <Header />
        <TextHeader pageName={t.mypage.changePassword} />
        <FormWrapper>
          <PasswordInput
            password={password}
            setPassword={setPassword}
            secondPassword={secondPassword}
            setSecondPassword={setSecondPassword}
            passwordText={passwordText}
            setPasswordText={setPasswordText}
          />
        </FormWrapper>
        <ButtonWrapper>
          <Button
            label={t.save}
            onClick={goSave}
            disabled={!isPasswordMatch || password.length < 1}
          />
        </ButtonWrapper>
      </Wrap>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div>정보가 성공적으로 수정되었습니다</div>
            <ModalButton onClick={() => navigate("/mypage")}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
