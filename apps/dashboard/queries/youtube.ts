export const youtubeKeys = {
  all: ["youtube"] as const,

  channel: () =>
      [...youtubeKeys.all, "channel"] as const,

  videos: () =>
      [...youtubeKeys.all, "videos"] as const,

  video: () =>
      [...youtubeKeys.all, "video"] as const,

  snapshots: () => 
      [...youtubeKeys.all, "snapshots"] as const,

  profile: () =>
      [...youtubeKeys.all, "profile"] as const
};