import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repository = process.env.GITHUB_REPOSITORY ?? "";
const repositoryName = repository.split("/")[1] ?? "";
const basePath = isGithubActions && repositoryName ? `/${repositoryName}` : "";

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: ["rehype-katex"],
  },
});

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development" || isGithubActions,
  register: true,
  skipWaiting: true,
  fallbacks: {
    document: "/offline",
  },
});

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath,
  ...(basePath ? { assetPrefix: basePath } : {}),
};

export default withPWA(withMDX(nextConfig));
