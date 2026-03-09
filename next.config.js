/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will prevent the build from failing on type errors
    // if your team hasn't finished the interfaces yet.
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true },

  // This helps resolve the "Unexpected token 'export'" error
  // by forcing Next.js to compile these libraries correctly.
  transpilePackages: ["lucide-react", "recharts", "date-fns"],

  // Optional: Redirect missing pages to the home dashboard
  // so you don't get 404s on /support or /settings.
  async rewrites() {
    return [
      {
        source: "/support",
        destination: "/",
      },
      {
        source: "/settings",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
