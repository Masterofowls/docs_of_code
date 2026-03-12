import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { TopicIndexGrid } from "@/components/docs/topic-index-grid";
import { getLanguageDocs } from "@/lib/docs-content";
import { LANGUAGE_INFO, isLanguageSlug } from "@/lib/docs";

type LanguagePageProps = {
  params: Promise<{ language: string }>;
};

export async function generateStaticParams() {
  return Object.keys(LANGUAGE_INFO).map((language) => ({ language }));
}

export async function generateMetadata({
  params,
}: LanguagePageProps): Promise<Metadata> {
  const { language } = await params;

  if (!isLanguageSlug(language)) {
    return { title: "Language Not Found" };
  }

  return {
    title: `${LANGUAGE_INFO[language].title} Guide`,
    description: LANGUAGE_INFO[language].description,
  };
}

export default async function LanguageDocsPage({ params }: LanguagePageProps) {
  const { language } = await params;

  if (!isLanguageSlug(language)) {
    notFound();
  }

  const languageInfo = LANGUAGE_INFO[language];
  const docs = getLanguageDocs(language);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-8">
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
        <p className="mt-3 text-sm text-muted-foreground">
          {docs.length} topic documents available. Select a topic to open full
          reference guidance, pitfalls, commands, and examples.
        </p>
      </header>

      <TopicIndexGrid docs={docs} language={language} />
    </section>
  );
}
