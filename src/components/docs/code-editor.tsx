"use client";

import { Check, Copy } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { type UseInViewOptions, useInView } from "motion/react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CopyButtonProps {
  content: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "ghost" | "outline";
  className?: string;
  onCopy?: (content: string) => void;
}

export function CopyButton({
  content,
  size = "default",
  variant = "default",
  className,
  onCopy,
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      onCopy?.(content);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button
      aria-label={copied ? "Copied code" : "Copy code"}
      className={cn("h-8 w-8 p-0", className)}
      onClick={handleCopy}
      size={size}
      variant={variant}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </Button>
  );
}

type ThemeName = {
  light: string;
  dark: string;
};

const lineNumberClassNames = cn(
  "[&_code]:[counter-reset:line]",
  "[&_code]:[counter-increment:line_0]",
  "[&_.line]:before:content-[counter(line)]",
  "[&_.line]:before:inline-block",
  "[&_.line]:before:[counter-increment:line]",
  "[&_.line]:before:w-8",
  "[&_.line]:before:mr-4",
  "[&_.line]:before:text-[12px]",
  "[&_.line]:before:text-right",
  "[&_.line]:before:text-muted-foreground/50",
  "[&_.line]:before:font-mono",
  "[&_.line]:before:select-none",
);

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function normalizeLineNumbers(values: number[] | undefined) {
  if (!values?.length) {
    return new Set<number>();
  }

  return new Set(
    values.filter((value) => Number.isInteger(value) && value > 0),
  );
}

function decorateHighlightedHtml({
  html,
  highlightLines,
  addLines,
  removeLines,
}: {
  html: string;
  highlightLines: number[];
  addLines: number[];
  removeLines: number[];
}) {
  const highlighted = normalizeLineNumbers(highlightLines);
  const added = normalizeLineNumbers(addLines);
  const removed = normalizeLineNumbers(removeLines);

  let lineNumber = 0;

  return html.replace(/<span class="line">/g, () => {
    lineNumber += 1;

    const classes = ["line"];

    if (highlighted.has(lineNumber)) {
      classes.push("highlighted");
    }
    if (added.has(lineNumber)) {
      classes.push("diff", "add");
    }
    if (removed.has(lineNumber)) {
      classes.push("diff", "remove");
    }

    return `<span class="${classes.join(" ")}" data-line="${lineNumber}">`;
  });
}

export type CodeEditorProps = Omit<
  React.ComponentProps<"div">,
  "onCopy" | "children"
> & {
  children: string;
  lang: string;
  themes?: ThemeName;
  duration?: number;
  delay?: number;
  header?: boolean;
  dots?: boolean;
  icon?: React.ReactNode;
  cursor?: boolean;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  copyButton?: boolean;
  writing?: boolean;
  title?: string;
  onDone?: () => void;
  onCopy?: (content: string) => void;
  lineNumbers?: boolean;
  lineNumbersToggle?: boolean;
  highlightLines?: number[];
  addLines?: number[];
  removeLines?: number[];
};

