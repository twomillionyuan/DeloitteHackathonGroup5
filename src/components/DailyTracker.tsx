import { motion } from "framer-motion";

const DAILY_BUDGET = 6.0; // kg CO2
const used = 2.4;
const remaining = DAILY_BUDGET - used;
const percentage = (used / DAILY_BUDGET) * 100;

export const DailyTracker = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="card-soft p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="section-label">Today's Carbon Budget</span>
        <span className="text-xs text-muted-foreground font-body">
          {used.toFixed(1)} / {DAILY_BUDGET.toFixed(1)} kg CO₂
        </span>
      </div>

      {/* Circular Progress */}
      <div className="flex items-center gap-6">
        <div className="relative w-28 h-28 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            <motion.circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percentage / 100) }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-extrabold text-foreground">
              {remaining.toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">kg left</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <div>
              <p className="text-xs text-muted-foreground">Used</p>
              <p className="font-display font-bold text-foreground">{used.toFixed(1)} kg</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-eco-good" />
            <div>
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="font-display font-bold text-eco-good">{remaining.toFixed(1)} kg</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 You're doing <span className="font-semibold text-primary">32% better</span> than the average Swede today!
        </p>
      </div>
    </motion.div>
  );
};
