"use client";
import LoadingOverlay from "@/components/overlays/loadingOverlay";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { YoutubeVideo } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ColorButton } from "ui";

export default function YoutubeVideos() {
	const videosPerPage = 25;
	const [pageIndex, setPageIndex] = useState(0);

	const videosQuery = useQuery({
		queryKey: youtubeKeys.videos(),
		queryFn: () => apiFetch<YoutubeVideo[]>(`/api/youtube/videos`)
	});

	const maxVideos = (videosQuery.data ?? []).length;
	const lastPageIndex = Math.ceil(maxVideos / videosPerPage) - 1;
	const gridColumns = "grid-cols-[4rem_minmax(20rem,2fr)_repeat(6,minmax(9rem,1fr))]";

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

	const shouldShowLoading = 
		videosQuery.isLoading || !videosQuery.data || !Object.entries(videosQuery.data).length;

	return (
		<>
			<LoadingOverlay
				text="Loading Youtube Videos"
				disabled={shouldShowLoading}
			/>
			<article className="flex flex-col text-white m-4 gap-4">
				<div className="rounded-b-lg block">
					<div className="sticky top-11 z-5 bg-gray-800 rounded-t-lg">
						<h1 className="text-center text-2xl font-bold mb-2">All your Videos</h1>
						<div className="flex gap-6 items-center justify-center mb-3">
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
						<div className="w-full overflow-x-auto bg-gray-800 px-3">
							<div className={`grid min-w-336 ${gridColumns} rounded-t-lg overflow-hidden bg-blue-400/10 border border-gray-600/75`}>
								{["#", "Video", "Views", "Likes", "Comments", "Shares", "Watch Hours", "Average View Percentage"].map((header, i) => (
									<p
										key={`header-${i}`}
										className="px-4 py-2 text-center font-bold whitespace-nowrap"
									>
										{header}
									</p>
								))}
							</div>
						</div>
					</div>
					<div className="bg-gray-800 px-3 pb-3">
						<div className={`min-w-336 ${gridColumns} border-x border-b border-gray-600/75 rounded-b-lg`}>
							{videosQuery.data?.slice(pageIndex * videosPerPage, (pageIndex + 1) * videosPerPage).map((video: YoutubeVideo, ri) => (
								<div
									key={`row-${ri}`}
									className="flex border-b border-gray-600/75 last:border-none"
								>
									<p className="px-4 py-3 text-center w-[3%]">{(ri + 1) + (pageIndex * videosPerPage)}</p>
									<p className="px-4 py-3 w-[29.5%]">{video.title}</p>
									<p className="px-4 py-3 text-center">{video.views ?? 0}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</article>
		</>

	);
}
