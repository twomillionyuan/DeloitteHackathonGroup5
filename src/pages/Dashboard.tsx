import { BottomNav } from "../components/BottomNav";
import { DailyRecipeSuggestions } from "../components/DailyRecipeSuggestions";
import { DailyTracker } from "../components/DailyTracker";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const Dashboard = () => {
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-5"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} />
            <span>{todayLabel}</span>
          </div>
          <div className="mt-3 max-w-sm">
            <h1 className="font-display text-[1.95rem] leading-none text-foreground">
              Today's plan
            </h1>
          </div>
        </motion.header>

        <div className="mt-4">
          <DailyTracker />
        </div>

        <div className="mt-4">
          <DailyRecipeSuggestions />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
