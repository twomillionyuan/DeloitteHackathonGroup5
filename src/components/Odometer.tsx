import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface OdometerProps {
  value: number;
  decimals?: number;
  className?: string;
}

const OdometerDigit = ({ digit, className }: { digit: string; className?: string }) => {
  return (
    <span className={`inline-block overflow-hidden relative h-[1em] ${className}`}>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export const Odometer = ({ value, decimals = 1, className = "" }: OdometerProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatted = displayValue.toFixed(decimals);
  const digits = formatted.split("");

  return (
    <span className={`font-mono-data inline-flex ${className}`}>
      {digits.map((d, i) => (
        <OdometerDigit key={`${i}-${d}`} digit={d} />
      ))}
    </span>
  );
};
