import { motion } from "framer-motion";
import { Salad, Fish, Coffee } from "lucide-react";

interface MealEntry {
  id: string;
  meal: string;
  items: string;
  co2: number;
  time: string;
  icon: React.ElementType;
}

const meals: MealEntry[] = [
  { id: "1", meal: "Breakfast", items: "Oat yoghurt, berries, coffee", co2: 0.4, time: "07:30", icon: Coffee },
  { id: "2", meal: "Lunch", items: "Falafel wrap, hummus, greens", co2: 0.6, time: "12:15", icon: Salad },
  { id: "3", meal: "Dinner", items: "Salmon, rice, roasted veggies", co2: 1.4, time: "18:30", icon: Fish },
];

const getCo2Color = (co2: number) => {
  if (co2 <= 0.5) return "text-eco-good";
  if (co2 <= 1.0) return "text-eco-warn";
  return "text-eco-bad";
};

const getCo2Bg = (co2: number) => {
  if (co2 <= 0.5) return "bg-eco-good/10";
  if (co2 <= 1.0) return "bg-[hsl(var(--eco-warn)/0.1)]";
  return "bg-eco-bad/10";
};

export const TodaysMeals = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span className="section-label mb-3 block">Today's Meals</span>
      <div className="space-y-2">
        {meals.map((meal, i) => {
          const Icon = meal.icon;
          return (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="card-soft p-4 flex items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCo2Bg(meal.co2)}`}>
                <Icon size={18} className={getCo2Color(meal.co2)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{meal.meal}</p>
                <p className="text-xs text-muted-foreground truncate">{meal.items}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-display font-bold text-sm ${getCo2Color(meal.co2)}`}>
                  {meal.co2} kg
                </p>
                <p className="text-[10px] text-muted-foreground">{meal.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
