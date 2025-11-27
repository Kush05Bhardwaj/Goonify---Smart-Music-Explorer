import { motion } from "framer-motion";

export default function TrackCard({ track, onClick }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
      className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-md cursor-pointer"
    >
      <img
        src={track.album.images?.[0]?.url}
        className="rounded-xl mb-3"
        alt="album cover"
      />
      <p className="font-semibold text-sm truncate">{track.name}</p>
      <p className="text-xs text-slate-500 truncate">
        {track.artists.map((a: any) => a.name).join(", ")}
      </p>
    </motion.div>
  );
}
