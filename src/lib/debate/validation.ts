import { ALL_TOPICS, DEBATE_LENGTHS, GRADE_LEVELS, MORE_TOPICS } from "./data";
import type {
  DebateLengthOption,
  DebateSetup,
  DebateSide,
  DebateTopic,
  GradeLevel,
  GradeLevelId,
} from "./types";

export const CUSTOM_TOPIC_MIN = 10;
export const CUSTOM_TOPIC_MAX = 120;

export const INITIAL_SETUP: DebateSetup = {
  grade: null,
  topicMode: "suggested",
  topicId: null,
  customTopic: "",
  side: null,
  length: "quick",
  voiceMatch: false,
};

export type CustomTopicStatus = "empty" | "short" | "valid";

export function getCustomTopicStatus(text: string): CustomTopicStatus {
  const length = text.trim().length;
  if (length === 0) return "empty";
  if (length < CUSTOM_TOPIC_MIN) return "short";
  return "valid";
}

export function findTopic(id: string | null): DebateTopic | undefined {
  return id ? ALL_TOPICS.find((topic) => topic.id === id) : undefined;
}

export function findGrade(id: GradeLevelId | null): GradeLevel | undefined {
  return id ? GRADE_LEVELS.find((grade) => grade.id === id) : undefined;
}

export function findLength(id: DebateSetup["length"]): DebateLengthOption {
  return DEBATE_LENGTHS.find((option) => option.id === id) ?? DEBATE_LENGTHS[0];
}

export function getMoreTopicsForGrade(grade: GradeLevelId | null): DebateTopic[] {
  return grade ? MORE_TOPICS.filter((topic) => topic.levels.includes(grade)) : MORE_TOPICS;
}

/** The topic text that will be debated, or null when nothing valid is chosen. */
export function getTopicText(setup: DebateSetup): string | null {
  if (setup.topicMode === "custom") {
    return getCustomTopicStatus(setup.customTopic) === "valid"
      ? setup.customTopic.trim()
      : null;
  }
  return findTopic(setup.topicId)?.title ?? null;
}

export function getTutorSide(side: DebateSide): DebateSide {
  return side === "for" ? "against" : "for";
}

export function isStepValid(stepIndex: number, setup: DebateSetup): boolean {
  switch (stepIndex) {
    case 0:
      return setup.grade !== null;
    case 1:
      return getTopicText(setup) !== null;
    case 2:
      return setup.side !== null;
    case 3:
      return true;
    case 4:
      return [0, 1, 2, 3].every((index) => isStepValid(index, setup));
    default:
      return false;
  }
}

/** Highest step index the student may navigate to right now. */
export function getMaxReachableStep(setup: DebateSetup): number {
  for (let index = 0; index < 4; index += 1) {
    if (!isStepValid(index, setup)) return index;
  }
  return 4;
}

export function getStepHint(stepIndex: number, setup: DebateSetup): string | null {
  if (isStepValid(stepIndex, setup)) return null;
  switch (stepIndex) {
    case 0:
      return "Select a grade level to continue.";
    case 1:
      return setup.topicMode === "custom"
        ? `Enter a topic of at least ${CUSTOM_TOPIC_MIN} characters, or switch back to a suggested topic.`
        : "Pick a suggested topic or write your own to continue.";
    case 2:
      return "Choose FOR or AGAINST to continue.";
    default:
      return "Finish the earlier steps to start your debate.";
  }
}
