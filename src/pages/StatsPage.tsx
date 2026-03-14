import { BottomNav } from "../components/BottomNav";
import { StatCard } from "../components/StatCard";
import { motion } from "framer-motion";

const StatsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Your Stats</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance over the last 30 days</p>
        </motion.header>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <StatCard label="Total CO₂ Saved" value="72.1" unit="kg" />
          <StatCard label="Total Distance" value="184" unit="km" />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <StatCard label="Transit Trips" value="38" gain={false} />
          <StatCard label="Bike Rides" value="14" gain={false} />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <StatCard label="Green Meals" value="24" />
          <StatCard label="High-Carbon Meals" value="6" gain={false} />
        </div>

        {/* Sparkline placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-surface p-4 mt-6"
        >
          <span className="data-label">Aura Over Time</span>
          <div className="mt-3 flex items-end gap-[3px] h-20">
            {[40, 45, 42, 55, 60, 58, 65, 70, 68, 72, 75, 78, 74, 80, 82, 79, 84, 82, 85, 84, 86, 88, 84, 82, 85, 87, 84, 86, 84, 84].map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-aura-gain"
                style={{ height: `${v}%`, opacity: 0.3 + (v / 100) * 0.7 }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-muted-foreground font-mono-data">30d ago</span>
            <span className="text-[10px] text-muted-foreground font-mono-data">Today</span>
          </div>
        </motion.div>

        {/* Car impact */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-surface p-4 mt-2"
        >
          <span className="data-label">If You Had Driven Instead</span>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-mono-data text-3xl font-bold tracking-tighter text-aura-loss">+48.3</span>
            <span className="text-xs text-muted-foreground font-mono-data">kg CO₂</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            That's equivalent to charging 5,870 smartphones
          </p>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default StatsPage;
