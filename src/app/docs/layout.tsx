import type { ReactNode } from "react";

import { DocsNavShell } from "@/components/docs/docs-nav-shell";

type DocsLayoutProps = {
  children: ReactNode;
};

export default function DocsLayout({ children }: DocsLayoutProps) {
  return <DocsNavShell>{children}</DocsNavShell>;
}
