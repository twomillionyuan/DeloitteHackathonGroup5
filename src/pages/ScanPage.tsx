import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const ScanPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Scan Receipt</h1>
          <p className="text-sm text-muted-foreground mt-1">Earn or lose Aura based on your food choices</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 30 }}
          className="card-surface aspect-[3/4] flex flex-col items-center justify-center gap-4 relative overflow-hidden"
        >
          {/* Scan line */}
          <div
            className="absolute left-4 right-4 h-[2px] bg-aura-gain rounded-full animate-scan-line opacity-60"
          />
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
            <Camera size={28} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground text-center px-8">
            Point your camera at a restaurant receipt to analyze your meal's carbon impact
          </p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="mt-4 px-8 py-3 bg-aura-gain text-background font-semibold text-sm rounded-xl"
          >
            Open Camera
          </motion.button>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ScanPage;
