import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, TrendingDown } from "lucide-react";

interface LeaderEntry {
  rank: number;
  name: string;
  co2: number;
  streak: number;
  isYou?: boolean;
  avatar: string;
}

const entries: LeaderEntry[] = [
  { rank: 1, name: "Saga L.", co2: 9.8, streak: 14, avatar: "🌱" },
  { rank: 2, name: "Elias N.", co2: 11.2, streak: 10, avatar: "🌿" },
  { rank: 3, name: "You", co2: 14.2, streak: 7, isYou: true, avatar: "🍃" },
  { rank: 4, name: "Wilma Ö.", co2: 15.8, streak: 5, avatar: "🌻" },
  { rank: 5, name: "Leo K.", co2: 18.3, streak: 3, avatar: "🌾" },
  { rank: 6, name: "Nora S.", co2: 20.1, streak: 2, avatar: "🪴" },
  { rank: 7, name: "Oscar B.", co2: 22.4, streak: 1, avatar: "🌸" },
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Crown size={16} className="text-[hsl(45,100%,55%)]" />;
  if (rank === 2) return <Medal size={16} className="text-muted-foreground" />;
  if (rank === 3) return <Medal size={16} className="text-[hsl(25,70%,50%)]" />;
  return null;
};

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <h1 className="font-display text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Trophy size={22} className="text-primary" />
            Leaderboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Lowest weekly CO₂ from food wins 🏆
          </p>
        </motion.header>

        {/* Your Position Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-soft p-5 mb-4 border-primary/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="section-label">Your Rank</span>
              <p className="font-display text-4xl font-extrabold text-foreground mt-1">#3</p>
            </div>
            <div className="text-right">
              <span className="section-label">Weekly CO₂</span>
              <p className="font-display text-2xl font-extrabold text-eco-good mt-1">14.2 kg</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg bg-primary/5">
            <TrendingDown size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              <span className="font-semibold text-primary">2.8 kg less</span> than last week!
            </span>
          </div>
        </motion.div>

        {/* Rankings */}
        <div className="card-soft overflow-hidden">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className={`flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-b-0 ${
                entry.isYou ? "bg-primary/5" : ""
              }`}
            >
              <span className="w-8 text-center font-display font-extrabold text-sm text-muted-foreground">
                {getRankIcon(entry.rank) || `#${entry.rank}`}
              </span>
              <span className="text-xl">{entry.avatar}</span>
              <div className="flex-1">
                <span className={`text-sm font-semibold ${entry.isYou ? "text-primary" : "text-foreground"}`}>
                  {entry.name}
                </span>
                <span className="text-xs text-muted-foreground ml-2">
                  🔥 {entry.streak}d streak
                </span>
              </div>
              <span className="font-display font-bold text-sm text-foreground">
                {entry.co2} kg
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
