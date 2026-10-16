import { Playlist } from "@/app/youtube/[ytid]/home/page";
import { YoutubeVideo } from "@/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ColorButton } from "ui";

export default function LatestShortsCard ({ shorts, playlists }: { shorts: YoutubeVideo[], playlists: Playlist[] }) {
  const { ytid } = useParams<{ ytid: string }>();

  return (
    <div className="bg-gray-800 rounded-lg block p-4">
      <div className="flex justify-between">
        <p className="mb-3 text-2xl font-bold">
          Latest Shorts
        </p>
        <ColorButton
          color="blue-700"
          text="View All"
          href={`/youtube/${ytid}/shorts`}
          extraClass="mb-2 font-semibold"
        />
      </div>
      <div className="flex gap-4">
        {shorts.map((short, index) => (
          <div key={`row-${index}`}>
            {short?.thumbnailUrl ? (
              <Image src={short.thumbnailUrl} alt="Short Thumbnail" width="148" height="196" loading="eager" className="w-36 h-64 object-cover rounded-lg border-white border-2 shrink-0 self-start"/>
            ) : (
              <div className="flex items-center justify-center rounded-lg w-36 h-64 bg-gray-700">
                <p className="text-white font-bold text-center">
                  No Thumbnail
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}