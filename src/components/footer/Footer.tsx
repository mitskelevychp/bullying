"use client";
import { FC } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Icon } from "../header/Icon";

// const Logo = () => {
//   const path = usePathname();
//   return path === "/" ? (
//     <div className="flex justify-start items-center text-xl text-black font-bold">
//       ForBiz&nbsp;<span className="text-amber-400">U</span>
//       <span className="text-blue-600">A</span>
//     </div>
//   ) : (
//     <Link
//       href="/"
//       className="flex justify-start items-center text-xl text-black font-bold"
//     >
//       ForBiz&nbsp;<span className="text-amber-400">U</span>
//       <span className="text-blue-600">A</span>
//     </Link>
//   );
// };

export const Footer: FC = () => {
  // const path = usePathname();

  return (
    <footer className="w-[100%] flex flex-col text-violet-950 px-[20px] md:pt-[20px] md:pb-[40px] md:pl-[70px] md:pr-[70px] xl:px-[140px] border-[#DFDFDF] border-t-1">
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-12 lg:gap-6 pt-[50px] md:pt-[50px] lg:pt-[76px]"></div>
      <div className="flex flex-col justify-center items-center mt-[40px] pt-[20px] pb-[30px] md:pb-[30px] text-decor-footer border-[#DFDFDF] border-t-1">
        {/* TODO: */}
        <p>Copyright &copy; 2025 ForBiz UA. All rights reserved</p>
        <Link href="/privacy-policy" className="hover:underline">
          Політика конфіденційності
        </Link>
      </div>
    </footer>
  );
};
