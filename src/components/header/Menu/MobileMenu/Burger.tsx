import { FC } from "react";
import { Twirl as Hamburger } from "hamburger-react";
import { BurgerProps } from "@/types/menu";

export const Burger: FC<BurgerProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`md:hidden ${
        isOpen
          ? "fixed top-[76px] right-[5px] z-3"
          : "absolute top-[3px] right-[5px] z-2"
      }`}
    >
      <Hamburger
        toggled={isOpen}
        onToggle={setIsOpen}
        size={20}
        duration={0.2}
        color={`${isOpen ? "#fff" : "#000"}`}
        easing="ease-in"
      />
    </div>
  );
};
