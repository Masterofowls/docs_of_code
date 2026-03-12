import type { ComponentType } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JavascriptDoc from "@/content/javascript.mdx";
import PythonDoc from "@/content/python.mdx";
import ReactDoc from "@/content/react.mdx";
import SqlDoc from "@/content/sql.mdx";
import TypescriptDoc from "@/content/typescript.mdx";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  LANGUAGE_INFO,
  TOPIC_ORDER,
  isLanguageSlug,
  type LanguageSlug,
} from "@/lib/docs";

type PageProps = {
  params: Promise<{ language: string }>;
};

const contentByLanguage = {
  python: PythonDoc,
  javascript: JavascriptDoc,
  typescript: TypescriptDoc,
  sql: SqlDoc,
  react: ReactDoc,
} satisfies Record<LanguageSlug, ComponentType>;

export async function generateStaticParams() {
  return Object.keys(LANGUAGE_INFO).map((language) => ({ language }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { language } = await params;

  if (!isLanguageSlug(language)) {
    return { title: "Language Not Found" };
  }

  return {
    title: `${LANGUAGE_INFO[language].title} Guide`,
    description: LANGUAGE_INFO[language].description,
  };
}

export default async function LanguageDocsPage({ params }: PageProps) {
  const { language } = await params;

  if (!isLanguageSlug(language)) {
    notFound();
  }

  const languageInfo = LANGUAGE_INFO[language];
  const DocComponent = contentByLanguage[language];

  return (
    <section className="mx-auto w-full max-w-4xl space-y-8">
      <header className="fade-up rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {languageInfo.title}
          </h1>
          <Badge className={languageInfo.accent} variant="outline">
            Full Stack Coverage
          </Badge>
        </div>
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {languageInfo.description}
        </p>
      </header>

      <Card className="border-border/70">
        <CardContent className="p-0">
          <Accordion className="px-6">
            {TOPIC_ORDER.map((topic, index) => (
              <AccordionItem key={topic.id} value={`item-${index}`}>
                <AccordionTrigger>{topic.title}</AccordionTrigger>
                <AccordionContent>
                  Open the <a href={`#${topic.id}`}>section anchor</a> in this
                  page to jump directly to {topic.title.toLowerCase()}.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <article className="doc-grid rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8">
        <DocComponent />
      </article>
    </section>
  );
}
