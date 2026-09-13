import { Channel, ChannelSnapshots, ChannelStat, VideosByDays } from "@/app/youtube/[ytid]/home/page";
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

export default function ChannelOverviewCard ({channel, snapshots, uploads, watchTotals }: { channel: Channel, snapshots: ChannelSnapshots[], uploads: { last: number, previous: number }, watchTotals: { last365Days: number, last90Days: number, last28Days: number, last7Days: number } }) {
  const watchTargetHours = 4000;

  const analyticsRanges = snapshots
    ? calculateAnalyticsRanges(snapshots)
    : null

  const watchRangeConfig = [
    {
      key: "last365Days",
      label: "365d",
      color: "bg-blue-500",
      accent: "text-blue-400"
    },
    {
      key: "last90Days",
      label: "90d",
      color: "bg-violet-500",
      accent: "text-violet-400"
    },
    {
      key: "last28Days",
      label: "28d",
      color: "bg-teal-500",
      accent: "text-teal-400"
    },
    {
      key: "last7Days",
      label: "7d",
      color: "bg-amber-500",
      accent: "text-amber-400"
    }
  ] as const;

  const watchContributions = {
    last365Days: Math.max(watchTotals.last365Days - watchTotals.last90Days, 0),
    last90Days: Math.max(watchTotals.last90Days - watchTotals.last28Days, 0),
    last28Days: Math.max(watchTotals.last28Days - watchTotals.last7Days, 0),
    last7Days: watchTotals.last7Days
  };

  const StyleByCompareLatestAndPrevious = (stat: "views" | "videos" | "subscribers") => {
    if (!analyticsRanges) return "color-gray-300";

    let color;
    let last = 0;
    let previous = 0;

    switch(stat) {
      case "views":
        last = analyticsRanges?.last28Days.views;
        previous = analyticsRanges?.previous28Days.views;
        break;
      case "videos":
        last = uploads.last;
        previous = uploads.previous;
        break;
      case "subscribers":
        last = analyticsRanges?.last28Days.subscribersGained;
        previous = analyticsRanges?.last28Days.subscribersGained;
        break;
    }

    const growth = calculatePercentage(last, previous);
    const { yellow, orange } = GROWTH_THRESHOLDS[stat];

    if (growth > 0) {
      color = "text-green-500";
    } else if (growth > yellow) {
      color = "text-yellow-500";
    } else if (growth > orange) {
      color = "text-orange-500";
    } else {
      color = "text-red-500";
    }
    return <span className={color}>{last > 0 ? "+" : "-"}{last.toLocaleString()}</span>
  }

  const calculatePercentage = (value1: number, value2: number) => {
    if (value2 === 0) return value1 > 0 ? 100 : 0;

    return Math.round(((value1 - value2) / value2) * 100);
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

                  {key === "subscriberCount" && (
                    <p>
                      {StyleByCompareLatestAndPrevious("subscribers")} in last 28 days
                    </p>
                  )}
                  {key === "viewCount" && (
                    <p>
                      {StyleByCompareLatestAndPrevious("views")} in last 28 days
                    </p>
                  )}
                  {key ==="videoCount" && (
                    <p>
                      {StyleByCompareLatestAndPrevious("videos")} in last 28 days
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="grid w-full gap-6 px-8 pb-4">
        <div className="flex min-w-0 flex-col justify-center">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="text-gray-300">Watch Time</p>
            <p className="text-base font-semibold text-white">
              {(analyticsRanges?.last365Days.watchHours ?? 0).toLocaleString(undefined, { maximumFractionDigits: 1 })}h / {watchTargetHours.toLocaleString()}h
            </p>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
            <div className="absolute inset-0 rounded-full bg-gray-700"/>
            {watchRangeConfig.map(({ key, color}, index) => {
              const value = watchContributions[key];
              const width = Math.min((value / watchTargetHours) * 100, 100);
              const left = watchRangeConfig
                .slice(0, index)
                .reduce((sum, item) => {
                  return sum + (watchContributions[item.key] / watchTargetHours) * 100;
                }, 0);

              return (
                <div
                  key={key}
                  className={`absolute inset-y-0 last-rounded-r-full ${color}`}
                  style={{
                    width: `${width}%`,
                    left: `${left}%`,
                    opacity: 0.85 - index * 0.1,
                    zIndex: index + 1
                  }}
                />
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
            {watchRangeConfig.map(({ key, label, color, accent}) => {
              const value = analyticsRanges?.[key].watchHours ?? 0;
              return (
                <div key={key} className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-sm ${color}`}/>
                  <span className={accent}>{label}</span>
                  <span>{value.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}