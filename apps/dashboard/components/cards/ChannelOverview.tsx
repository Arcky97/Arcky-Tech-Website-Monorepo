import { Channel, ChannelSnapshots, ChannelStat } from "@/app/youtube/[ytid]/home/page";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@heroicons/react/24/outline";
import { ComponentType, SVGProps } from "react";
import { calculateAnalyticsRanges } from "@/lib/calculateAnalyticsRanges";

const stats: ChannelStat[] = [
  {
    key: "subscriberCount",
    title: "Subscribers",
    icon: "UserGroupIcon"
  },
  {
    key: "viewCount",
    title: "Total Views",
    icon: "EyeIcon"
  },
  {
    key: "videoCount",
    title: "Videos Uploaded",
    icon: "VideoCameraIcon"
  }
]

const GROWTH_THRESHOLDS: Record<"views" | "videos" | "subscribers", { yellow: number; orange: number }> = {
  views: { yellow: -11, orange: -25 },
  videos: { yellow: -2, orange: -5 },
  subscribers: { yellow: -30, orange: -50 }
}

export default function ChannelOverviewCard ({channel, snapshots}: { channel: Channel, snapshots: ChannelSnapshots[] }) {
  const analyticsRanges = snapshots
    ? calculateAnalyticsRanges(snapshots)
    : null

  const StyleByCompareLatestAndPrevious = (stat: "views" | "videos" | "subscribers", value: string) => {
    if (!analyticsRanges) return "color-gray-300"
  }

  return (
    <div className="bg-gray-800 rounded-lg flex-1 flex-col w-[55%]">
      <div className="flex flex-wrap items-center gap-6 p-4">
        {/* Channel Details */}
        <div className="flex items-center gap-6">
          {/* Channel Logo */}
          <Image 
            src={channel.thumbnailUrl} 
            alt="Channel Logo" 
            width="128" 
            height="128" 
            loading="eager" 
            className="rounded-full border-white border-2"
          />
          {/* Channel Name and Link */}
          <div className="flex flex-col justify-center gap-1">
            {/* Channel Name */}
            <p className="text-xl font-bold">
              {channel.channelName}
            </p>
            {/* Channel Link to YouTube */}
            <Link 
              className="text-gray-400" 
              href={`https://www.youtube.com/${channel.customUrl ?? channel.channelId}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View Channel on YouTube
            </Link>
          </div>
        </div>
        {/* Channel Stats */}
        <div className="flex flex-wrap items-start gap-6">
          {stats.map(({ key, title, icon }) => {
            const IconComp = Icons[icon] as ComponentType<SVGProps<SVGElement>>;

            return (
              <div key={key} className="flex items-start gap-3">
                <div className="w-10 flex justify-center pt-1">
                  <IconComp className="w-7 h-7 text-red-500"/>
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-300">
                    {title}
                  </p>
                  <p className="font-bold text-2xl">
                    {channel[key].toLocaleString()}
                  </p>

                  {key === "viewCount" && (
                    <p>
                      {}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}