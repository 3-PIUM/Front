import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();

  return (
    <IconWrapper onClick={() => navigate("/cart")}>
      <FiShoppingCart size={22} />
    </IconWrapper>
  );
};

export default CartIcon;

const IconWrapper = styled.div`
  cursor: pointer;
`;
