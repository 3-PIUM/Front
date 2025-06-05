import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const BirthWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

interface BirthProps {
  birth: string;
  setBirth: (value: string) => void;
  birthText: string;
  setBirthText: (value: string) => void;
}

export default function Birth({
  birth,
  setBirth,
  birthText,
  setBirthText,
}: BirthProps) {
  const { t } = useLocale();

  return (
    <>
      <FieldName>{t.signup.birthTitle} </FieldName>
      <BirthWrap>
        <input
          type="text"
          value={birth}
          inputMode="numeric"
          maxLength={8}
          pattern="\d{8}"
          placeholder="YYYYMMDD"
          onChange={(e) => {
            setBirth(e.target.value);
          }}
          style={{
            width: "100%",
            height: "3rem",
            border: "1px solid #E6E6E6",
            borderRadius: "1rem",
            fontSize: "1rem",
            padding: "0 1rem",
            appearance: "none",
            tabSize: "1",
          }}
        />
        {birth.length > 1 && birth.length < 8 && birthText && (
          <ErrorText
            style={{
              color: colors.mainPink,
            }}
          >
            {birthText}
          </ErrorText>
        )}
      </BirthWrap>
    </>
  );
}
