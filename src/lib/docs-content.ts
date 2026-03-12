import {
  LANGUAGE_INFO,
  TOPIC_ORDER,
  type LanguageSlug,
  type TopicSlug,
} from "@/lib/docs";

export type TopicDocumentation = {
  slug: TopicSlug;
  title: string;
  summary: string;
  deepDive: string;
  keyPoints: string[];
  pitfalls: string[];
  commands: string[];
  example: {
    language: string;
    code: string;
  };
};

type LanguageProfile = {
  runtime: string;
  packageTool: string;
  testTool: string;
  lintTool: string;
  formatter: string;
  buildCommand: string;
  devCommand: string;
  codeLanguage: string;
};

const LANGUAGE_PROFILES: Record<LanguageSlug, LanguageProfile> = {
  python: {
    runtime: "CPython",
    packageTool: "pip",
    testTool: "pytest",
    lintTool: "ruff",
    formatter: "black",
    buildCommand: "python -m build",
    devCommand: "python -m uvicorn app.main:app --reload",
    codeLanguage: "python",
  },
  javascript: {
    runtime: "Node.js",
    packageTool: "npm",
    testTool: "vitest",
    lintTool: "eslint",
    formatter: "prettier",
    buildCommand: "npm run build",
    devCommand: "npm run dev",
    codeLanguage: "javascript",
  },
  typescript: {
    runtime: "Node.js + TypeScript",
    packageTool: "npm",
    testTool: "vitest",
    lintTool: "eslint + typescript-eslint",
    formatter: "prettier",
    buildCommand: "npm run build && tsc --noEmit",
    devCommand: "npm run dev",
    codeLanguage: "typescript",
  },
  sql: {
    runtime: "SQL engine",
    packageTool: "migration tooling",
    testTool: "integration query tests",
    lintTool: "sqlfluff",
    formatter: "pgFormatter",
    buildCommand: "psql -f db/migrations/latest.sql",
    devCommand: "docker compose up postgres",
    codeLanguage: "sql",
  },
  react: {
    runtime: "React runtime",
    packageTool: "npm",
    testTool: "React Testing Library",
    lintTool: "eslint + react-hooks",
    formatter: "prettier",
    buildCommand: "npm run build",
    devCommand: "npm run dev",
    codeLanguage: "tsx",
  },
};

type TopicTemplate = {
  summary: string;
  deepDive: string;
  keyPoints: string[];
  pitfalls: string[];
};

