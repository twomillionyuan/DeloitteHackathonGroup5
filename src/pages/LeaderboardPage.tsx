import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface LeaderEntry {
  rank: number;
  name: string;
  co2: number;
  streak: number;
  isYou?: boolean;
  avatarUrl: string;
}

const friendEntries: LeaderEntry[] = [
  { rank: 1, name: "Saga L.", co2: 9.8, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg" },
  { rank: 2, name: "Elias N.", co2: 11.2, streak: 10, avatarUrl: "/avatars/IMG_6265.jpg" },
  { rank: 3, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg" },
  { rank: 4, name: "Wilma Ö.", co2: 15.8, streak: 5, avatarUrl: "/avatars/IMG_6267.jpg" },
  { rank: 5, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg" },
];

const cityEntries: LeaderEntry[] = [
  { rank: 1, name: "Nora S.", co2: 8.9, streak: 11, avatarUrl: "/avatars/IMG_6267.jpg" },
  { rank: 2, name: "Amir T.", co2: 10.4, streak: 6, avatarUrl: "/avatars/IMG_6270.jpg" },
  { rank: 3, name: "Saga L.", co2: 10.9, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg" },
  { rank: 4, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg" },
  { rank: 5, name: "Mira K.", co2: 14.6, streak: 4, avatarUrl: "/avatars/IMG_6265.jpg" },
  { rank: 6, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg" },
];

const comparisonStats = [
  { label: "You", value: "14.2 kg", detail: "this week" },
  { label: "Average person", value: "18.6 kg", detail: "this week" },
  { label: "Difference", value: "-4.4 kg", detail: "below average" },
];

const LeaderboardPage = () => {
  const [view, setView] = useState<"friends" | "city">("friends");
  const entries = view === "friends" ? friendEntries : cityEntries;
  const you = entries.find((entry) => entry.isYou) ?? friendEntries.find((entry) => entry.isYou)!;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-primary" />
            <h1 className="font-display text-2xl font-extrabold text-foreground">Leaderboard</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">Rank is based on weekly CO₂ only. Streak does not affect rank.</p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="pb-5"
        >
          <div className="flex items-end justify-between gap-3 border-b border-border pb-4">
            <div>
              <span className="section-label">Your place</span>
              <p className="mt-2 font-display text-[1.9rem] leading-none text-foreground">#{you.rank}</p>
            </div>
            <div className="text-right">
              <span className="section-label">Streak</span>
              <p className="mt-2 font-display text-[1.4rem] leading-none text-foreground">{you.streak} days</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="pb-6"
        >
          <span className="section-label">Your stats vs the average person</span>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {comparisonStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 + index * 0.04 }}
                className="border-b border-border pb-3"
              >
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-display text-[1.25rem] leading-none text-foreground">{stat.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="section-label">Leaderboard</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setView("friends")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  view === "friends" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                Friends
              </button>
              <button
                type="button"
                onClick={() => setView("city")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  view === "city" ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}
              >
                Your city
              </button>
            </div>
          </div>

          <div className="mt-4">
            {entries.map((entry, index) => (
              <motion.div
                key={`${view}-${entry.rank}-${entry.name}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + index * 0.04 }}
                className={`flex items-center gap-3 border-b border-border px-1 py-3 last:border-b-0 ${
                  entry.isYou ? "text-primary" : ""
                }`}
              >
                <span className="w-8 text-center font-display text-sm font-extrabold text-muted-foreground">
                  #{entry.rank}
                </span>
                <img
                  src={entry.avatarUrl}
                  alt={`${entry.name} profile`}
                  className="h-10 w-10 rounded-full border border-border object-cover"
                />
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${entry.isYou ? "text-primary" : "text-foreground"}`}>{entry.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
                </div>
                <span className="font-display text-sm font-bold text-foreground">{entry.co2} kg</span>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
