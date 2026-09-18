import { Playlist } from "@/app/youtube/[ytid]/home/page";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ColorButton } from "ui";
import VideoDetailsModal from "../modals/VideoDetailsModal";
import { YoutubeVideo } from "@/types";
import VideosTableHeader from "../VideosTableHeader";
import VideosTableBody from "../VideosTableBody";

export default function LatestVideosCard ({ videos, playlists }: { videos: YoutubeVideo[], playlists: Playlist[] }) {
  const { ytid } = useParams<{ ytid: string }>();
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

  const getVideoPlaylist = (videoPlaylistIds: string[]) => {
    if (!playlists.length) return ["Unable to retrieve Playlists"];

    const result = playlists.filter(playlist => (
      videoPlaylistIds.includes(playlist.playlistId)
    ));

    if (!result.length) return ["None"]

    return result.map(res => res.title);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  return (
    <div className="bg-gray-800 rounded-lg block p-4">
      <div className="flex justify-between">
        <p className="mb-3 text-2xl font-bold">
          Latest Videos
        </p>
        <ColorButton
          color="blue-700"
          text="View All"
          href={`/youtube/${ytid}/videos`}
          extraClass="mb-2 font-semibold"
        />
      </div>
      <VideosTableHeader/>
      <div className="bg-gray-800 mb-3 px-4 pb-4 w-full overflow-x-auto rounded-b-lg">
        <VideosTableBody        
          videos={videos}
          playlists={playlists}
          onClick={(video) => setSelectedVideo(video)}
        />
      </div>
      <VideoDetailsModal
        video={selectedVideo}
        isVisible={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  )
}