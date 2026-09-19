import { YoutubePlaylist, YoutubeVideo } from "@/types";
import { ColorButton } from "ui";
import { useEffect, useRef } from "react";
import LoadingOverlay from "../overlays/loadingOverlay";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { DocumentDuplicateIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function VideoDetailsModal({
  video,
  isVisible,
  onClose,
  isBackfilling = false,
  backfillMessage = "Loading video history",
  playlists
}: {
  video: YoutubeVideo | null,
  isVisible: boolean,
  onClose: () => void,
  isBackfilling?: boolean,
  backfillMessage?: string,
  playlists: YoutubePlaylist[]
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
  
  const getVideoplaylists = (videoPlaylistIds: string[]) => {
    if (!playlists) return ["Unable to retrieve Playlists"];

    const result = playlists.filter(playlist => (
      videoPlaylistIds.includes(playlist.playlistId)
    ));

    if (!result.length) return ["None"];

    return result.map(res => res.title);
  };

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

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${remainingSeconds}s`;
    }

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }

    return `${remainingSeconds}s`
  };

  return (
    <div
      className={`modal-overlay ${isVisible ? "show" : "hide pointer-events-none"} backdrop-blur-[5px]`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isVisible ? "show" : "hide"} max-w-[85%] relative overflow-hidden`}
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
        <div className="flex items-start text-white m-4 gap-4">
          <div className="flex gap-3 p-2 whitespace-nowrap bg-gray-800 rounded-lg w-[75%] min-h-61">
            {displayedVideo?.thumbnailUrl ? (
              <Image 
                src={displayedVideo.thumbnailUrl} 
                alt="Video Thumbnail" 
                width="256" 
                height="224" 
                loading="eager" 
                className="rounded-lg border-white border-2 shrink-0"
              />
            ) : (
              <div className="flex items-center justify-center rounded-lg w-64 h-56 bg-gray-700">
                <p className="text-white font-bold text-center">
                  No Thumbnail
                </p>
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <p className="text-lg font-bold text-wrap">
                {displayedVideo?.title}
              </p>
              <div className="max-h-54 mt-2 border border-gray-400 rounded-l-lg pl-2 overflow-y-auto">
                <div className="text-wrap whitespace-pre-line pr-2 ">
                  {displayedVideo?.description}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-2 whitespace-nowrap bg-gray-800 rounded-lg w-[25%] min-h-61">
            <div className="flex">
              <div className="w-10 justify-center pt-1">
                <Calendar className="w-7 h-7 text-red-500"/>
              </div>
              <div className="flex flex-col text-wrap">
                <p className="text-gray-300">
                  Published at:
                </p>
                <p className="font-bold text-base">
                  {formatDate(displayedVideo?.publishedAt ?? new Date())}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-10 justify-center pt-1">
                <Clock className="w-7 h-7 text-red-500"/>
              </div>
              <div className="flex flex-col text-wrap">
                <p className="text-gray-300">
                  Duration:
                </p>
                <p className="font-bold text-base text-wrap">
                  {formatDuration(displayedVideo?.durationSeconds ?? 0)}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-10 justify-center pt-1">
                <DocumentDuplicateIcon className="w-7 h-7 text-red-500"/>
              </div>
              <div className="flex flex-col text-wrap">
                <p className="text-gray-300">
                  Video Url:
                </p>
                <p className="font-bold text-base">
                  {displayedVideo?.videoId}
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="w-10 justify-center pt-1">
                <ListBulletIcon className="w-7 h-7 text-red-500"/>
              </div>
              <div className="flex flex-col text-wrap">
                <p className="text-gray-300">
                  Playlist(s):
                </p>
                <p className="font-bold text-base">
                  {getVideoplaylists(displayedVideo?.playlistIds ?? []).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}