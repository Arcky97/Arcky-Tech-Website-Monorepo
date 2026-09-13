import { YoutubeVideos, Playlist } from "@/app/youtube/[ytid]/home/page";
import Image from "next/image";

export default function LatestVideosCard ({ videos, playlists }: { videos: YoutubeVideos[], playlists: Playlist[] }) {
  return (
    <div className="bg-gray-800 rounded-lg block p-4">
      <p className="mb-3 text-2xl font-bold">
        Latest Videos
      </p>
        {videos.length ? (
          videos.map((video: YoutubeVideos) => {
            return (
              <div className="flex px-4 py-2 justify-between">
                {video.thumbnailUrl ? (
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