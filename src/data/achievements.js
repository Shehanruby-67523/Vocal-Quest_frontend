import { Medal, Compass, ShieldCheck, Gem } from "lucide-react";

export const achievements = [
  {
    id: "recruit",
    title: "Recruit",
    description: "Complete First Quiz Level",
    icon: Medal,
    badgeFrom: "#F6CE5C",
    badgeTo: "#C24E1C",
  },
  {
    id: "explorer",
    title: "Explorer",
    description: "Complete Second Quiz Level",
    icon: Compass,
    badgeFrom: "#A9C4E4",
    badgeTo: "#2D4F76",
  },
  {
    id: "guardian",
    title: "Guardian",
    description: "Complete Third Quiz Level",
    icon: ShieldCheck,
    badgeFrom: "#A9C4E4",
    badgeTo: "#2D4F76",
  },
  {
    id: "precision",
    title: "Precision Castle",
    description: "Get 80% in Quiz",
    icon: Gem,
    badgeFrom: "#B7CCE6",
    badgeTo: "#34567E",
  },
];