const TOPIC_TEMPLATES: Record<TopicSlug, TopicTemplate> = {
  syntax: {
    summary: "Core syntax rules and language grammar patterns.",
    deepDive:
      "Start with syntax fluency before frameworks. Keep expressions explicit, use naming that reflects business intent, and avoid clever one-liners that reduce readability for your team.",
    keyPoints: [
      "Use the idiomatic style for declarations and control flow.",
      "Prefer clarity over density in expressions.",
      "Apply strict mode or strict compiler settings where available.",
    ],
    pitfalls: [
      "Mixing old and modern syntax in one codebase.",
      "Hidden coercions or implicit conversions.",
      "Overusing shorthand constructs that confuse readers.",
    ],
  },
  "imports-exports": {
    summary: "Module boundaries, imports, exports, and public API shape.",
    deepDive:
      "Treat module boundaries as contracts. Keep internal modules private, export only stable interfaces, and keep dependency direction flowing inward toward domain logic.",
    keyPoints: [
      "Group imports by source and purpose.",
      "Export stable symbols from top-level modules.",
      "Avoid circular dependencies between feature modules.",
    ],
    pitfalls: [
      "Deep relative import chains that break easily.",
      "Leaking internal helper APIs as public exports.",
      "Module cycles that create partial initialization bugs.",
    ],
  },
  comments: {
    summary: "Documentation, comments, and code explainability standards.",
    deepDive:
      "Document intent, constraints, and invariants. Keep comments synchronized with behavior and focus on why code exists rather than rephrasing what each line does.",
    keyPoints: [
      "Document all public APIs and side effects.",
      "Use comments to capture assumptions and edge cases.",
      "Keep examples close to the code they describe.",
    ],
    pitfalls: [
      "Stale comments that contradict runtime behavior.",
      "Long narrative comments replacing clear code.",
      "Missing docs for non-obvious constraints.",
    ],
  },
  linting: {
    summary: "Linting, formatting, and automated static checks.",
    deepDive:
      "A strict lint and formatting pipeline reduces review noise. Run these checks locally and in CI so style and basic correctness are always enforced before merge.",
    keyPoints: [
      "Use one formatter for deterministic output.",
      "Treat high-value lints as errors.",
      "Run lint checks in pre-commit and CI.",
    ],
    pitfalls: [
      "Ignoring lint warnings until they accumulate.",
      "Different local and CI formatter versions.",
      "Disabling rules instead of fixing root causes.",
    ],
  },
  variables: {
    summary: "Variable lifecycle, scoping, mutability, and type usage.",
    deepDive:
      "Scope variables as tightly as possible, prefer immutable bindings, and make state transitions explicit. This reduces hidden coupling and makes behavior easier to reason about.",
    keyPoints: [
      "Default to immutable declarations.",
      "Keep variable names domain-specific.",
      "Initialize with safe defaults for optional values.",
    ],
    pitfalls: [
      "Shared mutable state across unrelated functions.",
      "Overly generic names such as data or value.",
      "Delayed initialization leading to null checks everywhere.",
    ],
  },
  strings: {
    summary: "String handling, templates, encoding, and normalization.",
    deepDive:
      "Treat user input strings as untrusted data. Normalize early, preserve canonical internal formats, and format for display only at the presentation layer.",
    keyPoints: [
      "Use template literals or formatters for readability.",
      "Normalize case and whitespace before comparisons.",
      "Handle Unicode and locale-aware behavior intentionally.",
    ],
    pitfalls: [
      "String concatenation for SQL or shell commands.",
      "Comparing unnormalized user input directly.",
      "Assuming byte length equals character length.",
    ],
  },
  "booleans-logic": {
    summary: "Boolean expressions, guard clauses, and decision flow.",
    deepDive:
      "Prefer guard clauses and explicit branches to avoid deep nesting. Keep conditionals small and extract predicates when logic starts to mix business rules and technical concerns.",
    keyPoints: [
      "Use clear predicates with positive naming.",
      "Short-circuit early on invalid states.",
      "Use exhaustive branching where possible.",
    ],
    pitfalls: [
      "Double negatives in conditionals.",
      "Long compound expressions with mixed concerns.",
      "Truthy checks where null checks are required.",
    ],
  },
  loops: {
    summary: "Iteration patterns, traversals, and loop performance.",
    deepDive:
      "Choose iteration style by data size and readability. Keep loop bodies focused, avoid hidden mutation, and move expensive work outside loops when possible.",
    keyPoints: [
      "Prefer expressive iterators for simple transforms.",
      "Use indexed loops when performance-sensitive.",
      "Avoid nested loops unless complexity is acceptable.",
    ],
    pitfalls: [
      "Mutating the collection while iterating it.",
      "Nested loops without complexity review.",
      "Expensive I/O operations inside hot loops.",
    ],
  },
  "objects-arrays-dicts": {
    summary: "Data structure choices and immutable update strategies.",
    deepDive:
      "Select structures intentionally: arrays for order, maps/dicts for keyed access, and sets for uniqueness. Prefer immutable updates in shared application state.",
    keyPoints: [
      "Match structure choice to access pattern.",
      "Normalize nested data for large state trees.",
      "Use helper utilities for immutable transforms.",
    ],
    pitfalls: [
      "Using arrays for frequent key lookups.",
      "Deeply nested objects with ad hoc mutation.",
      "Copying massive collections unnecessarily.",
    ],
  },
  "functions-reduction": {
    summary: "Function composition, reducers, and pure transformation flows.",
    deepDive:
      "Small pure functions are easier to test and compose. Apply reducers only when they improve clarity and keep side effects at boundaries.",
    keyPoints: [
      "Use pure functions for deterministic logic.",
      "Pass dependencies explicitly, not globally.",
      "Keep reducer accumulators strongly defined.",
    ],
    pitfalls: [
      "Reducers with hidden mutation.",
      "Large functions doing many responsibilities.",
      "Anonymous callbacks that hide intent.",
    ],
  },
  async: {
    summary: "Async I/O, latency management, and cancellation patterns.",
    deepDive:
      "Model async operations explicitly with lifecycle states. Add timeouts, cancellation, and retries where external dependencies can fail or stall.",
    keyPoints: [
      "Prefer async-await for linear flow.",
      "Use parallelism when requests are independent.",
      "Always handle timeout and cancellation cases.",
    ],
    pitfalls: [
      "Fire-and-forget promises without tracking.",
      "Sequential awaits for independent tasks.",
      "Missing timeout budgets for external APIs.",
    ],
  },
  "error-handling": {
    summary:
      "Error classification, recovery strategies, and user-safe failures.",
    deepDive:
      "Differentiate user, infrastructure, and programmer errors. Convert low-level exceptions into domain-level error responses and include enough context to debug safely.",
    keyPoints: [
      "Classify errors by type and severity.",
      "Wrap infrastructure failures with domain context.",
      "Provide deterministic fallback behavior when possible.",
    ],
    pitfalls: [
      "Swallowing exceptions silently.",
      "Returning internal stack traces to clients.",
      "Retrying non-idempotent operations blindly.",
    ],
  },
  oop: {
    summary: "Object-oriented patterns and state encapsulation boundaries.",
    deepDive:
      "Use OOP where state and behavior naturally belong together. Keep constructors simple, prefer composition over deep inheritance, and keep interfaces narrow.",
    keyPoints: [
      "Encapsulate mutable state behind methods.",
      "Use interfaces or protocols for contracts.",
      "Prefer composition over inheritance chains.",
    ],
    pitfalls: [
      "God classes with too many responsibilities.",
      "Leaking internal mutable state via getters.",
      "Inheritance for code reuse instead of behavior modeling.",
    ],
  },
  architecture: {
    summary: "Layering strategy, dependency boundaries, and service design.",
    deepDive:
      "Define clear layers: interface, application, and infrastructure. Keep domain logic independent so it can be tested without framework or transport coupling.",
    keyPoints: [
      "Separate domain logic from adapters.",
      "Keep dependencies flowing toward core logic.",
      "Make boundaries explicit with contracts.",
    ],
    pitfalls: [
      "Framework-specific logic bleeding into domain.",
      "Feature code spread across many unrelated folders.",
      "No shared standards for boundaries.",
    ],
  },
  algorithms: {
    summary: "Algorithm selection, complexity trade-offs, and data scaling.",
    deepDive:
      "Measure algorithmic complexity before optimizing implementation details. Pick the right structure first, then profile real workloads to validate bottlenecks.",
    keyPoints: [
      "Estimate time and space complexity for critical paths.",
      "Use indexes/caches where repeated lookups dominate.",
      "Profile before and after optimization work.",
    ],
    pitfalls: [
      "Premature micro-optimizations.",
      "Ignoring memory growth under load.",
      "Unbounded nested operations in hot paths.",
    ],
  },
  memory: {
    summary: "Memory footprint, object lifetime, and cleanup routines.",
    deepDive:
      "Track object lifetime intentionally. Long-lived caches, listeners, and retained references are common leak sources that degrade stability over time.",
    keyPoints: [
      "Release listeners, handles, and buffers.",
      "Define cache eviction policies early.",
      "Use profiling tools for heap analysis.",
    ],
    pitfalls: [
      "Global caches without size limits.",
      "Retained closures capturing heavy objects.",
      "Not disposing external resources.",
    ],
  },
  concurrency: {
    summary: "Parallel execution, race conditions, and synchronization.",
    deepDive:
      "Concurrency improves throughput when designed safely. Guard shared state, prefer immutable messages between workers, and enforce deterministic ordering when needed.",
    keyPoints: [
      "Identify independent work for parallel execution.",
      "Protect shared state with clear ownership.",
      "Use idempotency for retried concurrent operations.",
    ],
    pitfalls: [
      "Race conditions in shared mutable state.",
      "Over-parallelization that overwhelms resources.",
      "Deadlocks from inconsistent lock ordering.",
    ],
  },
  "api-methods": {
    summary: "API contracts, validation, and backward compatibility.",
    deepDive:
      "Design APIs around stable contracts. Validate inputs at boundaries, version intentionally, and treat schema changes as compatibility events with migration plans.",
    keyPoints: [
      "Validate request and response payloads.",
      "Document status codes and error formats.",
      "Maintain compatibility during evolution.",
    ],
    pitfalls: [
      "Undocumented breaking changes.",
      "Leaking internal domain models directly.",
      "Missing idempotency keys on write endpoints.",
    ],
  },
  "data-modeling": {
    summary: "Entity design, schema evolution, and consistency rules.",
    deepDive:
      "Model around business concepts and invariants. Capture relationships explicitly and plan schema migrations so old and new data representations can coexist during rollout.",
    keyPoints: [
      "Define canonical identifiers and ownership.",
      "Normalize write models and denormalize read models when useful.",
      "Use migrations with explicit rollback strategy.",
    ],
    pitfalls: [
      "Ambiguous entity ownership boundaries.",
      "Implicit many-to-many relationships.",
      "Schema changes without backfill plans.",
    ],
  },
  "date-methods": {
    summary: "Date/time handling, timezone boundaries, and scheduling safety.",
    deepDive:
      "Store timestamps in UTC and convert at display boundaries. Keep scheduling logic timezone-aware and avoid hand-written parsing for non-trivial formats.",
    keyPoints: [
      "Use ISO-8601 for API boundaries.",
      "Treat timezone conversion as presentation logic.",
      "Include timezone context in business rules.",
    ],
    pitfalls: [
      "Naive local time storage in distributed systems.",
      "Implicit DST assumptions in recurring jobs.",
      "Comparing date strings lexically without parsing.",
    ],
  },
  logging: {
    summary: "Structured logging, correlation IDs, and signal quality.",
    deepDive:
      "Logs should be machine-parseable and operationally useful. Standardize fields, include request correlation IDs, and redact sensitive values by default.",
    keyPoints: [
      "Prefer structured JSON-style logging.",
      "Attach request or trace IDs to all logs.",
      "Keep messages concise and actionable.",
    ],
    pitfalls: [
      "Free-form logs that are hard to query.",
      "Logging secrets or personal data.",
      "High-volume noisy logs in hot paths.",
    ],
  },
  observability: {
    summary: "Metrics, traces, alerting, and service-level visibility.",
    deepDive:
      "Combine logs, metrics, and traces to debug production behavior. Define service-level objectives and alert on user impact, not only infrastructure symptoms.",
    keyPoints: [
      "Track latency, throughput, and error rate.",
      "Use traces for cross-service latency breakdown.",
      "Create alerts tied to user-visible degradation.",
    ],
    pitfalls: [
      "Too many metrics with no ownership.",
      "Missing trace propagation across services.",
      "Alerts that trigger on noise instead of impact.",
    ],
  },
  "security-hardening": {
    summary: "Input trust boundaries, auth controls, and secure defaults.",
    deepDive:
      "Apply least privilege and defense in depth. Validate all external input, isolate secrets, and make secure behavior the default path for every environment.",
    keyPoints: [
      "Validate and sanitize all external input.",
      "Use least privilege for credentials and roles.",
      "Continuously patch dependencies and base images.",
    ],
    pitfalls: [
      "Assuming internal traffic is trusted.",
      "Hardcoding secrets in source or logs.",
      "No rate limiting on auth-critical endpoints.",
    ],
  },
  testing: {
    summary: "Unit, integration, and contract testing strategy.",
    deepDive:
      "Build a layered test suite: fast unit tests, realistic integration tests, and contract tests for external interfaces. Keep fixtures deterministic and small.",
    keyPoints: [
      "Write tests around observable behavior.",
      "Use integration tests for critical workflows.",
      "Treat flaky tests as production incidents.",
    ],
    pitfalls: [
      "Over-mocking business logic paths.",
      "Large fixture setups slowing feedback.",
      "No regression tests for fixed bugs.",
    ],
  },
  debugging: {
    summary: "Investigation workflow, reproduction, and root-cause analysis.",
    deepDive:
      "Use a hypothesis-driven debugging loop: reproduce, isolate, instrument, fix minimally, and verify. Capture failing inputs and environment details before changing code.",
    keyPoints: [
      "Create a minimal reproducible case.",
      "Inspect logs, traces, and runtime state together.",
      "Verify the fix with targeted regression tests.",
    ],
    pitfalls: [
      "Fixing symptoms before proving the cause.",
      "Skipping reproduction and relying on guesses.",
      "Changing too many variables at once.",
    ],
  },
  "cli-commands": {
    summary: "Developer command workflows and script automation.",
    deepDive:
      "Standardize common commands for setup, lint, tests, and release tasks. Encode workflows in scripts so local development and CI behavior stay aligned.",
    keyPoints: [
      "Provide one-command setup for new contributors.",
      "Keep script names consistent across repos.",
      "Make CI use the same scripts as local dev.",
    ],
    pitfalls: [
      "Undocumented local-only shell scripts.",
      "Different command behavior across environments.",
      "Large scripts without error handling.",
    ],
  },
  "build-release": {
    summary: "Build reproducibility, versioning, and release safety.",
    deepDive:
      "A reliable release pipeline is deterministic and auditable. Pin dependency versions where needed, verify artifact integrity, and include rollback paths.",
    keyPoints: [
      "Automate semantic versioning and changelogs.",
      "Use reproducible build inputs.",
      "Attach release artifacts to immutable references.",
    ],
    pitfalls: [
      "Manual release steps with hidden state.",
      "Building from unreviewed branches.",
      "No rollback plan for bad releases.",
    ],
  },
  "project-structure": {
    summary: "Repository layout and module organization strategy.",
    deepDive:
      "Organize around features and bounded contexts instead of technical file types alone. Keep folder conventions stable to reduce onboarding friction.",
    keyPoints: [
      "Separate app, domain, and shared utilities.",
      "Co-locate tests near the code they validate.",
      "Use predictable naming conventions.",
    ],
    pitfalls: [
      "Deep nesting with weak ownership boundaries.",
      "Cross-feature imports into private internals.",
      "Inconsistent naming between modules.",
    ],
  },
  initialization: {
    summary: "Bootstrap process, environment setup, and defaults.",
    deepDive:
      "Initialization should be deterministic and idempotent. Validate configuration at startup and fail fast with explicit errors when required dependencies are missing.",
    keyPoints: [
      "Load and validate configuration early.",
      "Set secure and stable defaults.",
      "Keep startup side effects explicit.",
    ],
    pitfalls: [
      "Implicit environment dependencies.",
      "Silent fallback on invalid config values.",
      "Startup sequence with hidden ordering requirements.",
    ],
  },
  deployment: {
    summary: "Runtime deployment strategy, rollout control, and rollback.",
    deepDive:
      "Deploy with staged rollouts, health checks, and measurable acceptance criteria. Keep rollback fast and test deployment scripts regularly.",
    keyPoints: [
      "Use environment-specific config without code changes.",
      "Deploy incrementally and monitor key metrics.",
      "Practice rollback paths during non-critical windows.",
    ],
    pitfalls: [
      "Big-bang deploys with no canary strategy.",
      "Missing post-deploy health validation.",
      "Manual hotfixes bypassing normal release flow.",
    ],
  },
  "common-errors": {
    summary: "Frequent production and development failure patterns.",
    deepDive:
      "Maintain a living catalog of recurring errors and proven fixes. Convert incidents into tests, guardrails, and automation so failures become less likely over time.",
    keyPoints: [
      "Capture root cause and reproduction details.",
      "Add defensive validation around fragile boundaries.",
      "Promote repeated fixes into shared utilities.",
    ],
    pitfalls: [
      "Treating repeated issues as one-off incidents.",
      "Fixes without regression coverage.",
      "No shared knowledge base for known failures.",
    ],
  },
  "best-practices": {
    summary: "High-impact engineering defaults for reliability and speed.",
    deepDive:
      "Codify engineering standards around readability, testing, observability, and security. Good defaults reduce cognitive overhead and improve team-level consistency.",
    keyPoints: [
      "Favor explicit contracts and typed boundaries.",
      "Automate repetitive quality checks.",
      "Measure outcomes and iterate standards over time.",
    ],
    pitfalls: [
      "Standards that exist but are not enforced.",
      "Conflicting conventions across teams.",
      "Overengineering where simple solutions are enough.",
    ],
  },
};

