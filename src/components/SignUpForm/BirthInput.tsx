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

const StyledInput = styled.input<{ readOnly?: boolean }>`
  width: 100%;
  height: 3rem;
  border: 1px solid #e6e6e6;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 0 1rem;
  appearance: none;
  tab-size: 1;
  background-color: ${({ readOnly }) =>
    readOnly ? colors.lightGrey : colors.white};

  ${({ readOnly }) =>
    readOnly &&
    `
    pointer-events: none;    /* 클릭/포커스 자체를 막음 */
    border: 1px solid ${colors.lightGrey};  /* 클릭해도 border 유지 */
    &:focus {
      border: 1px solid ${colors.lightGrey}; /* 포커스 시 border 변화 없음 */
      box-shadow: none;
    }
  `}
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
  readOnly?: boolean;
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
  readOnly,
}: BirthProps) {
  const { t } = useLocale();

  useEffect(() => {
    if (readOnly) {
      setBirthText("");
      return;
    }

    if (birth.length === 0) {
      setBirthText("");
      return;
    }
    if (birth.length != 8) {
      setBirthText("생년월일 8자를 입력해주세요");
      return;
    } else if (!isValidDateString(birth)) {
      setBirthText("올바른 날짜를 입력해주세요");
    } else {
      setBirthText("");
    }
  }, [birth]);

  return (
    <>
      <FieldName>{t.signup.birthTitle} </FieldName>
      <BirthWrap>
        <StyledInput
          type="text"
          value={birth}
          inputMode="numeric"
          maxLength={8}
          pattern="\d{8}"
          placeholder="YYYYMMDD"
          onChange={(e) => {
            setBirth(e.target.value);
          }}
          readOnly={readOnly}
        />
        {birthText && (
          <ErrorText style={{ color: colors.mainPink }}>{birthText}</ErrorText>
        )}
      </BirthWrap>
    </>
  );
}
