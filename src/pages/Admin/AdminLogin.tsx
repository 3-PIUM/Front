import { GrLanguage } from "react-icons/gr";
import styled from "styled-components";
import { useEffect, useState } from "react";
import colors from "../../styles/colors";
import Header from "../../components/common/Header";
import Button from "../../components/common/Button";
import LanguageModal from "../../components/modal/LanguageModal";
import { useLocale } from "../../context/LanguageContext";
import TextHeader from "../../components/common/TextHeader";
import axiosInstance from "../../api/axiosInstance";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
`;

const AdminText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.mainPink};
  margin-top: 1rem;

  font-weight: 600;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
  padding: 0 1rem;
`;

const LogoImg = styled.img`
  display: flex;
  width: 35%;
`;

const LanguageTab = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
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
  padding: 0 1rem;
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

export default function AdminLogin() {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const { language, setLanguage, languageCode, t } = useLocale();

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
      const response = await axiosInstance.post("/member/admin-login", {
        email,
        password,
      });
      const redirectUri = response.data.result;
      window.location.href = redirectUri;
    } catch (error) {
      console.log("로그인 실패", error);
      setShowError(true);
      setErrorText(t.login.error);
    }
  };

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
    console.log(languageCode);
  }, [language]);

  useEffect(() => {
    sessionStorage.removeItem("memberInfo");
    sessionStorage.removeItem("surveyStep");
    sessionStorage.removeItem("accessToken");
  }, []);

  return (
    <>
      <Wrap>
        <Header />
        <TextHeader pageName="" />
        <LogoWrap>
          <LogoImg src="/images/logo/PIUM_logo.png" />
        </LogoWrap>
        <AdminText>관리자 전용</AdminText>
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

        {showError && <ErrorText>{errorText}</ErrorText>}
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
