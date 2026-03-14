import { BottomNav } from "../components/BottomNav";
import { DailyRecipeSuggestions } from "../components/DailyRecipeSuggestions";
import { DailyTracker } from "../components/DailyTracker";
import { motion } from "framer-motion";
import { ChefHat, Leaf } from "lucide-react";

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
              Cook smarter today
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Start with two low-carbon meals picked for you
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Leaf size={20} className="text-primary" />
          </div>
        </motion.header>

        <DailyRecipeSuggestions />

        <div className="mt-4">
          <DailyTracker />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="card-soft mt-4 flex items-start gap-3 p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <ChefHat size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Why these meals?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              The daily picks balance low CO₂, short cook time, and variety so the landing page gives you a realistic lunch and dinner plan instead of a generic feed.
            </p>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
