import { useEffect, useState } from "react";
import TextHeader from "../../components/common/TextHeader";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";
import styled from "styled-components";
import Nickname from "../../components/SignUpForm/NicknameInput";
import Birth from "../../components/SignUpForm/BirthInput";
import CountryInput from "../../components/SignUpForm/CountryInput";
import GenderInput from "../../components/SignUpForm/GenderInput";
import Button from "../../components/common/Button";
import InputField from "../../components/InputField";
import colors from "../../styles/colors";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  padding: 0 1rem;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
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

export default function EditProfile() {
  const { t } = useLocale();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
  const isCountrySelected = Boolean(country);
  const isGenderSelected = Boolean(gender);
  const isFormValid =
    isNicknameValid || isBirthValid || isCountrySelected || isGenderSelected;

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

  const isChanged =
    nickname !== memberInfo?.nickname ||
    formattedBirth !== memberInfo?.birth ||
    country !== memberInfo?.area ||
    gender !== memberInfo?.gender;

  const goSave = () => {
    if (isFormValid) {
      const saveMemberInfo = async () => {
        try {
          await axiosInstance.patch("/member", {
            nickname,
            birth: formattedBirth,
            area: country,
            lang: memberInfo?.language,
            profileImg: memberInfo?.profileImg,
            personalType: memberInfo?.personalType,
            skinType: memberInfo?.skinType,
          });
          console.log("정보 수정 완료");
          setShowModal(true);
          !isFormValid;
        } catch (err) {
          console.log("정보를 수정하지 못했습니다", err);
        }
      };
      saveMemberInfo();
    } else {
      if (!isNicknameValid) setNicknameVaildMessage("닉네임을 확인해주세요");
      else if (!isBirthValid) setBirthText("생년월일은 8자리를 입력해주세요");
      else if (!isCountrySelected) setCountryText("국가를 선택해주세요");
      else if (!isGenderSelected) setGenderText("성별을 선택해주세요");
    }
  };

  return (
    <>
      <Wrap>
        <TextHeader pageName={t.mypage.personalTitle} />
        <FormWrapper>
          <Nickname
            nickname={nickname}
            setNickname={setNickname}
            nicknameValid={nicknameVaild}
            setNicknameValid={setNicknameVaild}
            nicknameValidMessage={nicknameVaildMessage}
            setNicknameValidMessage={setNicknameVaildMessage}
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
            <InputField type="text" disabled={true} value={email} />
          </ButtonInputWrap>

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
          <Button
            label={t.save}
            onClick={goSave}
            disabled={!(isFormValid && isChanged)}
          />
        </ButtonWrapper>
      </Wrap>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <div>{t.mypage.updateSuccess}</div>
            <ModalButton onClick={() => navigate("/mypage")}>
              {t.welcome.btn}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}
