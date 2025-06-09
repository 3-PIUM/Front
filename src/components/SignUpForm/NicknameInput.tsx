import InputField from "../InputField";
import styled from "styled-components";
import colors from "../../styles/colors";
import axios from "axios";
import { useLocale } from "../../context/LanguageContext";

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
  nicknameVaild: boolean;
  setNicknameVaild: (value: boolean) => void;
  nicknameVaildMessage: string;
  setNicknameVaildMessage: (value: string) => void;
  disabled: boolean | undefined;
}

export default function Nickname({
  nickname,
  setNickname,
  nicknameVaild,
  setNicknameVaild,
  nicknameVaildMessage,
  setNicknameVaildMessage,
  disabled,
}: NicknameProps) {
  const { t } = useLocale();

  const handleDuplicate = async () => {
    if (!nickname) {
      setNicknameVaild(false);
      setNicknameVaildMessage("닉네임을 입력해주세요");
      return;
    }
    try {
      await axios.get("http://localhost:8080/member/check", {
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
    <>
      <FieldName>{t.signup.nicknameTitle}</FieldName>
      <div>
        <ButtonInputWrap>
          <InputField
            type="text"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameVaildMessage("");
            }}
          />
          <FunctionBtn onClick={handleDuplicate} disabled={disabled ?? false}>
            {t.signup.nicknameDuplicate}
          </FunctionBtn>
        </ButtonInputWrap>
        {nicknameVaildMessage && (
          <ErrorText
            style={{
              color: nicknameVaild ? colors.darkGrey : colors.mainPink,
            }}
          >
            {nicknameVaildMessage}
          </ErrorText>
        )}
      </div>
    </>
  );
}
