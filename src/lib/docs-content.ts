import {
  LANGUAGE_INFO,
  TOPIC_ORDER,
  type LanguageSlug,
  type TopicSlug,
} from "@/lib/docs";

export type TopicCodeBlock = {
  title: string;
  language: string;
  code: string;
  commentary: string;
  expectedInput: string;
  expectedOutput: string;
};

export type TopicSource = {
  name: string;
  url: string;
  note: string;
};

export type TopicDocumentation = {
  slug: TopicSlug;
  title: string;
  summary: string;
  deepDive: string;
  keyPoints: string[];
  pitfalls: string[];
  commands: string[];
  codeBlocks: TopicCodeBlock[];
  seeAlso: { slug: TopicSlug; title: string }[];
  sources: TopicSource[];
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

type TopicTemplate = {
  summary: string;
  deepDive: string;
  keyPoints: string[];
  pitfalls: string[];
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
    lintTool: "eslint + @typescript-eslint",
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
    formatter: "pg_format",
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

const TOPIC_TEMPLATES: Partial<Record<TopicSlug, TopicTemplate>> = {
  syntax: {
    summary: "Language grammar, declarations, and structural rules.",
    deepDive:
      "Start here to build a correct mental model. Prefer explicit constructs, predictable naming, and style consistency over clever syntax tricks.",
    keyPoints: [
      "Use idiomatic constructs for declarations and branching.",
      "Keep expressions readable and intention-revealing.",
      "Apply strict compiler/interpreter settings where available.",
    ],
    pitfalls: [
      "Mixing legacy and modern patterns in the same module.",
      "Depending on implicit coercion behavior.",
      "Overusing terse syntax that hurts readability.",
    ],
  },
  "api-methods": {
    summary: "API contract design, validation, and compatibility lifecycle.",
    deepDive:
      "Treat each endpoint or exported API as a stable contract. Validate all boundaries, version intentionally, and define migration windows for changes.",
    keyPoints: [
      "Validate request and response payloads.",
      "Document status codes and failure semantics.",
      "Keep backward compatibility during iterative rollouts.",
    ],
    pitfalls: [
      "Leaking internal domain models as API contracts.",
      "Breaking changes without migration strategy.",
      "Missing idempotency on retryable writes.",
    ],
  },
  "security-hardening": {
    summary: "Defense-in-depth, trust boundaries, and secure defaults.",
    deepDive:
      "Apply least privilege, validate all external input, and assume every boundary can be abused. Security should be the default path, not an optional mode.",
    keyPoints: [
      "Validate and sanitize untrusted input.",
      "Use least privilege for service credentials.",
      "Patch dependencies and base images continuously.",
    ],
    pitfalls: [
      "Secrets in source code, logs, or analytics payloads.",
      "Missing authorization checks on sensitive operations.",
      "Assuming internal traffic is trusted.",
    ],
  },
  testing: {
    summary: "Layered unit, integration, and contract testing strategies.",
    deepDive:
      "A reliable test stack combines fast local unit feedback with realistic integration checks and contract tests that protect boundaries.",
    keyPoints: [
      "Test behavior and contracts, not internal implementation.",
      "Keep fixtures deterministic and focused.",
      "Add regression tests for every critical bug fix.",
    ],
    pitfalls: [
      "Flaky tests with timing-sensitive assertions.",
      "Over-mocking core business logic paths.",
      "Large fixture setup that slows the feedback loop.",
    ],
  },
};

const JS_MDN_SOURCE_MAP: Partial<Record<TopicSlug, string>> = {
  "js-grammar-types": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types",
  "js-control-flow-error-handling": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling",
  "js-loops-iteration": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
  "js-functions": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
  "js-expressions-operators": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators",
  "js-numbers-strings": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings",
  "js-dates-times": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Representing_dates_times",
  "js-regular-expressions": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
  "js-indexed-collections": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections",
  "js-keyed-collections": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections",
  "js-working-with-objects": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
  "js-using-classes": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes",
  "js-using-promises": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
  "js-typed-arrays": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Typed_arrays",
  "js-iterators-generators": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators",
  "js-resource-management": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Resource_management",
  "js-internationalization": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Internationalization",
};

const PY_W3_SOURCE_MAP: Partial<Record<TopicSlug, string>> = {
  "py-syntax": "https://www.w3schools.com/python/python_syntax.asp",
  "py-output": "https://www.w3schools.com/python/python_output.asp",
  "py-comments": "https://www.w3schools.com/python/python_comments.asp",
  "py-variables": "https://www.w3schools.com/python/python_variables.asp",
  "py-data-types": "https://www.w3schools.com/python/python_datatypes.asp",
  "py-numbers": "https://www.w3schools.com/python/python_numbers.asp",
  "py-casting": "https://www.w3schools.com/python/python_casting.asp",
  "py-strings": "https://www.w3schools.com/python/python_strings.asp",
  "py-booleans": "https://www.w3schools.com/python/python_booleans.asp",
  "py-operators": "https://www.w3schools.com/python/python_operators.asp",
  "py-lists": "https://www.w3schools.com/python/python_lists.asp",
  "py-tuples": "https://www.w3schools.com/python/python_tuples.asp",
  "py-sets": "https://www.w3schools.com/python/python_sets.asp",
  "py-dictionaries": "https://www.w3schools.com/python/python_dictionaries.asp",
  "py-if-else": "https://www.w3schools.com/python/python_conditions.asp",
  "py-match": "https://www.w3schools.com/python/python_match.asp",
  "py-while-loops": "https://www.w3schools.com/python/python_while_loops.asp",
  "py-for-loops": "https://www.w3schools.com/python/python_for_loops.asp",
  "py-functions": "https://www.w3schools.com/python/python_functions.asp",
  "py-range": "https://www.w3schools.com/python/ref_func_range.asp",
  "py-arrays": "https://www.w3schools.com/python/python_arrays.asp",
  "py-iterators": "https://www.w3schools.com/python/python_iterators.asp",
  "py-modules": "https://www.w3schools.com/python/python_modules.asp",
  "py-dates": "https://www.w3schools.com/python/python_datetime.asp",
  "py-math": "https://www.w3schools.com/python/python_math.asp",
  "py-json": "https://www.w3schools.com/python/python_json.asp",
  "py-regex": "https://www.w3schools.com/python/python_regex.asp",
  "py-pip": "https://www.w3schools.com/python/python_pip.asp",
  "py-try-except": "https://www.w3schools.com/python/python_try_except.asp",
  "py-string-formatting": "https://www.w3schools.com/python/python_string_formatting.asp",
  "py-none": "https://www.w3schools.com/python/python_none.asp",
  "py-user-input": "https://www.w3schools.com/python/python_user_input.asp",
  "py-virtualenv": "https://www.w3schools.com/python/python_virtualenv.asp",
};

function topicAppliesToLanguage(language: LanguageSlug, topic: TopicSlug): boolean {
  if (topic.startsWith("py-") || topic.startsWith("mpl-") || topic.startsWith("ml-")) {
    return language === "python";
  }

  if (topic.startsWith("js-")) {
    return language === "javascript" || language === "typescript" || language === "react";
  }

  return true;
}

function sourcesFor(topic: TopicSlug): TopicSource[] {
  const sources: TopicSource[] = [];
  const mdnUrl = JS_MDN_SOURCE_MAP[topic];
  const w3Url = PY_W3_SOURCE_MAP[topic];

  if (mdnUrl) {
    sources.push({
      name: "MDN Web Docs",
      url: mdnUrl,
      note: "Adapted summary and examples based on MDN conceptual guidance.",
    });
  }

  if (w3Url) {
    sources.push({
      name: "W3Schools",
      url: w3Url,
      note: "Adapted tutorial-style walkthrough inspired by W3Schools structure.",
    });
  }

  if (topic.startsWith("ml-")) {
    sources.push({
      name: "W3Schools Machine Learning",
      url: "https://www.w3schools.com/python/python_ml_getting_started.asp",
      note: "Adapted ML examples using a W3Schools-style progression.",
    });
  }

  if (topic.startsWith("mpl-")) {
    sources.push({
      name: "W3Schools Matplotlib",
      url: "https://www.w3schools.com/python/matplotlib_intro.asp",
      note: "Adapted plotting references aligned to Matplotlib topics.",
    });
  }

  return sources;
}

function topicTitle(topic: TopicSlug): string {
  return TOPIC_ORDER.find((entry) => entry.id === topic)?.title ?? topic;
}

function fallbackTemplate(topic: TopicSlug): TopicTemplate {
  const title = topicTitle(topic);

  if (topic.startsWith("js-")) {
    return {
      summary: `${title} with MDN-aligned JavaScript guidance, patterns, and examples.`,
      deepDive:
        "This section follows MDN organization: core concept, syntax, common pitfalls, and production implementation notes. Content is adapted and rewritten for this documentation hub.",
      keyPoints: [
        "Understand JavaScript runtime behavior for this topic.",
        "Use explicit patterns and avoid hidden coercion assumptions.",
        "Pair examples with linting and tests for maintainability.",
      ],
      pitfalls: [
        "Relying on implicit conversion or loose equality in critical paths.",
        "Mixing browser and Node runtime assumptions.",
        "Missing cancellation, validation, or error boundaries.",
      ],
    };
  }

  if (topic.startsWith("py-") || topic.startsWith("mpl-") || topic.startsWith("ml-")) {
    return {
      summary: `${title} with W3Schools-style learning progression and practical code snippets.`,
      deepDive:
        "This section is structured as tutorial-first content: quick start, worked examples, edge cases, and practical project usage. Content is adapted and rewritten for this site.",
      keyPoints: [
        "Start with a minimal working snippet and evolve incrementally.",
        "Prefer readability and explicit naming in Python examples.",
        "Verify behavior with tests or notebook checks.",
      ],
      pitfalls: [
        "Skipping type or value validation before processing inputs.",
        "Mutating shared state accidentally across examples.",
        "Not isolating virtual environment and package versions.",
      ],
    };
  }

  return {
    summary: `${title} reference material with practical patterns and production guidance.`,
    deepDive: `This section follows an MDN-style structure for ${title.toLowerCase()}: concept overview, practical examples, common edge cases, and implementation guidance for real projects.`,
    keyPoints: [
      `Understand the core rules behind ${title.toLowerCase()}.`,
      "Use explicit, reviewable patterns over implicit behavior.",
      "Document assumptions at module or API boundaries.",
    ],
    pitfalls: [
      `Skipping validation around ${title.toLowerCase()} inputs.`,
      "Combining multiple concerns in one abstraction layer.",
      "Missing automated checks for long-term correctness.",
    ],
  };
}

function templateFor(topic: TopicSlug): TopicTemplate {
  return TOPIC_TEMPLATES[topic] ?? fallbackTemplate(topic);
}

function baseExample(language: LanguageSlug): string {
  switch (language) {
    case "python":
      return `def process_items(items: list[int]) -> int:\n  return sum(items)`;
    case "javascript":
      return `export function processItems(items) {\n  return items.reduce((acc, item) => acc + item, 0);\n}`;
    case "typescript":
      return `export function processItems(items: number[]): number {\n  return items.reduce((acc, item) => acc + item, 0);\n}`;
    case "sql":
      return `SELECT SUM(amount) AS total\nFROM transactions\nWHERE status = 'completed';`;
    case "react":
      return `export function Summary({ items }: { items: number[] }) {\n  const total = items.reduce((acc, item) => acc + item, 0);\n  return <p>Total: {total}</p>;\n}`;
  }
}

function basicExample(language: LanguageSlug, topic: TopicSlug): string {
  if (topic.startsWith("js-")) {
    return `const values = [1, 2, 3];\nconst total = values.reduce((acc, item) => acc + item, 0);\nconsole.log(total);`;
  }

  if (topic.startsWith("py-")) {
    return `values = [1, 2, 3]\ntotal = sum(values)\nprint(total)`;
  }

  if (topic.startsWith("mpl-")) {
    return `import matplotlib.pyplot as plt\n\nx = [1, 2, 3]\ny = [2, 4, 8]\nplt.plot(x, y)\nplt.show()`;
  }

  if (topic.startsWith("ml-")) {
    return `from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\nmodel = LinearRegression().fit(X_train, y_train)`;
  }

  if (topic === "syntax") {
    if (language === "python") {
      return `match status:\n  case 200:\n    result = 'ok'\n  case _:\n    result = 'retry'`;
    }

    if (language === "sql") {
      return `SELECT id, email\nFROM users\nWHERE is_active IS TRUE\nORDER BY created_at DESC;`;
    }
  }

  if (topic === "async") {
    if (language === "python") {
      return `import asyncio\n\nasync def fetch_all(tasks):\n  return await asyncio.gather(*tasks)`;
    }

    if (language === "react") {
      return `import { useEffect, useState } from 'react';\n\nexport function Profile() {\n  const [status, setStatus] = useState('loading');\n\n  useEffect(() => {\n    const controller = new AbortController();\n    fetch('/api/profile', { signal: controller.signal })\n      .then(() => setStatus('ready'))\n      .catch(() => setStatus('error'));\n\n    return () => controller.abort();\n  }, []);\n\n  return <p>{status}</p>;\n}`;
    }
  }

  if (topic === "api-methods") {
    if (language === "python") {
      return `from pydantic import BaseModel\n\nclass CreateUser(BaseModel):\n  email: str\n  display_name: str`;
    }

    if (language === "sql") {
      return `CREATE VIEW api_orders AS\nSELECT id, customer_id, total\nFROM orders;`;
    }

    return `import { z } from 'zod';\n\nconst CreateUser = z.object({\n  email: z.string().email(),\n  displayName: z.string().min(2),\n});`;
  }

  return baseExample(language);
}

function advancedExample(language: LanguageSlug, topic: TopicSlug): string {
  if (topic.startsWith("js-using-promises")) {
    return `const fetchUser = async (id) => {\n  const response = await fetch('/api/users/' + id);\n  if (!response.ok) throw new Error('Request failed');\n  return response.json();\n};\n\nconst result = await Promise.allSettled([fetchUser('u1'), fetchUser('u2')]);`;
  }

  if (topic.startsWith("py-try-except")) {
    return `def parse_positive_int(raw: str) -> int:\n  try:\n    value = int(raw)\n  except ValueError as exc:\n    raise ValueError('Value must be numeric') from exc\n\n  if value <= 0:\n    raise ValueError('Value must be positive')\n\n  return value`;
  }

  if (topic.startsWith("ml-")) {
    return `from sklearn.model_selection import GridSearchCV\nfrom sklearn.ensemble import RandomForestClassifier\n\nparams = {\n  'n_estimators': [100, 200],\n  'max_depth': [None, 10],\n}\nsearch = GridSearchCV(RandomForestClassifier(), params, cv=5, scoring='f1')\nsearch.fit(X_train, y_train)`;
  }

  if (topic.startsWith("mpl-")) {
    return `import matplotlib.pyplot as plt\n\nfig, ax = plt.subplots(2, 1, figsize=(8, 6))\nax[0].scatter(x, y, c='tab:blue')\nax[1].hist(y, bins=10)\nplt.tight_layout()\nplt.show()`;
  }

  if (topic === "concurrency") {
    if (language === "python") {
      return `import asyncio\nfrom asyncio import Semaphore\n\nlimit = Semaphore(5)\n\nasync def bounded_fetch(client, url):\n  async with limit:\n    return await client.get(url)`;
    }

    if (language === "sql") {
      return `SELECT id\nFROM jobs\nWHERE status = 'queued'\nFOR UPDATE SKIP LOCKED\nLIMIT 100;`;
    }

    return `const worker = async (id: string) => {\n  const res = await fetch('/api/work/' + id);\n  if (!res.ok) throw new Error('failed');\n  return res.json();\n};\n\nconst results = await Promise.allSettled(ids.map(worker));`;
  }

  if (topic === "error-handling") {
    if (language === "python") {
      return `class DomainError(Exception):\n  pass\n\ndef parse_amount(raw: str) -> int:\n  try:\n    value = int(raw)\n  except ValueError as exc:\n    raise DomainError('amount must be numeric') from exc\n\n  if value < 0:\n    raise DomainError('amount must be positive')\n\n  return value`;
    }

    return `export function parseAmount(raw: string): number {\n  const value = Number(raw);\n  if (!Number.isFinite(value) || value < 0) {\n    throw new Error('Invalid amount');\n  }\n  return value;\n}`;
  }

  if (topic === "deployment") {
    return `name: deploy\non: [push]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test\n      - run: npm run build`;
  }

  if (topic === "transactions" && language === "sql") {
    return `BEGIN;\n  UPDATE accounts SET balance = balance - 100 WHERE id = 'a';\n  UPDATE accounts SET balance = balance + 100 WHERE id = 'b';\nCOMMIT;`;
  }

  if (topic === "accessibility" && language === "react") {
    return `export function IconButton({ onClick }: { onClick: () => void }) {\n  return (\n    <button aria-label='Open navigation menu' onClick={onClick}>\n      <svg aria-hidden='true' viewBox='0 0 20 20' />\n    </button>\n  );\n}`;
  }

  return `${basicExample(language, topic)}\n\n// Advanced note: add boundary checks, telemetry, and tests for this flow.`;
}

function testingExample(language: LanguageSlug, topic: TopicSlug): string {
  if (topic.startsWith("ml-") || topic.startsWith("mpl-") || topic.startsWith("py-")) {
    return `import pytest\n\ndef test_${topic.replace(/-/g, "_")}() -> None:\n  assert True`;
  }

  if (language === "python") {
    return `import pytest\n\n@pytest.mark.parametrize('value,expected', [(1, 2), (4, 8)])\ndef test_${topic.replace(/-/g, "_")}(value: int, expected: int) -> None:\n  assert value * 2 == expected`;
  }

  if (language === "sql") {
    return `-- Integration check for ${topic}\nSELECT COUNT(*) AS row_count\nFROM information_schema.tables;`;
  }

  if (language === "react") {
    return `import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\n\ntest('handles ${topic}', async () => {\n  render(<button>Run</button>);\n  await userEvent.click(screen.getByRole('button'));\n});`;
  }

  return `import { describe, expect, it } from 'vitest';\n\ndescribe('${topic}', () => {\n  it('works on happy path', () => {\n    expect(true).toBe(true);\n  });\n});`;
}

function commandSet(language: LanguageSlug): string[] {
  const profile = LANGUAGE_PROFILES[language];

  return [
    profile.devCommand,
    profile.buildCommand,
    `${profile.lintTool} .`,
    `${profile.testTool} -q`,
    `${profile.formatter} --check .`,
    `${profile.packageTool} audit`,
  ];
}

function codeBlocksFor(
  language: LanguageSlug,
  topic: TopicSlug,
): TopicCodeBlock[] {
  const codeLanguage = LANGUAGE_PROFILES[language].codeLanguage;
  const topicName = topicTitle(topic);

  return [
    {
      title: "Basic Example",
      language: codeLanguage,
      code: basicExample(language, topic),
      commentary:
        "Shows the minimal runnable version of this topic using idiomatic defaults.",
      expectedInput:
        "Use the sample values already defined in the snippet, then run it as-is.",
      expectedOutput: `Produces a successful ${topicName.toLowerCase()} result without errors.`,
    },
    {
      title: "Advanced Pattern",
      language: codeLanguage,
      code: advancedExample(language, topic),
      commentary:
        "Adds production-oriented structure such as validation, control flow, or scaling behavior.",
      expectedInput:
        "Provide valid runtime inputs (API payloads, arrays, DB rows, or feature flags as applicable).",
      expectedOutput:
        "Returns deterministic output and handles failure paths more explicitly.",
    },
    {
      title: "Testing Snippet",
      language: codeLanguage,
      code: testingExample(language, topic),
      commentary:
        "Demonstrates how to assert behavior for this topic in an automated test.",
      expectedInput:
        "Run via the project test runner with default test configuration.",
      expectedOutput:
        "Test run passes and confirms the expected behavior for the topic.",
    },
  ];
}

function seeAlsoFor(topic: TopicSlug): { slug: TopicSlug; title: string }[] {
  const index = TOPIC_ORDER.findIndex((entry) => entry.id === topic);
  const related = TOPIC_ORDER.filter((_, offset) =>
    [index - 1, index + 1, index + 2].includes(offset),
  );

  return related.map((entry) => ({ slug: entry.id, title: entry.title }));
}

function buildTopicDocumentation(
  language: LanguageSlug,
  topic: (typeof TOPIC_ORDER)[number],
): TopicDocumentation {
  const template = templateFor(topic.id);
  const profile = LANGUAGE_PROFILES[language];

  return {
    slug: topic.id,
    title: topic.title,
    summary: `${template.summary} (${LANGUAGE_INFO[language].title})`,
    deepDive: `${template.deepDive} In this track, examples align with ${profile.runtime}, ${profile.packageTool}, and ${profile.testTool} workflows.`,
    keyPoints: template.keyPoints,
    pitfalls: template.pitfalls,
    commands: commandSet(language),
    codeBlocks: codeBlocksFor(language, topic.id),
    seeAlso: seeAlsoFor(topic.id),
    sources: sourcesFor(topic.id),
  };
}

const languageDocs = {} as Record<LanguageSlug, TopicDocumentation[]>;

for (const language of Object.keys(LANGUAGE_INFO) as LanguageSlug[]) {
  languageDocs[language] = TOPIC_ORDER.filter((topic) =>
    topicAppliesToLanguage(language, topic.id),
  ).map((topic) => buildTopicDocumentation(language, topic));
}

export const LANGUAGE_DOCS = languageDocs;

export function getLanguageDocs(language: LanguageSlug): TopicDocumentation[] {
  return LANGUAGE_DOCS[language];
}

export function getTopicDocumentation(
  language: LanguageSlug,
  topic: string,
): TopicDocumentation | undefined {
  return LANGUAGE_DOCS[language].find((entry) => entry.slug === topic);
}
