import AgricultureNewsDetailClient from "@/components/AgricultureNewsDetailClient";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");

export async function generateMetadata({ params }) {
  const { id } = await params;
  const url = `${SITE_URL}/AgaricultureNews/${id}`;
  const title = `कृषि सूचना विवरण - समाचार #${id}`;
  const description =
    "राजस्थान कृषि विभाग द्वारा जारी कृषि से संबंधित नवीनतम सूचना, सरकारी योजनाएँ, सब्सिडी और किसानों के लिए महत्वपूर्ण जानकारी।";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description },
    twitter: { card: "summary", title, description },
  };
}

export default async function AgricultureNewsDetailPage({ params }) {
  const { id } = await params;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: `कृषि सूचना विवरण - #${id}`,
    inLanguage: "hi-IN",
    publisher: {
      "@type": "Organization",
      name: "Mandi Bhav Jankari",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo512.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/AgaricultureNews/${id}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <AgricultureNewsDetailClient id={id} />
    </>
  );
}
