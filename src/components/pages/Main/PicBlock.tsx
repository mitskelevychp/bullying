"use client";
import { useState } from "react";
import Image from "next/image";
import "./picBlock.css";

export const PicBlock = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="absolute left-0 top-0 w-full h-full p-5 md:p-10 flex flex-col justify-center md:flex-row gap-x-2">
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

      <div className="md:w-[65%] xl:w-[70%] flex items-center justify-start">
        Text
      </div>
    </div>
  );
};
