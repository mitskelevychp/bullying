import Image from "next/image";

export const PicBlock = () => {
  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center p-10">
      <div className="flex w-[90%] h-[90%]">
        <div className="flex w-[300px] h-[300px]">
          <Image
            src="/images/mainPage/boy-1.jpg"
            alt=""
            width={350}
            height={350}
          />
        </div>
        <div>Text</div>
      </div>
    </div>
  );
};
