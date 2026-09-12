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

// Turns two cumulative windows (e.g. 0-14 days and 0-7 days) into the exclusive gap between them (8-14 days)
export function subtractAnalytics(a: Analytics, b: Analytics): Analytics {
  return {
    views: a.views - b.views,
    watchHours: a.watchHours - b.watchHours,
    subscribersGained: a.subscribersGained - b.subscribersGained,
    subscribersLost: a.subscribersLost - b.subscribersLost
  };
}