function codeLabel(language: LanguageSlug): string {
  return LANGUAGE_PROFILES[language].codeLanguage;
}

function defaultExample(language: LanguageSlug): string {
  switch (language) {
    case "python":
      return `def process_items(items: list[int]) -> int:\n  return sum(items)`;
    case "javascript":
      return `export function processItems(items) {\n  return items.reduce((acc, item) => acc + item, 0);\n}`;
    case "typescript":
      return `export function processItems(items: number[]): number {\n  return items.reduce((acc, item) => acc + item, 0);\n}`;
    case "sql":
      return `SELECT SUM(amount) AS total_amount\nFROM transactions\nWHERE status = 'completed';`;
    case "react":
      return `export function Summary({ items }: { items: number[] }) {\n  const total = items.reduce((acc, item) => acc + item, 0);\n  return <p>Total: {total}</p>;\n}`;
  }
}

function exampleFor(language: LanguageSlug, topic: TopicSlug): string {
  if (topic === "syntax") {
    if (language === "python") {
      return `match status_code:\n  case 200:\n    result = 'ok'\n  case _:\n    result = 'retry'`;
    }

    if (language === "sql") {
      return `SELECT id, email\nFROM users\nWHERE is_active IS TRUE\nORDER BY created_at DESC;`;
    }

    return defaultExample(language);
  }

  if (topic === "async") {
    if (language === "python") {
      return `import asyncio\n\nasync def fetch_all(tasks):\n  return await asyncio.gather(*tasks)`;
    }

    if (language === "sql") {
      return `-- Async behavior is managed in the client driver.\nSET statement_timeout = '3s';\nSELECT * FROM jobs WHERE status = 'queued';`;
    }

    if (language === "react") {
      return `import { useEffect, useState } from 'react';\n\nexport function Profile() {\n  const [status, setStatus] = useState('loading');\n\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch('/api/profile', { signal: controller.signal })\n      .then(() => setStatus('ready'))\n      .catch(() => setStatus('error'));\n\n    return () => controller.abort();\n  }, []);\n\n  return <p>{status}</p>;\n}`;
    }

    return `const users = await Promise.allSettled([\n  getUser('u1'),\n  getUser('u2'),\n]);`;
  }

  if (topic === "error-handling") {
    if (language === "python") {
      return `class ValidationError(Exception):\n  pass\n\ndef parse_age(raw: str) -> int:\n  try:\n    value = int(raw)\n  except ValueError as exc:\n    raise ValidationError('age must be numeric') from exc\n\n  if value < 0:\n    raise ValidationError('age must be positive')\n\n  return value`;
    }

    if (language === "sql") {
      return `BEGIN;\n  INSERT INTO ledger_entries(id, amount) VALUES ('e1', 100);\nCOMMIT;\n-- On failure: ROLLBACK;`;
    }

    return `export function parseAge(raw: string): number {\n  const value = Number(raw);\n\n  if (!Number.isFinite(value) || value < 0) {\n    throw new Error('Invalid age input');\n  }\n\n  return value;\n}`;
  }

  if (topic === "testing") {
    if (language === "python") {
      return `import pytest\n\n@pytest.mark.parametrize('value,expected', [(1, 2), (4, 8)])\ndef test_double(value: int, expected: int) -> None:\n  assert value * 2 == expected`;
    }

    if (language === "sql") {
      return `-- Integration test query\nSELECT COUNT(*) AS pending\nFROM jobs\nWHERE status = 'pending';`;
    }

    if (language === "react") {
      return `import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('increments count', async () => {\n  render(<button>Count: 0</button>);\n  await userEvent.click(screen.getByRole('button'));\n});`;
    }

    return `import { describe, it, expect } from 'vitest';\n\ndescribe('double', () => {\n  it('doubles numbers', () => {\n    expect(2 * 2).toBe(4);\n  });\n});`;
  }

  if (topic === "api-methods") {
    if (language === "sql") {
      return `CREATE VIEW api_orders AS\nSELECT id, customer_id, total, created_at\nFROM orders;`;
    }

    if (language === "python") {
      return `from pydantic import BaseModel\n\nclass CreateUserRequest(BaseModel):\n  email: str\n  display_name: str\n\ndef create_user(payload: CreateUserRequest) -> dict[str, str]:\n  return {'id': 'u_123', 'email': payload.email}`;
    }

    return `import { z } from 'zod';\n\nconst CreateUserRequest = z.object({\n  email: z.string().email(),\n  displayName: z.string().min(2),\n});\n\nexport function createUser(raw: unknown) {\n  const payload = CreateUserRequest.parse(raw);\n  return { id: 'u_123', ...payload };\n}`;
  }

  if (topic === "concurrency") {
    if (language === "python") {
      return `import asyncio\n\nasync def worker(name: str):\n  await asyncio.sleep(0.1)\n  return f'done:{name}'\n\nresults = asyncio.run(asyncio.gather(worker('a'), worker('b')))`;
    }

    if (language === "sql") {
      return `SELECT *\nFROM orders\nWHERE status = 'pending'\nFOR UPDATE SKIP LOCKED;`;
    }

    return `const controller = new AbortController();\n\nconst tasks = ['a', 'b', 'c'].map((id) =>\n  fetch('/api/work/' + id, { signal: controller.signal }),\n);\n\nconst results = await Promise.allSettled(tasks);`;
  }

  if (topic === "deployment") {
    if (language === "sql") {
      return `-- Zero-downtime migration pattern\nALTER TABLE users ADD COLUMN locale TEXT;\nUPDATE users SET locale = 'en-US' WHERE locale IS NULL;\nALTER TABLE users ALTER COLUMN locale SET NOT NULL;`;
    }

    if (language === "python") {
      return `# app health endpoint\ndef health_check() -> dict[str, str]:\n  return {'status': 'ok'}`;
    }

    return `name: Deploy\non: [push]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm ci\n      - run: npm run build\n      - run: npm run deploy`;
  }

  if (topic === "security-hardening") {
    if (language === "sql") {
      return `-- Least privilege role example\nCREATE ROLE app_reader;\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO app_reader;`;
    }

    return `export function sanitizeEmail(raw: string): string {\n  return raw.trim().toLowerCase();\n}\n\nexport function assertRole(role: string) {\n  if (!['admin', 'editor', 'viewer'].includes(role)) {\n    throw new Error('Invalid role');\n  }\n}`;
  }

  if (topic === "cli-commands") {
    const profile = LANGUAGE_PROFILES[language];
    return `${profile.devCommand}\n${profile.buildCommand}\n${profile.lintTool} .`;
  }

  return defaultExample(language);
}

