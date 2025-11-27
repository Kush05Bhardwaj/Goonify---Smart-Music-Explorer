"use client";

import { useEffect, useState } from "react";

type HealthResponse = {
  status: string;
  message: string;
};

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/health", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setHealth(data))
      .catch(() => setError("Cannot reach backend"));
  }, []);

  const handleSpotifyLogin = () => {
    window.location.href = "http://localhost:4000/api/auth/login";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="p-8 rounded-2xl border border-slate-800 shadow-lg max-w-md w-full space-y-6">
        <div>
          <h1 className="text-2xl font-bold">
            🎵 Smart Music Explorer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Connect your Spotify to explore your music stats & insights.
          </p>
        </div>

        <button
          onClick={handleSpotifyLogin}
          className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 transition text-sm font-semibold"
        >
          Login with Spotify
        </button>

        <div className="text-xs text-slate-500">
          Backend status:
          {health && (
            <span className="ml-2 text-emerald-400">
              {health.status} – {health.message}
            </span>
          )}
          {error && (
            <span className="ml-2 text-red-400">
              {error}
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
