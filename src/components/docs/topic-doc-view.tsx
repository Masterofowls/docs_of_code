import Link from "next/link";

import { CodeEditor } from "@/components/docs/code-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopicDocumentation } from "@/lib/docs-content";
import { Badge } from "@/components/ui/badge";
import { DocCallout } from "@/components/docs/doc-callout";

type TopicDocViewProps = {
  language: string;
  doc: TopicDocumentation;
};

export function TopicDocView({ language, doc }: TopicDocViewProps) {
  return (
    <article className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
      <header className="space-y-3 border-b border-border/60 pb-5">
        <Badge variant="outline">MDN-style Reference</Badge>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {doc.title}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {doc.summary}
        </p>
      </header>

      {doc.sources.length > 0 ? (
        <DocCallout title="Adapted Source Content">
          This page includes rewritten and adapted explanations inspired by the
          referenced documentation sources below.
        </DocCallout>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Deep Dive</h2>
        <p className="text-base leading-7 text-muted-foreground">
          {doc.deepDive}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Key Points</h2>
        <ul className="list-disc space-y-2 pl-6 text-base text-muted-foreground">
          {doc.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Examples</h2>
        <div className="grid gap-4">
          {doc.codeBlocks.map((block) => (
            <Card
              className="border-border/70 bg-background/50"
              key={block.title}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2">
                  <span>{block.title}</span>
                  <Badge variant="outline">{block.language}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  className="mt-0"
                  copyButton
                  header={false}
                  lang={block.language}
                  lineNumbers
                >
                  {block.code}
                </CodeEditor>

                <div className="mt-4 space-y-2 rounded-md border border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">
                      Commentary:
                    </span>{" "}
                    {block.commentary}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Expected Input:
                    </span>{" "}
                    {block.expectedInput}
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">
                      Expected Output:
                    </span>{" "}
                    {block.expectedOutput}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Common Pitfalls
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-base text-muted-foreground">
          {doc.pitfalls.map((pitfall) => (
            <li key={pitfall}>{pitfall}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">Commands</h2>
        <div className="rounded-md bg-muted p-4">
          <CodeEditor copyButton header={false} lang="bash" lineNumbers>
            {doc.commands.join("\n")}
          </CodeEditor>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">See Also</h2>
        <div className="flex flex-wrap gap-2">
          {doc.seeAlso.map((entry) => (
            <Link
              className="rounded-md border border-border/70 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={`/docs/${language}/${entry.slug}`}
              key={entry.slug}
            >
              {entry.title}
            </Link>
          ))}
        </div>
      </section>

      {doc.sources.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">Sources</h2>
          <ul className="list-disc space-y-2 pl-6 text-base text-muted-foreground">
            {doc.sources.map((source) => (
              <li key={source.url}>
                <a
                  className="font-medium text-primary underline-offset-4 hover:underline"
                  href={source.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {source.name}
                </a>
                : {source.note}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
