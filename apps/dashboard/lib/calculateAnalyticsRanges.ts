import { addSnapshot, Analytics, createEmptyAnalytics } from "./createEmptyAnalytics";

const RANGES = {
  today: 1,
  last7Days: 7,
  last28Days: 28,
  last90Days: 90,
  last365Days: 365
};

type AnalyticsRanges = {
  [K in keyof typeof RANGES]: Analytics;
}

type ChannelAnalyticsSnapshots = {
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

export function calculateAnalyticsRanges(
  snapshots: ChannelAnalyticsSnapshots[]
) {
  const now = new Date();

  const result = {} as AnalyticsRanges;

  for (const range of Object.keys(RANGES) as Array<keyof typeof RANGES>) {
    result[range] = createEmptyAnalytics();
  }

  for (const snapshot of snapshots) {
    const snapshotDate = new Date(snapshot.snapshotDate);

    const daysAgo =
      (now.getTime() - snapshotDate.getTime()) / (1000 * 60 * 60 * 24);

    for (const range of Object.keys(RANGES) as Array<keyof typeof RANGES>) {
      if (daysAgo < RANGES[range]) {
        addSnapshot(result[range], snapshot);
      }
    }
  }

  return result;
}