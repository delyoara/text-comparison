import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* pour ignorer les erreur ESLint pendant le build*/
    eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
