import MandiDataClient from "@/components/MandiDataClient";
import { ensureDb, models } from "@/lib/db";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");

async function resolveMandi(slug) {
  try {
    await ensureDb();
    const upper = slug.toUpperCase();
    // 1) Exact match.
    let row = await models.Apmc_names_data.findOne({ where: { apmcNameEng: upper } });
    if (!row) {
      // 2) Loose match: pick the first APMC whose English name starts with the slug
      //    (e.g. /JAIPUR -> JAIPUR GRAIN). Avoids false matches like /KOT -> KOTA.
      const all = await models.Apmc_names_data.findAll({ attributes: ["apmcNameEng", "apmcNameHin"] });
      row = all.find((a) => (a.apmcNameEng || "").toUpperCase().startsWith(upper + " ")) ||
            all.find((a) => (a.apmcNameEng || "").toUpperCase().startsWith(upper));
    }
    return {
      english: row?.apmcNameEng || slug,
      hindi: row?.apmcNameHin || slug,
    };
  } catch {
    return { english: slug, hindi: slug };
  }
}

export async function generateMetadata({ params }) {
  const { mandiName } = await params;
  const decoded = decodeURIComponent(mandiName || "");
  const { hindi, english } = await resolveMandi(decoded);
  const title = `${hindi} मंडी भाव आज - ${english} Mandi Rate Today`;
  const description = `${hindi} (${english}) मंडी के आज के ताज़ा भाव। सरसों, गेहूं, चना, बाजरा, सोयाबीन व अन्य फसलों के दैनिक न्यूनतम/अधिकतम मूल्य। Live ${english} APMC mandi rates updated daily.`;
  const path = `/${encodeURIComponent(decoded)}`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${path}`,
      title,
      description,
      images: ["/images/main_home.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/main_home.jpg"],
    },
    keywords: [
      `${hindi} मंडी भाव`,
      `${english} mandi bhav`,
      `${english} mandi rate today`,
      `${hindi} आज के भाव`,
      "राजस्थान मंडी भाव",
      "Rajasthan mandi rates",
    ],
  };
}

export default async function MandiDataPage({ params }) {
  const { mandiName } = await params;
  const decoded = decodeURIComponent(mandiName);
  const { hindi, english } = await resolveMandi(decoded);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Mandi Bhav", item: `${SITE_URL}/MandiBhav` },
      { "@type": "ListItem", position: 3, name: hindi, item: `${SITE_URL}/${encodeURIComponent(english)}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <MandiDataClient mandiName={decoded} />
    </>
  );
}
