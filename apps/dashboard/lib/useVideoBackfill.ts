"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { SyncJob } from "@/types";

/** Starts (and polls) the once-per-day, single-video backfill job used by VideoDetailsModal. */
export function useVideoBackfill() {
  const [jobId, setJobId] = useState<string | null>(null);

  const backfillMutation = useMutation({
    mutationFn: (videoId: string) =>
      apiFetch<{ jobId: string }>(`/api/youtube/sync/fill/${videoId}`),
    onSuccess: (data) => setJobId(data.jobId)
  });

  const jobQuery = useQuery({
    queryKey: youtubeKeys.syncJob(jobId ?? ""),
    queryFn: () => apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${jobId}`),
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "completed" || status === "failed" ? false : 2000;
    }
  });

  const isBackfilling =
    backfillMutation.isPending ||
    (!!jobId &&
      (jobQuery.isLoading || jobQuery.data?.status === "queued" || jobQuery.data?.status === "running"));

  const startBackfill = (videoId: string) => {
    setJobId(null);
    backfillMutation.mutate(videoId);
  };

  const reset = () => setJobId(null);

  return {
    startBackfill,
    reset,
    isBackfilling,
    message: jobQuery.data?.message ?? "Loading Video Data, Please Wait"
  };
}
