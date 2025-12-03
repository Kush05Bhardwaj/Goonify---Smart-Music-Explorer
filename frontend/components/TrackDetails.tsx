import { motion } from "framer-motion";
import type { TrackDetails as TrackDetailsType } from "@/types";

interface TrackDetailsProps {
  details: TrackDetailsType | null;
  onClose: () => void;
}

export default function TrackDetails({ details, onClose }: TrackDetailsProps) {
  if (!details) return null;

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed right-0 top-0 w-80 h-full bg-slate-900 border-l border-slate-800 p-5 overflow-y-auto z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-base">Track Details</h2>
        <button 
          onClick={onClose} 
          className="text-xs text-red-400 hover:text-red-300 transition"
          aria-label="Close details"
        >
          ✕ Close
        </button>
      </div>

      <img src={details.image} alt={`${details.song} album cover`} className="rounded-xl mb-3 w-full" />
      <p className="font-medium text-sm">{details.song}</p>
      <p className="text-xs text-slate-400 mb-3">{details.artist}</p>

      <h3 className="text-xs font-semibold text-slate-500 mb-1">Similar Songs</h3>
      <div className="space-y-2 mb-4">
        {details.similar && details.similar.length > 0 ? (
          details.similar.map((s, idx) => (
            <div key={idx} className="text-xs bg-slate-800 p-2 rounded-lg">{s}</div>
          ))
        ) : (
          <p className="text-xs text-slate-500">No similar songs found</p>
        )}
      </div>

      <h3 className="text-xs font-semibold text-slate-500 mb-1">Lyrics</h3>
      <div className="text-[10px] leading-relaxed bg-slate-800 p-3 rounded-xl whitespace-pre-line">
        {details.lyrics || "Lyrics not available"}
      </div>
    </motion.aside>
  );
}
