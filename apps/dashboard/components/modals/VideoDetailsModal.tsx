import { YoutubeVideo } from "@/types";
import { ColorButton } from "ui";

export default function VideoDetailsModal({video, isVisible, onClose}: { video: YoutubeVideo | null, isVisible: boolean, onClose: () => void}) { 
  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide pointer-events-none"}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isVisible ? "show" : "hide"} max-w-[95%]`}
        onClick={(e) => e.stopPropagation()}
      >
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
        <p>{video?.title}</p>
      </div>
    </div>
  )
}