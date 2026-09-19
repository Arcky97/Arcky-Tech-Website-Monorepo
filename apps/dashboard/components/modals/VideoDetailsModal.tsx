import { YoutubeVideo } from "@/types";
import { ColorButton } from "ui";
import { useEffect, useRef } from "react";
import LoadingOverlay from "../overlays/loadingOverlay";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function VideoDetailsModal({
  video,
  isVisible,
  onClose,
  isBackfilling = false,
  backfillMessage = "Loading video history"
}: {
  video: YoutubeVideo | null,
  isVisible: boolean,
  onClose: () => void,
  isBackfilling?: boolean,
  backfillMessage?: string
}) {
  const displayedVideoRef = useRef<YoutubeVideo | null>(video);
  if (video !== null) {
    displayedVideoRef.current = video;
  }
  const displayedVideo = video ?? displayedVideoRef.current;

  useEffect(() => {
    if (!isVisible) {
      displayedVideoRef.current = null;
    }
  }, [isVisible]);
  
  const formatDate = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
      year: "numeric",
    }).formatToParts(new Date(date));

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find(part => part.type === type)?.value ?? "";

    return `${get("hour")}:${get("minute")} ${get("dayPeriod")} on ${get("month")} ${get("day")}, ${get("year")}`;
  };

  if (!displayedVideo) return;
  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isVisible ? "show" : "hide"} max-w-[95%] relative overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <LoadingOverlay variant="absolute" text={backfillMessage} disabled={isBackfilling}/>
        <div className="modal-header">
          <h1 className="modal-title">
            Video Details
          </h1>
          <ColorButton
            color="red-800"
            text="Close"
            action={onClose}
          />
        </div>
        <div className="flex gap-6 p-2 whitespace-nowrap">
          {displayedVideo?.thumbnailUrl ? (
            <Image src={displayedVideo.thumbnailUrl} alt="Video Thumbnail" width="196" height="148" loading="eager" className="rounded-lg border-white border-2"/>
          ) : (
            <div className="flex items-center justify-center rounded-lg w-49 h-37 bg-gray-700">
              <p className="text-white font-bold text-center">
                No Thumbnail
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-lg font-bold text-wrap">
              {displayedVideo?.title}
            </p>
            <div className="flex items-start gap-3 pt-5">
              <div className="w-10 justify-center pt-1">
                <Calendar className="w-7 h-7 text-red-500"/>
              </div>
              <div className="flex flex-col">
                <p className="text-gray-300">
                  Published at:
                </p>
                <p className="font-bold text-base">
                  {formatDate(displayedVideo?.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}