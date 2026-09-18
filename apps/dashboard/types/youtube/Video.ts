export type YoutubeVideo = {
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
	views: number;
	likes: number;
	comments: number;
	shares: number;
	watchHours: number;
	averageViewDuration: number;
	averageViewPercentage: number;
	subscribersGained: number;
	subscribersLost: number;

	publishedAt: Date;
	trackAnalytics: boolean;
	createdAt: Date;
	updatedAt: Date;
}