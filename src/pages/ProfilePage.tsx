import { useState } from "react";
import { logOut } from "@/lib/auth";
import { BottomNav } from "../components/BottomNav";
import { motion } from "framer-motion";
import { Leaf, Heart, Settings, Share2, TreePine, UserPlus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { friendEntries } from "../data/leaderboard";

const friendSuggestions = [
  { id: "nora-s", name: "Nora S.", avatarUrl: "/avatars/IMG_6267.jpg" },
  { id: "mira-k", name: "Mira K.", avatarUrl: "/avatars/IMG_6265.jpg" },
  { id: "amir-t", name: "Amir T.", avatarUrl: "/avatars/IMG_6270.jpg" },
];

const followers = [
  { id: "nora-s", name: "Nora S.", avatarUrl: "/avatars/IMG_6267.jpg", note: "Follows your weekly meals" },
  { id: "maja-r", name: "Maja R.", avatarUrl: "/avatars/IMG_6265.jpg", note: "Likes your low-waste recipes" },
  { id: "lina-h", name: "Lina H.", avatarUrl: "/avatars/IMG_6269.jpg", note: "Checks your stats updates" },
  { id: "amir-t", name: "Amir T.", avatarUrl: "/avatars/IMG_6270.jpg", note: "Sees your climate score" },
];

const ProfilePage = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [connectionsView, setConnectionsView] = useState<null | "following" | "followers">(null);
  const [following, setFollowing] = useState(friendEntries.filter((entry) => !entry.isYou).slice(0, 3));

  const availableSuggestions = friendSuggestions.filter(
    (suggestion) => !following.some((entry) => entry.id === suggestion.id),
  );

  const handleAddFriend = (suggestion: (typeof friendSuggestions)[number]) => {
    setFollowing((current) => [
      ...current,
      {
        id: suggestion.id,
        rank: current.length + 1,
        name: suggestion.name,
        co2: 12.8,
        streak: 5,
        avatarUrl: suggestion.avatarUrl,
      },
    ]);
  };

  const closeConnections = () => {
    setConnectionsView(null);
    setShowAddFriend(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-md mx-auto px-4">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-10 pb-4 text-center"
        >
          <img
            src="/helping-you-make-right-choices.png"
            alt="Helping you make right choices"
            className="mx-auto mb-5 max-w-[15rem]"
          />
          <img
            src="/avatars/IMG_6266.jpg"
            alt="Profile photo"
            className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
          />
          <h1 className="font-display text-xl font-extrabold text-foreground">You</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Eco warrior since March 2026</p>
          <div className="mt-3 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => setConnectionsView("following")}
              className="text-center transition-colors hover:text-primary"
            >
              <p className="font-display text-base font-extrabold leading-none text-foreground">{following.length}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Following</p>
            </button>
            <button
              type="button"
              onClick={() => setConnectionsView("followers")}
              className="text-center transition-colors hover:text-primary"
            >
              <p className="font-display text-base font-extrabold leading-none text-foreground">{followers.length}</p>
              <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Followers</p>
            </button>
          </div>
        </motion.header>

        <div className="mb-4 flex items-center justify-center gap-3">
          <Link
            to="/setup-quiz"
            className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Set up quiz
          </Link>
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Settings size={14} />
            Settings
          </Link>
        </div>

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
              <Heart size={18} className="text-accent mx-auto mb-1" />
              <p className="font-display text-xl font-extrabold text-foreground">{following.length}</p>
              <p className="text-[10px] text-muted-foreground">following</p>
            </div>
          </div>
        </motion.div>

        {/* Sustainability Fact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
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

        {/* Share */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileTap={{ scale: 0.98 }}
          className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Share2 size={16} />
          Share your impact with friends
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileTap={{ scale: 0.98 }}
          onClick={logOut}
          className="mx-auto mt-3 flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Log out
        </motion.button>
      </div>

      {connectionsView ? (
        <div className="fixed inset-0 z-40 bg-foreground/20 px-4 py-8 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-16 max-w-md rounded-[28px] border border-border bg-background p-5 shadow-lg"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="section-label">
                  {connectionsView === "following" ? "Following" : "Followers"}
                </span>
                <p className="mt-1 text-sm text-muted-foreground">
                  {connectionsView === "following"
                    ? "People you follow"
                    : "People following you"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeConnections}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Close connections"
              >
                <X size={16} />
              </button>
            </div>

            {connectionsView === "following" ? (
              <div className="pt-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="section-label">Following</span>
                  <button
                    type="button"
                    onClick={() => setShowAddFriend((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <UserPlus size={14} />
                    Add friend
                  </button>
                </div>

                <div className="space-y-3">
                  {following.map((entry) => (
                    <div key={entry.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                      <img
                        src={entry.avatarUrl}
                        alt={`${entry.name} profile`}
                        className="h-11 w-11 rounded-full border border-border object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                        <p className="text-xs text-muted-foreground">{entry.streak} day streak</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{entry.co2} kg</span>
                    </div>
                  ))}
                </div>

                {showAddFriend ? (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    {availableSuggestions.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No more friends to add.</p>
                    ) : (
                      availableSuggestions.map((entry) => (
                        <div key={entry.id} className="flex items-center gap-3">
                          <img
                            src={entry.avatarUrl}
                            alt={`${entry.name} profile`}
                            className="h-10 w-10 rounded-full border border-border object-cover"
                          />
                          <p className="flex-1 text-sm font-semibold text-foreground">{entry.name}</p>
                          <button
                            type="button"
                            onClick={() => handleAddFriend(entry)}
                            className="rounded-full bg-secondary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            Add
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="space-y-3 pt-4">
                {followers.map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
                    <img
                      src={entry.avatarUrl}
                      alt={`${entry.name} profile`}
                      className="h-11 w-11 rounded-full border border-border object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      ) : null}

      <BottomNav />
    </div>
  );
};

export default ProfilePage;
