import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Docs of Code",
    short_name: "DocsCode",
    description:
      "Advanced interactive code documentation for Python, JavaScript, TypeScript, SQL, and React.",
    start_url: "/docs",
    display: "standalone",
    background_color: "#f8f8f6",
    theme_color: "#0ea5e9",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
