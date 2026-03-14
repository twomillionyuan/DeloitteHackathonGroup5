import { BottomNav } from "../components/BottomNav";
import { DailyTracker } from "../components/DailyTracker";
import { QuickAdd } from "../components/QuickAdd";
import { TodaysMeals } from "../components/TodaysMeals";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4 flex items-center justify-between"
        >
          <div>
            <h1 className="font-display text-2xl font-extrabold text-foreground">
              Good morning! 🌿
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Let's keep it green today
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf size={20} className="text-primary" />
          </div>
        </motion.header>

        {/* Daily CO2 Budget */}
        <DailyTracker />

        {/* Quick Add */}
        <QuickAdd />

        {/* Today's Meals */}
        <TodaysMeals />
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
