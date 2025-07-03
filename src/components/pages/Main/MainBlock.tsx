import { Background } from "./Background";
import { PicBlock } from "./PicBlock";
import "./mainBlock.css";

export function MainBlock() {
  return (
    <div className="container relative mx-auto flex flex-col md:flex-row md:gap-x-1 lg:gap-x-4 xl:gap-x-8 2xl:gap-x-0 md:justify-between pt-[80px] md:pt-[60px] pb-[100px] md:pb-[200px] px-5 blockContainer text-xs">
      <Background />
      <PicBlock />
    </div>
  );
}
