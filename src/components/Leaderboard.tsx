import { motion } from "framer-motion";

interface LeaderboardEntry {
  rank: number;
  name: string;
  school: string;
  score: number;
  isYou?: boolean;
}

const entries: LeaderboardEntry[] = [
  { rank: 1, name: "Elias N.", school: "KTH", score: 97.4 },
  { rank: 2, name: "Saga L.", school: "SU", score: 93.1 },
  { rank: 3, name: "You", school: "KTH", score: 84.2, isYou: true },
  { rank: 4, name: "Wilma Ö.", school: "SSE", score: 81.7 },
  { rank: 5, name: "Leo K.", school: "KI", score: 78.3 },
  { rank: 6, name: "Nora S.", school: "SU", score: 74.9 },
  { rank: 7, name: "Oscar B.", school: "KTH", score: 71.2 },
];

export const Leaderboard = () => {
  return (
    <div className="card-surface p-0 overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <span className="data-label">Leaderboard — Stockholm Students</span>
      </div>
      <div>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 30 }}
            className={`grid grid-cols-[48px_1fr_80px] items-center px-4 py-3 border-b border-muted last:border-b-0 ${
              entry.isYou ? "bg-aura-gain/10" : ""
            }`}
          >
            <span className={`font-mono-data text-sm font-bold ${entry.rank <= 3 ? "text-aura-gain" : "text-muted-foreground"}`}>
              #{entry.rank}
            </span>
            <div>
              <span className={`text-sm font-semibold ${entry.isYou ? "text-aura-gain" : "text-foreground"}`}>
                {entry.name}
              </span>
              <span className="text-muted-foreground text-xs ml-2">{entry.school}</span>
            </div>
            <span className="font-mono-data text-sm font-bold text-right tracking-tighter">
              {entry.score.toFixed(1)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
