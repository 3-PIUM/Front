import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";

const CartIcon = () => {
  return (
    <IconWrapper>
      <FiShoppingCart size={22} />
    </IconWrapper>
  );
};

export default CartIcon;

const IconWrapper = styled.div`
  cursor: pointer;
`;
