/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  serverExternalPackages: ["sequelize", "sqlite3"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization,X-Admin-Password" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/admin/:path*", destination: "/api/admin/:path*" },
      { source: "/login", destination: "/api/login" },
    ];
  },
};

export default nextConfig;
