export const TOPIC_ORDER = [
  { id: "syntax", title: "Syntax and Keywords" },
  { id: "imports-exports", title: "Import and Export" },
  { id: "comments", title: "Comments and Documentation" },
  { id: "linting", title: "Linting and Formatting" },
  { id: "variables", title: "Variables and Types" },
  { id: "strings", title: "Strings and Templates" },
  { id: "booleans-logic", title: "Booleans and Logic" },
  { id: "loops", title: "Loops and Iteration" },
  { id: "objects-arrays-dicts", title: "Objects, Arrays, Dictionaries" },
  { id: "functions-reduction", title: "Functions and Reduction" },
  { id: "async", title: "Async Programming" },
  { id: "error-handling", title: "Error Handling" },
  { id: "oop", title: "Object Oriented Patterns" },
  { id: "architecture", title: "Architecture Patterns" },
  { id: "algorithms", title: "Algorithms and Complexity" },
  { id: "memory", title: "Memory and Data Lifetime" },
  { id: "concurrency", title: "Concurrency and Parallelism" },
  { id: "api-methods", title: "API Methods and Contracts" },
  { id: "data-modeling", title: "Data Modeling" },
  { id: "date-methods", title: "Date and Time Methods" },
  { id: "logging", title: "Logging and Monitoring" },
  { id: "observability", title: "Observability and Tracing" },
  { id: "security-hardening", title: "Security Hardening" },
  { id: "testing", title: "Testing" },
  { id: "debugging", title: "Debugging" },
  { id: "cli-commands", title: "CLI Commands and Automation" },
  { id: "build-release", title: "Build and Release" },
  { id: "project-structure", title: "Project Structure" },
  { id: "initialization", title: "Initialization" },
  { id: "deployment", title: "Deployment" },
  { id: "common-errors", title: "Common Error Tips" },
  { id: "best-practices", title: "Performance and Security" },
] as const;

export const LANGUAGE_INFO = {
  python: {
    title: "Python",
    accent: "bg-emerald-400/20 text-emerald-800 border-emerald-600/30",
    description:
      "Readable backend and data language with batteries included for APIs, automation, and science.",
  },
  javascript: {
    title: "JavaScript",
    accent: "bg-amber-400/20 text-amber-800 border-amber-600/30",
    description:
      "The language of the web with event loops, async flows, and a rich runtime ecosystem.",
  },
  typescript: {
    title: "TypeScript",
    accent: "bg-sky-400/20 text-sky-800 border-sky-600/30",
    description:
      "Type-safe JavaScript for large applications, APIs, and maintainable frontend systems.",
  },
  sql: {
    title: "SQL",
    accent: "bg-rose-400/20 text-rose-800 border-rose-600/30",
    description:
      "Declarative querying language for modeling, retrieving, and optimizing relational data.",
  },
  react: {
    title: "React",
    accent: "bg-cyan-400/20 text-cyan-800 border-cyan-600/30",
    description:
      "Component-driven UI framework for predictable state, rendering, and app architecture.",
  },
} as const;

export type LanguageSlug = keyof typeof LANGUAGE_INFO;
export type TopicSlug = (typeof TOPIC_ORDER)[number]["id"];

export function isLanguageSlug(value: string): value is LanguageSlug {
  return value in LANGUAGE_INFO;
}

export function isTopicSlug(value: string): value is TopicSlug {
  return TOPIC_ORDER.some((topic) => topic.id === value);
}
