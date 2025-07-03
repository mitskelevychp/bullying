// "use client";

// import React, { FC, useRef, useEffect } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// // import { partners } from "@/data/seoPage/partners";

// export interface ChromaItem {
//   image: string;
//   title: string;
//   subtitle: string;
//   borderColor?: string;
//   gradient?: string;
// }

// export interface ChromaGridProps {
//   items?: ChromaItem[];
//   className?: string;
//   radius?: number;
//   damping?: number;
//   fadeOut?: number;
//   ease?: string;
// }

// type SetterFn = (v: number | string) => void;

// export const ChromaGrid: FC<ChromaGridProps> = ({
//   items,
//   className = "",
//   radius = 300,
//   damping = 0.45,
//   fadeOut = 0.6,
//   ease = "power3.out",
// }) => {
//   const rootRef = useRef<HTMLDivElement>(null);
//   const fadeRef = useRef<HTMLDivElement>(null);
//   const setX = useRef<SetterFn | null>(null);
//   const setY = useRef<SetterFn | null>(null);
//   const pos = useRef({ x: 0, y: 0 });

//   const data = items?.length ? items : partners;

//   useEffect(() => {
//     const el = rootRef.current;
//     if (!el) return;
//     setX.current = gsap.quickSetter(el, "--x", "px") as SetterFn;
//     setY.current = gsap.quickSetter(el, "--y", "px") as SetterFn;
//     const { width, height } = el.getBoundingClientRect();
//     pos.current = { x: width / 2, y: height / 2 };
//     setX.current(pos.current.x);
//     setY.current(pos.current.y);
//   }, []);

//   const moveTo = (x: number, y: number) => {
//     gsap.to(pos.current, {
//       x,
//       y,
//       duration: damping,
//       ease,
//       onUpdate: () => {
//         setX.current?.(pos.current.x);
//         setY.current?.(pos.current.y);
//       },
//       overwrite: true,
//     });
//   };

//   const handleMove = (e: React.PointerEvent) => {
//     const r = rootRef.current!.getBoundingClientRect();
//     moveTo(e.clientX - r.left, e.clientY - r.top);
//     gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
//   };

//   const handleLeave = () => {
//     gsap.to(fadeRef.current, {
//       opacity: 1,
//       duration: fadeOut,
//       overwrite: true,
//     });
//   };

//   // const handleCardClick = (url?: string) => {
//   //   if (url) window.open(url, "_blank", "noopener,noreferrer");
//   // };

//   const handleCardMove: React.MouseEventHandler<HTMLElement> = (e) => {
//     const c = e.currentTarget as HTMLElement;
//     const rect = c.getBoundingClientRect();
//     c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
//     c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
//   };

//   return (
//     <div
//       ref={rootRef}
//       onPointerMove={handleMove}
//       onPointerLeave={handleLeave}
//       className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
//       style={
//         {
//           "--r": `${radius}px`,
//           "--x": "50%",
//           "--y": "50%",
//         } as React.CSSProperties
//       }
//     >
//       {data.map((c, i) => (
//         <article
//           key={i}
//           onMouseMove={handleCardMove}
//           // onClick={() => handleCardClick(c.url)}
//           className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
//           style={
//             {
//               "--card-border": c.borderColor || "transparent",
//               background: c.gradient,
//               "--spotlight-color": "rgba(255,255,255,0.3)",
//             } as React.CSSProperties
//           }
//         >
//           <div
//             className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
//             style={{
//               background:
//                 "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
//             }}
//           />
//           <div className="relative z-10 flex-1 p-[10px] box-border">
//             <Image
//               width={200}
//               height={300}
//               src={c.image}
//               alt={c.title}
//               loading="lazy"
//               className="w-full h-full object-cover rounded-[10px]"
//             />
//           </div>
//           <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
//             <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
//             <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
//           </footer>
//         </article>
//       ))}
//       <div
//         className="absolute inset-0 pointer-events-none z-30"
//         style={{
//           backdropFilter: "grayscale(1) brightness(0.78)",
//           WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
//           background: "rgba(0,0,0,0.001)",
//           maskImage:
//             "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
//           WebkitMaskImage:
//             "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)",
//         }}
//       />
//       <div
//         ref={fadeRef}
//         className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
//         style={{
//           backdropFilter: "grayscale(1) brightness(0.78)",
//           WebkitBackdropFilter: "grayscale(1) brightness(0.78)",
//           background: "rgba(0,0,0,0.001)",
//           maskImage:
//             "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
//           WebkitMaskImage:
//             "radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)",
//           opacity: 1,
//         }}
//       />
//     </div>
//   );
// };
