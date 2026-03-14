import { logOut } from "@/lib/auth";
import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Leaf, Award, Share2, Heart, TreePine } from "lucide-react";

const badges = [
  { emoji: "🌱", label: "First Log", earned: true },
  { emoji: "🔥", label: "7-Day Streak", earned: true },
  { emoji: "🥗", label: "Veggie Week", earned: true },
  { emoji: "🌍", label: "50 kg Saved", earned: false },
  { emoji: "👑", label: "Top 3", earned: false },
  { emoji: "💎", label: "30-Day Streak", earned: false },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-4xl">🍃</span>
          </div>
          <h1 className="font-display text-xl font-extrabold text-foreground">You</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Eco warrior since March 2026</p>
        </motion.header>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-soft p-5 mb-4"
        >
          <span className="section-label mb-3 block">Total Impact</span>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <TreePine size={18} className="text-eco-good mx-auto mb-1" />
              <p className="font-display text-xl font-extrabold text-foreground">42</p>
              <p className="text-[10px] text-muted-foreground">kg CO₂ saved</p>
            </div>
            <div>
              <Heart size={18} className="text-primary mx-auto mb-1" />
              <p className="font-display text-xl font-extrabold text-foreground">89</p>
              <p className="text-[10px] text-muted-foreground">meals logged</p>
            </div>
            <div>
              <Award size={18} className="text-accent mx-auto mb-1" />
              <p className="font-display text-xl font-extrabold text-foreground">3</p>
              <p className="text-[10px] text-muted-foreground">badges earned</p>
            </div>
          </div>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <span className="section-label mb-3 block">Badges</span>
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                className={`card-soft p-3 text-center ${!badge.earned ? "opacity-40" : ""}`}
              >
                <span className="text-2xl">{badge.emoji}</span>
                <p className="text-[10px] text-muted-foreground mt-1 font-medium">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Share */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full card-soft p-4 flex items-center justify-center gap-2 text-primary font-semibold text-sm hover:shadow-md transition-shadow"
        >
          <Share2 size={16} />
          Share your impact with friends
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileTap={{ scale: 0.98 }}
          onClick={logOut}
          className="w-full card-soft p-4 flex items-center justify-center gap-2 text-destructive font-semibold text-sm hover:shadow-md transition-shadow mt-3"
        >
          Log out
      </motion.button>


        {/* Sustainability Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card-soft p-4 mt-4"
        >
          <div className="flex items-start gap-3">
            <Leaf size={16} className="text-eco-good mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your saved CO₂ is equivalent to <span className="font-semibold text-foreground">planting 2 trees</span> 🌳.
              Keep going — every meal matters!
            </p>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
