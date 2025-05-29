import Button from "../components/Button";
import TextField from "../components/TextField";
import TextHeader from "../components/TextHeader";
import styled from "styled-components";
import InputField from "../components/InputField";
import { IoMale, IoFemale } from "react-icons/io5";
import colors from "../styles/colors";
import { useState } from "react";
import { Link } from "react-router-dom";

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

const DateField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const DateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

  return (
    <Wrap>
      <TextHeader pageName="회원가입" />
      <FormWrapper>
        <TextField fieldName="닉네임" type="text" />
        <DateField>
          <FieldName>생년월일</FieldName>
          <DateWrap>
            <InputField width="7.75rem" type="text" />
            <div>년</div>
            <InputField width="3.875rem" type="text" />
            <div>월</div>
            <InputField width="3.875rem" type="text" />
            <div>일</div>
          </DateWrap>
        </DateField>
        <TextField fieldName="이메일" type="text" />
        <TextField fieldName="이메일 인증" type="text" />
        <TextField fieldName="비밀번호" type="password" />
        <TextField fieldName="비밀번호 확인" type="password" />
        <GenderField>
          <FieldName>성별</FieldName>
          <GenderButton>
            <GenderOption
              $selected={gender === "male"}
              onClick={() => setGender("male")}
            >
              <GenderText $selected={gender === "male"}>남자</GenderText>
              <IoMale
                color={gender === "male" ? colors.mainPink : colors.lightGrey}
              />
            </GenderOption>
            <GenderOption
              $selected={gender === "female"}
              onClick={() => setGender("female")}
            >
              <GenderText $selected={gender === "female"}>여자</GenderText>
              <IoFemale
                color={gender === "female" ? colors.mainPink : colors.lightGrey}
              />
            </GenderOption>
          </GenderButton>
        </GenderField>
      </FormWrapper>
      <Link to="/quickinfo">
        <ButtonWrapper>
          <Button label="회원가입하기" />
        </ButtonWrapper>
      </Link>
    </Wrap>
  );
}
