import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Preview/runtime in this environment uses `next start` (Node server).
   *
   * Using `output: "export"` produces a static-export build intended to be served
   * from `out/` via a static file server, and it can lead to server runtime
   * failures like:
   *   Cannot find module './279.js' required by .next/server/webpack-runtime.js
   *
   * Therefore we do NOT use static export output for this project preview.
   */
};

export default nextConfig;
