import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { LuMenu, LuSquareMenu } from "react-icons/lu";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegUser, FaUser } from "react-icons/fa6";
import colors from "../styles/colors";
import { LuScanLine } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy } from "react";
const ChatBotButton = lazy(() => import("../components/chatbot/ChatBotButton"));
import { useLocale } from "../context/LanguageContext";

const MenuWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 1rem;
  width: 100%;
  justify-content: center;
  background-color: ${colors.white};
  z-index: 1000;
`;

const Menu = styled.div`
  display: flex;
  height: 5.7rem;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 1.2rem;
`;

const MenuLeft = styled.div`
  display: flex;
`;

const MenuRight = styled.div`
  display: flex;
`;

const MenuButton = styled.div<{ $active: boolean }>`
  display: flex;
  width: 4.2rem;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuText = styled.div<{ $active: boolean }>`
  display: flex;
  font-size: 0.75rem;
  color: ${({ $active }) => ($active ? colors.mainPink : colors.mediumGrey)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;

const ScanMenu = styled.div`
  display: flex;
  position: absolute;
  background-color: ${colors.mainPink};
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
`;

const ScanIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  color: inherit;
`;

const ClickableDiv = styled.div`
  display: flex;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
`;

export default function MenuLayout() {
  const { t } = useLocale();
  const navigate = useNavigate();

  const leftmenuItems = [
    {
      path: "/category",
      label: t.menuLayout.category,
      icon: <LuMenu fontSize="1.25rem" color={colors.mediumGrey} />,
      activeIcon: <LuSquareMenu fontSize="1.25rem" color={colors.mainPink} />,
    },
    {
      path: "/",
      label: t.menuLayout.home,
      icon: <GoHome fontSize="1.25rem" color={colors.mediumGrey} />,
      activeIcon: <GoHomeFill fontSize="1.25rem" color={colors.mainPink} />,
    },
  ];

  const rightMenuItems = [
    {
      path: "/wishlist",
      label: t.menuLayout.wishlist,
      icon: <FaRegHeart fontSize="1.25rem" color={colors.mediumGrey} />,
      activeIcon: <FaHeart fontSize="1.25rem" color={colors.mainPink} />,
    },
    {
      path: "/mypage",
      label: t.menuLayout.mypage,
      icon: <FaRegUser fontSize="1.25rem" color={colors.mediumGrey} />,
      activeIcon: <FaUser fontSize="1.25rem" color={colors.mainPink} />,
    },
  ];

  const location = useLocation();
  console.log(location.pathname);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <Outlet />
      {!["/product-detail", "/scan"].some((path) =>
        location.pathname.includes(path)
      ) && (
        <Suspense fallback={null}>
          <ChatBotButton />
        </Suspense>
      )}
      <MenuWrap>
        <Menu>
          <MenuLeft>
            {leftmenuItems.map(({ path, label, icon, activeIcon }) => {
              const isCategory = path === "/category";

              if (isCategory) {
                return (
                  <ClickableDiv
                    key={path}
                    onClick={() =>
                      navigate("/category", { state: { reset: true } })
                    }
                  >
                    <MenuButton $active={isActive(path)}>
                      {isActive(path) ? activeIcon : icon}
                      <MenuText $active={isActive(path)}>{label}</MenuText>
                    </MenuButton>
                  </ClickableDiv>
                );
              }

              return (
                <StyledLink to={path} key={path}>
                  <MenuButton $active={isActive(path)}>
                    {isActive(path) ? activeIcon : icon}
                    <MenuText $active={isActive(path)}>{label}</MenuText>
                  </MenuButton>
                </StyledLink>
              );
            })}
          </MenuLeft>
          <MenuRight>
            {rightMenuItems.map(({ path, label, icon, activeIcon }) => (
              <StyledLink to={path} key={path}>
                <MenuButton $active={isActive(path)}>
                  {isActive(path) ? activeIcon : icon}
                  <MenuText $active={isActive(path)}>{label}</MenuText>
                </MenuButton>
              </StyledLink>
            ))}
          </MenuRight>
        </Menu>
        <StyledLink to="/scan">
          <ScanMenu>
            <ScanIcon>
              <LuScanLine fontSize={"2.5rem"} color={colors.white} />
            </ScanIcon>
          </ScanMenu>
        </StyledLink>
      </MenuWrap>
    </>
  );
}
