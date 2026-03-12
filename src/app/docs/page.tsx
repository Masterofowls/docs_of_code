import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANGUAGE_INFO } from "@/lib/docs";

export default function DocsHubPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-8">
      <header className="fade-up space-y-3">
        <Badge variant="outline">Interactive Documentation Hub</Badge>
        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Multi-language engineering docs, one place.
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          Browse practical references for Python, JavaScript, TypeScript, SQL,
          and React. Every track includes syntax, architecture, async patterns,
          APIs, testing, debugging, and production tips.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(LANGUAGE_INFO).map(([slug, language], index) => (
          <Link href={`/docs/${slug}`} key={slug}>
            <Card
              className="fade-up h-full border-border/70 transition-transform duration-200 hover:-translate-y-1"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between gap-2 text-xl">
                  {language.title}
                  <Badge className={language.accent} variant="outline">
                    guide
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {language.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
