"use client";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Icons from "@heroicons/react/24/outline";
import { useEffect } from "react";
import Image from "next/image";
import LoadingOverlay from "@/components/overlays/loadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateAnalyticsRanges } from "@/lib/calculateAnalyticsRanges";
import ChannelOverviewCard from "@/components/cards/ChannelOverview";
import WatchTimeInsightCard from "@/components/cards/WatchTimeInsights";
import LatestVideosCard from "@/components/cards/LatestVideos";

export type Channel = {
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

export type ChannelSnapshots = {
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

export type YoutubeVideos = {
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

export type VideoSnapshot = {
  videoId: number;
  snapshotDate: Date;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watchHours: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  subscribersGained: number;
  subscribersLost: number;
}

type VideosAndShorts = {
	videos: YoutubeVideos[];
	shorts: YoutubeVideos[];
}

export type VideosByDays = {
	uploads: number
}

type ChannelStatKey =
	| "subscriberCount"
	| "viewCount"
	| "videoCount";

export type ChannelStat = {
	key: ChannelStatKey;
	title: string;
	icon: keyof typeof Icons;
}

export type Playlist = {
	id: number;

  channelId: number;
  playlistId: string;

  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  itemCount: number | null;

  publishedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

type SyncJob = {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress?: number;
  message?: string;
}

export default function YoutubeHome() {
	const videosdays = 28;
	const queryClient = useQueryClient();

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

	const LatestVideosSnapshotsQuery = useQuery({
		queryKey: youtubeKeys.latestSnapshots(),
		queryFn: () => apiFetch<VideoSnapshot[]>("/api/youtube/videos/snapshots")
	});

	const playlistsQuery = useQuery({
		queryKey: youtubeKeys.playlists(),
		queryFn: () => apiFetch<Playlist[]>(`/api/youtube/playlists`)
	});

	const videosLast28DaysQuery = useQuery({
		queryKey: youtubeKeys.videosByDays(videosdays),
		queryFn: () => apiFetch<VideosByDays>(`/api/youtube/videos/days/${videosdays}`)
	});

	const videosPrevious28DaysQuery = useQuery({
		queryKey: youtubeKeys.videosByDays(videosdays * 2),
		queryFn: () => apiFetch<VideosByDays>(`/api/youtube/videos/days/${videosdays * 2}`)
	});

	const analyticsRanges = channelSnapshotQuery.data
		? calculateAnalyticsRanges(channelSnapshotQuery.data)
		: null;

	const watchTotals = {
		last365Days: analyticsRanges?.last365Days.watchHours ?? 0,
		last90Days: analyticsRanges?.last90Days.watchHours ?? 0,
		last28Days: analyticsRanges?.last28Days.watchHours ?? 0,
		last7Days: analyticsRanges?.last7Days.watchHours ?? 0
	};

	const router = useRouter();
	const searchParams = useSearchParams();
	const initialSyncJobId = searchParams.get("initialSyncJobId");
	const hasInitialSyncJob = Boolean(initialSyncJobId && initialSyncJobId !== "0");

	console.debug("[YoutubeHome] initialSyncJobId from URL:", initialSyncJobId, "hasInitialSyncJob:", hasInitialSyncJob);

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

	// The channel/snapshot/video queries above fetch on mount, before the backfill job
	// finishes, so their data goes stale once the job completes; refetch them here.
	useEffect(() => {
		console.debug("[YoutubeHome] initialSyncQuery status changed:", initialSyncQuery.data?.status, initialSyncQuery.data);
		if (initialSyncQuery.data?.status !== "completed") return;

		queryClient.invalidateQueries({ queryKey: youtubeKeys.channel() });
		queryClient.invalidateQueries({ queryKey: youtubeKeys.channelSnapshots() });
		queryClient.invalidateQueries({ queryKey: youtubeKeys.videosByDays(videosdays) });
		queryClient.invalidateQueries({ queryKey: youtubeKeys.latestVideos() });
	}, [initialSyncQuery.data?.status, queryClient, videosdays]);

	// Strip initialSyncJobId from the URL once the job is done, otherwise every
	// refresh re-reads the same jobId from the URL and re-shows its final message.
	useEffect(() => {
		if (!hasInitialSyncJob) return;
		const status = initialSyncQuery.data?.status;
		if (status !== "completed" && status !== "failed") return;

		console.debug("[YoutubeHome] Clearing initialSyncJobId from URL, final status:", status);

		const params = new URLSearchParams(searchParams.toString());
		params.delete("initialSyncJobId");
		const query = params.toString();
		router.replace(query ? `?${query}` : window.location.pathname, { scroll: false });
	}, [hasInitialSyncJob, initialSyncQuery.data?.status, router, searchParams]);

	const shouldShowLoading =
		hasInitialSyncJob && (
			initialSyncQuery.isLoading || 
			channelSnapshotQuery.isLoading || videosLast28DaysQuery.isLoading || LatestVideosAndShortsQuery.isLoading || playlistsQuery.isLoading || initialBackfillActive || 
				(!initialSyncQuery.data || !Object.entries(initialSyncQuery.data).length) || 
				(!channelQuery.data || !Object.entries(channelQuery.data).length) ||
				(!channelSnapshotQuery.data || !Object.entries(channelSnapshotQuery.data).length) || 
				(!videosLast28DaysQuery.data || !Object.entries(videosLast28DaysQuery.data).length) ||
				!LatestVideosAndShortsQuery.data ||
				!playlistsQuery.data ||
				!LatestVideosSnapshotsQuery.data
			);

	const initialSyncMessage = initialSyncQuery.data?.message ?? "Preparing your YouTube data";

	console.debug("[YoutubeHome] shouldShowLoading:", shouldShowLoading, {
		hasInitialSyncJob,
		initialBackfillActive,
		initialSyncQueryIsLoading: initialSyncQuery.isLoading,
		channelSnapshotQueryIsLoading: channelSnapshotQuery.isLoading,
		videosLast28DaysQueryIsLoading: videosLast28DaysQuery.isLoading,
		hasChannelData: !!channelQuery.data,
		hasChannelSnapshotData: !!channelSnapshotQuery.data,
		hasVideosLast28DaysData: !!videosLast28DaysQuery.data,
		hasLatestVideosData: !!LatestVideosAndShortsQuery.data,
		hasPlaylistsData: !!playlistsQuery.data,
		playlistsLength: playlistsQuery.data?.length
	});

	return (
		<>
			<LoadingOverlay
				text={initialSyncMessage}
				disabled={shouldShowLoading}
			/>
			{!shouldShowLoading && channelQuery.data && (
				<article className="flex flex-col text-white m-4 gap-4">
					<div className="flex gap-4">
						<ChannelOverviewCard 
							channel={channelQuery.data} 
							snapshots={channelSnapshotQuery.data ?? []} uploads={{ 
								last: videosLast28DaysQuery?.data?.uploads ?? 0, 
								previous: (videosPrevious28DaysQuery?.data?.uploads ?? 0) - (videosLast28DaysQuery?.data?.uploads ?? 0 )
							}} 
							watchTotals={watchTotals}
						/>
						<WatchTimeInsightCard watchTotals={watchTotals}/>
					</div>
					<LatestVideosCard 
						videos={LatestVideosAndShortsQuery?.data?.videos ?? []} 
						playlists={playlistsQuery.data ?? []}
						snapshots={LatestVideosSnapshotsQuery.data ?? []}
					/>
					<div className="bg-gray-800 rounded-lg block p-4">
						<p className="mb-3 text-2xl font-bold">Latest Videos</p>
						<div className="flex px-4 py-2 justify-between">
							<Image src={LatestVideosAndShortsQuery.data?.videos[0]?.thumbnailUrl ?? channelQuery.data.thumbnailUrl} alt="Channel Logo" width="196" height="196" loading="eager" className="rounded-lg border-white border-2"/>
							<div className="flex flex-col justify-center max-w-[25%]">
								<p className="flex text-2xl font-bold">Test</p>
								<p className="">more text</p>
								<p className="">and a bit more and what happens if we put even more text but it shouldn't take up all of it</p>
							</div>
							<div className="flex flex-col justify-center self-center text-center">
								<p>first</p>
								<p>with text</p>
							</div>
							<div className="flex flex-col justify-center self-center text-center">
								<p>second</p>
								<p>with text</p>
							</div>
							<div className="flex flex-col justify-center self-center text-center">
								<p>third</p>
								<p>with text</p>
							</div>
							<div className="flex flex-col justify-center self-center text-center">
								<p>fourth and last</p>
								<p>with text</p>
							</div>
						</div>
					</div>
					<div className="bg-gray-800 rounded-lg block p-4">
						<p className="mb-3 text-2xl font-bold">Latest Shorts</p>

					</div>
				</article>
			)}
		</>
	);
}
