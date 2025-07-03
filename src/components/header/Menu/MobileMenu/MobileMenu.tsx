"use client";
import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { Burger, ContactsMobileMenu } from "@/components";
import { Burger } from "@/components";
import { MobileMenuProps } from "@/types/menu";

// const Logo = () => {
// const path = usePathname();
//   return path === "/" ? (
//     <p className="flex justify-center items-center text-2xl text-black font-bold">
//       ForBiz&nbsp;<span className="text-amber-400">U</span>
//       <span className="text-blue-600">A</span>
//     </p>
//   ) : (
//     <Link
//       href="/"
//       className="flex justify-center items-center text-2xl text-black font-bold"
//     >
//       ForBiz&nbsp;<span className="text-amber-400">U</span>
//       <span className="text-blue-600">A</span>
//     </Link>
//   );
// };

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, setOpen }) => {
  const path = usePathname();

  return (
    <>
      <Burger isOpen={isOpen} setIsOpen={setOpen} />
      <nav
        className={`
          flex flex-col gap-y-[10px]
          fixed top-0 right-0 px-[20px] pt-[40px]
          h-screen w-full bg-violet-700
          transition-transform duration-500 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-1
          text-white
        `}
      >
        {/* <Logo /> */}

        <ul className="flex flex-col gap-2 py-2 pl-5 border-l-2 border-white">
          <li>
            {path === "/about" ? (
              "Як ми працюємо"
            ) : (
              <Link href="/about" onClick={() => setOpen(false)}>
                <span>Як ми працюємо</span>
              </Link>
            )}
          </li>
          <li>
            {path === "/developing#business-card-website" ? (
              "Розробка сайтів"
            ) : (
              <Link
                href="/developing#business-card-website"
                onClick={() => setOpen(false)}
              >
                <span>Розробка сайтів</span>
              </Link>
            )}
          </li>
          <li>
            {path === "/seo#seo-optimization" ? (
              "SEO-оптимізація"
            ) : (
              <Link href="/seo#seo-optimization" onClick={() => setOpen(false)}>
                <span>SEO-оптимізація</span>
              </Link>
            )}
          </li>
        </ul>

        {/* <ContactsMobileMenu /> */}
      </nav>
    </>
  );
};
