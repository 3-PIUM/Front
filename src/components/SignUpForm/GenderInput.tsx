import styled from "styled-components";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";
import { IoMale, IoFemale } from "react-icons/io5";

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const ErrorText = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: 0.5rem;
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

const GenderOption = styled.div<{ $selected: boolean; $readOnly?: boolean }>`
  display: flex;
  width: 10rem;
  height: 3rem;
  border: 1px solid
    ${({ $selected, $readOnly }) => {
      if ($readOnly && $selected) return colors.darkGrey;
      if ($readOnly && !$selected) return colors.lightGrey;
      if (!$readOnly && $selected) return colors.mainPink;
      return colors.lightGrey;
    }};
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  padding: 0 1rem;
  background-color: ${colors.white};

  ${({ $readOnly }) =>
    $readOnly &&
    `
    pointer-events: none;    /* 클릭/포커스 자체를 막음 */

    &:focus {
      box-shadow: none;
    }
  `}
`;

const GenderText = styled.div<{ $selected: boolean; $readOnly?: boolean }>`
  color: ${({ $selected, $readOnly }) => {
    if ($readOnly && $selected) return colors.darkGrey;
    if ($readOnly && !$selected) return colors.lightGrey;
    if (!$readOnly && $selected) return colors.mainPink;
    return colors.lightGrey;
  }};
  font-size: 1rem;
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
`;

interface GenderProps {
  gender: "MALE" | "FEMALE" | null;
  setGender: (value: "MALE" | "FEMALE" | null) => void;
  genderText: string | null;
  setGenderText: (value: string | null) => void;
  readOnly?: boolean;
}

export default function GenderInput({
  gender,
  setGender,
  genderText,
  setGenderText,
  readOnly,
}: GenderProps) {
  const { t } = useLocale();

  return (
    <>
      <GenderField>
        <FieldName>{t.signup.gender}</FieldName>
        <GenderButton>
          <GenderOption
            $selected={gender === "MALE"}
            onClick={() => {
              if (readOnly) return;
              setGender("MALE");
              setGenderText(null);
            }}
            $readOnly={readOnly}
          >
            <GenderText $selected={gender === "MALE"} $readOnly={readOnly}>
              {t.signup.male}
            </GenderText>
            <IoMale
              color={
                readOnly
                  ? gender === "MALE"
                    ? colors.darkGrey
                    : colors.lightGrey
                  : gender === "MALE"
                  ? colors.mainPink
                  : colors.lightGrey
              }
            />
          </GenderOption>
          <GenderOption
            $selected={gender === "FEMALE"}
            onClick={() => {
              if (readOnly) return;
              setGender("FEMALE");
              setGenderText(null);
            }}
            $readOnly={readOnly}
          >
            <GenderText $selected={gender === "FEMALE"} $readOnly={readOnly}>
              {t.signup.female}
            </GenderText>
            <IoFemale
              color={
                readOnly
                  ? gender === "FEMALE"
                    ? colors.darkGrey
                    : colors.lightGrey
                  : gender === "FEMALE"
                  ? colors.mainPink
                  : colors.lightGrey
              }
            />
          </GenderOption>
        </GenderButton>
        {genderText && (
          <ErrorText style={{ color: colors.mainPink }}>{genderText}</ErrorText>
        )}
      </GenderField>
    </>
  );
}
