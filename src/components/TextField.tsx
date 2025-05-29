import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";

interface StyledInputProps {
  width?: string;
  $isFocused: boolean;
}

const Wrap = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ width }) => width || "100%"};
`;

const FieldName = styled.div`
  display: flex;
  font-size: 1rem;
`;

const TextFieldWrap = styled.input<StyledInputProps>`
  display: flex;
  height: 3rem;
  border: 1px solid
    ${({ $isFocused }) => ($isFocused ? colors.mainPink : colors.lightGrey)};
  outline: none;
  border-radius: 1.25rem;
  padding: 0 1rem;
  font-size: 1rem;
`;

interface TextFieldProps {
  fieldName: string;
  width?: string;
}

export default function TextField({ fieldName, width }: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Wrap>
        <FieldName>{fieldName}</FieldName>
        <TextFieldWrap
          width={width}
          $isFocused={isFocused}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        ></TextFieldWrap>
      </Wrap>
    </>
  );
}
