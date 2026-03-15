import { useState } from "react";
import { motion } from "framer-motion";

const DAILY_GUIDE = 6.0; // kg CO2
const emitted = 2.4;
const percentage = (emitted / DAILY_GUIDE) * 100;
const weeklyStats = [
  { day: "Mon", value: 2.8, meals: 3, emoji: "🥩", foods: ["Chicken wrap", "Pasta bolognese", "Iced latte"] },
  { day: "Tue", value: 1.9, meals: 2, emoji: "🌱", foods: ["Lentil soup", "Roasted veg couscous"] },
  { day: "Wed", value: 2.4, meals: 3, emoji: "🌱", foods: ["Overnight oats", "Halloumi salad", "Bean toast"] },
  { day: "Thu", value: 1.6, meals: 2, emoji: "🌱", foods: ["Mushroom risotto", "Green smoothie"] },
  { day: "Fri", value: 2.1, meals: 3, emoji: "🥩", foods: ["Turkey sandwich", "Steak tacos", "Frozen yogurt"] },
  { day: "Sat", value: 1.8, meals: 2, emoji: "🌱", foods: ["Tofu stir-fry", "Sweet potato tacos"] },
  { day: "Sun", value: 2.4, meals: 3, emoji: "🥩", foods: ["Egg toast", "Salmon bowl", "Chicken soup"] },
];

export const DailyTracker = () => {
  const [selectedDay, setSelectedDay] = useState(weeklyStats[0]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.1 }}
      className="mb-4 rounded-[17px] border border-border bg-white p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="section-label">Today's CO₂ emitted</span>
        <span className="text-xs text-muted-foreground font-body">
          {emitted.toFixed(1)} kg CO₂
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
              {emitted.toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">kg emitted</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-eco-bad" />
            <div>
              <p className="text-xs text-muted-foreground">Emitted</p>
              <p className="font-display font-bold text-foreground">{emitted.toFixed(1)} kg</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-eco-good" />
            <div>
              <p className="text-xs text-muted-foreground">Daily guide</p>
              <p className="font-display font-bold text-eco-good">{DAILY_GUIDE.toFixed(1)} kg</p>
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
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedDay.foods.map((food) => (
              <span
                key={food}
                className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
