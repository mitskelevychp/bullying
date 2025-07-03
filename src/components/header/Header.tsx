"use client";
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu, MainMenu } from "@/components";
import { Button } from "../ui/button";
import { ContactFormModal } from "@/components/ui/contact-form-modal";
import "./header.css";

const Logo = () => {
  const path = usePathname();
  return path === "/" ? (
    <div className="w-[150px] flex justify-start items-center text-3xl text-black text-headline">
      Про булінг
    </div>
  ) : (
    <Link
      href="/"
      className="w-[150px] flex justify-start items-center text-3xl text-black text-headline"
    >
      Про булінг
    </Link>
  );
};

export const Header: FC = () => {
  const [isBurgerOpen, setBurgerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isBurgerOpen]);

  return (
    <header className="w-[100%] md:py-[20px] md:px-[20px] md:text-base">
      <div className="container relative md:h-[77px] lg:h-auto flex justify-between bg-white py-[10px] md:rounded-md md:py-[15px] xl:py-[25px] md:mt-5">
        <div className="ml-5 md:ml-0">
          <Logo />
        </div>
        <MainMenu />
        <MobileMenu isOpen={isBurgerOpen} setOpen={setBurgerOpen} />
        <div className="hidden lg:flex items-center">
          <Button
            className="bg-orange-600 text-white border-transparent h-[35px] lg:h-[40px] w-[100px] md:w-[120px] lg:w-[170px] cursor-pointer hover:bg-white hover:text-orange-600 hover:border-orange-600 transition-colors uppercase text-xs lg:text-sm xl:text-lg"
            onClick={handleOrderClick}
          >
            Написати
          </Button>
          <ContactFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isItPurchase={false}
          />
        </div>
      </div>
    </header>
  );
};
