import { BarChart3, Home, Receipt, Trophy, Plug, Gift } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Trophy, label: "Rank", path: "/leaderboard" },
  { icon: Receipt, label: "Scan", path: "/scan" },
  { icon: Plug, label: "Apps", path: "/connect" },
  { icon: Gift, label: "Rewards", path: "/rewards" },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2"
            >
              <motion.div
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <tab.icon size={20} className={active ? "text-aura-gain" : "text-muted-foreground"} />
              </motion.div>
              <span className={`text-[10px] font-medium tracking-wide ${active ? "text-aura-gain" : "text-muted-foreground"}`}>
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -top-px left-2 right-2 h-[2px] bg-aura-gain rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
