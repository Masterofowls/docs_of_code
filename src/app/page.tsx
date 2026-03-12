import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Database,
  FileCode2,
  FlaskConical,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const highlights = [
  {
    icon: FileCode2,
    title: "MDX + KaTeX",
    description:
      "Rich narrative docs with math, runnable snippets, and technical deep dives.",
  },
  {
    icon: Braces,
    title: "D3 Interaction",
    description:
      "Visual complexity intuition with interactive charts across language tracks.",
  },
  {
    icon: Database,
    title: "System Coverage",
    description:
      "From syntax to API methods, logging, errors, project architecture, and testing.",
  },
  {
    icon: FlaskConical,
    title: "PWA Ready",
    description:
      "Installable docs with offline fallback for classrooms, travel, and workshops.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-10">
      <section className="fade-up relative overflow-hidden rounded-3xl border border-border/70 bg-card p-8 shadow-lg md:p-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative space-y-6">
          <Badge variant="outline">
            Advanced Interactive Code Documentation
          </Badge>
          <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Learn Python, JavaScript, TypeScript, SQL, and React with one modern
            docs platform.
          </h1>
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
            Every language track includes syntax, imports, comments, linting,
            functions, reduce patterns, async workflows, OOP, math methods,
            loops, structures, algorithms, testing, debugging, API methods,
            logging, dates, and common error tips.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              href="/docs"
            >
              Open Documentation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              href="/docs/python"
            >
              Start with Python
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item, index) => (
          <Card
            className="fade-up border-border/70"
            key={item.title}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <item.icon className="h-5 w-5 text-primary" />
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
