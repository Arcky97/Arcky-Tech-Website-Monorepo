"use client";

import { useState } from "react";

export default function Youtube() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function callRoute(
    url: string,
    method: string = "GET",
    body?: unknown
  ) {
    setLoading(true);
    setResponse("");

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
        throw new Error(data.message ?? "Request failed");
      }

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(
        err instanceof Error ? err.message : "Unknown error"
      );
    } finally {
      setLoading(false);
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
            callRoute(
              "/api/youtube/sync",
              "POST"
            )
          }
        >
          Sync
        </button>

        <button
          disabled={loading}
          onClick={() =>
            callRoute(
              "/api/youtube/sync/fill/2026-05-23",
              "POST"
            )
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