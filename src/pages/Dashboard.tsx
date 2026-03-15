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
    24,
    Math.round(((averageFriendCo2 - yourCo2) / Math.max(averageFriendCo2, 0.1)) * 100),
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-7 pb-4"
        >
          <p className="mb-4 text-center font-display text-[1.35rem] leading-none text-foreground">
            You're doing great Julia!
          </p>
          <div className="flex justify-center">
            <div className="flex w-full max-w-[19rem] flex-col items-center text-center">
              <span className="section-label">Sustainable points</span>
              <div className="mt-3 flex items-center gap-2">
                <p className="font-display text-[2.35rem] font-black leading-none text-foreground">
                  {score}
                </p>
                <img
                  src="/leaf.png"
                  alt="Sustainable points"
                  className="h-11 w-11 shrink-0 object-contain"
                />
              </div>
              <div className="mt-3 grid w-full grid-cols-2 gap-x-5 gap-y-2 text-center">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">CO₂ saved</p>
                  <p className="mt-1 font-display text-[1.2rem] leading-none text-foreground">{co2Saved} kg</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Meals logged</p>
                  <p className="mt-1 font-display text-[1.2rem] leading-none text-foreground">{mealsLogged}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">
                {betterThanFriendsPercent}% better than your average friend.
              </p>
            </div>
          </div>
        </motion.header>

        <div className="mt-3">
          <DailyRecipeSuggestions compact />
        </div>

        <div className="mt-4">
          <PantryRecipeGenerator compact />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Dashboard;
