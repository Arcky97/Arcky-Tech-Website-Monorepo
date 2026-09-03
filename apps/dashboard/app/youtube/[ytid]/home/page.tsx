"use client";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingOverlay from "@/components/overlays/loadingOverlay";
import { useSearchParams } from "next/navigation";

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

	const channelQuery = useQuery({
		queryKey: youtubeKeys.channel(),
		queryFn: () => apiFetch<Channel>("/api/youtube/channel")
	});

	const channelSnapshotQuery = useQuery({
		queryKey: youtubeKeys.channelSnapshots(),
		queryFn: () => apiFetch<ChannelSnapshots[]>("/api/youtube/channel/snapshots")
	});

	const searchParams = useSearchParams();
	const initialSyncJobId = searchParams.get("initialSyncJobId");

	const initialSyncQuery = useQuery({
		queryKey: youtubeKeys.syncJob(initialSyncJobId ?? ""),
		queryFn: () =>
			apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${initialSyncJobId}`),
		enabled: Boolean(initialSyncJobId),
		refetchInterval: (query) => {
			const status = query.state.data?.status;
			return status === "completed" || status === "failed" ? false : 2000;
		}
	});

	const initialBackfillActive =
		initialSyncQuery.isPending ||
		initialSyncQuery.data?.status === "queued" ||
		initialSyncQuery.data?.status === "running"

	const shouldShowLoading =
		Boolean(initialSyncJobId) &&
		(initialSyncQuery.isLoading || initialBackfillActive) && !channelQuery.data;

	return (
		<>
			<LoadingOverlay
				text="Loading Channel Data, please wait!"
				disabled={shouldShowLoading}
			/>
			{!shouldShowLoading && channelQuery.data && (
				<article className="flex flex-col h-full
				text-white m-4">
					<div className="bg-gray-800 rounded-lg">
						<div className="flex m-4 gap-4">
							<Image src={channelQuery.data.thumbnailUrl} alt="Channel Logo" width="128" height="128" loading="eager" className="rounded-full border-white border-2"/>
							<div className="flex flex-col justify-center gap-1">
								<p className="text-xl font-bold">{channelQuery.data.channelName}</p>
								<Link className="text-gray-400" href={`https://www.youtube.com/${channelQuery.data.customUrl ?? channelQuery.data.channelId}`} target="_blank" rel="noopener noreferrer">{"View Channel on YouTube"}</Link>
							</div>
						</div>
						<div className="flex m-4 gap-4">
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
											<p>+ 0 in last 28 days</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</article>
			)}
		</>
	);
}
