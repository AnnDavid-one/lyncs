/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },
  // This forces Next.js to properly compile these problematic libraries
  transpilePackages: [
    "lucide-react",
    "recharts",
    "date-fns",
    "clsx",
    "tailwind-merge",
  ],
};

module.exports = nextConfig;
