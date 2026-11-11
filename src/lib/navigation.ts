import { BookOpen, History, LayoutDashboard, MessagesSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  active?: boolean;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "https://tutormigo.ai/", icon: LayoutDashboard, external: true },
  { label: "Learn", href: "https://tutormigo.ai/how-it-works", icon: BookOpen, external: true },
  { label: "Debate", href: "/", icon: MessagesSquare, active: true },
  { label: "Past Debates", href: "#past-debates", icon: History },
];
