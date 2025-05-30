import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";

interface StyledInputProps {
  width?: string;
  $isFocused: boolean;
}

const TextFieldWrap = styled.input<StyledInputProps>`
  display: flex;
  width: ${({ width }) => width || "100%"};
  height: 3rem;
  border: 1px solid
    ${({ $isFocused }) => ($isFocused ? colors.mainPink : colors.lightGrey)};
  outline: none;
  border-radius: 1.25rem;
  padding: 0 1rem;
  font-size: 1rem;
`;

interface InputProps {
  width?: string;
  type: "password" | "text";
}

export default function InputField({ width, type }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextFieldWrap
      width={width}
      $isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      type={type === "password" ? "password" : "text"}
    ></TextFieldWrap>
  );
}
