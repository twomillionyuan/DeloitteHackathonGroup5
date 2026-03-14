import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  unit?: string;
  gain?: boolean;
}

export const StatCard = ({ label, value, unit, gain = true }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="card-surface p-4 flex flex-col gap-1"
    >
      <span className="data-label">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono-data text-2xl font-bold tracking-tighter ${gain ? "text-aura-gain" : "text-foreground"}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground font-mono-data">{unit}</span>}
      </div>
    </motion.div>
  );
};
