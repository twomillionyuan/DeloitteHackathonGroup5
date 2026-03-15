import { BottomNav } from "../components/BottomNav";
import { ProfileAvatar } from "../components/ProfileAvatar";
import { motion } from "framer-motion";
import { ArrowLeft, Award, Heart, TreePine } from "lucide-react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { getLeaderboardProfileById } from "../data/leaderboard";

type LeaderboardProfileLocationState = {
  from?: string;
};

const LeaderboardProfilePage = () => {
  const { profileId } = useParams();
  const location = useLocation();
  const profile = getLeaderboardProfileById(profileId);
  const backTo = (location.state as LeaderboardProfileLocationState | null)?.from ?? "/leaderboard";
  const backLabel = backTo === "/" ? "Back to dashboard" : "Back to leaderboard";

  if (!profile) {
    return <Navigate to="/leaderboard" replace />;
  }
  
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="mx-auto max-w-md px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4 text-center"
        >
          <Link
            to={backTo}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {backLabel}
          </Link>

          {profile.isYou ? (
            <ProfileAvatar className="mx-auto mb-4 h-32 w-32 border border-border" />
          ) : (
            <img
              src={profile.avatarUrl}
              alt={`${profile.name} profile`}
              className="mx-auto mb-4 h-32 w-32 rounded-full border border-border object-cover"
            />
          )}
          <h1 className="font-display text-[1.75rem] leading-none text-foreground">{profile.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{profile.bio ?? "Viewing friend stats."}</p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="pb-6"
        >
          <span className="section-label">Stats</span>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Weekly CO₂</p>
              <p className="mt-2 font-display text-[1.3rem] leading-none text-foreground">{profile.co2} kg</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="mt-2 font-display text-[1.3rem] leading-none text-foreground">{profile.streak} days</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Meals logged</p>
              <p className="mt-2 font-display text-[1.3rem] leading-none text-foreground">{profile.mealsLogged ?? 0}</p>
            </div>
            <div className="border-b border-border pb-3">
              <p className="text-xs text-muted-foreground">Badges</p>
              <p className="mt-2 font-display text-[1.3rem] leading-none text-foreground">{profile.badgesEarned ?? 0}</p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="pb-6"
        >
          <span className="section-label">Impact</span>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <TreePine size={18} className="mx-auto mb-1 text-eco-good" />
              <p className="font-display text-xl text-foreground">{profile.co2Saved ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">kg CO₂ saved</p>
            </div>
            <div>
              <Heart size={18} className="mx-auto mb-1 text-primary" />
              <p className="font-display text-xl text-foreground">{profile.mealsLogged ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">meals logged</p>
            </div>
            <div>
              <Award size={18} className="mx-auto mb-1 text-accent" />
              <p className="font-display text-xl text-foreground">{profile.badgesEarned ?? 0}</p>
              <p className="text-[10px] text-muted-foreground">badges earned</p>
            </div>
          </div>
        </motion.section>
      </div>
      <BottomNav />
    </div>
  );
};

export default LeaderboardProfilePage;
