import { Odometer } from "../components/Odometer";
import { AuraGauge } from "../components/AuraGauge";
import { StatCard } from "../components/StatCard";
import { ActivityFeed } from "../components/ActivityFeed";
import { Leaderboard } from "../components/Leaderboard";
import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="pt-12 pb-2"
        >
          <span className="data-label">Your Aura</span>
        </motion.header>

        {/* Aura Score Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.1 }}
          className="card-surface p-6 flex items-center gap-6 mb-2"
        >
          <div className="h-28">
            <AuraGauge value={84.2} />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <Odometer value={84.2} className="text-5xl font-bold tracking-tighter text-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Top <span className="text-aura-gain font-semibold">4%</span> of KTH Students
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              +12 today · 3-day streak
            </p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <StatCard label="CO₂ Saved" value="18.4" unit="kg this week" />
          <StatCard label="Distance" value="42.7" unit="km via transit" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <StatCard label="Receipts Scanned" value="12" gain={false} />
          <StatCard label="Aura Loss" value="-27" unit="this month" gain={false} />
        </div>

        {/* Activity Feed */}
        <div className="breathing-zone">
          <ActivityFeed />
        </div>

        {/* Leaderboard Preview */}
        <div className="pb-8">
          <Leaderboard />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
