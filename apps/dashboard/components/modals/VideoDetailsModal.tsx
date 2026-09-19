import { YoutubeVideo } from "@/types";
import { ColorButton } from "ui";
import { useEffect, useRef } from "react";
import LoadingOverlay from "../overlays/loadingOverlay";

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
        <p>{displayedVideo?.title}</p>
      </div>
    </div>
  )
}