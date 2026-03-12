import Link from "next/link";

import { Button } from "@/components/ui/button";

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
      <Button asChild className="mt-6">
        <Link href="/docs">Back to docs</Link>
      </Button>
    </main>
  );
}
