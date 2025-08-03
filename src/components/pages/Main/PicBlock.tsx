"use client";
import { useState } from "react";
import Image from "next/image";
import "./picBlock.css";

export const PicBlock = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute left-0 top-0 w-full h-full p-5 md:p-10 flex flex-col justify-center items-center md:flex-row gap-x-10">
      <div
        className="relative w-full h-full md:w-[35%] xl:w-[30%] hidden md:flex justify-center md:justify-start items-start md:items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src="/images/mainPage/boy-1.jpg"
          alt="boy-1"
          width={300}
          height={300}
          className={`
      absolute object-cover transition-all duration-500
      rounded-full lg:w-full
      ${isHovered ? "opacity-0 grayscale" : "opacity-100 grayscale"}
      image-mask
    `}
        />
        <Image
          src="/images/mainPage/boy-2.jpg"
          alt="boy-2"
          width={300}
          height={300}
          className={`
      absolute object-cover transition-all duration-500
      rounded-full lg:w-full
      ${isHovered ? "opacity-100 filter-none" : "opacity-0 filter-none"}
      image-mask
    `}
        />
      </div>

      <div className="w-full md:h-[100%] md:w-[65%] xl:w-[70%] flex flex-col items-start justify-start md:pt-0 md:justify-center lg:justify-start lg:pt-15 xl:pt-20">
        <h1 className="text-h1 color-white md:text-[40px] lg:text-[80px]">
          Сайт про <span className="color-accent">булінг</span> та людей
        </h1>
        <p className="text-sm md:text-[20px] color-white pl-2">
          {/* щоб <span className="text-under-h1">повернути в життя кольори</span> */}
          Повернути собі <span className="text-under-h1">свою волю</span>
        </p>
      </div>
    </div>
  );
};
