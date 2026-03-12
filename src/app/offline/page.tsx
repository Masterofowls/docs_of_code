import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
        You are offline
      </h1>
      <p className="mt-3 text-muted-foreground">
        The cached documentation is still available. Reconnect to sync the
        latest updates and examples.
      </p>
      <Link
        className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        href="/docs"
      >
        Back to docs
      </Link>
    </main>
  );
}
