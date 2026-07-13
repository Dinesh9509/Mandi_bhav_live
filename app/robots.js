const SITE = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep search engines out of admin routes, raw API endpoints,
        // and the Next.js internals.
        disallow: ["/manage/", "/api/", "/admin/", "/_next/", "/login"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
