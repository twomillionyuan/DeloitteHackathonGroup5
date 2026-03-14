import { motion } from "framer-motion";
import { Salad, Beef, Fish, Egg, Coffee, Apple } from "lucide-react";

const quickItems = [
  { icon: Salad, label: "Vegan", co2: "0.3", color: "hsl(var(--eco-good))" },
  { icon: Egg, label: "Veggie", co2: "0.8", color: "hsl(var(--accent))" },
  { icon: Fish, label: "Fish", co2: "1.2", color: "hsl(var(--primary))" },
  { icon: Beef, label: "Meat", co2: "3.5", color: "hsl(var(--eco-bad))" },
  { icon: Coffee, label: "Coffee", co2: "0.2", color: "hsl(var(--eco-warn))" },
  { icon: Apple, label: "Snack", co2: "0.1", color: "hsl(var(--eco-good))" },
];

export const QuickAdd = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-4"
    >
      <span className="section-label mb-3 block">Quick Log</span>
      <div className="grid grid-cols-3 gap-2">
        {quickItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 + i * 0.04 }}
            whileTap={{ scale: 0.95 }}
            className="card-soft p-3 flex flex-col items-center gap-1.5 hover:shadow-md transition-shadow"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <item.icon size={20} style={{ color: item.color }} />
            </div>
            <span className="text-xs font-semibold text-foreground">{item.label}</span>
            <span className="text-[10px] text-muted-foreground">{item.co2} kg</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
