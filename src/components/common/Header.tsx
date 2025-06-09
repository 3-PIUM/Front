import styled from "styled-components";
import colors from "../../styles/colors";

const Header = styled.header<{ bgColor?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  background-color: ${({ bgColor }) => bgColor || colors.white};

  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

export default Header;
