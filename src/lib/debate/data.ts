import {
  Backpack,
  BookOpen,
  Cpu,
  FlaskConical,
  GraduationCap,
  Leaf,
  Lightbulb,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import type {
  DebateLengthOption,
  DebateTopic,
  GradeLevel,
  PastDebate,
  TopicCategory,
  WizardStep,
} from "./types";

export const WIZARD_STEPS: WizardStep[] = [
  { id: "grade", title: "Choose your grade level", shortTitle: "Grade" },
  { id: "topic", title: "Choose your debate topic", shortTitle: "Topic" },
  { id: "side", title: "Choose your side", shortTitle: "Side" },
  { id: "customize", title: "Customize your debate", shortTitle: "Customize" },
  { id: "review", title: "Review and start", shortTitle: "Review" },
];

export const GRADE_LEVELS: GradeLevel[] = [
  {
    id: "elementary",
    label: "K–5",
    name: "Elementary",
    ages: "Ages 5–11",
    description: "Fun, everyday topics like pets, recess, and games.",
    icon: Backpack,
  },
  {
    id: "middle",
    label: "6–8",
    name: "Middle School",
    ages: "Ages 11–14",
    description: "Bigger questions about school life, tech, and fairness.",
    icon: Lightbulb,
  },
  {
    id: "high",
    label: "9–12",
    name: "High School",
    ages: "Ages 14–18",
    description: "Deeper issues in society, science, and the future.",
    icon: GraduationCap,
  },
];

export const TOPIC_CATEGORIES: TopicCategory[] = [
  { id: "education", label: "Education", icon: BookOpen },
  { id: "technology", label: "Technology", icon: Cpu },
  { id: "environment", label: "Environment", icon: Leaf },
  { id: "society", label: "Society", icon: Users },
  { id: "science", label: "Science", icon: FlaskConical },
];

const ALL: DebateTopic["levels"] = ["elementary", "middle", "high"];

export const FEATURED_TOPICS: DebateTopic[] = [
  {
    id: "homework",
    title: "Should homework be banned?",
    category: "education",
    levels: ALL,
    blurb: "Weigh learning habits against free time.",
  },
  {
    id: "uniforms",
    title: "Should students wear school uniforms?",
    category: "education",
    levels: ALL,
    blurb: "Think about fairness, identity, and comfort.",
  },
  {
    id: "technology",
    title: "Is technology making our lives better?",
    category: "technology",
    levels: ALL,
    blurb: "Explore convenience, connection, and screen time.",
  },
];

export const MORE_TOPICS: DebateTopic[] = [
  // Education
  { id: "recess", title: "Should schools have longer recess?", category: "education", levels: ["elementary", "middle"] },
  { id: "pets-school", title: "Should kids be allowed to bring pets to school?", category: "education", levels: ["elementary"] },
  { id: "later-start", title: "Should school start later in the morning?", category: "education", levels: ["middle", "high"] },
  { id: "year-round", title: "Should school run all year round?", category: "education", levels: ["middle", "high"] },
  { id: "online-learning", title: "Is online learning better than classroom learning?", category: "education", levels: ["middle", "high"] },
  { id: "letter-grades", title: "Should schools get rid of letter grades?", category: "education", levels: ["high"] },
  // Technology
  { id: "tablets", title: "Should kids have their own tablets?", category: "technology", levels: ["elementary"] },
  { id: "video-games", title: "Are video games good for kids?", category: "technology", levels: ["elementary", "middle"] },
  { id: "robots", title: "Will robots do most jobs in the future?", category: "technology", levels: ["elementary", "middle"] },
  { id: "phones", title: "Should phones be allowed in classrooms?", category: "technology", levels: ["middle", "high"] },
  { id: "social-media", title: "Should there be a minimum age for social media?", category: "technology", levels: ["middle", "high"] },
  { id: "ai-homework", title: "Should students be allowed to use AI for homework?", category: "technology", levels: ["middle", "high"] },
  // Environment
  { id: "trees", title: "Should every neighborhood plant more trees?", category: "environment", levels: ["elementary"] },
  { id: "recycling", title: "Should every school have a recycling program?", category: "environment", levels: ["elementary", "middle"] },
  { id: "zoos", title: "Should animals be kept in zoos?", category: "environment", levels: ALL },
  { id: "plastic-bags", title: "Should single-use plastic bags be banned?", category: "environment", levels: ["middle", "high"] },
  { id: "meatless-lunch", title: "Should schools serve meatless lunches once a week?", category: "environment", levels: ["middle", "high"] },
  { id: "electric-cars", title: "Should all new cars be electric by 2035?", category: "environment", levels: ["high"] },
  // Society
  { id: "allowance", title: "Should kids get an allowance?", category: "society", levels: ["elementary"] },
  { id: "chores", title: "Should kids get paid for doing chores?", category: "society", levels: ["elementary", "middle"] },
  { id: "required-sport", title: "Should all students be required to play a sport?", category: "society", levels: ["middle"] },
  { id: "community-service", title: "Should community service be required to graduate?", category: "society", levels: ["middle", "high"] },
  { id: "junk-food-ads", title: "Should junk food ads aimed at kids be banned?", category: "society", levels: ["middle", "high"] },
  { id: "voting-age", title: "Should the voting age be lowered to 16?", category: "society", levels: ["high"] },
  // Science
  { id: "ocean", title: "Should we explore the ocean before outer space?", category: "science", levels: ["elementary"] },
  { id: "extinct-animals", title: "Should scientists bring back extinct animals?", category: "science", levels: ["elementary", "middle"] },
  { id: "space", title: "Should we spend more money exploring space?", category: "science", levels: ALL },
  { id: "mars", title: "Should humans try to live on Mars?", category: "science", levels: ["middle", "high"] },
  { id: "animal-research", title: "Should animals be used in medical research?", category: "science", levels: ["high"] },
  { id: "gmo-labels", title: "Should genetically modified foods be labeled?", category: "science", levels: ["high"] },
];

export const ALL_TOPICS: DebateTopic[] = [...FEATURED_TOPICS, ...MORE_TOPICS];

/**
 * Round counts are clearly labeled demo values. They have not been confirmed
 * by TutorMigo reference material.
 */
export const DEBATE_LENGTHS: DebateLengthOption[] = [
  {
    id: "quick",
    title: "Quick Debate",
    description: "A shorter debate with fewer rounds. Great for a quick practice session.",
    demoRounds: 3,
    icon: Zap,
  },
  {
    id: "full",
    title: "Full Debate",
    description: "A longer debate with more rounds and more chances to build your arguments.",
    demoRounds: 5,
    icon: Timer,
  },
];

export const PAST_DEBATES: PastDebate[] = [
  {
    id: "pd-uniforms",
    topic: "Should school uniforms be mandatory?",
    lastActivity: "Yesterday",
    side: "for",
    roundsDone: 2,
    totalRounds: 3,
    lastStudentPoint:
      "Uniforms reduce pressure to wear expensive brands, so every student feels like they belong.",
    lastTutorPoint:
      "But clothing is also a way to express who you are. How would uniforms affect self-expression?",
  },
  {
    id: "pd-tech-smarter",
    topic: "Is technology making us smarter?",
    lastActivity: "3 days ago",
    side: "against",
    roundsDone: 3,
    totalRounds: 5,
    lastStudentPoint:
      "When we always search for answers, we practice remembering and thinking things through less.",
    lastTutorPoint:
      "Yet technology gives us instant access to more knowledge than ever. Can that make us better learners?",
  },
  {
    id: "pd-zoos",
    topic: "Should animals be kept in zoos?",
    lastActivity: "Last week",
    side: "for",
    roundsDone: 1,
    totalRounds: 3,
    lastStudentPoint:
      "Good zoos protect endangered species and teach people why wildlife matters.",
    lastTutorPoint:
      "Some animals need huge habitats to be healthy. Can a zoo ever give them enough space?",
  },
  {
    id: "pd-online",
    topic: "Is online learning better than classroom learning?",
    lastActivity: "2 weeks ago",
    side: "against",
    roundsDone: 4,
    totalRounds: 5,
    lastStudentPoint:
      "In a classroom you can ask questions right away and learn from your classmates.",
    lastTutorPoint:
      "Online learning lets students go at their own pace. Isn't that a big advantage?",
  },
  {
    id: "pd-homework",
    topic: "Should homework be banned?",
    lastActivity: "3 weeks ago",
    side: "for",
    roundsDone: 2,
    totalRounds: 3,
    lastStudentPoint:
      "Students need time to rest, play, and spend time with family after a long school day.",
    lastTutorPoint:
      "Practice at home helps skills stick. What could replace homework to keep students learning?",
  },
  {
    id: "pd-chores",
    topic: "Should kids get paid for doing chores?",
    lastActivity: "Last month",
    side: "against",
    roundsDone: 1,
    totalRounds: 3,
    lastStudentPoint:
      "Helping at home is part of being in a family, not a job we should be paid for.",
    lastTutorPoint:
      "Getting paid can teach kids about money. Couldn't that be a valuable lesson?",
  },
];
