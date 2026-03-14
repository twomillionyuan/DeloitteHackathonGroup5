import { BottomNav } from "../components/BottomNav";
import { DailyTracker } from "../components/DailyTracker";
import { motion } from "framer-motion";
import { TrendingDown, Award, Target, Flame } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  unit: string;
  icon: React.ElementType;
  good?: boolean;
}

const stats: StatItem[] = [
  { label: "This Week", value: "14.2", unit: "kg CO₂", icon: TrendingDown, good: true },
  { label: "Daily Average", value: "2.0", unit: "kg CO₂", icon: Target, good: true },
  { label: "Best Day", value: "0.8", unit: "kg CO₂", icon: Award, good: true },
  { label: "Streak", value: "7", unit: "days green", icon: Flame, good: true },
];

const weekData = [2.8, 1.9, 2.4, 1.6, 2.1, 1.8, 2.4];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weekData);

const comparisons = [
  { item: "Beef Burger", co2: 3.5, emoji: "🍔" },
  { item: "Chicken Salad", co2: 1.2, emoji: "🥗" },
  { item: "Lentil Soup", co2: 0.3, emoji: "🍲" },
  { item: "Oat Milk Latte", co2: 0.1, emoji: "☕" },
  { item: "Cheese Pizza", co2: 1.8, emoji: "🍕" },
];

const StatsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4"
        >
          <h1 className="font-display text-2xl font-extrabold text-foreground">
            Your Impact 📊
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            See how your food choices add up
          </p>
        </motion.header>

        <DailyTracker />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="card-soft p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-primary" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-2xl font-extrabold text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground">{stat.unit}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-soft p-5 mb-4"
        >
          <span className="section-label mb-4 block">This Week</span>
          <div className="flex items-end gap-2 h-32">
            {weekData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">{val}</span>
                <motion.div
                  className="w-full rounded-lg bg-primary/20 relative overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxVal) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: val <= 2.0
                        ? "hsl(var(--eco-good))"
                        : val <= 2.5
                        ? "hsl(var(--primary))"
                        : "hsl(var(--eco-warn))",
                      opacity: 0.8,
                    }}
                  />
                </motion.div>
                <span className="text-[10px] text-muted-foreground">{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Food Comparisons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="section-label mb-3 block">CO₂ Per Meal Comparison</span>
          <div className="space-y-2">
            {comparisons.map((item, i) => (
              <motion.div
                key={item.item}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.04 }}
                className="card-soft p-3 flex items-center gap-3"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="flex-1 text-sm font-medium text-foreground">{item.item}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: item.co2 <= 0.5
                          ? "hsl(var(--eco-good))"
                          : item.co2 <= 1.5
                          ? "hsl(var(--eco-warn))"
                          : "hsl(var(--eco-bad))",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (item.co2 / 4) * 100)}%` }}
                      transition={{ delay: 0.5 + i * 0.05 }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground w-12 text-right">
                    {item.co2} kg
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default StatsPage;
