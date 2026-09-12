import { addSnapshot, Analytics, createEmptyAnalytics, subtractAnalytics } from "./createEmptyAnalytics";

// Each value is a cumulative day threshold (0-N days ago), not an exclusive window.
const RANGES = {
  today: 1,
  yesterday: 2,
  last7Days: 7,
  previous7Days: 14,
  last28Days: 28,
  previous28Days: 56,
  last90Days: 90,
  previous90Days: 180,
  last365Days: 365,
  previous365Days: 730
};

// Cumulative window each "previous*" range should be reduced by to become exclusive (e.g. 8-14 days)
const PREVIOUS_RANGE_BASE: Partial<Record<keyof typeof RANGES, keyof typeof RANGES>> = {
  yesterday: "today",
  previous7Days: "last7Days",
  previous28Days: "last28Days",
  previous90Days: "last90Days",
  previous365Days: "last365Days"
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

  const cumulative = {} as AnalyticsRanges;

  for (const range of Object.keys(RANGES) as Array<keyof typeof RANGES>) {
    cumulative[range] = createEmptyAnalytics();
  }

  for (const snapshot of snapshots) {
    const snapshotDate = new Date(snapshot.snapshotDate);

    const daysAgo =
      (now.getTime() - snapshotDate.getTime()) / (1000 * 60 * 60 * 24);

    for (const range of Object.keys(RANGES) as Array<keyof typeof RANGES>) {
      if (daysAgo < RANGES[range]) {
        addSnapshot(cumulative[range], snapshot);
      }
    }
  }

  const result = {} as AnalyticsRanges;

  for (const range of Object.keys(RANGES) as Array<keyof typeof RANGES>) {
    const baseRange = PREVIOUS_RANGE_BASE[range];

    result[range] = baseRange
      ? subtractAnalytics(cumulative[range], cumulative[baseRange])
      : cumulative[range];
  }

  return result;
}