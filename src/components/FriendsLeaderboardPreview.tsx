import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { friendEntries } from "../data/leaderboard";

export const FriendsLeaderboardPreview = () => {
  const previewEntries = friendEntries.slice(0, 4);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="px-1 py-2"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <span className="section-label">Friends leaderboard</span>
          <p className="mt-2 text-xs text-muted-foreground">Weekly CO₂ ranking</p>
        </div>
        <Link
          to="/leaderboard"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-foreground"
        >
          See all
          <ChevronRight size={14} />
        </Link>
      </div>

      <div className="mt-3">
        {previewEntries.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.14 + index * 0.04 }}
            className="flex items-center gap-3 border-b border-border py-3 last:border-b-0"
          >
            <span className="w-8 text-center font-display text-sm font-bold text-muted-foreground">
              #{entry.rank}
            </span>
            <img
              src={entry.avatarUrl}
              alt={`${entry.name} profile`}
              className="h-10 w-10 rounded-full border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${entry.isYou ? "text-primary" : "text-foreground"}`}>
                {entry.name}
              </p>
              <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
            </div>
            <span className="font-display text-sm font-bold text-foreground">{entry.co2} kg</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
