"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  size: number;
};

export default function FadeImage({src, alt, size}: Props) {
  const [curSrc, setCurSrc] = useState(src);
  const [prevSrc, setPrevSrc] = useState<string | null>(null);
  const [curSize, setCurSize] = useState(size);

  useEffect(() => {
    if (src !== curSrc) {
      setPrevSrc(curSrc);
      setCurSrc(src);
    }
  }, [src, curSrc]);

  useEffect(() => {
    setCurSize(size);
  }, [size]);

  return (
    <div 
      className="relative transition-[width,height] duration-400 ease-in-out delay-600"
      style={{ width: curSize, height: curSize }}
    >
      {prevSrc && prevSrc !== curSrc && (
        <Image
          key={`prev-${prevSrc}`}
          src={prevSrc}
          alt={alt}
          fill 
          className="object-contain absolute inset-0 opacity-0 FadeImageOut"
        />
      )}

      <Image
        key={`prev-${curSrc}`}
        src={curSrc}
        alt={alt}
        fill
        className="object-contain absolute inset-0 opacity-1 FadeImageIn z-2"
      />
    </div>
  )
}