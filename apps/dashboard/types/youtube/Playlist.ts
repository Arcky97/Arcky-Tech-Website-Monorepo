export type YoutubePlaylist = {
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