function commandSet(language: LanguageSlug): string[] {
  const profile = LANGUAGE_PROFILES[language];

  return [
    profile.devCommand,
    profile.buildCommand,
    `${profile.lintTool} .`,
    `${profile.testTool} -q`,
    `${profile.packageTool} audit`,
    `${profile.formatter} --check .`,
  ];
}

function buildTopicDocumentation(
  language: LanguageSlug,
  topic: (typeof TOPIC_ORDER)[number],
): TopicDocumentation {
  const template = TOPIC_TEMPLATES[topic.id];
  const profile = LANGUAGE_PROFILES[language];

  return {
    slug: topic.id,
    title: topic.title,
    summary: `${template.summary} (${LANGUAGE_INFO[language].title})`,
    deepDive: `${template.deepDive} In this track, examples use ${profile.runtime} and ${profile.packageTool} tooling conventions.`,
    keyPoints: template.keyPoints,
    pitfalls: template.pitfalls,
    commands: commandSet(language),
    example: {
      language: codeLabel(language),
      code: exampleFor(language, topic.id),
    },
  };
}

const languageDocs = {} as Record<LanguageSlug, TopicDocumentation[]>;

for (const language of Object.keys(LANGUAGE_INFO) as LanguageSlug[]) {
  languageDocs[language] = TOPIC_ORDER.map((topic) =>
    buildTopicDocumentation(language, topic),
  );
}

export const LANGUAGE_DOCS = languageDocs;

export function getLanguageDocs(language: LanguageSlug): TopicDocumentation[] {
  return LANGUAGE_DOCS[language];
}

export function getTopicDocumentation(
  language: LanguageSlug,
  topic: string,
): TopicDocumentation | undefined {
  return LANGUAGE_DOCS[language].find((item) => item.slug === topic);
}
