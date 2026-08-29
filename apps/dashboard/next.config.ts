import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  transpilePackages: ["ui"],
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yt3.ggpht.com"
      }
    ]
  },
};

export default withMDX(nextConfig);