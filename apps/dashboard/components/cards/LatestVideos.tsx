import { YoutubeVideos, Playlist, VideoSnapshot } from "@/app/youtube/[ytid]/home/page";
import Image from "next/image";

export default function LatestVideosCard ({ videos, playlists, snapshots }: { videos: YoutubeVideos[], playlists: Playlist[], snapshots: VideoSnapshot[] }) {
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
      <p className="mb-3 text-2xl font-bold">
        Latest Videos
      </p>
        {videos.length ? (
          videos.map((video: YoutubeVideos) => {
            return (
              <div 
                className="flex px-4 py-2 justify-between" 
                key={video.id}
              >
                {video?.thumbnailUrl ? (
                  <Image src={video.thumbnailUrl} alt="Video Thumbnail" width="196" height="148" loading="eager" className="rounded-lg border-white border-2"/>
                ) : (
                  <div className="rounded-lg w-49 h-37 bg-gray-700">
                    <p className="text-white font-bold text-center">No Thumbnail</p>
                  </div>
                )}
                <div className="flex flex-col justify-center max-w-[40%]">
                  <p className="flex text-lg font-bold">
                    {video.title}
                  </p>
                  <p>
                    Playlist: {getVideoPlaylist(video.playlistIds ?? []).join(', ')}
                  </p>
                  <p>{formatDate(video.publishedAt)} &bull; Published</p>
                </div>
                <div className="flex flex-col justfiy-center self-center text-center">
                  <p>Views</p>
                  <p>{getVideoSnapshot(Number(video.id)).views}</p>
                </div>
              </div>
            )
          })
        ) : (
          <p>No videos Available</p>
        )}
    </div>
  )
}