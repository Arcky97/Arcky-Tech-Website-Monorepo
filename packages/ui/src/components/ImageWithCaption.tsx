"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { LoopingVideo } from "./LoopingVideo";

type Align = "left" | "center" | "right";
type Size = "full" | "tiny" | "small" | "medium" | "large";

const alignMargins: Record<Align, string> = {
  left: "ml-0",
  center: "mx-auto",
  right: "ml-auto"
};

const sizeValues: Record<Size, string> = {
  full: "max-w-full",
  tiny: "max-w-1/6",
  small: "max-w-2/5",
  medium: "max-w-3/5",
  large: "max-w-4/5"
};

export function ImageWithCaption ({
  src,
  alt,
  caption,
  align = "center",
  size = "medium"
}: {
  src: string;
  alt?: string;
  caption?: string;
  align?: Align;
  size?: Size;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [thumbnailRect, setThumbnailRect] = useState<DOMRect | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const modalImgRef = useRef<HTMLDivElement>(null);

  const isVideo = (src: string) => src.toLowerCase().endsWith(".mp4");

  const handleOpen = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setThumbnailRect(rect);
    }
    setShowModal(true);
    setTimeout(() => setIsOpen(true), 10);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setShowModal(false);
      setThumbnailRect(null);
    }, 200);
  };

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }, 150)
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Normal Image or Video with Caption */}
      <figure
        className={clsx("my-5", sizeValues[size], alignMargins[align])}
      >
        <div
          ref={imageRef}
          className={clsx(isVideo(src) && "aspect-video")}
        >
          {isVideo(src) ? (
            <LoopingVideo
              src={src}
              className="rounded-lg w-full h-full bg-transparent object-contain select-none cursor-zoom-in"
              onClick={handleOpen}
            />
          ) : (
            <Image
              src={src}
              alt={alt ?? "Image not found"}
              width={500}
              height={500}
              className="rounded-lg border-white w-full select-none cursor-zoom-in"
              onClick={handleOpen}
              ref={imageRef}
              unoptimized
            />
          )}
        </div>
        {caption && (
          <figcaption className="text-center text-[#ccc] text-sm mt-2">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Zoom Modal */}
      {showModal && thumbnailRect && (
        <div
          className={`z-150 w-full h-full inset-0 fixed bg-tint-base/4 backdrop-blur-xl ${isOpen ? 'opacity-100' : 'opacity-0'} transition-all duration-500 ease-in-out`}
          onClick={handleClose}
        >
          <div
            ref={modalImgRef}
            className={clsx(
              "absolute transition-all duration-300 ease-in-out p-5"
            )}
            style={{
              top: isOpen ? "0" : `${thumbnailRect.top}px`,
              left: isOpen ? "0" : `${thumbnailRect.left}px`,
              width: isOpen ? "100vw" : `${thumbnailRect.width}px`,
              height: isOpen ? "100vh" : `${thumbnailRect.height}px`,
              transform: isOpen
                ? "translate(0, 0) scale(1)"
                : "translate(0, 0) scale(1)",
            }}
          >
            {isVideo(src) ? (
              <LoopingVideo
                src={src}
                className="w-full h-full bg-transparent object-contain rounded-lg mx-auto select-none cursor-zoom-out"
              />
            ) : (
              <Image
                src={src}
                alt={alt || ""}
                width={1000}
                height={1000}
                className="w-full h-full object-contain rounded-lg mx-auto select-none cursor-zoom-out"
              />
            )}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              aria-label="Close Image"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};
