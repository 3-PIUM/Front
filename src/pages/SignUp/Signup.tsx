import Button from "../../components/common/Button";
import TextHeader from "../../components/common/TextHeader";
import styled from "styled-components";
import { useState } from "react";
import Header from "../../components/common/Header";
import { useLocale } from "../../context/LanguageContext";
import Nickname from "../../components/SignUpForm/NicknameInput";
import Birth from "../../components/SignUpForm/BirthInput";
import EmailInput from "../../components/SignUpForm/EmailInput";
import PasswordInput from "../../components/SignUpForm/PasswordInput";
import CountryInput from "../../components/SignUpForm/CountryInput";
import GenderInput from "../../components/SignUpForm/GenderInput";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5.5rem;
  padding: 0 1rem;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 1rem 1rem 1rem;
  margin-top: 2rem;
`;

export default function Signup() {
  const { t, language } = useLocale();

  const [nickname, setNickname] = useState<string>("");
  const [nicknameText, setNicknameText] = useState<string>("");

  const [nicknameValidMessage, setNicknameValidMessage] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [birth, setBirth] = useState<string>("");
  const [birthText, setBirthText] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [sendEmail, setSendEmail] = useState<boolean | null>(null);
  const [sendEmailText, setSendEmailText] = useState<string | null>(null);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [checkVerifyCode, setCheckVerifyCode] = useState<boolean | null>(null);
  const [verifyCodeText, setVerifyCodeText] = useState<string | null>(null);

  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string | null>(null);

  const [country, setCountry] = useState<string | null>(null);
  const [countryText, setCountryText] = useState<string | null>(null);

  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [genderText, setGenderText] = useState<string | null>(null);

  const navigate = useNavigate();

  function isValidDateString(dateStr: string): boolean {
    if (dateStr.length !== 8) return false;

    const year = parseInt(dateStr.slice(0, 4));
    const month = parseInt(dateStr.slice(4, 6));
    const day = parseInt(dateStr.slice(6, 8));

    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  const formattedBirth =
    birth.length === 8
      ? `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`
      : "";

  const isNicknameValid = nicknameValid === true && isChecked === true;
  const isBirthValid = birth.length === 8 && isValidDateString(birth);
  const isEmailVerified = checkVerifyCode === true;
  const isPasswordMatch = password === secondPassword;
  const isCountrySelected = Boolean(country);
  const isGenderSelected = Boolean(gender);
  const isFormValid =
    isNicknameValid &&
    isBirthValid &&
    isEmailVerified &&
    isPasswordMatch &&
    isCountrySelected &&
    isGenderSelected;

  const handleSignup = async () => {
    if (isFormValid) {
      const signupData = {
        nickname,
        birth: formattedBirth,
        email,
        password,
        gender,
        area: country,
        lang: language,
      };

      sessionStorage.setItem("signupData", JSON.stringify(signupData));
      navigate("/about");
    } else {
      if (!nickname) setNicknameText(t.signup.errorMessage.nicknameInput);
      if (isChecked === false)
        setNicknameText(t.signup.errorMessage.nicknameVerify);
      if (!birth.trim()) {
        setBirthText(t.signup.errorMessage.eightBirth);
      }
      if (!email) {
        setSendEmailText(t.signup.errorMessage.emailInput);
      }
      if (!verifyCode) {
        setVerifyCodeText(t.signup.errorMessage.emailVerify);
      }
      if (!password) setPasswordText(t.signup.errorMessage.passwordInput);
      if (!isPasswordMatch) setPasswordText(t.signup.errorMessage.password);
      if (!isCountrySelected) setCountryText(t.signup.errorMessage.country);
      if (!isGenderSelected) setGenderText(t.signup.errorMessage.gender);
    }
  };

  return (
    <Wrap>
      <Header />
      <TextHeader pageName={t.signup.pageName} />
      <FormWrapper>
        <Nickname
          nickname={nickname}
          setNickname={setNickname}
          nicknameValid={nicknameValid}
          setNicknameValid={setNicknameValid}
          nicknameValidMessage={nicknameValidMessage}
          setNicknameValidMessage={setNicknameValidMessage}
          nicknameText={nicknameText}
          setNicknameText={setNicknameText}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />

        <Birth
          birth={birth}
          setBirth={setBirth}
          birthText={birthText}
          setBirthText={setBirthText}
        />

        <EmailInput
          email={email}
          setEmail={setEmail}
          sendEmail={sendEmail}
          setSendEmail={setSendEmail}
          sendEmailText={sendEmailText}
          setSendEmailText={setSendEmailText}
          verifyCode={verifyCode}
          setVerifyCode={setVerifyCode}
          verifyCodeText={verifyCodeText}
          setVerifyCodeText={setVerifyCodeText}
          checkVerifyCode={checkVerifyCode}
          setCheckVerifyCode={setCheckVerifyCode}
        />

        <PasswordInput
          password={password}
          setPassword={setPassword}
          secondPassword={secondPassword}
          setSecondPassword={setSecondPassword}
          passwordText={passwordText}
          setPasswordText={setPasswordText}
        />

        <CountryInput
          country={country}
          setCountry={setCountry}
          countryText={countryText}
          setCountryText={setCountryText}
        />

        <GenderInput
          gender={gender}
          setGender={setGender}
          genderText={genderText}
          setGenderText={setGenderText}
        />
      </FormWrapper>
      <ButtonWrapper>
        <Button label={t.signup.signupBtn} onClick={handleSignup} />
      </ButtonWrapper>
    </Wrap>
  );
}
