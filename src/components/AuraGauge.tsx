import { motion } from "framer-motion";

interface AuraGaugeProps {
  value: number; // 0–100
  maxValue?: number;
}

export const AuraGauge = ({ value, maxValue = 100 }: AuraGaugeProps) => {
  const fillPercent = Math.min(100, Math.max(0, (value / maxValue) * 100));

  return (
    <div className="relative w-3 h-full rounded-full bg-muted overflow-hidden">
      <motion.div
        className="absolute bottom-0 left-0 w-full rounded-full"
        style={{
          background: "var(--aura-gradient)",
        }}
        initial={{ height: "0%" }}
        animate={{ height: `${fillPercent}%` }}
        transition={{ type: "spring", stiffness: 400, damping: 30, delay: 0.3 }}
      />
    </div>
  );
};
