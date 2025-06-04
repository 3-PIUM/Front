import Button from "../components/Button";
import TextField from "../components/TextField";
import TextHeader from "../components/TextHeader";
import styled from "styled-components";
import { IoMale, IoFemale } from "react-icons/io5";
import colors from "../styles/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import InputField from "../components/InputField";
import { useLocale } from "../context/LanguageContext";
import axios from "axios";

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

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DuplicateNicknamebtn = styled.button`
  display: flex;
  flex-shrink: 0;
  width: max-content;
  padding: 1rem;
  font-size: 0.875rem;
  border-radius: 1.25rem;
  border: none;
  background-color: ${colors.subPink};
  justify-content: center;
  align-items: center;
  color: ${colors.mainPink};
  font-weight: bold;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const GenderField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const GenderButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GenderOption = styled.div<{ $selected: boolean }>`
  display: flex;
  width: 10rem;
  height: 3rem;
  border: 1px solid
    ${({ $selected }) => ($selected ? colors.mainPink : colors.lightGrey)};
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  padding: 0 1rem;
  background-color: ${colors.white};
`;

const GenderText = styled.div<{ $selected: boolean }>`
  color: ${({ $selected }) => ($selected ? colors.mainPink : colors.lightGrey)};
  font-size: 1rem;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 0 1rem;
  margin-top: 2rem;
`;

export default function Signup() {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const { t } = useLocale();
  const [nickname, setNickname] = useState<string>("");
  const [nicknameVaildMessage, setNicknameVaildMessage] = useState<
    string | null
  >(null);
  const [nicknameVaild, setNicknameVaild] = useState<boolean | null>(null);
  const [email, setEmail] = useState<string>("");

  const handleDuplicate = async () => {
    try {
      const response = await axios.get("http://localhost:8080/member/check", {
        params: {
          nickname: nickname,
        },
      });
      setNicknameVaild(true);
      setNicknameVaildMessage("사용 가능한 닉네임입니다");
    } catch {
      setNicknameVaild(false);

      setNicknameVaildMessage("사용 불가능한 닉네임입니다");
    }
  };

  return (
    <Wrap>
      <Header />
      <TextHeader pageName={t.signup.pageName} />
      <FormWrapper>
        <FieldName>{t.signup.nicknameTitle}</FieldName>
        <div>
          <ButtonInputWrap>
            <InputField
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <DuplicateNicknamebtn onClick={handleDuplicate}>
              {t.signup.nicknameDuplicate}
            </DuplicateNicknamebtn>
          </ButtonInputWrap>
          {nicknameVaildMessage && (
            <div
              style={{
                color: nicknameVaild ? colors.darkGrey : colors.mainPink,
                fontSize: "0.875rem",
                fontWeight: 500,
                marginTop: "0.5rem",
              }}
            >
              {nicknameVaildMessage}
            </div>
          )}
        </div>

        <TextField fieldName={t.signup.birthTitle} type="text" />
        <FieldName>{t.signup.email} </FieldName>
        <ButtonInputWrap>
          <InputField type="text" onChange={(e) => setEmail(e.target.value)} />
          <DuplicateNicknamebtn>{t.signup.emailRequest}</DuplicateNicknamebtn>
        </ButtonInputWrap>
        <TextField fieldName={t.signup.emailCheck} type="text" />
        <TextField fieldName={t.signup.password} type="password" />
        <TextField fieldName={t.signup.passwordCheck} type="password" />
        <GenderField>
          <FieldName>{t.signup.gender}</FieldName>
          <GenderButton>
            <GenderOption
              $selected={gender === "male"}
              onClick={() => setGender("male")}
            >
              <GenderText $selected={gender === "male"}>
                {t.signup.male}
              </GenderText>
              <IoMale
                color={gender === "male" ? colors.mainPink : colors.lightGrey}
              />
            </GenderOption>
            <GenderOption
              $selected={gender === "female"}
              onClick={() => setGender("female")}
            >
              <GenderText $selected={gender === "female"}>
                {t.signup.female}
              </GenderText>
              <IoFemale
                color={gender === "female" ? colors.mainPink : colors.lightGrey}
              />
            </GenderOption>
          </GenderButton>
        </GenderField>
      </FormWrapper>
      <Link to="/about">
        <ButtonWrapper>
          <Button label={t.signup.signupBtn} />
        </ButtonWrapper>
      </Link>
    </Wrap>
  );
}
