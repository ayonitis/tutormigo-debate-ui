import type { LucideIcon } from "lucide-react";

export type GradeLevelId = "elementary" | "middle" | "high";
export type TopicCategoryId =
  | "education"
  | "technology"
  | "environment"
  | "society"
  | "science";
export type DebateSide = "for" | "against";
export type DebateLengthId = "quick" | "full";
export type TopicMode = "suggested" | "custom";
export type WizardStepId = "grade" | "topic" | "side" | "customize" | "review";

export interface GradeLevel {
  id: GradeLevelId;
  label: string;
  name: string;
  ages: string;
  description: string;
  icon: LucideIcon;
}

export interface TopicCategory {
  id: TopicCategoryId;
  label: string;
  icon: LucideIcon;
}

export interface DebateTopic {
  id: string;
  title: string;
  category: TopicCategoryId;
  levels: GradeLevelId[];
  blurb?: string;
}

export interface DebateLengthOption {
  id: DebateLengthId;
  title: string;
  description: string;
  /** Demo value only - not confirmed by TutorMigo. */
  demoRounds: number;
  icon: LucideIcon;
}

export interface DebateSetup {
  grade: GradeLevelId | null;
  topicMode: TopicMode;
  topicId: string | null;
  customTopic: string;
  side: DebateSide | null;
  length: DebateLengthId;
  voiceMatch: boolean;
}

export interface WizardStep {
  id: WizardStepId;
  title: string;
  shortTitle: string;
}

export interface PastDebate {
  id: string;
  topic: string;
  lastActivity: string;
  side: DebateSide;
  roundsDone: number;
  totalRounds: number;
  lastStudentPoint: string;
  lastTutorPoint: string;
}
