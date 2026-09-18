"use client";
import VideoDetailsModal from "@/components/modals/VideoDetailsModal";
import LoadingOverlay from "@/components/overlays/loadingOverlay";
import VideosTableBody from "@/components/VideosTableBody";
import VideosTableHeader from "@/components/VideosTableHeader";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { YoutubePlaylist, YoutubeVideo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ColorButton } from "ui";

export default function YoutubeVideos() {
	const { ytid } = useParams<{ ytid: string }>();
	//const [videosPerPage, setVideosPerPage] = useState(15);
	const videosPerPage = 15;
	const [pageIndex, setPageIndex] = useState(0);
	const [selectedVideo, setSelectedVideo] = useState<YoutubeVideo | null>(null);

	const videosQuery = useQuery({
		queryKey: youtubeKeys.videos(),
		queryFn: () => apiFetch<YoutubeVideo[]>(`/api/youtube/videos`)
	});

	const playlistQuery = useQuery({
		queryKey: youtubeKeys.playlists(),
		queryFn: () => apiFetch<YoutubePlaylist[]>("/api/youtube/playlists")
	});

	const videos = (videosQuery.data ?? [])
		.filter(video => !video.isShort)
		.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime() );
	const maxVideos = (videos ?? []).length;
	const videosByPage = videos.slice(pageIndex * videosPerPage, (pageIndex + 1) * videosPerPage);
	const lastPageIndex = Math.ceil(maxVideos / videosPerPage) - 1;
	const playlists = playlistQuery.data ?? [];

	const handlePageChange = (action: "first" | "previous" | "next" | "last") => {
		if (!videosQuery.data) return;

		switch(action) {
			case "first":
				setPageIndex(0);
				break;
			case "previous":
				setPageIndex(Math.max(0, pageIndex - 1));
				break;
			case "next":
				setPageIndex(Math.min(pageIndex + 1, lastPageIndex));
				break;
			case "last":
				setPageIndex(lastPageIndex)
		}
	}

	const getVideoPlaylist = (videoPlaylistIds: string[]) => {
		if (!playlists) return ["Unable to retrieve Playlists"];

		const result = playlists.filter(playlist => (
			videoPlaylistIds.includes(playlist.playlistId)
		));

		if (!result.length) return ["None"];

		return result.map(res => res.title);
	}

	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric"
		});
	}

	const shouldShowLoading = 
		videosQuery.isLoading || !videosQuery.data || !Object.entries(videosQuery.data).length || playlistQuery.isLoading || !playlistQuery.data || !Object.entries(playlistQuery.data).length;

	return (
		<>
			<LoadingOverlay
				text="Loading Youtube Videos"
				disabled={shouldShowLoading}
			/>
			<article className="flex flex-col text-white m-4 gap-4">
				<div className="rounded-b-lg block">
					<div className="sticky top-11 z-5 bg-gray-800 rounded-t-lg">
						<h1 className="text-center text-4xl font-bold mb-2 py-2">All your Published Youtube Videos</h1>
						<div className="flex gap-6 items-center justify-center pb-4">
							<ColorButton
								text="First Page"
								color="blue-800"
								action={() => handlePageChange("first")}
								disabled={pageIndex <= 1}
							/>
							<ColorButton
								text="Previous Page"
								color="blue-800"
								action={() => handlePageChange("previous")}
								disabled={pageIndex === 0}
							/>
							<p className="flex justify-center items-center">Page {pageIndex + 1}/{lastPageIndex + 1}</p>
							<ColorButton
								text="Next Page"
								color="blue-800"
								action={() => handlePageChange("next")}
								disabled={pageIndex >= lastPageIndex}
							/>
							<ColorButton
								text="Last Page"
								color="blue-800"
								action={() => handlePageChange("last")}
								disabled={pageIndex >= lastPageIndex - 1}
							/>
						</div>
						<VideosTableHeader/>
					</div>
					<div className="bg-gray-800 mb-3 px-4 pb-4 w-full overflow-x-auto rounded-b-lg">
						<VideosTableBody videos={videosByPage} playlists={playlists} onClick={(video) => setSelectedVideo(video)}/>
					</div>
				</div>
				<VideoDetailsModal
					video={selectedVideo}
					isVisible={selectedVideo !== null}
					onClose={() => setSelectedVideo(null)}
				/>
			</article>
		</>
	);
}
