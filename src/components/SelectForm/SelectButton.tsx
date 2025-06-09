import styled from "styled-components";
import colors from "../../styles/colors";

const ButtonWrap = styled.button<{
  $size?: "large" | "small";
  $isActivated: boolean;
}>`
  width: ${({ $size }) => ($size === "large" ? "100%" : "100%")};
  background-color: ${colors.white};
  border: 1px solid
    ${({ $isActivated }) => ($isActivated ? colors.mainPink : colors.lightGrey)};
  padding: ${({ $size }) => ($size === "large" ? "1.5rem 0" : "1rem 0")};
  color: ${({ $isActivated }) =>
    $isActivated ? colors.mainPink : colors.lightGrey};
  font-weight: ${({ $isActivated }) => ($isActivated ? 700 : 400)};
  border-radius: ${({ $size }) => ($size === "large" ? "1.25rem" : "1rem")};
  font-size: 1rem;
`;

interface SelectButtonProps {
  buttonName: string;
  size?: "large" | "small";
  isActivated: boolean;
  onClick?: () => void;
}

export default function SelectButton({
  buttonName,
  size,
  isActivated,
  onClick,
}: SelectButtonProps) {
  return (
    <ButtonWrap $size={size} $isActivated={isActivated} onClick={onClick}>
      {buttonName}
    </ButtonWrap>
  );
}
