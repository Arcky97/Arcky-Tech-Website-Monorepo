"use client";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "@heroicons/react/24/outline";
import { type ComponentType, type SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingOverlay from "@/components/overlays/loadingOverlay";
import { useSearchParams } from "next/navigation";
import { calculateAnalyticsRanges } from "@/lib/calculateAnalyticsRanges";

type Channel = {
	channelId: string;
	channelName: string;
	description: string;
	thumbnailUrl: string;
	subscriberCount: number;
	viewCount: number;
	videoCount: number;
	customUrl: string;
	publishedAt: Date;
};

type ChannelSnapshots = {
	id: number;
  channelId: string;
  views: number;
  watchHours: number;
  subscribersGained: number;
  subscribersLost: number;
  snapshotDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

type YoutubeVideos = {
	id: number;
	channelId: number;
	goalProfileId: number | null;
	videoId: string;
	title: string;
	thumbnailUrl: string | null;
	isShort: boolean;
  isShortOverride: boolean | null;
	durationSeconds: number;
	description: string | null;
	playlistIds: string[] | null;
	publishedAt: Date;
	trackAnalytics: boolean;
	createdAt: Date;
	updatedAt: Date;
}

type VideosAndShorts = {
	videos: YoutubeVideos[];
	shorts: YoutubeVideos[];
}

type VideosByDays = {
	uploads: number
}

type ChannelStatKey =
	| "subscriberCount"
	| "viewCount"
	| "videoCount";

type ChannelStat = {
	key: ChannelStatKey;
	title: string;
	icon: keyof typeof Icons;
}

type SyncJob = {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress?: number;
  message?: string;
}

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
];

export default function YoutubeHome() {
	const videosdays = 28;

	const channelQuery = useQuery({
		queryKey: youtubeKeys.channel(),
		queryFn: () => apiFetch<Channel>("/api/youtube/channel")
	});

	const channelSnapshotQuery = useQuery({
		queryKey: youtubeKeys.channelSnapshots(),
		queryFn: () => apiFetch<ChannelSnapshots[]>("/api/youtube/channel/snapshots")
	});

	const LatestVideosAndShortsQuery = useQuery({
		queryKey: youtubeKeys.latestVideos(),
		queryFn: () => apiFetch<VideosAndShorts>(`/api/youtube/videos/latest/5`)
	});

	const videosByDaysQuery = useQuery({
		queryKey: youtubeKeys.videosByDays(videosdays),
		queryFn: () => apiFetch<VideosByDays>(`/api/youtube/videos/days/${videosdays}`)
	});

	const analyticsRanges = channelSnapshotQuery.data
		? calculateAnalyticsRanges(channelSnapshotQuery.data)
		: null;

	const watchRangeConfig = [
		{ key: "last365Days", label: "365d", color: "bg-blue-500", accent: "text-blue-400" },
		{ key: "last90Days", label: "90d", color: "bg-violet-500", accent: "text-violet-400" },
		{ key: "last28Days", label: "28d", color: "bg-teal-500", accent: "text-teal-400" },
		{ key: "last7Days", label: "7d", color: "bg-amber-500", accent: "text-amber-400" }
	] as const;

	const watchTargetHours = 4000;
	const watchTotals = {
		last365Days: analyticsRanges?.last365Days.watchHours ?? 0,
		last90Days: analyticsRanges?.last90Days.watchHours ?? 0,
		last28Days: analyticsRanges?.last28Days.watchHours ?? 0,
		last7Days: analyticsRanges?.last7Days.watchHours ?? 0
	};
	const watchContributions = {
		last365Days: Math.max(watchTotals.last365Days - watchTotals.last90Days, 0),
		last90Days: Math.max(watchTotals.last90Days - watchTotals.last28Days, 0),
		last28Days: Math.max(watchTotals.last28Days - watchTotals.last7Days, 0),
		last7Days: watchTotals.last7Days
	};
	const watchRemainingHours = Math.max(watchTargetHours - watchTotals.last365Days, 0);
	const daysToTargetRemaining = Math.ceil((new Date("2027-01-31").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
	const dailyWatchAverage = watchTotals.last365Days / 365;
	const targetDaiylyWatchAverage = watchRemainingHours / daysToTargetRemaining;
	const weeklyWatchAverage = watchTotals.last365Days / 52;
	const targetWeeklyWatchAverage = watchRemainingHours / (daysToTargetRemaining / 7);
	const estimatedDaysToTarget = dailyWatchAverage > 0
		? Math.ceil(watchRemainingHours / dailyWatchAverage)
		: null;

	const searchParams = useSearchParams();
	const initialSyncJobId = searchParams.get("initialSyncJobId");
	const hasInitialSyncJob = Boolean(initialSyncJobId && initialSyncJobId !== "0");

	const initialSyncQuery = useQuery({
		queryKey: youtubeKeys.syncJob(initialSyncJobId ?? ""),
		queryFn: () =>
			apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${initialSyncJobId}`),
		enabled: hasInitialSyncJob,
		refetchInterval: (query) => {
			const status = query.state.data?.status;
			return status === "completed" || status === "failed" ? false : 2000;
		}
	});

	const initialBackfillActive =
		initialSyncQuery.isLoading ||
		!initialSyncQuery.data ||
		initialSyncQuery.data?.status === "queued" ||
		initialSyncQuery.data?.status === "running"

	const shouldShowLoading =
		hasInitialSyncJob && (
			initialSyncQuery.isLoading || 
			channelSnapshotQuery.isLoading || videosByDaysQuery.isLoading || initialBackfillActive || 
				(!initialSyncQuery.data || !Object.entries(initialSyncQuery.data).length) || 
				(!channelQuery.data || !Object.entries(channelQuery.data).length) ||
				(!channelSnapshotQuery.data || !Object.entries(channelSnapshotQuery.data).length) || 
				(!videosByDaysQuery.data || !Object.entries(videosByDaysQuery.data).length) ||
				(!LatestVideosAndShortsQuery.data || !Object.entries(LatestVideosAndShortsQuery.data).length)
			);

	console.log(LatestVideosAndShortsQuery.data);
	
	const initialSyncMessage = initialSyncQuery.data?.message ?? "Preparing your YouTube data";

	return (
		<>
			<LoadingOverlay
				text={initialSyncMessage}
				disabled={shouldShowLoading}
			/>
			{!shouldShowLoading && channelQuery.data && (
				<article className="flex flex-col text-white m-4 gap-4">
				<div className="flex gap-4">
					<div className="bg-gray-800 rounded-lg flex-1 flex-col w-[55%]">
						<div className="flex flex-wrap items-center gap-6 p-4">
							<div className="flex items-center gap-6">
								<Image src={channelQuery.data.thumbnailUrl} alt="Channel Logo" width="128" height="128" loading="eager" className="rounded-full border-white border-2"/>
								<div className="flex flex-col justify-center gap-1">
									<p className="text-xl font-bold">{channelQuery.data.channelName}</p>
									<Link className="text-gray-400" href={`https://www.youtube.com/${channelQuery.data.customUrl ?? channelQuery.data.channelId}`} target="_blank" rel="noopener noreferrer">{"View Channel on YouTube"}</Link>
								</div>
							</div>
							<div className="flex flex-wrap items-start gap-6">
								{stats.map(({ key, title, icon }) => {
									const IconComp = Icons[icon] as ComponentType<SVGProps<SVGElement>>;

									return (
										<div key={key} className="flex items-start gap-3">
											<div className="w-10 flex justify-center pt-1">
												<IconComp className="w-7 h-7 text-red-500" />
											</div>

											<div className="flex flex-col">
												<p className="text-gray-300">{title}</p>
												<p className="font-bold text-2xl">
													{channelQuery.data[key].toLocaleString()}
												</p>

												{key === "viewCount" && (
													<p>
														+{analyticsRanges?.last28Days.views.toLocaleString() ?? 0} in last 28 days
													</p>
												)}
												{key === "subscriberCount" && (
													<p>
														+{analyticsRanges?.last28Days.subscribersGained.toLocaleString() ?? 0} in last 28 days
													</p>
												)}
												{key === "videoCount" && videosByDaysQuery && (
													<p>
														+{videosByDaysQuery.data?.uploads.toLocaleString() ?? 0} in last 28 days
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
									{watchRangeConfig.map(({ key, color }, index) => {
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
												className={`absolute inset-y-0 last:rounded-r-full ${color}`}
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
									{watchRangeConfig.map(({ key, label, color, accent }) => {
										const value = analyticsRanges?.[key].watchHours ?? 0;
										return (
											<div key={key} className="flex items-center gap-2">
												<div className={`h-2.5 w-2.5 rounded-sm ${color}`} />
												<span className={accent}>{label}</span>
												<span>{value.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-800 rounded-lg flex flex-col w-[40%] p-4">
						<p className="mb-3 text-2xl font-bold">Watch-time insights</p>
						<div className="mb-1 flex items-center justify-between gap-3">
							<p className="text-gray-300">Daily Average</p>
							<p className="text-gray-300">Target Average</p>
						</div>
						<div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
							<div
								className="absolute inset-y-0 rounded-full bg-blue-600"
								style={{
									width: `${Math.min((dailyWatchAverage / targetDaiylyWatchAverage) * 100, 100)}%`
								}}
							/>
						</div>
						<div className="mt-1 flex items-center justify-between gap-3">
							<p className="text-white">{dailyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</p>
							<p className="text-white">{targetDaiylyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</p>
						</div>
						<div className="mb-1 flex items-center justify-between gap-3">
							<p className="text-gray-300">Weekly Average</p>
							<p className="text-gray-300">Target Average</p>
						</div>
						<div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-700">
							<div
								className="absolute inset-y-0 rounded-full bg-blue-600"
								style={{
									width: `${Math.min((weeklyWatchAverage / targetWeeklyWatchAverage) * 100, 100)}%`
								}}
							/>
						</div>
						<div className="mt-1 flex items-center justify-between gap-3">
							<p className="text-white">{weeklyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</p>
							<p className="text-white">{targetWeeklyWatchAverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</p>
						</div>
						<div className="grid grid-cols-3 gap-x-6 gap-y-3 text-sm">
							<div>
								<p className="text-gray-400">Remaining Hours</p>
								<p className="font-semibold text-white">{watchRemainingHours.toLocaleString(undefined, { maximumFractionDigits: 1 })}h</p>
							</div>
							<div>
								<p className="text-gray-400">At recent pace</p>
								<p className="font-semibold text-white">{estimatedDaysToTarget === null ? "No recent data" : `${estimatedDaysToTarget} days`}</p>
							</div>
							<div>
								<p className="text-gray-400">Remaining Days</p>
								<p className="font-semibold text-white">{daysToTargetRemaining} days</p>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-800 rounded-lg block p-4">
					<p className="mb-3 text-2xl font-bold">Latest Long-term Videos</p>
				</div>
				<div className="bg-gray-800 rounded-lg block p-4">
					<p className="mb-3 text-2xl font-bold">Latest Short Videos</p>
				</div>
				</article>
			)}
		</>
	);
}
