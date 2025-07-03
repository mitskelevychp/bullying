// export interface MainMenuProps {
//   isDevelopingMenuOpen: boolean;
//   setDevelopingMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   isSeoMenuOpen: boolean;
//   setSeoMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

export interface SubMenuProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export interface BurgerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export interface SubMenuItemProps {
  setMenuOpen: (isOpen: boolean) => void;
}
