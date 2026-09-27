import { apiFetch } from "@/lib/apiFetch";
import { youtubeKeys } from "@/queries/youtube";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ColorButton } from "ui";

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isVisible, onClose }: SettingsModalProps) {
  const queryClient = useQueryClient();
  const [syncJobId, setSyncJobId] = useState<string | null>(null);

  const syncMutation = useMutation({
    mutationFn: () => apiFetch<{ jobId: string }>("/api/youtube/sync", "POST"),
    onSuccess: (data) => setSyncJobId(data.jobId)
  });

  return (
    <div
      className={`modal-overlay ${
        isVisible ? "show" : "hide"}`}
        onClick={onClose}
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
            action={onClose}
          />
        </div>
        <div className="modal-body px-2 pb-12">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Sync
            </h2>
            <button 
              className="text-white"
              onClick={() => syncMutation.mutate()} 
              disabled={syncMutation.isPending}>
              {syncMutation.isPending ? "Starting..." : "Start Sync"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}