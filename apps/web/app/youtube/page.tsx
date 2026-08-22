"use client";

import { useEffect, useRef, useState } from "react";

type JobStatus = {
  status: "idle" | "queued" | "running" | "completed" | "failed";
  message: string;
  progress?: number;
  current?: string;
  jobId?: string;
};

const SYNC_STATUS_PATHS = [
  "/api/youtube/sync/status?jobId=",
  "/api/youtube/sync/jobs/"
];

const isSyncRoute = (url: string) => url.includes("/api/youtube/sync");

export default function Youtube() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [syncState, setSyncState] = useState<JobStatus>({
    status: "idle",
    message: "Not running",
  });
  const pollingRef = useRef<number | null>(null);

  const clearPolling = () => {
    if (pollingRef.current !== null) {
      window.clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPolling();
  }, []);

  async function fetchSyncStatus(jobId: string) {
    for (const path of SYNC_STATUS_PATHS) {
      const url =
        path.includes("?jobId=")
          ? `${path}${encodeURIComponent(jobId)}`
          : `${path}${encodeURIComponent(jobId)}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          continue;
        }

        const data = await res.json();
        return data;
      } catch {
        // try the next known status route
      }
    }

    throw new Error("Unable to fetch sync status for this job.");
  }

  function stopPolling() {
    clearPolling();
    setLoading(false);
  }

  function updateSyncState(data: any, fallbackMessage: string) {
    const nextStatus =
      data?.status === "completed"
        ? "completed"
        : data?.status === "failed"
          ? "failed"
          : data?.status === "queued"
            ? "queued"
            : "running";

    setSyncState({
      status: nextStatus,
      message: data?.message ?? fallbackMessage,
      progress:
        typeof data?.progress === "number"
          ? data.progress
          : undefined,
      current: data?.currentItem ?? data?.current,
      jobId: data?.jobId,
    });
  }

  async function pollSyncJob(jobId: string) {
    clearPolling();

    pollingRef.current = window.setInterval(async () => {
      try {
        const data = await fetchSyncStatus(jobId);
        const nextStatus = data?.status ?? "running";

        updateSyncState(data, "Sync in progress...");

        if (nextStatus === "completed" || nextStatus === "failed") {
          stopPolling();
          setResponse(JSON.stringify(data, null, 2));
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error";

        setSyncState({
          status: "failed",
          message,
          jobId,
        });
        stopPolling();
        setResponse(message);
      }
    }, 2000);
  }

  async function callRoute(
    url: string,
    method: string = "GET",
    body?: unknown
  ) {
    const syncCall = isSyncRoute(url);

    clearPolling();
    setLoading(true);
    setResponse("");

    if (syncCall) {
      setSyncState({
        status: "queued",
        message: "Starting sync...",
      });
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message ?? "Request failed");
      }

      if (syncCall) {
        const jobId = data?.jobId;

        if (jobId) {
          setSyncState({
            status: data.status ?? "queued",
            message: data.message ?? "Sync queued...",
            progress:
              typeof data.progress === "number"
                ? data.progress
                : undefined,
            current: data.currentItem ?? data.current,
            jobId,
          });

          if (data.status === "completed" || data.status === "failed") {
            stopPolling();
            setResponse(JSON.stringify(data, null, 2));
            return;
          }

          await pollSyncJob(jobId);
          return;
        }

        updateSyncState(data, "Sync finished successfully.");
        stopPolling();
      }

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";

      setResponse(message);

      if (syncCall) {
        setSyncState({
          status: "failed",
          message,
        });
      }

      stopPolling();
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>YouTube API Test Page</h1>

      <div
        style={{
          display: "grid",
          gap: "0.5rem",
          maxWidth: 350,
          marginTop: "1rem",
        }}
      >
        <button
          disabled={loading}
          onClick={() => callRoute("/api/youtube/channel")}
        >
          Get Channel
        </button>

        <button
          disabled={loading}
          onClick={() => callRoute("/api/youtube/videos")}
        >
          Get Videos
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/videos/ILSlV6k5G5E")
          }
        >
          Get Video
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/videos/ILSlV6k5G5E/snapshots")
          }
        >
          Get Snapshots
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute(
              "/api/youtube/videos/ILSlV6k5G5E",
              "PATCH",
              {
                series: "Booster Openings",
                episodeNumber: 1,
              }
            )
          }
        >
          Update Video
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/profile/1")
          }
        >
          Get Goal Profile
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute(
              "/api/youtube/profile",
              "POST",
              {
                name: "Test Profile",
                goalViews: 250,
                goalWatchHours: 65,
                goalLikes: 10,
                goalComments: 10,
              }
            )
          }
        >
          Create Goal Profile
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute(
              "/api/youtube/profile/1",
              "PATCH",
              {
                name: "Test Profile",
                goalViews: 500,
                goalLikes: 25,
              }
            )
          }
        >
          Update Goal Profile
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute(
              "/api/youtube/profile/1",
              "DELETE"
            )
          }
        >
          Delete Goal Profile
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/sync", "POST")
          }
        >
          Sync
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/sync/fill/2026-05-23", "POST")
          }
        >
          Backfill Sync
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/oauth/url")
          }
        >
          OAuth URL
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute("/api/youtube/analytics/test")
          }
        >
          Analytics Test
        </button>
      </div>

      {loading && (
        <div
          style={{
            marginTop: "1.5rem",
            maxWidth: 420,
            border: "1px solid #444",
            borderRadius: "10px",
            padding: "1rem",
            background: "#111",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <strong>{syncState.message}</strong>
            {typeof syncState.progress === "number" && (
              <span>{Math.round(syncState.progress)}%</span>
            )}
          </div>

          {typeof syncState.progress === "number" ? (
            <div
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "999px",
                background: "#2a2a2a",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${Math.min(Math.max(syncState.progress, 0), 100)}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #22c55e, #38bdf8)",
                  transition: "width 0.25s ease",
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "10px",
                borderRadius: "999px",
                background: "#2a2a2a",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, #3b82f6, #a78bfa)",
                  opacity: 0.9,
                }}
              />
            </div>
          )}

          {syncState.current && (
            <div style={{ marginTop: "0.5rem", color: "#cbd5e1" }}>
              Current: {syncState.current}
            </div>
          )}
        </div>
      )}

      {response && (
        <pre
          style={{
            marginTop: "2rem",
            padding: "1rem",
            background: "#222",
            color: "#fff",
            borderRadius: "8px",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {response}
        </pre>
      )}
    </main>
  );
}