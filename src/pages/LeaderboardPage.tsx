import { Leaderboard } from "../components/Leaderboard";
import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Stockholm Student Network</p>
        </motion.header>
        <Leaderboard />
      </div>
      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
