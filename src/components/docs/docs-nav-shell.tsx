"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { LANGUAGE_INFO, TOPIC_ORDER, type LanguageSlug } from "@/lib/docs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type DocsNavShellProps = {
  children: React.ReactNode;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function topicHref(language: LanguageSlug, topicId: string) {
  return `/docs/${language}/${topicId}`;
}

export function DocsNavShell({ children }: DocsNavShellProps) {
  const pathname = usePathname();

  const activeLanguage = (Object.keys(LANGUAGE_INFO).find((slug) =>
    pathname.startsWith(`/docs/${slug}`),
  ) ?? "python") as LanguageSlug;

  const navContent = (
    <div className="space-y-6 p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Languages
        </p>
        <div className="mt-3 space-y-2">
          {Object.entries(LANGUAGE_INFO).map(([slug, language]) => {
            const href = `/docs/${slug}`;

            return (
              <Link
                className={[
                  "block rounded-lg border px-3 py-2 text-sm transition-colors",
                  isActive(pathname, href)
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "border-border/70 hover:bg-muted",
                ].join(" ")}
                href={href}
                key={slug}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{language.title}</span>
                  <Badge className={language.accent} variant="outline">
                    guide
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {language.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Jump To Topic
        </p>
        <div className="mt-3 space-y-1">
          {TOPIC_ORDER.map((topic) => {
            const href = topicHref(activeLanguage, topic.id);
            const topicActive = pathname === href;

            return (
              <Link
                className={[
                  "block rounded-md px-2 py-1.5 text-sm transition-colors",
                  topicActive
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
                href={href}
                key={topic.id}
              >
                {topic.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-dvh md:grid md:grid-cols-[320px_1fr]">
      <aside className="glass sticky top-0 hidden h-dvh border-r border-sidebar-border md:block">
        <ScrollArea className="h-full">{navContent}</ScrollArea>
      </aside>

      <div className="min-h-dvh">
        <header className="glass sticky top-0 z-30 border-b border-border/70 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link className="text-sm font-semibold tracking-wide" href="/">
              Docs of Code
            </Link>
            <Sheet>
              <SheetTrigger
                render={
                  <Button
                    aria-label="Open documentation menu"
                    size="icon"
                    variant="outline"
                  />
                }
              >
                <Menu className="h-4 w-4" />
              </SheetTrigger>
              <SheetContent className="w-[90vw] max-w-[420px] p-0" side="left">
                <SheetHeader className="border-b border-border/70 px-4 py-3 text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Navigation
                  </SheetTitle>
                  <SheetDescription>
                    Browse languages and jump directly to any topic section.
                  </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100dvh-86px)]">
                  {navContent}
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main id="main" className="px-4 py-8 sm:px-6 lg:px-10">
          {children}
        </main>
      </div>
    </div>
  );
}
