import styled from "styled-components";
import colors from "../../styles/colors";

interface StyledButtonProps {
  width?: string;
  backgroundColor?: string;
  color?: string;
  border?: string;
  disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ backgroundColor, disabled }) =>
    disabled ? colors.lightGrey : backgroundColor || colors.mainPink};
  border: ${({ border }) => border || "none"};
  color: ${({ color, disabled }) =>
    disabled ? colors.mediumGrey : color || colors.white};
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
  disabled?: boolean;
}

export default function Button({
  label,
  width,
  backgroundColor,
  color,
  border,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <StyledButton
      width={width}
      backgroundColor={backgroundColor}
      color={color}
      border={border}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
}
