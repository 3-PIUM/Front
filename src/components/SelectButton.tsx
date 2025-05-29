import styled from "styled-components";
import colors from "../styles/colors";
import { useState } from "react";

const ButtonWrap = styled.button<{
  $size?: "large" | "small";
  $isActivated: boolean;
}>`
  width: ${({ $size }) => ($size === "large" ? "10rem" : "6.375rem")};
  background-color: ${colors.white};
  border: 1px solid
    ${({ $isActivated }) => ($isActivated ? colors.mainPink : colors.lightGrey)};
  padding: ${({ $size }) => ($size === "large" ? "1.5rem 0" : "1rem 0")};
  color: ${({ $isActivated }) =>
    $isActivated ? colors.mainPink : colors.lightGrey};
  font-weight: ${({ $isActivated }) => ($isActivated ? 700 : 400)};
  border-radius: ${({ $size }) => ($size === "large" ? "1.25rem" : "0.625rem")};
`;

interface SelectButtonProps {
  buttonName: string;
  size?: "large" | "small";
}

export default function SelectButton({ buttonName, size }: SelectButtonProps) {
  const [isActivated, setIsActivated] = useState(false);

  const handleActivated = () => {
    if (isActivated === false) {
      setIsActivated(true);
    } else {
      setIsActivated(false);
    }
  };

  return (
    <ButtonWrap
      $size={size}
      $isActivated={isActivated}
      onClick={handleActivated}
    >
      {buttonName}
    </ButtonWrap>
  );
}
