import styled from "styled-components";
import colors from "../styles/colors";

interface StyledButtonProps {
  width?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || colors.mainPink};
  border: ${({ border }) => border || "none"};
  color: ${({ color }) => color || colors.white};
  font-size: 1rem;
  font-weight: 700;
  width: ${({ width }) => width || "100%"};
  padding: 1rem;
  border-radius: 1.25rem;
  cursor: pointer;
`;

interface ButtonProps {
  label: string;
  width?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  onClick?: () => void;
}

export default function Button({
  label,
  width,
  backgroundColor,
  color,
  border,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  );
}
