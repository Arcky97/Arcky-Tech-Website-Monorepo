"use client"
import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import 'photoswipe/style.css';
import clsx from "clsx";
import Image from "next/image";

type Align = "left" | "center" | "right";
type Size = "full" | "tiny" | "small" | "medium" | "large";

const alignMargins: Record<Align, string> = {
  left: "ml-0",
  center: "mx-auto",
  right: "ml-auto"
};

const sizeValues: Record<Size, string> = {
  full: "max-w-full",
  tiny: "max-w-1/5",
  small: "max-w-2/5",
  medium: "max-w-1/2",
  large: "max-w-4/5"
};

export interface MediaItem {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

interface MediaGalleryProps {
  items: MediaItem[];
  size: Size;
  align: Align;
  backdropOpacity?: number;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  size,
  align,
  backdropOpacity = 0.9
}) => {

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#pswp-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
      showHideAnimationType: "zoom",
      bgOpacity: backdropOpacity,
      easing: 'cubic-bezier(.4,0,.22,1)',
      zoomAnimationDuration: 300,
      wheelToZoom: true,
      closeOnVerticalDrag: true,
    });
    
    lightbox.init();

    return () => lightbox.destroy();
  }, [backdropOpacity]);

  return (
    <div
      id="pswp-gallery"
      className={clsx(
        "my-5 grid gap-3",
        sizeValues[size],
        alignMargins[align],
        `${items.length >= 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : items.length == 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1"
        }`
      )}
    >
      {items.map((item, idx) => {
        return (
          <div key={`gallery-${idx}`} className="relative">
            <a
              href={"/images/" + item.src}
              data-pswp-width={item.width}
              data-pswp-height={item.height}
              data-caption={item.alt || ""}
            >
              <Image
                src={"/images/" + item.src}
                alt={item.alt || ""}
                width={item.width}
                height={item.height}
                style={{ display: "block" }}
              />
            </a>
            {item.alt && (
              <p className="text-center text-[#ccc] text-sm mt-2">{item.alt}</p>
            )}
          </div>
        )
      })}
    </div>
  );
};