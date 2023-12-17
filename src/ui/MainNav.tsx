import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const navListItems = [
  {
    id: 1,
    to: "dashboard",
    label: "Home",
    icon: <HiOutlineHome />,
  },
  {
    id: 2,
    to: "bookings",
    label: "Bookings",
    icon: <HiOutlineCalendarDays />,
  },
  {
    id: 3,
    to: "cabins",
    label: "Cabins",
    icon: <HiOutlineHomeModern />,
  },
  {
    id: 4,
    to: "users",
    label: "Users",
    icon: <HiOutlineUsers />,
  },
  {
    id: 5,
    to: "settings",
    label: "Settings",
    icon: <HiOutlineCog6Tooth />,
  },
];

function MainNav() {
  return (
    <nav>
      <NavList>
        {navListItems.map((listItem) => (
          <li key={listItem.id}>
            <StyledNavLink to={listItem.to}>
              {listItem.icon}
              <span>{listItem.label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}

export default MainNav;
