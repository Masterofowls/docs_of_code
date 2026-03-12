import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopicDocumentation } from "@/lib/docs-content";

type TopicDocViewProps = {
  doc: TopicDocumentation;
};

export function TopicDocView({ doc }: TopicDocViewProps) {
  return (
    <article className="space-y-6 rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
      <header className="space-y-3 border-b border-border/60 pb-5">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {doc.title}
        </h1>
        <p className="text-base text-muted-foreground md:text-lg">
          {doc.summary}
        </p>
      </header>

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

      <Card className="border-border/70 bg-background/50">
        <CardHeader>
          <CardTitle>Reference Example</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-md bg-muted p-4">
            <code className="text-sm">{doc.example.code}</code>
          </pre>
        </CardContent>
      </Card>

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
          <pre className="overflow-x-auto text-sm">
            <code>{doc.commands.join("\n")}</code>
          </pre>
        </div>
      </section>
    </article>
  );
}
