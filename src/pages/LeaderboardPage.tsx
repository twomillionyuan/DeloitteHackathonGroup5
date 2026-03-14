import { useState } from "react";
import { BottomNav } from "../components/BottomNav";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cityEntries, comparisonStats, friendEntries, type LeaderEntry } from "../data/leaderboard";

type LeaderboardLocationState = {
  from?: string;
};

const rankEntries = (entries: LeaderEntry[]) =>
  [...entries]
    .sort((a, b) => a.co2 - b.co2)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));

const LeaderboardPage = () => {
  const [view, setView] = useState<"friends" | "city">("friends");
  const location = useLocation();
  const rankedFriendEntries = rankEntries(friendEntries);
  const entries = view === "friends" ? rankedFriendEntries : cityEntries;
  const you = entries.find((entry) => entry.isYou) ?? rankedFriendEntries.find((entry) => entry.isYou)!;
  const backTo = (location.state as LeaderboardLocationState | null)?.from;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          {backTo === "/" ? (
            <Link
              to={backTo}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>
          ) : null}
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
          <span className="section-label">Stats</span>
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
                className="border-b border-border px-1 last:border-b-0"
              >
                <Link
                  to={entry.isYou ? "/profile" : `/people/${entry.id}`}
                  state={{ from: "/leaderboard" }}
                  className={`flex items-center gap-3 py-3 ${
                    entry.isYou ? "text-primary" : ""
                  }`}
                >
                  <span className="w-8 text-center font-display text-sm font-extrabold text-muted-foreground">
                    #{entry.rank}
                  </span>
                  {entry.isYou ? (
                    <ProfileAvatar className="h-10 w-10 border border-border" />
                  ) : (
                    <img
                      src={entry.avatarUrl}
                      alt={`${entry.name} profile`}
                      className="h-10 w-10 rounded-full border border-border object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-semibold ${entry.isYou ? "text-primary" : "text-foreground"}`}>{entry.name}</p>
                    <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
                  </div>
                  <span className="font-display text-sm font-bold text-foreground">{entry.co2} kg</span>
                </Link>
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
