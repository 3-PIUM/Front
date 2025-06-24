import { useLocale } from "../../context/LanguageContext";
import TextField from "../TextField";
import styled from "styled-components";
import colors from "../../styles/colors";

const ErrorText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

interface PasswordProps {
  password: string;
  setPassword: (value: string) => void;
  secondPassword: string;
  setSecondPassword: (value: string) => void;
  passwordText: string | null;
  setPasswordText: (value: string | null) => void;
}

export default function PasswordInput({
  password,
  setPassword,
  secondPassword,
  setSecondPassword,
  passwordText,
  setPasswordText,
}: PasswordProps) {
  const { t } = useLocale();

  return (
    <>
      <TextField
        fieldName={t.signup.password}
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordText(null);
        }}
      />
      <div>
        <TextField
          fieldName={t.signup.passwordCheck}
          type="password"
          value={secondPassword}
          onChange={(e) => {
            setSecondPassword(e.target.value);
            setPasswordText(null);
          }}
        />
        {passwordText && (
          <ErrorText style={{ color: colors.mainPink }}>
            {passwordText}
          </ErrorText>
        )}
      </div>
    </>
  );
}
