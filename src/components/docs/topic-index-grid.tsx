import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TopicDocumentation } from "@/lib/docs-content";
import type { LanguageSlug } from "@/lib/docs";

type TopicIndexGridProps = {
  language: LanguageSlug;
  docs: TopicDocumentation[];
};

export function TopicIndexGrid({ language, docs }: TopicIndexGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {docs.map((doc) => (
        <Link href={`/docs/${language}/${doc.slug}`} key={doc.slug}>
          <Card className="h-full border-border/70 transition-transform duration-200 hover:-translate-y-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between gap-2 text-lg">
                <span className="line-clamp-2">{doc.title}</span>
                <Badge variant="outline">topic</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{doc.summary}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
