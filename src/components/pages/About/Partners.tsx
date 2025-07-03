"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { partners } from "@/data/partnersPhoto";

const images = partners;

export const Partners = () => {
  const [screenWidth, setScreenWidth] = useState(1200);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScreenWidth = () => setScreenWidth(window.innerWidth);
    updateScreenWidth();
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  // Розраховуємо параметри
  const itemWidth = 200 + 16; // ширина картинки + margins
  const itemsNeeded = Math.ceil(screenWidth / itemWidth) + images.length;

  const extendedImages = [];
  for (let i = 0; i < itemsNeeded; i++) {
    extendedImages.push(images[i % images.length]);
  }

  const singleSetWidth = itemWidth * extendedImages.length;
  const speed = 50; // пікселів за секунду

  // Автоматична анімація з потрійним буфером
  useEffect(() => {
    let animationId: number | null = null;

    const animate = () => {
      if (!isHovered && !isDragging) {
        setCurrentTranslate((prev) => {
          const newTranslate = prev + speed / 60;

          if (newTranslate >= singleSetWidth) {
            return newTranslate - singleSetWidth;
          }

          return newTranslate;
        });
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isHovered, isDragging, singleSetWidth, speed]);

  // Обробники миші для перетягування
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.clientX;
    const deltaX = startX - currentX;

    setCurrentTranslate((prev) => {
      const newTranslate = prev + deltaX * 0.5;

      // Потрійний буфер для ручного керування
      if (newTranslate >= singleSetWidth) {
        return newTranslate - singleSetWidth;
      } else if (newTranslate < 0) {
        return newTranslate + singleSetWidth;
      }

      return newTranslate;
    });

    setStartX(currentX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  // Обробники дотику
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const currentX = e.touches[0].clientX;
    const deltaX = startX - currentX;

    setCurrentTranslate((prev) => {
      const newTranslate = prev + deltaX * 0.5;

      if (newTranslate >= singleSetWidth) {
        return newTranslate - singleSetWidth;
      } else if (newTranslate < 0) {
        return newTranslate + singleSetWidth;
      }

      return newTranslate;
    });

    setStartX(currentX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Плавний обробник колеса миші
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    setCurrentTranslate((prev) => {
      const newTranslate = prev + e.deltaX * 0.5 + e.deltaY * 0.3;

      if (newTranslate >= singleSetWidth) {
        return newTranslate - singleSetWidth;
      } else if (newTranslate < 0) {
        return newTranslate + singleSetWidth;
      }

      return newTranslate;
    });
  };

  // Обробники наведення
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  return (
    <div className="w-[100%] relative bg-[#9446ed] mt-[50px] lg:mt-0 md:mt-[100px]">
      <div className="xl:w-[100%] xl:mx-[0px] relative z-2">
        <div className="pt-[150px] md:pt-[150px] pb-[50px] md:pb-[150px]">
          {/* TODO: */}
          <h2 className="h2 text-center text-white">Партнери та замовники</h2>
          <div className="w-full overflow-hidden bg-[#9446ed] pt-10 pb-8">
            <div
              ref={sliderRef}
              className="slider-container overflow-hidden whitespace-nowrap relative cursor-grab select-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
              }}
            >
              <div
                className="slider-track inline-flex"
                style={{
                  transform: `translateX(-${currentTranslate}px)`,
                  width: `${singleSetWidth * 3}px`,
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                }}
              >
                {extendedImages.map((src, index) => (
                  <div
                    key={`first-${index}`}
                    className="slider-item mx-6 flex items-center flex-shrink-0"
                  >
                    <Image
                      width={200}
                      height={250}
                      src={src}
                      alt={`Slide ${(index % images.length) + 1}`}
                      className="object-cover rounded-lg duration-300 pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}

                {extendedImages.map((src, index) => (
                  <div
                    key={`second-${index}`}
                    className="slider-item mx-6 flex items-center flex-shrink-0"
                  >
                    <Image
                      width={200}
                      height={250}
                      src={src}
                      alt={`Slide ${(index % images.length) + 1}`}
                      className="object-cover rounded-lg duration-300 pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}

                {extendedImages.map((src, index) => (
                  <div
                    key={`third-${index}`}
                    className="slider-item mx-6 flex items-center flex-shrink-0"
                  >
                    <Image
                      width={200}
                      height={250}
                      src={src}
                      alt={`Slide ${(index % images.length) + 1}`}
                      className="object-cover rounded-lg duration-300 pointer-events-none"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
