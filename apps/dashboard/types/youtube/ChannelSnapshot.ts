export type YoutubeChannelSnapshot = {
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