export function CodeEditor({
  children: code,
  lang,
  themes = {
    light: "github-light",
    dark: "github-dark",
  },
  duration = 0,
  delay = 0,
  className,
  header = true,
  dots = true,
  icon,
  cursor = false,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  copyButton = true,
  writing = false,
  title,
  onDone,
  onCopy,
  lineNumbers = true,
  lineNumbersToggle = true,
  highlightLines = [],
  addLines = [],
  removeLines = [],
  ...props
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();

  const editorRef = React.useRef<HTMLDivElement>(null);
  const [visibleCode, setVisibleCode] = React.useState("");
  const [highlightedCode, setHighlightedCode] = React.useState("");
  const [isDone, setIsDone] = React.useState(false);
  const [showLineNumbers, setShowLineNumbers] = React.useState(lineNumbers);

  React.useEffect(() => {
    setShowLineNumbers(lineNumbers);
  }, [lineNumbers]);

  const inViewResult = useInView(editorRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });
  const isInView = !inView || inViewResult;

  React.useEffect(() => {
    if (!visibleCode.length || !isInView) {
      return;
    }

    let cancelled = false;

    const loadHighlightedCode = async () => {
      try {
        const { codeToHtml } = await import("shiki");
        const highlighted = await codeToHtml(visibleCode, {
          lang,
          themes,
          defaultColor: resolvedTheme === "dark" ? "dark" : "light",
        });

        const decorated = decorateHighlightedHtml({
          html: highlighted,
          highlightLines,
          addLines,
          removeLines,
        });

        if (!cancelled) {
          setHighlightedCode(decorated);
        }
      } catch {
        if (!cancelled) {
          const fallbackHtml = `<pre><code>${escapeHtml(visibleCode)}</code></pre>`;
          const decorated = decorateHighlightedHtml({
            html: fallbackHtml,
            highlightLines,
            addLines,
            removeLines,
          });

          setHighlightedCode(decorated);
        }
      }
    };

    loadHighlightedCode();

    return () => {
      cancelled = true;
    };
  }, [
    lang,
    themes,
    visibleCode,
    resolvedTheme,
    isInView,
    highlightLines,
    addLines,
    removeLines,
  ]);

  React.useEffect(() => {
    if (!writing) {
      setVisibleCode(code);
      setIsDone(true);
      onDone?.();
      return;
    }

    if (!code.length || !isInView) {
      return;
    }

    const characters = Array.from(code);
    let index = 0;
    const totalDuration = Math.max(duration, 0.4) * 1000;
    const interval = totalDuration / Math.max(characters.length, 1);
    let intervalId: number | undefined;

    const timeout = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        if (index < characters.length) {
          setVisibleCode((prev) => {
            const currentIndex = index;
            index += 1;
            return prev + (characters[currentIndex] ?? "");
          });

          editorRef.current?.scrollTo({
            top: editorRef.current.scrollHeight,
            behavior: "smooth",
          });
        } else {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
          setIsDone(true);
          onDone?.();
        }
      }, interval);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [code, duration, delay, isInView, writing, onDone]);

  return (
    <div
      className={cn(
        "relative mt-4 w-full overflow-hidden rounded-xl border border-border/70 bg-card shadow-sm",
        className,
      )}
      data-slot="code-editor"
      {...props}
    >
      {header ? (
        <div className="relative flex h-10 items-center justify-between border-b border-border/75 bg-muted px-4">
          {dots ? (
            <div className="flex flex-row gap-x-2">
              <div className="size-2 rounded-full bg-rose-500" />
              <div className="size-2 rounded-full bg-amber-500" />
              <div className="size-2 rounded-full bg-emerald-500" />
            </div>
          ) : (
            <div />
          )}

          {title ? (
            <div
              className={cn(
                "flex flex-row items-center gap-2",
                dots &&
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              )}
            >
              {icon ? (
                <div className="text-muted-foreground [&_svg]:size-3.5">
                  {icon}
                </div>
              ) : null}
              <figcaption className="truncate text-[13px] text-muted-foreground">
                {title}
              </figcaption>
            </div>
          ) : null}

          <div className="-me-2 flex items-center gap-1">
            {lineNumbersToggle ? (
              <Button
                aria-label={
                  showLineNumbers ? "Hide line numbers" : "Show line numbers"
                }
                className="h-7 w-7 p-0 hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() => setShowLineNumbers((value) => !value)}
                size="icon-sm"
                title={
                  showLineNumbers ? "Hide line numbers" : "Show line numbers"
                }
                variant="ghost"
              >
                <ListOrdered className="h-3.5 w-3.5" />
              </Button>
            ) : null}

            {copyButton ? (
              <CopyButton
                className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
                content={code}
                {...(onCopy ? { onCopy } : {})}
                size="sm"
                variant="ghost"
              />
            ) : null}
          </div>
        </div>
      ) : copyButton ? (
        <CopyButton
          className="absolute right-2 top-2 z-[2] bg-transparent backdrop-blur-md hover:bg-black/5 dark:hover:bg-white/10"
          content={code}
          {...(onCopy ? { onCopy } : {})}
          size="sm"
          variant="ghost"
        />
      ) : null}

      <div
        className="relative h-auto min-h-[120px] w-full flex-1 overflow-auto p-4 font-mono text-sm"
        ref={editorRef}
      >
        <div
          className={cn(
            "[&>pre,_&_code]:!bg-transparent [&>pre,_&_code]:border-none [&_code]:!text-[13px] [&_code]:leading-relaxed [&_.line]:relative [&_.line]:inline-block [&_.line]:w-full [&_.line]:px-2",
            "[&_.line.highlighted]:bg-sky-500/10",
            "[&_.line.diff]:pl-4 [&_.line.diff]:before:!w-6",
            "[&_.line.diff.add]:bg-emerald-500/10 [&_.line.diff.add]:after:absolute [&_.line.diff.add]:after:bottom-0 [&_.line.diff.add]:after:left-0 [&_.line.diff.add]:after:top-0 [&_.line.diff.add]:after:w-0.5 [&_.line.diff.add]:after:bg-emerald-500",
            "[&_.line.diff.remove]:bg-rose-500/10 [&_.line.diff.remove]:after:absolute [&_.line.diff.remove]:after:bottom-0 [&_.line.diff.remove]:after:left-0 [&_.line.diff.remove]:after:top-0 [&_.line.diff.remove]:after:w-0.5 [&_.line.diff.remove]:after:bg-rose-500",
            showLineNumbers && lineNumberClassNames,
            cursor &&
              !isDone &&
              "[&_.line:last-of-type::after]:content-['|'] [&_.line:last-of-type::after]:inline-block [&_.line:last-of-type::after]:w-[1ch] [&_.line:last-of-type::after]:animate-pulse",
          )}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </div>
    </div>
  );
}
