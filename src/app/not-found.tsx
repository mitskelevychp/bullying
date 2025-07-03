import Link from "next/link";
import { FuzzyText } from "@/components";

export default function NotFound() {
  return (
    <div className="my-[100px]">
      <div className="hidden container md:flex gap-y-5 flex-col items-center">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="#3c0366"
          fontSize="150px"
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="#3c0366"
          fontSize="60px"
        >
          not found
        </FuzzyText>
      </div>
      <div className="container flex gap-y-5 flex-col items-center md:hidden">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="#3c0366"
          fontSize="100px"
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover={true}
          color="#3c0366"
          fontSize="50px"
        >
          not found
        </FuzzyText>
      </div>
      <div className="flex flex-col mt-10 items-center text-purple-950">
        <h1 className="h2 ">Сторінка не існує</h1>
        <p>Ми ще не створили такої сторінки...</p>
        <Link
          href="/"
          className="bg-amber-400 border-none text-white button-text h-[35px] lg:h-[50px] w-[100px] md:w-[170px] lg:w-[200px] cursor-pointer hover:bg-yellow-600 rounded-2xl mt-5 flex justify-center items-center"
        >
          На головну
        </Link>
      </div>
    </div>
  );
}
