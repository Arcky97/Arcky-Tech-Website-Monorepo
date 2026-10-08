import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { SyncJob } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ColorButton } from "ui";

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const [syncJobId, setSyncJobId] = useState<string | null>(null);

  const syncMutation = useMutation({
    mutationFn: () => apiFetch<{ jobId: string }>("/api/youtube/sync", "POST"),
    onSuccess: (data) => setSyncJobId(data.jobId)
  });

  const jobQuery = useQuery({
    queryKey: youtubeKeys.syncJob(syncJobId ?? ""),
    queryFn: () => apiFetch<SyncJob>(`/api/youtube/sync/status?jobId=${syncJobId}`),
    enabled: !!syncJobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === "completed" || status === "failed" ? false : 2000;
    }
  });

  const isSyncing =
    syncMutation.isPending ||
    (!!syncJobId &&
      (jobQuery.isLoading || jobQuery.data?.status === "queued" || jobQuery.data?.status === "running"));

  const handleClose = () => {
    if (isSyncing) return;
    setSyncJobId(null);
    onClose();
  };

  return (
    <div
      className={`modal-overlay ${
        isVisible ? "show" : "hide"}`}
        onClick={handleClose}
    >
      <div
        className={`modal-content ${
          isVisible ? "show" : "hide"
        } max-w-[95%]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top bar */}
        <div className="modal-header">
          <div>
            <h1 className="modal-title">
              Settings
            </h1>
          </div>
          <ColorButton
            color="red-800"
            text="Close"
            action={handleClose}
            disabled={isSyncing}
          />
        </div>
        <div className="modal-body px-2 pb-12">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Sync
            </h2>
            <button
              className="text-white flex items-center gap-2"
              onClick={() => syncMutation.mutate()}
              disabled={isSyncing}>
              {isSyncing && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
              )}
              {isSyncing ? "Syncing..." : "Start Sync"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}