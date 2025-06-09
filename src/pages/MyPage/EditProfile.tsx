import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import styled from "styled-components";
import Nickname from "../../components/SignUpForm/NicknameInput";
import { useNavigate } from "react-router-dom";
import Birth from "../../components/SignUpForm/BirthInput";
import PasswordInput from "../../components/SignUpForm/PasswordInput";
import CountryInput from "../../components/SignUpForm/CountryInput";
import GenderInput from "../../components/SignUpForm/GenderInput";
import Button from "../../components/Button";
import InputField from "../../components/InputField";

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

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function EditProfile() {
  const { t } = useLocale();

  interface MemberInfo {
    area: string;
    birth: string;
    email: string;
    gender: "MALE" | "FEMALE";
    language: "EN" | "KR" | "JP";
    nickname: string;
    profileImg: string | null;
    personalType: string | null;
    skinType: string | null;
  }

  const [memberInfo, setMemberInfo] = useState<MemberInfo>();

  const [nickname, setNickname] = useState<string>("");
  const [nicknameVaildMessage, setNicknameVaildMessage] = useState<string>("");
  const [nicknameVaild, setNicknameVaild] = useState<boolean>(false);

  const [birth, setBirth] = useState<string>("");
  const [birthText, setBirthText] = useState<string>("");

  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordText, setPasswordText] = useState<string | null>(null);

  const [country, setCountry] = useState<string | null>(null);
  const [countryText, setCountryText] = useState<string | null>(null);

  const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
  const [genderText, setGenderText] = useState<string | null>(null);

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

  const isNicknameValid = nicknameVaild === true;
  const isBirthValid = birth.length === 8 && isValidDateString(birth);
  const isPasswordMatch = password === secondPassword;
  const isCountrySelected = Boolean(country);
  const isGenderSelected = Boolean(gender);
  const isFormValid =
    isNicknameValid &&
    isBirthValid &&
    isPasswordMatch &&
    isCountrySelected &&
    isGenderSelected;

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await axiosInstance.get("/member");
        const result = response.data.result;
        setMemberInfo(result);
        setNickname(result.nickname);
        setBirth(result.birth.replaceAll("-", ""));
        setEmail(result.email);
        setGender(result.gender);
        setCountry(result.area);
      } catch (error) {
        console.log("회원정보 불러오는데 실패했습니다", error);
      }
    };

    fetchMemberInfo();
  }, []);

  console.log("memberInfo:", memberInfo);

  const goSave = () => {
    if (isFormValid) {
      const saveMemberInfo = async () => {
        try {
          await axiosInstance.patch("/member", {
            nickname,
            birth: formattedBirth,
            area: country,
            password: password,
            lang: memberInfo?.language,
            profileImg: memberInfo?.profileImg,
            personalType: memberInfo?.personalType,
            skinType: memberInfo?.skinType,
          });
          console.log("정보 수정 완료");
          !isFormValid;
        } catch (err) {
          console.log("정보를 수정하지 못했습니다", err);
        }
      };
      saveMemberInfo();
    } else {
      if (!isNicknameValid) setNicknameVaildMessage("닉네임을 확인해주세요");
      else if (!isBirthValid) setBirthText("생년월일은 8자리를 입력해주세요");
      else if (!isPasswordMatch)
        setPasswordText("비밀번호가 일치하지 않습니다");
      else if (!isCountrySelected) setCountryText("국가를 선택해주세요");
      else if (!isGenderSelected) setGenderText("성별을 선택해주세요");
    }
  };

  return (
    <Wrap>
      <Header />
      <TextHeader pageName={t.mypage.personalTitle} />
      <FormWrapper>
        <Nickname
          nickname={nickname}
          setNickname={setNickname}
          nicknameVaild={nicknameVaild}
          setNicknameVaild={setNicknameVaild}
          nicknameVaildMessage={nicknameVaildMessage}
          setNicknameVaildMessage={setNicknameVaildMessage}
          disabled={nickname == memberInfo?.nickname}
        />

        <Birth
          birth={birth}
          setBirth={setBirth}
          birthText={birthText}
          setBirthText={setBirthText}
        />

        <FieldName>{t.signup.email} </FieldName>
        <ButtonInputWrap>
          <InputField type="text" disabled={true} value={memberInfo?.email} />
        </ButtonInputWrap>

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
          readOnly={true}
        />
      </FormWrapper>
      <ButtonWrapper>
        <Button label={t.save} onClick={goSave} disabled={!isFormValid} />
      </ButtonWrapper>
    </Wrap>
  );
}
