// src/layouts/MenuLayout.tsx
import styled from "styled-components";
import { Outlet, Link, useLocation } from "react-router-dom";
import { LuMenu, LuSquareMenu, LuScanLine } from "react-icons/lu";
import {
  FaRegFileLines,
  FaFileLines,
  FaRegHeart,
  FaHeart,
  FaRegUser,
  FaUser,
} from "react-icons/fa6";
import colors from "../styles/colors";

const MenuWrap = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 1rem;
  width: 100%;
  background-color: ${colors.white};
  z-index: 1000;
`;

const Menu = styled.div`
  display: flex;
  height: 4.75rem;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.div<{ $active: boolean }>`
  display: flex;
  width: 4.2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const MenuText = styled.div<{ $active: boolean }>`
  font-size: 0.75rem;
  color: ${({ $active }) => ($active ? colors.mainPink : colors.lightGrey)};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ScanMenuWrapper = styled.div`
  position: absolute;
  top: -1.75rem;
  left: 50%;
  transform: translateX(-50%);
`;

const ScanMenu = styled.div`
  background-color: ${colors.mainPink};
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;

export default function MenuLayout() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const leftMenu = [
    {
      path: "/category",
      label: "카테고리",
      icon: <LuMenu fontSize="1.25rem" color={colors.lightGrey} />,
      activeIcon: <LuSquareMenu fontSize="1.25rem" color={colors.mainPink} />,
    },
    {
      path: "/home",
      label: "성분리포트",
      icon: <FaRegFileLines fontSize="1.25rem" color={colors.lightGrey} />,
      activeIcon: <FaFileLines fontSize="1.25rem" color={colors.mainPink} />,
    },
  ];

  const rightMenu = [
    {
      path: "/wishlist",
      label: "찜",
      icon: <FaRegHeart fontSize="1.25rem" color={colors.lightGrey} />,
      activeIcon: <FaHeart fontSize="1.25rem" color={colors.mainPink} />,
    },
    {
      path: "/mypage",
      label: "마이페이지",
      icon: <FaRegUser fontSize="1.25rem" color={colors.lightGrey} />,
      activeIcon: <FaUser fontSize="1.25rem" color={colors.mainPink} />,
    },
  ];

  return (
    <>
      <Outlet />
      <MenuWrap>
        <Menu>
          {leftMenu.map(({ path, label, icon, activeIcon }) => (
            <StyledLink to={path} key={path}>
              <MenuButton $active={isActive(path)}>
                {isActive(path) ? activeIcon : icon}
                <MenuText $active={isActive(path)}>{label}</MenuText>
              </MenuButton>
            </StyledLink>
          ))}

          <ScanMenuWrapper>
            <StyledLink to="/scan">
              <ScanMenu>
                <LuScanLine fontSize="2rem" color={colors.white} />
              </ScanMenu>
            </StyledLink>
          </ScanMenuWrapper>

          {rightMenu.map(({ path, label, icon, activeIcon }) => (
            <StyledLink to={path} key={path}>
              <MenuButton $active={isActive(path)}>
                {isActive(path) ? activeIcon : icon}
                <MenuText $active={isActive(path)}>{label}</MenuText>
              </MenuButton>
            </StyledLink>
          ))}
        </Menu>
      </MenuWrap>
    </>
  );
}
