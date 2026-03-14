export interface LeaderEntry {
  id: string;
  rank: number;
  name: string;
  co2: number;
  streak: number;
  isYou?: boolean;
  avatarUrl: string;
  bio?: string;
  mealsLogged?: number;
  co2Saved?: number;
  badgesEarned?: number;
}

export const friendEntries: LeaderEntry[] = [
  { id: "saga-l", rank: 1, name: "Saga L.", co2: 9.8, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg", bio: "Plant-forward weeknight cook.", mealsLogged: 96, co2Saved: 58, badgesEarned: 5 },
  { id: "elias-n", rank: 2, name: "Elias N.", co2: 11.2, streak: 10, avatarUrl: "/avatars/IMG_6265.jpg", bio: "Always meal-prepping for the week.", mealsLogged: 81, co2Saved: 47, badgesEarned: 4 },
  { id: "you", rank: 3, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg", bio: "Eco warrior since March 2026.", mealsLogged: 89, co2Saved: 42, badgesEarned: 3 },
  { id: "wilma-o", rank: 4, name: "Wilma O.", co2: 15.8, streak: 5, avatarUrl: "/avatars/IMG_6267.jpg", bio: "Quick lunches and low-waste dinners.", mealsLogged: 74, co2Saved: 35, badgesEarned: 3 },
  { id: "leo-k", rank: 5, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg", bio: "Testing greener swaps one meal at a time.", mealsLogged: 62, co2Saved: 22, badgesEarned: 2 },
];

export const cityEntries: LeaderEntry[] = [
  { id: "nora-s", rank: 1, name: "Nora S.", co2: 8.9, streak: 11, avatarUrl: "/avatars/IMG_6267.jpg", bio: "Lunchbox champion.", mealsLogged: 101, co2Saved: 61, badgesEarned: 5 },
  { id: "amir-t", rank: 2, name: "Amir T.", co2: 10.4, streak: 6, avatarUrl: "/avatars/IMG_6270.jpg", bio: "Protein-focused and low impact.", mealsLogged: 78, co2Saved: 40, badgesEarned: 4 },
  { id: "saga-l", rank: 3, name: "Saga L.", co2: 10.9, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg", bio: "Plant-forward weeknight cook.", mealsLogged: 96, co2Saved: 58, badgesEarned: 5 },
  { id: "you", rank: 4, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg", bio: "Eco warrior since March 2026.", mealsLogged: 89, co2Saved: 42, badgesEarned: 3 },
  { id: "mira-k", rank: 5, name: "Mira K.", co2: 14.6, streak: 4, avatarUrl: "/avatars/IMG_6265.jpg", bio: "Cooks fast and keeps it simple.", mealsLogged: 69, co2Saved: 31, badgesEarned: 2 },
  { id: "leo-k", rank: 6, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg", bio: "Testing greener swaps one meal at a time.", mealsLogged: 62, co2Saved: 22, badgesEarned: 2 },
];

export const comparisonStats = [
  { label: "You", value: "14.2 kg", detail: "this week" },
  { label: "Average person", value: "18.6 kg", detail: "this week" },
  { label: "Difference", value: "-4.4 kg", detail: "below average" },
];

export const allLeaderboardProfiles = [...friendEntries, ...cityEntries].reduce<LeaderEntry[]>((profiles, entry) => {
  if (profiles.some((profile) => profile.id === entry.id)) {
    return profiles;
  }
  return [...profiles, entry];
}, []);

export const getLeaderboardProfileById = (profileId?: string) =>
  allLeaderboardProfiles.find((entry) => entry.id === profileId);
