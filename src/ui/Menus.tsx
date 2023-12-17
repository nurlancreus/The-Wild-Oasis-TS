import {
  ComponentPropsWithoutRef,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

type StyledListProps = {
  $position: { x: number; y: number };
};

const StyledList = styled.ul<StyledListProps>`
  position: absolute;
  z-index: 1000;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  width: 180px;

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface IMenusContext {
  openId: number | null;
  open: React.Dispatch<React.SetStateAction<number | null>>;
  close: () => void;
}

const MenusContext = createContext<IMenusContext>({} as IMenusContext);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<number | null>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function MenusMenu({ children }: { children: ReactNode }) {
  return <StyledMenu>{children}</StyledMenu>;
}

function MenusToggle({ id }: { id: number }) {
  const { openId, close, open } = useContext(MenusContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (openId === null || openId !== id) {
      open(id);
    } else close();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function MenusList({ id, children }: { id: number; children: ReactNode }) {
  const { openId, close } = useContext(MenusContext);

  const menuRef = useOutsideClick<HTMLUListElement>(close, false);

  if (openId !== id) return null;

  return (
    <StyledList ref={menuRef} $position={{ x: 32, y: 16 }}>
      {children}
    </StyledList>
  );
}

type MenusButtonProps = {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
} & ComponentPropsWithoutRef<"button">;

function MenusButton({ children, icon, onClick }: MenusButtonProps) {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton type="button" onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = MenusMenu;
Menus.Toggle = MenusToggle;
Menus.List = MenusList;
Menus.Button = MenusButton;

export default Menus;
