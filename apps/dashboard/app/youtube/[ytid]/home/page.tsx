"use client";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useQuery } from "@tanstack/react-query";
import * as Icons from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import Link from "next/link";

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

type ChannelStatKey =
	| "subscriberCount"
	| "viewCount"
	| "videoCount";

type ChannelStat = {
	key: ChannelStatKey;
	title: string;
	icon: keyof typeof Icons;
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

	if (!channelQuery.data) {
		return;
	}

	return (
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
	);
}
