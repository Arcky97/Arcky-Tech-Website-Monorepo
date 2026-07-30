"use client";

import { useState } from "react";

export default function Youtube() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  async function getChannel() {
    setLoading(true);
    setResponse("");
    try {
      const res = await fetch("/api/youtube/videos", {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message ?? "Request failed");
      }

      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(
        err instanceof Error ? err.message : "Unknown error"
      );
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  async function createProfile() {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/youtube/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test Profile",
          goalViews: 250,
          goalWatchHours: 50,
          goalLikes: 10,
          goalComments: 10
        }),
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
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "2rem" }}>
      <button
        onClick={getChannel}
        disabled={loading}
      >
        {loading ? "Creating..." : "Get Channel info"}
      </button>

      {response && (
        <pre
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "#222",
            color: "#fff",
            borderRadius: "8px",
            overflowX: "auto",
          }}
        >
          {response}
        </pre>
      )}
    </main>
  );
}