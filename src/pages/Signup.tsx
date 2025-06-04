import Button from "../components/Button";
import TextField from "../components/TextField";
import TextHeader from "../components/TextHeader";
import styled from "styled-components";
import colors from "../styles/colors";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useLocale } from "../context/LanguageContext";
import axios from "axios";
import Nickname from "../components/SignUpForm/NicknameInput";
import Birth from "../components/SignUpForm/BirthInput";
import EmailInput from "../components/SignUpForm/EmailInput";
import PasswordInput from "../components/SignUpForm/PasswordInput";
import CountryInput from "../components/SignUpForm/CountryInput";
import GenderInput from "../components/SignUpForm/GenderInput";

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
  display: flex;
  padding: 0 1rem;
  margin-top: 2rem;
`;

export default function Signup() {
  const { t, language } = useLocale();

  const [nickname, setNickname] = useState<string>("");
  const [nicknameVaildMessage, setNicknameVaildMessage] = useState<
    string | null
  >(null);
  const [nicknameVaild, setNicknameVaild] = useState<boolean | null>(null);

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

  useEffect(() => {
    if (birth.length != 8) {
      setBirthText("생년월일 8자를 입력해주세요");
      return;
    }
  }, [birth]);

  const formattedBirth =
    birth.length === 8
      ? `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`
      : "";

  const isNicknameValid = nicknameVaild === true;
  const isBirthValid = birth.length === 8;
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

  // const handleSendEmail = async () => {
  //   if (!email) {
  //     setSendEmail(false);
  //     setSendEmailText("이메일을 입력해주세요");
  //     return;
  //   }
  //   try {
  //     const emailResponse = await axios.post(
  //       "http://localhost:8080/main/send",
  //       {
  //         email,
  //       }
  //     );
  //     setSendEmail(true);
  //     setSendEmailText("이메일을 확인해주세요");
  //   } catch {
  //     setSendEmail(false);
  //     setSendEmailText("이메일 전송에 실패했습니다");
  //   }
  // };

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const response = await fetch("https://restcountries.com/v3.1/all");
  //       const data = await response.json();

  //       const parsed = data.map((item: any) => {
  //         let name: string;

  //         switch (language) {
  //           case "ko":
  //           case "한국어":
  //             name = item.translations?.kor?.official;
  //             break;
  //           case "jp":
  //           case "日本語":
  //             name = item.translations?.jpn?.official;
  //             break;
  //           default:
  //             name = item.name?.official;
  //         }

  //         return {
  //           name,
  //           flag: item.flag,
  //         };
  //       });

  //       setCountries(parsed);
  //     } catch (error) {
  //       console.error("국가 목록을 불러오는 데 실패했습니다.", error);
  //     }
  //   };

  //   fetchCountries();
  // }, [language]);

  const handleSignup = async () => {
    if (isFormValid) {
      try {
        const response = await axios.post("http://localhost:8080/member/join", {
          nickname,
          birth: formattedBirth,
          email,
          password,
          gender,
          area: country,
          lang: language,
          skinType: null,
          personalType: null,
        });
        console.log("회원가입 성공:", response);
      } catch (error) {
        console.log("회원가입 실패:", error);
      }
    } else {
      if (!isNicknameValid) setNicknameVaildMessage("닉네임을 확인해주세요");
      else if (!isBirthValid) setBirthText("생년월일은 8자리를 입력해주세요");
      else if (!isEmailVerified)
        setVerifyCodeText("이메일 인증을 완료해주세요");
      else if (!isPasswordMatch)
        setPasswordText("비밀번호가 일치하지 않습니다");
      else if (!isCountrySelected) setCountryText("국가를 선택해주세요");
      else if (!isGenderSelected) setGenderText("성별을 선택해주세요");
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
          nicknameVaild={nicknameVaild}
          setNicknameVaild={setNicknameVaild}
          nicknameVaildMessage={nicknameVaildMessage}
          setNicknameVaildMessage={setNicknameVaildMessage}
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
