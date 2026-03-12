"use client";

import type {
  SandpackFiles,
  SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

import { cn } from "@/lib/utils";

export type SandboxPlaygroundProps = {
  files: SandpackFiles;
  title?: string;
  template?: SandpackPredefinedTemplate;
  className?: string;
  editorHeight?: number;
};

export function SandboxPlayground({
  files,
  title = "Live Playground",
  template = "react-ts",
  className,
  editorHeight = 380,
}: SandboxPlaygroundProps) {
  const fileEntries = Object.keys(files);
  const activeFile = fileEntries[0] ?? "/App.tsx";

  return (
    <section
      className={cn(
        "mt-6 overflow-hidden rounded-xl border border-border/70 bg-card/95",
        "bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_40%),radial-gradient(circle_at_100%_0,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_38%)]",
        className,
      )}
    >
      <header className="border-b border-border/70 bg-muted/85 px-4 py-2 backdrop-blur-sm">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
      </header>

      <div className="bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_92%,transparent)_0%,color-mix(in_oklab,var(--background)_100%,transparent)_100%)] p-0">
        <SandpackProvider
          customSetup={{
            dependencies: {
              react: "latest",
              "react-dom": "latest",
            },
          }}
          files={files}
          options={{
            visibleFiles: fileEntries,
            activeFile,
          }}
          template={template}
        >
          <SandpackLayout style={{ height: `${editorHeight}px` }}>
            <SandpackCodeEditor
              showLineNumbers
              showTabs
              style={{ fontSize: 13 }}
              wrapContent
            />
            <SandpackPreview showOpenInCodeSandbox={false} />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </section>
  );
}
