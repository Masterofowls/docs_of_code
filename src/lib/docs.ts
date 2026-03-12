export const TOPIC_ORDER = [
  { id: "syntax", title: "Syntax and Keywords" },
  { id: "imports-exports", title: "Import and Export" },
  { id: "comments", title: "Comments and Documentation" },
  { id: "linting", title: "Linting and Formatting" },
  { id: "functions-reduction", title: "Functions and Reduction" },
  { id: "async", title: "Async Programming" },
  { id: "oop", title: "Object Oriented Patterns" },
  { id: "math", title: "Math Methods" },
  { id: "loops", title: "Loops and Iteration" },
  { id: "booleans-logic", title: "Booleans and Logic" },
  { id: "strings", title: "Strings and Templates" },
  { id: "variables", title: "Variables and Types" },
  { id: "objects-arrays-dicts", title: "Objects, Arrays, Dictionaries" },
  { id: "algorithms", title: "Algorithms and Complexity" },
  { id: "commands", title: "Commands and Tooling" },
  { id: "initialization", title: "Initialization" },
  { id: "project-structure", title: "Project Structure" },
  { id: "testing", title: "Testing" },
  { id: "debugging", title: "Debugging" },
  { id: "api-methods", title: "API Methods and Contracts" },
  { id: "logging", title: "Logging and Monitoring" },
  { id: "date-methods", title: "Date and Time Methods" },
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

export function isLanguageSlug(value: string): value is LanguageSlug {
  return value in LANGUAGE_INFO;
}
