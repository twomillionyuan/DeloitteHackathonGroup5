import { BottomNav } from "../components/BottomNav";
import { DailyRecipeSuggestions } from "../components/DailyRecipeSuggestions";
import { PantryRecipeGenerator } from "../components/PantryRecipeGenerator";
import { motion } from "framer-motion";
import { friendEntries } from "../data/leaderboard";

const Dashboard = () => {
  const yourEntry = friendEntries.find((entry) => entry.isYou);
  const co2Saved = yourEntry?.co2Saved ?? 42;
  const mealsLogged = yourEntry?.mealsLogged ?? 89;
  const score = 84;
  const friendsOnly = friendEntries.filter((entry) => !entry.isYou);
  const averageFriendCo2 =
    friendsOnly.reduce((total, entry) => total + entry.co2, 0) / Math.max(friendsOnly.length, 1);
  const yourCo2 = yourEntry?.co2 ?? 14.2;
  const betterThanFriendsPercent = Math.max(
    0,
    Math.round(((averageFriendCo2 - yourCo2) / Math.max(averageFriendCo2, 0.1)) * 100),
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="section-label">Sustainable points</span>
              <div className="mt-3 flex items-center gap-3">
                <p className="font-display text-[2.6rem] font-black leading-none text-foreground">
                  {score}
                </p>
                <img
                  src="/lead.png"
                  alt="Sustainable points"
                  className="h-12 w-12 shrink-0 object-contain"
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">CO₂ saved</p>
                  <p className="mt-1 font-display text-[1.35rem] leading-none text-foreground">{co2Saved} kg</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Meals logged</p>
                  <p className="mt-1 font-display text-[1.35rem] leading-none text-foreground">{mealsLogged}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {betterThanFriendsPercent}% better than your average friend this week.
              </p>
            </div>
          </div>
        </motion.header>

        <div className="mt-4">
          <DailyRecipeSuggestions />
        </div>

        <div className="mt-6">
          <PantryRecipeGenerator />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
