import { motion } from "framer-motion";
import { Train, Utensils, Car, Bike } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "transit" | "receipt" | "car" | "bike";
  label: string;
  detail: string;
  aura: number;
  time: string;
}

const activities: ActivityItem[] = [
  { id: "1", type: "transit", label: "Green Line → KTH", detail: "4.2km · Saved 1.2kg CO₂", aura: 12, time: "08:32" },
  { id: "2", type: "receipt", label: "Plant-based lunch", detail: "Restaurang Nosh · Scanned", aura: 8, time: "12:15" },
  { id: "3", type: "car", label: "Uber to Södermalm", detail: "3.8km · 0.9kg CO₂ emitted", aura: -18, time: "Yesterday" },
  { id: "4", type: "bike", label: "Biked to campus", detail: "2.1km · Zero emissions", aura: 6, time: "Yesterday" },
  { id: "5", type: "receipt", label: "Beef burger", detail: "MAX Burgers · Scanned", aura: -9, time: "Mon" },
];

const icons = {
  transit: Train,
  receipt: Utensils,
  car: Car,
  bike: Bike,
};

export const ActivityFeed = () => {
  return (
    <div className="card-surface p-0 overflow-hidden">
      <div className="px-4 pt-4 pb-3">
        <span className="data-label">Recent Activity</span>
      </div>
      <div>
        {activities.map((item, i) => {
          const Icon = icons[item.type];
          const isGain = item.aura >= 0;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 30 }}
              className="flex items-center gap-3 px-4 py-3 border-b border-muted last:border-b-0"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isGain ? "bg-aura-gain/10" : "bg-aura-loss/10"}`}>
                <Icon size={16} className={isGain ? "text-aura-gain" : "text-aura-loss"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`font-mono-data text-sm font-bold tracking-tighter ${isGain ? "text-aura-gain" : "text-aura-loss"}`}>
                  {isGain ? "+" : ""}{item.aura}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.time}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
