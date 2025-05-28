import styled from "styled-components";
import { FiSearch } from "react-icons/fi";

const SearchIcon = () => {
  return (
    <IconWrapper>
      <FiSearch size={22} />
    </IconWrapper>
  );
};

export default SearchIcon;

const IconWrapper = styled.div`
  cursor: pointer;
`;
