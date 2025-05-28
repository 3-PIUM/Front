import styled from "styled-components";
import colors from "../styles/colors";

interface StyledButtonProps {
  width?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${colors.mainPink};
  border: none;
  color: ${colors.white};
  font-size: 1rem;
  font-weight: 700;
  width: ${({ width }) => width || "100%"};
  padding: 1rem;
  border-radius: 1.25rem;
`;

interface ButtonProps {
  label: string;
  width?: string;
}

export default function Button({ label, width }: ButtonProps) {
  return <StyledButton width={width}>{label}</StyledButton>;
}
