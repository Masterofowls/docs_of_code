import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TopicDocView } from "@/components/docs/topic-doc-view";
import { Badge } from "@/components/ui/badge";
import { getLanguageDocs, getTopicDocumentation } from "@/lib/docs-content";
import { LANGUAGE_INFO, isLanguageSlug } from "@/lib/docs";

type TopicPageProps = {
  params: Promise<{ language: string; topic: string }>;
};

export async function generateStaticParams() {
  return Object.keys(LANGUAGE_INFO).flatMap((language) => {
    if (!isLanguageSlug(language)) {
      return [];
    }

    return getLanguageDocs(language).map((doc) => ({
      language,
      topic: doc.slug,
    }));
  });
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { language, topic } = await params;

  if (!isLanguageSlug(language)) {
    return { title: "Topic Not Found" };
  }

  const doc = getTopicDocumentation(language, topic);

  if (!doc) {
    return { title: "Topic Not Found" };
  }

  return {
    title: `${LANGUAGE_INFO[language].title}: ${doc.title}`,
    description: doc.summary,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { language, topic } = await params;

  if (!isLanguageSlug(language)) {
    notFound();
  }

  const languageInfo = LANGUAGE_INFO[language];
  const doc = getTopicDocumentation(language, topic);

  if (!doc) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl space-y-6">
      <header className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {languageInfo.title}
          </h1>
          <Badge className={languageInfo.accent} variant="outline">
            {doc.slug}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Comprehensive topic reference from the expanded {languageInfo.title}
          documentation library.
        </p>
      </header>

      <TopicDocView doc={doc} />
    </section>
  );
}
