import type { MDXComponents } from "mdx/types";

import { ComplexityChart } from "@/components/charts/complexity-chart";
import { DocCallout } from "@/components/docs/doc-callout";
import { MdxCodeTabs } from "@/components/docs/mdx-code-tabs";
import { MdxPre } from "@/components/docs/mdx-pre";
import { SandboxPlayground } from "@/components/docs/sandbox-playground";

const headingClass =
  "mt-10 scroll-mt-24 text-balance text-2xl font-semibold tracking-tight";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ className, ...props }) => (
      <h1
        className={[
          "text-balance text-4xl font-bold tracking-tight md:text-5xl",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={[headingClass, className].filter(Boolean).join(" ")}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={[
          "mt-8 scroll-mt-24 text-xl font-semibold tracking-tight",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={[
          "mt-4 max-w-none text-base leading-7 text-muted-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul
        className={[
          "mt-4 list-disc space-y-2 pl-6 text-base text-muted-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={[
          "mt-4 list-decimal space-y-2 pl-6 text-base text-muted-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={[
          "rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    pre: (props) => <MdxPre {...props} />,
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={[
          "mt-6 border-l-4 border-primary/60 bg-muted/50 px-4 py-3 text-sm italic text-muted-foreground",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={[
          "font-medium text-primary underline-offset-4 hover:underline",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    ),
    ComplexityChart,
    DocCallout,
    MdxCodeTabs,
    SandboxPlayground,
    ...components,
  };
}
