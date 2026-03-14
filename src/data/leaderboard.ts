export interface LeaderEntry {
  rank: number;
  name: string;
  co2: number;
  streak: number;
  isYou?: boolean;
  avatarUrl: string;
}

export const friendEntries: LeaderEntry[] = [
  { rank: 1, name: "Saga L.", co2: 9.8, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg" },
  { rank: 2, name: "Elias N.", co2: 11.2, streak: 10, avatarUrl: "/avatars/IMG_6265.jpg" },
  { rank: 3, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg" },
  { rank: 4, name: "Wilma O.", co2: 15.8, streak: 5, avatarUrl: "/avatars/IMG_6267.jpg" },
  { rank: 5, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg" },
];

export const cityEntries: LeaderEntry[] = [
  { rank: 1, name: "Nora S.", co2: 8.9, streak: 11, avatarUrl: "/avatars/IMG_6267.jpg" },
  { rank: 2, name: "Amir T.", co2: 10.4, streak: 6, avatarUrl: "/avatars/IMG_6270.jpg" },
  { rank: 3, name: "Saga L.", co2: 10.9, streak: 14, avatarUrl: "/avatars/IMG_6269.jpg" },
  { rank: 4, name: "You", co2: 14.2, streak: 7, isYou: true, avatarUrl: "/avatars/IMG_6266.jpg" },
  { rank: 5, name: "Mira K.", co2: 14.6, streak: 4, avatarUrl: "/avatars/IMG_6265.jpg" },
  { rank: 6, name: "Leo K.", co2: 18.3, streak: 3, avatarUrl: "/avatars/IMG_6270.jpg" },
];

export const comparisonStats = [
  { label: "You", value: "14.2 kg", detail: "this week" },
  { label: "Average person", value: "18.6 kg", detail: "this week" },
  { label: "Difference", value: "-4.4 kg", detail: "below average" },
];
