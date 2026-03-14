import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { useState } from "react";
import { Train, MapPin, Bike, CreditCard, Check, ChevronRight, Unplug } from "lucide-react";

interface AppIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  auraBoost: string;
}

const integrations: AppIntegration[] = [
  {
    id: "sl",
    name: "SL",
    description: "Auto-track transit trips & CO₂ savings",
    icon: Train,
    color: "hsl(var(--aura-gain))",
    auraBoost: "+3–8 per trip",
  },
  {
    id: "google-maps",
    name: "Google Maps",
    description: "Import travel history & transport modes",
    icon: MapPin,
    color: "hsl(210 100% 56%)",
    auraBoost: "+2–5 per green trip",
  },
  {
    id: "strava",
    name: "Strava",
    description: "Sync bike rides & walking activity",
    icon: Bike,
    color: "hsl(16 100% 56%)",
    auraBoost: "+5–12 per activity",
  },
  {
    id: "swish",
    name: "Swish",
    description: "Detect green purchases & restaurants",
    icon: CreditCard,
    color: "hsl(156 72% 48%)",
    auraBoost: "+1–4 per purchase",
  },
];

const ConnectPage = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>({});

  const toggleConnect = (id: string) => {
    setConnected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-12 pb-6"
        >
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Connect Apps</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Link your apps to earn Aura automatically
          </p>
        </motion.header>

        <div className="space-y-2">
          {integrations.map((app, i) => {
            const isConnected = connected[app.id];
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 30 }}
                className="card-surface p-4"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${app.color}15` }}
                  >
                    <app.icon size={22} style={{ color: app.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{app.name}</span>
                      {isConnected && (
                        <span className="text-[10px] font-mono-data text-aura-gain uppercase tracking-wider">
                          Connected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{app.description}</p>
                    <p className="text-[10px] font-mono-data text-aura-gain mt-1">{app.auraBoost}</p>
                  </div>
                  <button
                    onClick={() => toggleConnect(app.id)}
                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      isConnected
                        ? "bg-aura-gain/10"
                        : "bg-secondary hover:bg-accent"
                    }`}
                  >
                    {isConnected ? (
                      <Check size={18} className="text-aura-gain" />
                    ) : (
                      <ChevronRight size={18} className="text-muted-foreground" />
                    )}
                  </button>
                </div>

                {isConnected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 pt-3 border-t border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-aura-gain animate-pulse" />
                      <span className="text-xs text-muted-foreground">Syncing data…</span>
                    </div>
                    <button
                      onClick={() => toggleConnect(app.id)}
                      className="flex items-center gap-1 text-xs text-aura-loss hover:underline"
                    >
                      <Unplug size={12} />
                      Disconnect
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Data Privacy Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card-surface p-4 mt-6"
        >
          <span className="data-label">Privacy</span>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Your data stays on your device. We only process anonymised transport & purchase
            categories to calculate your Aura score. No personal financial data is stored.
          </p>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default ConnectPage;
