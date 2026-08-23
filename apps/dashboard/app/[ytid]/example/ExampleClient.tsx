"use client";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";

// Backend backfill endpoint expects a plain YYYY-MM-DD date.
function toDateOnly(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

type Video = {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishedAt: string;
  goalProfileId: number;
  series: string;
  episodeNumber: string;
};

type VideoSnapshot = {
  videoId: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  watchHours: number;
  averageViewDuration: number;
  averageViewPercentage: number;
  subscribersGained: number;
  subscribersLost: number;
  snapshotDate: Date;
}

type SyncJob = {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress?: number;
  message?: string;
};

export function ExampleClient() {
  const queryClient = useQueryClient();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [syncJobId, setSyncJobId] = useState<string | null>(null);
  const [fillJobId, setFillJobId] = useState<string | null>(null);

  // 1. Basic query — hydrated from the server prefetch in page.tsx, so this
  // resolves instantly on first render instead of showing a loading state.
  const videosQuery = useQuery({
    queryKey: youtubeKeys.videos(),
    queryFn: () => apiFetch<Video[]>("/api/youtube/videos")
  });

  // 2. Dependent query — only runs once a video is selected (enabled).
  const videoQuery = useQuery({
    queryKey: youtubeKeys.video(selectedVideoId ?? ""),
    queryFn: () => apiFetch<Video>(`/api/youtube/videos/${selectedVideoId}`),
    enabled: !!selectedVideoId
  });

  // 3. Another dependent query, same enabled pattern, separate cache entry.
  const snapshotsQuery = useQuery({
    queryKey: youtubeKeys.snapshots(selectedVideoId ?? ""),
    queryFn: () => apiFetch<unknown[]>(`/api/youtube/videos/${selectedVideoId}/snapshots`),
    enabled: !!selectedVideoId
  });

  // 4. Mutation with an optimistic update: the UI updates immediately, then
  // rolls back automatically if the request fails.
  const updateVideoMutation = useMutation({
    mutationFn: (vars: { videoId: string; series: string }) =>
      apiFetch(`/api/youtube/videos/${vars.videoId}`, "PATCH", { series: vars.series }),

    onMutate: async (vars) => {
      await queryClient.cancelQueries({ queryKey: youtubeKeys.videos() });
      const previousVideos = queryClient.getQueryData<Video[]>(youtubeKeys.videos());

      queryClient.setQueryData<Video[]>(youtubeKeys.videos(), (old) =>
        old?.map((video) =>
          video.videoId === vars.videoId ? { ...video, title: video.title } : video
        )
      );

      return { previousVideos };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousVideos) {
        queryClient.setQueryData(youtubeKeys.videos(), context.previousVideos);
      }
    },

    onSettled: (_data, _err, vars) => {
      queryClient.invalidateQueries({ queryKey: youtubeKeys.videos() });
      queryClient.invalidateQueries({ queryKey: youtubeKeys.video(vars.videoId) });
    }
  });

  // 5. Fire-and-track mutation: starts a job, then hands off to a polling query.
  const startSyncMutation = useMutation({
    mutationFn: () => apiFetch<{ jobId: string }>("/api/youtube/sync", "POST"),
    onSuccess: (data) => setSyncJobId(data.jobId)
  });

  // 6. Polling query — refetchInterval keeps requesting until the job finishes,
  // then stops on its own by returning false.
  const syncStatusQuery = useQuery({
    queryKey: youtubeKeys.syncJob(syncJobId ?? ""),
    queryFn: () => apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${syncJobId}`),
    enabled: !!syncJobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "completed" || status === "failed" ? false : 2000;
    }
  });

  // Derive the earliest publish date from the already-loaded videos list —
  // no separate fetch needed, this just reduces data already in the cache.
  const firstVideoDate = useMemo(() => {
    if (!videosQuery.data || videosQuery.data.length === 0) return null;

    const earliest = videosQuery.data.reduce((oldest, video) =>
      new Date(video.publishedAt) < new Date(oldest.publishedAt) ? video : oldest
    );

    return toDateOnly(earliest.publishedAt);
  }, [videosQuery.data]);

  // 7. Same fire-and-track shape as sync, but the job kind ("backfill") and
  // its start date come from derived data instead of user input.
  const startFillMutation = useMutation({
    mutationFn: (date: string) =>
      apiFetch<{ jobId: string }>(`/api/youtube/sync/fill/${date}`, "POST"),
    onSuccess: (data) => setFillJobId(data.jobId)
  });

  // 8. Polling query reusing the same job-status shape/key as a regular sync —
  // a job is a job, so no need for a separate "syncFill" key.
  const fillStatusQuery = useQuery({
    queryKey: youtubeKeys.syncJob(fillJobId ?? ""),
    queryFn: () => apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${fillJobId}`),
    enabled: !!fillJobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "completed" || status === "failed" ? false : 2000;
    }
  });

  return (
    <article className="flex flex-col gap-8 p-6 text-white">
      <section>
        <h2 className="text-xl font-semibold">Videos</h2>

        {videosQuery.isLoading && <p>Loading videos…</p>}
        {videosQuery.isError && <p>Failed to load videos: {(videosQuery.error as Error).message}</p>}

        <ul className="mt-2 flex flex-col gap-1">
          {videosQuery.data?.map((video) => (
            <li key={video.videoId}>
              <button
                className={video.videoId === selectedVideoId ? "font-bold" : ""}
                onClick={() => setSelectedVideoId(video.videoId)}
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>

        {/* Manual refetch — bypasses staleTime and re-runs the query now. */}
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: youtubeKeys.videos() })}
          disabled={videosQuery.isFetching}
        >
          {videosQuery.isFetching ? "Refreshing…" : "Refresh videos"}
        </button>
      </section>

      {selectedVideoId && (
        <section>
          <h2 className="text-xl font-semibold">Video detail</h2>
          {videoQuery.isLoading && <p>Loading video…</p>}
          {videoQuery.data && 
            <div>
              <p>{videoQuery.data.title}</p>
              <p>{videoQuery.data.publishedAt}</p>
              <p>{JSON.stringify(videoQuery.data)}</p>
              <p>{JSON.stringify(snapshotsQuery.data)}</p>
            </div>
          }

          <h3 className="mt-4 font-semibold">Snapshots</h3>
          {snapshotsQuery.isLoading && <p>Loading snapshots…</p>}
          {snapshotsQuery.data && <p>{snapshotsQuery.data.length} snapshot(s) loaded</p>}

          <button
            onClick={() =>
              updateVideoMutation.mutate({ videoId: selectedVideoId, series: "Example Series" })
            }
            disabled={updateVideoMutation.isPending}
          >
            {updateVideoMutation.isPending ? "Saving…" : "Update video"}
          </button>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold">Sync</h2>
        <button onClick={() => startSyncMutation.mutate()} disabled={startSyncMutation.isPending}>
          {startSyncMutation.isPending ? "Starting…" : "Start sync"}
        </button>

        {syncStatusQuery.data && (
          <div className="mt-2">
            <p>
              Status: {syncStatusQuery.data.status} ({syncStatusQuery.data.progress ?? 0}%)
            </p>
            <div className="h-2 w-full max-w-sm rounded bg-gray-700">
            <div className="h-2 w-full max-w-sm rounded bg-gray-700">
              <div
                className="h-2 rounded bg-blue-500 transition-all"
                style={{ width: `${syncStatusQuery.data.progress ?? 0}%` }}
              />
            </div>
            </div>
          </div>

        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold">Backfill</h2>

        <button
          onClick={() => firstVideoDate && startFillMutation.mutate(firstVideoDate)}
          disabled={!firstVideoDate || startFillMutation.isPending}
        >
          {startFillMutation.isPending
            ? "Starting…"
            : firstVideoDate
              ? `Backfill from ${firstVideoDate}`
              : "No videos yet"}
        </button>

        {fillStatusQuery.data && (
          <div className="mt-2">
            <p>
              Status: {fillStatusQuery.data.status} ({fillStatusQuery.data.progress ?? 0}%)
            </p>
            <div className="h-2 w-full max-w-sm rounded bg-gray-700">
              <div
                className="h-2 rounded bg-blue-500 transition-all"
                style={{ width: `${fillStatusQuery.data.progress ?? 0}%` }}
              />
            </div>
          </div>
        )}
      </section>
    </article>
  );
}
