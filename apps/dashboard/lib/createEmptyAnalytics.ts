type ChannelAnalyticsSnapshot = {
	id: number;
  channelId: string;
  views: number;
  watchHours: number;
  subscribersGained: number;
  subscribersLost: number;
  snapshotDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type Analytics = {
  views: number;
  watchHours: number;
  subscribersGained: number;
  subscribersLost: number;
};

export function createEmptyAnalytics(): Analytics {
  return {
    views: 0,
    watchHours: 0,
    subscribersGained: 0,
    subscribersLost: 0
  };
}

export function addSnapshot(
  result: ReturnType<typeof createEmptyAnalytics>,
  snapshot: ChannelAnalyticsSnapshot
) {
  result.views += snapshot.views,
  result.watchHours += snapshot.watchHours,
  result.subscribersGained += snapshot.subscribersGained,
  result.subscribersLost += snapshot.subscribersLost
}