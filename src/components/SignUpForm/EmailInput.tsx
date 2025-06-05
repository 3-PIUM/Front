import styled from "styled-components";
import InputField from "../InputField";
import { useLocale } from "../../context/LanguageContext";
import axios from "axios";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FunctionBtn = styled.button`
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

interface EmailProps {
  email: string;
  setEmail: (value: string) => void;
  sendEmail: boolean | null;
  setSendEmail: (value: boolean | null) => void;
  sendEmailText: string | null;
  setSendEmailText: (value: string | null) => void;
  verifyCode: string;
  setVerifyCode: (value: string) => void;
  verifyCodeText: string | null;
  setVerifyCodeText: (value: string | null) => void;
  checkVerifyCode: boolean | null;
  setCheckVerifyCode: (value: boolean | null) => void;
}

export default function EmailInput({
  email,
  setEmail,
  sendEmail,
  setSendEmail,
  sendEmailText,
  setSendEmailText,
  verifyCode,
  setVerifyCode,
  verifyCodeText,
  setVerifyCodeText,
  checkVerifyCode,
  setCheckVerifyCode,
}: EmailProps) {
  const { t } = useLocale();

  const handleSendEmail = async () => {
    if (!email) {
      setSendEmail(false);
      setSendEmailText("이메일을 입력해주세요");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/main/send", {
        email,
      });
      setSendEmail(true);
      setSendEmailText("이메일을 확인해주세요");
    } catch {
      setSendEmail(false);
      setSendEmailText("이메일 전송에 실패했습니다");
    }
  };

  const handleCheckVerify = async () => {
    if (!verifyCode) {
      setVerifyCodeText("인증 번호를 입력해주세요");
      return;
    }

    try {
      const verifyResponse = await axios.post(
        "http://localhost:8080/main/verify",
        {
          email,
          verifyCode,
        }
      );
      setCheckVerifyCode(true);
    } catch {
      setCheckVerifyCode(false);
      setVerifyCodeText("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Wrapper>
      <InputBox>
        <FieldName>{t.signup.email} </FieldName>
        <div>
          <ButtonInputWrap>
            <InputField
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
                setSendEmailText(null);
              }}
            />
            <FunctionBtn onClick={handleSendEmail}>
              {t.signup.emailRequest}
            </FunctionBtn>
          </ButtonInputWrap>
          {sendEmailText && (
            <div
              style={{
                color: colors.mainPink,
                fontSize: "0.875rem",
                fontWeight: 500,
                marginTop: "0.5rem",
              }}
            >
              {sendEmailText}
            </div>
          )}
        </div>
      </InputBox>

      <InputBox>
        <FieldName>{t.signup.emailCheck} </FieldName>
        <div>
          <ButtonInputWrap>
            <InputField
              type="text"
              onChange={(e) => {
                setVerifyCode(e.target.value);
                setVerifyCodeText(null);
              }}
            />
            <FunctionBtn onClick={handleCheckVerify}>
              {t.signup.emailVerify}
            </FunctionBtn>
          </ButtonInputWrap>
          {sendEmailText && (
            <div
              style={{
                color: colors.mainPink,
                fontSize: "0.875rem",
                fontWeight: 500,
                marginTop: "0.5rem",
              }}
            >
              {sendEmailText}
            </div>
          )}
        </div>
      </InputBox>
    </Wrapper>
  );
}
