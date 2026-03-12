"use client";

import * as React from "react";

import { CodeEditor, CopyButton } from "@/components/docs/code-editor";
import { cn } from "@/lib/utils";

export type CodeTabsItem = {
  language: string;
  filename: string;
  code: string;
  highlightLines?: number[];
  addLines?: number[];
  removeLines?: number[];
};

export type MdxCodeTabsProps = {
  data: CodeTabsItem[];
  defaultValue?: string;
  className?: string;
  lineNumbers?: boolean;
};

export function MdxCodeTabs({
  data,
  defaultValue,
  className,
  lineNumbers = true,
}: MdxCodeTabsProps) {
  const first = data[0];
  const [activeLanguage, setActiveLanguage] = React.useState(
    defaultValue ?? first?.language ?? "",
  );

  const activeItem =
    data.find((item) => item.language === activeLanguage) ?? first;

  if (!activeItem) {
    return null;
  }

  return (
    <section
      className={cn(
        "mt-6 overflow-hidden rounded-xl border border-border/70 bg-card/95",
        "bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_40%),radial-gradient(circle_at_100%_0,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_38%)]",
        className,
      )}
    >
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border/70 bg-muted/85 backdrop-blur-sm px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {data.map((item) => {
            const active = item.language === activeLanguage;

            return (
              <button
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                  active
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/70 hover:text-foreground",
                )}
                key={item.language}
                onClick={() => setActiveLanguage(item.language)}
                type="button"
              >
                {item.language.toUpperCase()}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <span className="max-w-[180px] truncate text-xs text-muted-foreground">
            {activeItem.filename}
          </span>
          <CopyButton
            className="bg-transparent hover:bg-black/5 dark:hover:bg-white/10"
            content={activeItem.code}
            size="sm"
            variant="ghost"
          />
        </div>
      </header>

      <div className="bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_92%,transparent)_0%,color-mix(in_oklab,var(--background)_100%,transparent)_100%)] p-0">
        <CodeEditor
          className="m-0 rounded-none border-0 shadow-none"
          copyButton={false}
          header={false}
          lang={activeItem.language}
          lineNumbers={lineNumbers}
          lineNumbersToggle
          {...(activeItem.highlightLines
            ? { highlightLines: activeItem.highlightLines }
            : {})}
          {...(activeItem.addLines ? { addLines: activeItem.addLines } : {})}
          {...(activeItem.removeLines
            ? { removeLines: activeItem.removeLines }
            : {})}
          title={activeItem.filename}
        >
          {activeItem.code}
        </CodeEditor>
      </div>
    </section>
  );
}
