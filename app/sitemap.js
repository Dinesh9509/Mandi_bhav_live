import { ensureDb, models } from "@/lib/db";

const SITE = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");

// Routes that are always present (no DB needed).
const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/MandiBhav", priority: 0.9, changeFrequency: "daily" },
  { path: "/TodayBhav", priority: 0.9, changeFrequency: "daily" },
  { path: "/AgaricultureNews", priority: 0.7, changeFrequency: "daily" },
  { path: "/Tips", priority: 0.6, changeFrequency: "weekly" },
  { path: "/Technology", priority: 0.6, changeFrequency: "weekly" },
  { path: "/LadyFinger", priority: 0.5, changeFrequency: "monthly" },
  { path: "/Loki", priority: 0.5, changeFrequency: "monthly" },
  { path: "/Mirch", priority: 0.5, changeFrequency: "monthly" },
  { path: "/Soyabeen", priority: 0.5, changeFrequency: "monthly" },
  { path: "/SoyabeenPlague", priority: 0.5, changeFrequency: "monthly" },
  { path: "/Tomatoes", priority: 0.5, changeFrequency: "monthly" },
  { path: "/GovtWillGive15Lakh", priority: 0.5, changeFrequency: "monthly" },
  { path: "/ClaimCropInsurance", priority: 0.5, changeFrequency: "monthly" },
  { path: "/AboutUs", priority: 0.4, changeFrequency: "yearly" },
  { path: "/ContactUs", priority: 0.4, changeFrequency: "yearly" },
  { path: "/Disclaimer", priority: 0.3, changeFrequency: "yearly" },
  { path: "/PrivacyPolicy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/TermsandConditions", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const now = new Date();
  const out = STATIC_ROUTES.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  try {
    await ensureDb();
    const apmcs = await models.Apmc_names_data.findAll({ attributes: ["apmcNameEng"] });
    for (const a of apmcs) {
      if (!a.apmcNameEng) continue;
      out.push({
        url: `${SITE}/${encodeURIComponent(a.apmcNameEng)}`,
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
      });
    }
  } catch (err) {
    // If DB is unreachable during build, fall back to static-only sitemap.
    console.error("sitemap: failed to enumerate mandis:", err.message);
  }

  return out;
}
