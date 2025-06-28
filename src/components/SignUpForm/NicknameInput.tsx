import InputField from "../InputField";
import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import axiosInstance from "../../api/axiosInstance";

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ButtonInputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const FunctionBtn = styled.button.attrs<{ disabled: boolean }>((props) => ({
  disabled: props.disabled,
}))`
  display: flex;
  flex-shrink: 0;
  width: max-content;
  padding: 1rem;
  font-size: 0.875rem;
  border-radius: 1.25rem;
  border: none;
  background-color: ${({ disabled }) =>
    disabled ? colors.lightGrey : colors.subPink};
  justify-content: center;
  align-items: center;
  color: ${({ disabled }) => (disabled ? colors.mediumGrey : colors.mainPink)};
  font-weight: bold;
`;

const ErrorText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

interface NicknameProps {
  nickname: string;
  setNickname: (value: string) => void;
  nicknameValid: boolean;
  setNicknameValid: (value: boolean) => void;
  nicknameValidMessage: string;
  setNicknameValidMessage: (value: string) => void;
  disabled?: boolean | undefined;
  nicknameText?: string;
  setNicknameText?: (value: string) => void;
  isChecked?: boolean;
  setIsChecked?: (value: boolean) => void;
}

export default function Nickname({
  nickname,
  setNickname,
  nicknameValid,
  setNicknameValid,
  nicknameValidMessage,
  setNicknameValidMessage,
  disabled,
  nicknameText,
  setNicknameText,
  setIsChecked,
}: NicknameProps) {
  const { t } = useLocale();

  const handleDuplicate = async () => {
    if (!nickname) {
      setNicknameValid(false);
      setNicknameValidMessage(t.signup.errorMessage.nicknameInput);
      return;
    }
    setNicknameValidMessage("");
    setNicknameText?.("");
    try {
      await axiosInstance.get("/member/check", {
        params: {
          nickname: nickname,
        },
      });
      setNicknameValid(true);
      setNicknameValidMessage(t.signup.errorMessage.yesNickname);
      setIsChecked?.(true);
    } catch {
      setNicknameValid(false);
      setNicknameValidMessage(t.signup.errorMessage.noNickname);
      setIsChecked?.(false);
    }
  };

  return (
    <>
      <FieldName>{t.signup.nicknameTitle}</FieldName>
      <div>
        <ButtonInputWrap>
          <InputField
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameValidMessage("");
              setNicknameText?.("");
              setIsChecked?.(false);
            }}
          />
          <FunctionBtn onClick={handleDuplicate} disabled={disabled ?? false}>
            {t.signup.nicknameDuplicate}
          </FunctionBtn>
        </ButtonInputWrap>
        {nicknameValidMessage && (
          <ErrorText
            style={{
              color: nicknameValid ? colors.darkGrey : colors.mainPink,
            }}
          >
            {nicknameValidMessage}
          </ErrorText>
        )}
        {nicknameText && (
          <ErrorText
            style={{
              color: colors.mainPink,
            }}
          >
            {nicknameText}
          </ErrorText>
        )}
      </div>
    </>
  );
}
