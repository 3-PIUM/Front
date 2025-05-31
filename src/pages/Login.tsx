import { GrLanguage } from "react-icons/gr";
import colors from "../styles/colors";
import styled from "styled-components";
import Button from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import LanguageModal from "../components/LanguageModal";

const Wrap = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  height: auto;
`;

const LogoWrap = styled.div`
  height: 11rem;
`;

const LanguageTab = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const LanguageText = styled.div`
  display: flex;
  font-size: 0.875rem;
  color: ${colors.darkGrey};
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const InputEmail = styled.input<{ $emailFocused: boolean }>`
  height: 3rem;
  border: 1px solid
    ${({ $emailFocused }) =>
      $emailFocused ? colors.mainPink : colors.lightGrey};
  outline: none;
  border-radius: 1.25rem;
  padding: 0 1rem;
  font-size: 1rem;

  ::placeholder {
    color: ${colors.darkGrey};
  }
`;

const InputPassword = styled.input<{ $passwordFocused: boolean }>`
  height: 3rem;
  border: 1px solid
    ${({ $passwordFocused }) =>
      $passwordFocused ? colors.mainPink : colors.lightGrey};
  outline: none;
  border-radius: 1.25rem;
  padding: 0 1rem;
  font-size: 1rem;

  ::placeholder {
    color: ${colors.darkGrey};
  }
`;

const SignUpWrap = styled.div`
  font-size: 0.875rem;
  color: ${colors.mediumGrey};
  font-weight: 700;
  text-align: center;
  margin-top: 1rem;
`;

const ButtonWrap = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

export default function Login() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [language, setLanguage] = useState<String>("한국어");

  const openLanguageModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Wrap>
        <Header />
        <LogoWrap></LogoWrap>
        <LanguageTab>
          <GrLanguage fontSize="1.25rem" color={colors.darkGrey} />
          <LanguageText onClick={openLanguageModal}>{language}</LanguageText>
        </LanguageTab>
        <InputWrap>
          <InputEmail
            $emailFocused={emailFocused}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            placeholder="이메일"
          />
          <InputPassword
            type="password"
            $passwordFocused={passwordFocused}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder="비밀번호"
          />
        </InputWrap>
        <Link to="/signup">
          <SignUpWrap>회원가입</SignUpWrap>
        </Link>
      </Wrap>
      <ButtonWrap>
        <Button label="로그인하기" />
      </ButtonWrap>

      {openModal && (
        <LanguageModal
          closeModal={() => setOpenModal(false)}
          selectedLanguage={language}
          onSelectedLanguage={(lang) => {
            setLanguage(lang);
            setOpenModal(false);
          }}
        />
      )}
    </>
  );
}
