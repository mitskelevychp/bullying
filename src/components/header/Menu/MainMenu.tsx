"use client";
// import { FC, useRef, useEffect, useCallback } from "react";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { MainMenuProps } from "@/types/menu";

export const MainMenu: FC = ({}) => {
  const path = usePathname();

  // const handleClickOutside = useCallback(
  //   (event: MouseEvent) => {
  //     if (
  //       menuDevelopingRef.current &&
  //       !menuDevelopingRef.current.contains(event.target as Node)
  //     ) {
  //       setDevelopingMenuOpen(false);
  //       setSeoMenuOpen(false);
  //     } else if (
  //       menuSeoRef.current &&
  //       !menuSeoRef.current.contains(event.target as Node)
  //     ) {
  //       setSeoMenuOpen(false);
  //     }
  //   },
  //   [setDevelopingMenuOpen, setSeoMenuOpen]
  // );
  // useEffect(() => {
  //   if (isDevelopingMenuOpen || isSeoMenuOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isDevelopingMenuOpen, isSeoMenuOpen, handleClickOutside]);

  return (
    <nav className="hidden md:flex justify-end items-center w-full md:mr-6 xl:mr-10">
      <ul className="flex justify-between items-center w-[250px] md:w-[550px] lg:w-[600px] xl:w-[750px] text-sm xl:text-lg text-usual uppercase">
        <li className="flex justify-center items-center hover:text-stone-600 hover:text-shadow-lg">
          {path === "/about" ? (
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-600 text-white">
              <span className="relative text-white text-shadow-lg">
                Про проєкт
              </span>
            </span>
          ) : (
            <Link href="/about" className="flex justify-center items-center">
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 hover:before:bg-orange-600 hover:text-white">
                <span className="relative hover:text-shadow-lg">
                  Про проєкт
                </span>
              </span>
            </Link>
          )}
        </li>
        <li className="hover:text-shadow-lg">
          {path === "/materials" ? (
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-600 text-white">
              <span className="relative text-white text-shadow-lg">
                Матеріали
              </span>
            </span>
          ) : (
            <Link href="/materials">
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 hover:before:bg-orange-600 hover:text-white">
                <span className="relative hover:text-shadow-lg">Матеріали</span>
              </span>
            </Link>
          )}
        </li>
        <li className="hover:text-shadow-lg">
          {path === "/what-to-do" ? (
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-600 text-white">
              <span className="relative text-white text-shadow-lg">
                Що робити?
              </span>
            </span>
          ) : (
            <Link href="/what-to-do">
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 hover:before:bg-orange-600 hover:text-white">
                <span className="relative hover:text-shadow-lg">
                  Що робити?
                </span>
              </span>
            </Link>
          )}
        </li>
        <li className="hover:text-shadow-lg">
          {path === "/support-project" ? (
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-600 text-white">
              <span className="relative text-white text-shadow-lg">
                Підтримати проєкт
              </span>
            </span>
          ) : (
            <Link href="/support-project">
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 hover:before:bg-orange-600 hover:text-white">
                <span className="relative hover:text-shadow-lg">
                  Підтримати проєкт
                </span>
              </span>
            </Link>
          )}
        </li>
        <li className="hover:text-shadow-lg">
          {path === "/contacts" ? (
            <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-600 text-white">
              <span className="relative text-white text-shadow-lg">
                Контакти
              </span>
            </span>
          ) : (
            <Link href="/contacts">
              <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 hover:before:bg-orange-600 hover:text-white">
                <span className="relative hover:text-shadow-lg">Контакти</span>
              </span>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
