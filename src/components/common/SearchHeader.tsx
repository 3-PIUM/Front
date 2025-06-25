import styled from "styled-components";
import { VscChevronLeft } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { useLocale } from "../../context/LanguageContext";

const HeaderWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.white};
  padding: 0 1rem;
  z-index: 999;
`;

const LeftIcon = styled.div`
  display: flex;
  cursor: pointer;
  flex: 1;
`;

const RightIcons = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  cursor: pointer;
`;

interface FullHeaderProps {
  pageName: string;
  isVegan?: boolean;
  backPath?: string;
}

export default function SearchHeader({ backPath }: FullHeaderProps) {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <>
      <HeaderWrap>
        <LeftIcon
          onClick={() => {
            if (backPath) {
              navigate(backPath);
            } else {
              navigate(-1);
            }
          }}
        >
          <VscChevronLeft size={24} />
        </LeftIcon>
        <RightIcons>
          <IconWrapper onClick={() => navigate("/cart")}>
            <FiShoppingCart size={20} />
          </IconWrapper>
        </RightIcons>
      </HeaderWrap>
    </>
  );
}
