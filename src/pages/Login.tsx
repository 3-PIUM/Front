import { GrLanguage } from "react-icons/gr";
import colors from "../styles/colors";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import LanguageModal from "../components/model/LanguageModal";
import { useLocale } from "../context/LanguageContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeItem } from "framer-motion";

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

const ErrorText = styled.div`
  font-size: 0.825rem;
  color: ${colors.mainPink};
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  font-weight: 700;
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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const { language, setLanguage, languageCode, t } = useLocale();
  const navigate = useNavigate();

  // const storedDataString = sessionStorage.getItem("signupData");
  // if (!storedDataString) return;
  // const storedData = JSON.parse(storedDataString);
  // console.log(storedData);

  const openLanguageModal = () => {
    setOpenModal(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setShowError(true);
      return;
    }
    setShowError(false);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      console.log("로그인 성공", response.data.accessToken);
      sessionStorage.removeItem("language");
      sessionStorage.setItem("accessToken", response.data.accessToken);
      navigate("/home");
    } catch (error) {
      console.log("로그인 실패", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
    console.log(languageCode);
  }, [language]);

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
            placeholder={t.login.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            type="password"
            $passwordFocused={passwordFocused}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            placeholder={t.login.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputWrap>
        <Link to="/signup">
          <SignUpWrap>{t.login.signupLink}</SignUpWrap>
        </Link>
        {showError && <ErrorText>{t.login.error}</ErrorText>}
      </Wrap>
      <ButtonWrap>
        <Button
          label={t.login.loginButton}
          onClick={handleLogin}
          disabled={!email || !password}
        />
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
