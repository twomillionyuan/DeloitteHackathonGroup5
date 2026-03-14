import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Gift, Lock, Star, Sparkles, ChevronRight } from "lucide-react";

interface Tier {
  name: string;
  minAura: number;
  color: string;
  bgClass: string;
  perks: string[];
}

const tiers: Tier[] = [
  {
    name: "Bronze",
    minAura: 30,
    color: "hsl(30 60% 55%)",
    bgClass: "from-[hsl(30,60%,55%)] to-[hsl(30,40%,35%)]",
    perks: ["5% off at partner cafés", "Free SL day-pass raffle (monthly)"],
  },
  {
    name: "Silver",
    minAura: 60,
    color: "hsl(220 10% 65%)",
    bgClass: "from-[hsl(220,10%,65%)] to-[hsl(220,10%,40%)]",
    perks: ["10% Mecenat food deals", "Priority STUK event access", "Free coffee weekly"],
  },
  {
    name: "Gold",
    minAura: 85,
    color: "hsl(45 100% 55%)",
    bgClass: "from-[hsl(45,100%,55%)] to-[hsl(35,100%,40%)]",
    perks: ["20% Mecenat all categories", "Exclusive STUK merch drops", "Free meal monthly", "VIP leaderboard badge"],
  },
];

const currentAura = 84.2;

interface DealItem {
  partner: string;
  discount: string;
  tier: string;
  locked: boolean;
}

const deals: DealItem[] = [
  { partner: "Urban Deli", discount: "15% off green menu", tier: "Silver", locked: false },
  { partner: "Espresso House", discount: "Free oat latte", tier: "Silver", locked: false },
  { partner: "MAX Burgers", discount: "20% off plant-based", tier: "Gold", locked: true },
  { partner: "Akademibokhandeln", discount: "10% student books", tier: "Bronze", locked: false },
  { partner: "SL", discount: "30-day pass raffle entry", tier: "Bronze", locked: false },
  { partner: "STUK Event", discount: "Free entry next event", tier: "Gold", locked: true },
];

const RewardsPage = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Rewards</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Higher Aura = better discounts from Mecenat & STUK
          </p>
        </motion.header>

        {/* Current Tier Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.05 }}
          className="card-surface p-5 mb-4"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="data-label">Your Tier</span>
            <span className="font-mono-data text-xs text-muted-foreground">
              {currentAura} Aura
            </span>
          </div>

          {/* Tier Progress Bar */}
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(30,60%,55%), hsl(220,10%,65%), hsl(45,100%,55%))`,
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(100, (currentAura / 100) * 100)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30, delay: 0.2 }}
            />
            {/* Tier markers */}
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="absolute top-1/2 -translate-y-1/2 w-1 h-4 rounded-full"
                style={{
                  left: `${tier.minAura}%`,
                  backgroundColor: tier.color,
                  opacity: currentAura >= tier.minAura ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Tier Cards */}
          <div className="grid grid-cols-3 gap-2">
            {tiers.map((tier) => {
              const unlocked = currentAura >= tier.minAura;
              return (
                <div
                  key={tier.name}
                  className={`relative rounded-xl p-3 text-center transition-all ${
                    unlocked ? "opacity-100" : "opacity-40"
                  }`}
                  style={{
                    background: unlocked
                      ? `linear-gradient(135deg, ${tier.color}20, ${tier.color}08)`
                      : undefined,
                    border: unlocked ? `1px solid ${tier.color}30` : "1px solid hsl(var(--border))",
                  }}
                >
                  {unlocked ? (
                    <Star size={18} style={{ color: tier.color }} className="mx-auto mb-1" />
                  ) : (
                    <Lock size={18} className="text-muted-foreground mx-auto mb-1" />
                  )}
                  <p className="text-xs font-semibold text-foreground">{tier.name}</p>
                  <p className="text-[10px] font-mono-data text-muted-foreground mt-0.5">
                    {tier.minAura}+ Aura
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Active Perks */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4"
        >
          <span className="data-label mb-3 block">Your Perks</span>
          <div className="space-y-1">
            {tiers
              .filter((t) => currentAura >= t.minAura)
              .flatMap((t) =>
                t.perks.map((perk, i) => (
                  <div
                    key={`${t.name}-${i}`}
                    className="card-surface px-4 py-3 flex items-center gap-3"
                  >
                    <Sparkles size={14} style={{ color: t.color }} className="shrink-0" />
                    <span className="text-xs text-foreground">{perk}</span>
                    <span
                      className="ml-auto text-[10px] font-mono-data shrink-0"
                      style={{ color: t.color }}
                    >
                      {t.name}
                    </span>
                  </div>
                ))
              )}
          </div>
        </motion.div>

        {/* Deals from Partners */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <span className="data-label mb-3 block">Partner Deals</span>
          <div className="space-y-1">
            {deals.map((deal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.04 }}
                className={`card-surface px-4 py-3 flex items-center gap-3 ${
                  deal.locked ? "opacity-50" : ""
                }`}
              >
                {deal.locked ? (
                  <Lock size={14} className="text-muted-foreground shrink-0" />
                ) : (
                  <Gift size={14} className="text-aura-gain shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{deal.partner}</p>
                  <p className="text-[10px] text-muted-foreground">{deal.discount}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono-data text-muted-foreground">
                    {deal.tier}
                  </span>
                  {!deal.locked && (
                    <ChevronRight size={14} className="text-muted-foreground" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Tier Nudge */}
        {currentAura < 85 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="card-surface p-4 mt-6 border-aura-gain/20"
            style={{ borderColor: "hsl(var(--aura-gain) / 0.2)" }}
          >
            <div className="flex items-center gap-3">
              <Sparkles size={18} className="text-aura-gain shrink-0" />
              <div>
                <p className="text-xs font-semibold text-foreground">
                  {(85 - currentAura).toFixed(1)} Aura to Gold
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Take 2 more transit trips this week to unlock Gold perks
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default RewardsPage;
