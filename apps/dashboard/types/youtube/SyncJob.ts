export type SyncJob = {
  jobId: string;
  status: "queued" | "running" | "completed" | "failed";
  progress?: number;
  message?: string;
}