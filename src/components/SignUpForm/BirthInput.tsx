import styled from "styled-components";
import { useLocale } from "../../context/LanguageContext";
import colors from "../../styles/colors";
import { useEffect } from "react";

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

export default function Birth({
  birth,
  setBirth,
  birthText,
  setBirthText,
}: BirthProps) {
  const { t } = useLocale();

  useEffect(() => {
    if (birth.length === 0) {
      setBirthText("");
      return;
    }
    if (birth.length != 8) {
      setBirthText(t.signup.errorMessage.eightBirth);
      return;
    } else if (!isValidDateString(birth)) {
      setBirthText(t.signup.errorMessage.birthValid);
    } else {
      setBirthText("");
    }
  }, [birth]);

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
        {birthText && (
          <ErrorText style={{ color: colors.mainPink }}>{birthText}</ErrorText>
        )}
      </BirthWrap>
    </>
  );
}
