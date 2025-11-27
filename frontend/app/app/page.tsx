"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TrackCard from "@/components/TrackCard";
import TrackDetails from "@/components/TrackDetails";

export default function AppPage() {
  const [user, setUser] = useState<any>(null);
  const [tracks, setTracks] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<any>(null);

  const openDetails = async (track:any) => {
    const artist = track.artists[0]?.name;
    const song = track.name;
    const img = track.album.images[0]?.url;

    const [similarRes, lyricsRes] = await Promise.all([
      fetch(`http://127.0.0.1:4000/api/similar-tracks?artist=${artist}&track=${song}`),
      fetch(`http://127.0.0.1:4000/api/lyrics?artist=${artist}&song=${song}`)
    ]);

    const similar = await similarRes.json();
    const lyricsData = await lyricsRes.json();

    setSelected({
      artist,
      song,
      image: img,
      similar: similar.map((s:any) => s.name),
      lyrics: lyricsData.lyrics
    });
  };

  useEffect(() => {
    // Fetch Profile
    fetch("http://127.0.0.1:4000/api/me", { credentials: "include" })
      .then(res => res.json())
      .then(setUser)
      .catch(() => setError("Failed to load profile"));

    // Fetch Top Tracks
    fetch("http://127.0.0.1:4000/api/top-tracks", { credentials: "include" })
      .then(async (res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setTracks)
      .catch(() => setError("Failed to load top tracks"));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6">
      {/* Track grid */}
      <div className="grid ...">
        {tracks.map((t) => (
          <TrackCard key={t.id} track={t} onClick={() => openDetails(t)} />
        ))}
      </div>

      {/* Sidebar */}
      <TrackDetails details={selected} onClose={() => setSelected(null)} />
      <section className="max-w-lg">
        <h1 className="text-3xl font-bold mb-2">🎧 Welcome {user?.display_name}</h1>
        {error && <p className="text-red-400 text-sm">{error}</p>}

        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <img
              src={user.images?.[0]?.url}
              className="w-20 h-20 rounded-full border border-slate-700"
              alt="profile"
            />
            <div className="text-sm font-mono text-slate-400">
              <p>Email: {user.email}</p>
              <p>User ID: {user.id}</p>
            </div>
          </motion.div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-slate-300 mb-4">🔥 Your Top 10 Tracks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md"
            >
              <img
                src={track.album.images?.[0]?.url}
                className="rounded-xl mb-3"
                alt="album"
              />
              <p className="font-semibold text-sm">{track.name}</p>
              <p className="text-xs text-slate-500">
                {track.artists.map((a:any) => a.name).join(", ")}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
