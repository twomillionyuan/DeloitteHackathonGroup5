import { useState } from "react";
import { motion } from "framer-motion";

const DAILY_BUDGET = 6.0; // kg CO2
const used = 2.4;
const remaining = DAILY_BUDGET - used;
const percentage = (used / DAILY_BUDGET) * 100;
const weeklyStats = [
  { day: "Mon", value: 2.8, meals: 3, emoji: "🥩", note: "Campus lunch and quick pasta dinner." },
  { day: "Tue", value: 1.9, meals: 2, emoji: "🌱", note: "Mostly vegetarian day with leftovers." },
  { day: "Wed", value: 2.4, meals: 3, emoji: "🌱", note: "Two home-cooked meals and one snack run." },
  { day: "Thu", value: 1.6, meals: 2, emoji: "🌱", note: "Lowest-impact day this week." },
  { day: "Fri", value: 2.1, meals: 3, emoji: "🥩", note: "Dinner out, but still under target." },
  { day: "Sat", value: 1.8, meals: 2, emoji: "🌱", note: "Simple weekend cooking at home." },
  { day: "Sun", value: 2.4, meals: 3, emoji: "🥩", note: "Meal prep day for the week ahead." },
];

export const DailyTracker = () => {
  const [selectedDay, setSelectedDay] = useState(weeklyStats[0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="mb-4 px-1 py-2"
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
              stroke="hsl(var(--eco-bad))"
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
            <div className="w-3 h-3 rounded-full bg-eco-bad" />
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
      <div className="mt-4 flex items-start gap-2">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 You're doing <span className="font-semibold text-primary">32% better</span> than the average Swede today!
        </p>
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <span className="section-label">This Week</span>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {weeklyStats.map((stat, index) => (
            <motion.button
              key={stat.day}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.04 }}
              onClick={() => setSelectedDay(stat)}
              className={`rounded-xl px-1 py-2 text-center transition-colors ${
                selectedDay.day === stat.day ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
              type="button"
            >
              <p className={`font-body text-sm font-semibold ${selectedDay.day === stat.day ? "text-primary" : "text-foreground"}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-none">{stat.emoji}</p>
              <p className={`mt-2 text-xs ${selectedDay.day === stat.day ? "text-primary" : "text-muted-foreground"}`}>{stat.day}</p>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {selectedDay.value.toFixed(1)} kg CO₂ · {selectedDay.meals} meals
            </p>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {selectedDay.emoji} {selectedDay.emoji === "🌱" ? "Vegetarian day" : "Meat day"}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{selectedDay.note}</p>
        </div>
      </div>
    </motion.div>
  );
};
