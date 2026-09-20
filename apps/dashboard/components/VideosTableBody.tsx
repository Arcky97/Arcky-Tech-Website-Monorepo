import { YoutubePlaylist, YoutubeVideo } from "@/types";
import Image from "next/image";

export default function VideosTableBody({ videos, playlists, onClick }: { videos: YoutubeVideo[], playlists: YoutubePlaylist[], onClick: (video: YoutubeVideo) => void }) {
  const layout = "flex justify-center items-center w-[10%]";

  const getVideoplaylists = (videoPlaylistIds: string[]) => {
    if (!playlists) return ["Unable to retrieve Playlists"];

    const result = playlists.filter(playlist => (
      videoPlaylistIds.includes(playlist.playlistId)
    ));

    if (!result.length) return ["None"];

    return result.map(res => res.title);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="flex flex-col w-full border-gray-600/75 overflow-x-auto rounded-b-lg">
      {videos.map((video, index) => (
        <div
          key={`row-${index}`}
          onClick={() => onClick(video)}
          className="flex group relative cursor-pointer transition-all duration-300 ease-in-out border-b border-gray-600/75 px-2"
        >
          <div className="flex gap-6 py-2 whitespace-nowrap w-[50%]">
            {video?.thumbnailUrl ? (
              <Image src={video.thumbnailUrl} alt="Video Thumbnail" width="196" height="148" loading="eager" className="w-64 h-36 object-cover rounded-lg border-white border-2 shrink-0 self-start"/>
            ) : (
              <div className="flex items-center justify-center rounded-lg w-49 h-37 bg-gray-700">
                <p className="text-white font-bold text-center">
                  No Thumbnail
                </p>
              </div>
            )}
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold text-wrap">
                {video.title}
              </p>
              <p>
                Playlist: {getVideoplaylists(video.playlistIds ?? []).join(', ')}
              </p>
              <p>
                {formatDate(video.publishedAt)} &bull; Published
              </p>
            </div>
          </div>
          {[video.views, video.likes, video.comments, video.shares, video.watchHours].map((item, index) => (
            <div
              key={`item-${index}`}
              className={layout}
            >
              <p>{item}</p>
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/85 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out border-y group-hover:opacity-100">
            <p className="text-lg font-bold">
              View More Details
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}