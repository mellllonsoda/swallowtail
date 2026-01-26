import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@swallowtail/db"],
  // 必要であれば実験的な機能だけ残す
};

export default nextConfig;