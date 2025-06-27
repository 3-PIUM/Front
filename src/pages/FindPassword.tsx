import { useState } from "react";
import Header from "../components/common/Header";
import TextHeader from "../components/common/TextHeader";
import InputField from "../components/InputField";
import { useLocale } from "../context/LanguageContext";
import styled from "styled-components";
import colors from "../styles/colors";
import Button from "../components/common/Button";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 4rem 1rem 0 1rem;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ButtonWrappper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 2rem 1rem;
`;

const ErrorText = styled.div`
  display: flex;
  font-size: 0.825rem;
  color: ${colors.mainPink};
  justify-content: center;
  font-weight: 700;
  white-space: pre-line;
  text-align: center;
  padding-top: 1rem;
`;

export default function FindPassoword() {
  const { t } = useLocale();
  const [email, setEmail] = useState<string>("");
  const [emailText, setEmailText] = useState<string>("");
  const [sended, setSended] = useState<boolean>(false);

  const goPassword = async () => {
    try {
      await axios.post(
        "http://13.125.104.137:8080/mail/send/temporary-password",
        {
          email,
        }
      );
      console.log("임시 비밀번호 전송 성공!");
      setEmailText(
        "임시 비밀번호가 전송됐습니다. \n로그인 화면으로 돌아가 로그인해주세요"
      );
      setSended(true);
    } catch {
      console.log("임시 비밀번호 전송 실패");
      setEmailText("에러가 발생했습니다");
    }
  };

  return (
    <>
      <Wrapper>
        <Header />
        <TextHeader pageName={t.login.findpassword} />
        <InputBox>
          <FieldName>{t.signup.email} </FieldName>
          <div>
            <ButtonInputWrap>
              <InputField
                type="text"
                onChange={(e) => {
                  setSended(false);
                  setEmail(e.target.value);
                }}
              />
            </ButtonInputWrap>
          </div>
        </InputBox>{" "}
        {emailText && (
          <ErrorText
            style={{
              color: colors.mainPink,
              fontSize: "0.875rem",
              fontWeight: 500,
              marginTop: "0.5rem",
            }}
          >
            {emailText}
          </ErrorText>
        )}
      </Wrapper>
      <ButtonWrappper>
        <Button
          label={t.login.temporarypassword}
          onClick={() => goPassword()}
          disabled={sended === true || !email}
        />
      </ButtonWrappper>
    </>
  );
}
