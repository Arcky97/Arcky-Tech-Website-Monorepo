export const youtubeKeys = {
  all: ["youtube"] as const,

  channel: () =>
    [...youtubeKeys.all, "channel"] as const,

  videos: () =>
    [...youtubeKeys.all, "videos"] as const,

  video: (videoId: string) =>
    [...youtubeKeys.all, "video", videoId] as const,

  snapshots: (videoId: string) =>
    [...youtubeKeys.all, "snapshots", videoId] as const,

  goalProfiles: () => 
    [...youtubeKeys.all, "goalProfiles"] as const,

  goalProfile: (goalId: number) =>
    [...youtubeKeys.all, "profile", goalId] as const,

  syncJob: (jobId: string) =>
    [...youtubeKeys.all, "sync-job", jobId] as const
};
