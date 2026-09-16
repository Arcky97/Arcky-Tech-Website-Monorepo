import { YoutubeVideos, Playlist, VideoSnapshot } from "@/app/youtube/[ytid]/home/page";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ColorButton } from "ui";
import VideoDetailsModal from "../modals/VideoDetailsModal";

export default function LatestVideosCard ({ videos, playlists, snapshots }: { videos: YoutubeVideos[], playlists: Playlist[], snapshots: VideoSnapshot[] }) {
  const { ytid } = useParams<{ ytid: string }>();
  const [selectedVideo, setSelectedVideo] = useState<YoutubeVideos | null>(null);

  const getVideoPlaylist = (videoPlaylistIds: string[]) => {
    if (!playlists.length) return ["Unable to retrieve Playlists"];

    const result = playlists.filter(playlist => (
      videoPlaylistIds.includes(playlist.playlistId)
    ));

    if (!result.length) return ["None"]

    return result.map(res => res.title);
  };

  const getVideoSnapshot = (videoId: number): Partial<VideoSnapshot> => {
    const emptySnapshot = {
      videoId,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      watchHours: 0
    }

    if (!snapshots.length) return emptySnapshot;

    return snapshots.find(snapshot => snapshot.videoId === videoId) ?? emptySnapshot;
  }

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

      <div className="w-full overflow-x-auto">
        <div className="inline-block min-w-full rounded-lg overflow-hidden">
          <table className="w-full border border-gray-600/75 overflow-x-auto">
            <thead className="bg-blue-400/10">
              <tr>
                {["Video", "Views", "Likes", "Comments", "Shares", "Watch Hours"].map((header, i) => (
                  <th
                    key={`header-${i}`}
                    className="px-12 py-2 text-center font-bold whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {videos.map((video: YoutubeVideos, ri) => (
                <tr
                  key={`row-${ri}`}
                  onClick={() => setSelectedVideo(video)}
                  className="group relative cursor-pointer transition-all duration-300 ease-in-out border border-gray-600/75"
                >
                  <td className="flex gap-6 px-4 py-2 whitespace-nowrap">
                    {video?.thumbnailUrl ? (
                      <Image src={video.thumbnailUrl} alt="Video Thumbnail" width="196" height="148" loading="eager" className="rounded-lg border-white border-2"/>
                    ) : (
                      <div className="flex items-center justify-center rounded-lg w-49 h-37 bg-gray-700">
                        <p className="text-white font-bold text-center">No Thumbnail</p>
                      </div>
                    )}
                    <div className="flex flex-col justify-center ">
                      <p className="flex text-lg font-bold">
                        {video.title}
                      </p>
                      <p>
                        Playlist: {getVideoPlaylist(video.playlistIds ?? []).join(', ')}
                      </p>
                      <p>{formatDate(video.publishedAt)} &bull; Published</p>
                    </div>
                  </td>
                  <td className="text-center">
                    {video.views}
                  </td>
                  <td className="text-center">
                    {video.likes}
                  </td>
                  <td className="text-center">
                    {video.comments}
                  </td>
                  <td className="text-center">
                    {video.shares}
                  </td>
                  <td className="text-center">
                    {video.watchHours}h
                  </td>
                  <td colSpan={6} className="absolute inset-0 flex items-center justify-center bg-gray-800/85 opacity-0 pointer-events-none transition-opacity duration-300 ease-in-out border group-hover:opacity-100">
                    <p className="text-lg font-bold">View More Details</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <VideoDetailsModal
        video={selectedVideo}
        isVisible={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  )
}