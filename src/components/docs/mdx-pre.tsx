import * as React from "react";

import { CodeEditor } from "@/components/docs/code-editor";

type MdxCodeElementProps = {
  className?: string;
  children?: React.ReactNode;
};

type MdxPreProps = React.ComponentProps<"pre">;

type ParsedCodeBlock = {
  code: string;
  lineNumbers: boolean;
  highlightLines: number[];
  addLines: number[];
  removeLines: number[];
};

function parseDecorators(rawCode: string): ParsedCodeBlock {
  const highlightLines: number[] = [];
  const addLines: number[] = [];
  const removeLines: number[] = [];

  let lineNumbers = true;
  const outputLines: string[] = [];

  const inputLines = rawCode.split("\n");

  for (const rawLine of inputLines) {
    if (rawLine.includes("[!code no-line-numbers]")) {
      lineNumbers = false;
      continue;
    }
    if (rawLine.includes("[!code line-numbers]")) {
      lineNumbers = true;
      continue;
    }

    let cleaned = rawLine;
    cleaned = cleaned.replaceAll("[!code highlight]", "").trimEnd();
    cleaned = cleaned.replaceAll("[!code ++]", "").trimEnd();
    cleaned = cleaned.replaceAll("[!code --]", "").trimEnd();

    outputLines.push(cleaned);
    const outputLineNumber = outputLines.length;

    if (rawLine.includes("[!code highlight]")) {
      highlightLines.push(outputLineNumber);
    }
    if (rawLine.includes("[!code ++]")) {
      addLines.push(outputLineNumber);
    }
    if (rawLine.includes("[!code --]")) {
      removeLines.push(outputLineNumber);
    }
  }

  return {
    code: outputLines.join("\n").replace(/\n$/, ""),
    lineNumbers,
    highlightLines,
    addLines,
    removeLines,
  };
}

function inferTitleFromLang(lang: string) {
  switch (lang) {
    case "python":
      return "example.py";
    case "javascript":
      return "example.js";
    case "typescript":
      return "example.ts";
    case "tsx":
      return "example.tsx";
    case "sql":
      return "query.sql";
    case "bash":
      return "script.sh";
    default:
      return `snippet.${lang}`;
  }
}

export function MdxPre({ children }: MdxPreProps) {
  const child = React.Children.only(
    children,
  ) as React.ReactElement<MdxCodeElementProps>;
  const className = child.props.className ?? "";
  const lang = className.replace("language-", "") || "text";

  const rawCode = React.Children.toArray(child.props.children)
    .join("")
    .replace(/\n$/, "");

  const parsed = parseDecorators(rawCode);

  return (
    <CodeEditor
      addLines={parsed.addLines}
      copyButton
      header
      highlightLines={parsed.highlightLines}
      lang={lang}
      lineNumbers={parsed.lineNumbers}
      removeLines={parsed.removeLines}
      title={inferTitleFromLang(lang)}
    >
      {parsed.code}
    </CodeEditor>
  );
}
