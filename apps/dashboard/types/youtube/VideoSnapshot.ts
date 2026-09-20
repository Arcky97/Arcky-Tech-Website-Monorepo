export type YoutubeVideoSnapshot = {
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