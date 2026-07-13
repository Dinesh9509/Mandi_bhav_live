import HomeClient from "@/components/HomeClient";
import { buildMetadata } from "@/lib/seo";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");

export const metadata = {
  ...buildMetadata({
    title: "आज के मंडी भाव - राजस्थान मंडी दरें | Mandi Bhav Jankari",
    description:
      "राजस्थान की 150+ मंडियों के आज के ताज़ा भाव। सरसों, गेहूं, चना, बाजरा, सोयाबीन, मूँग, मूँगफली व अन्य फसलों के दैनिक न्यूनतम/अधिकतम मूल्य देखें।",
    path: "/",
    keywords: [
      "आज के मंडी भाव", "Rajasthan mandi rates", "Aaj ke bhav", "सरसों भाव", "गेहूं भाव",
      "चना भाव", "बाजरा भाव", "सोयाबीन भाव", "Jaipur mandi bhav", "Kota mandi bhav",
      "Sikar mandi bhav", "मंडी भाव जानकारी", "मंडी रेट",
    ],
  }),
  // Home is the canonical root.
  alternates: { canonical: SITE_URL },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "आज के मंडी भाव - राजस्थान",
  url: SITE_URL,
  inLanguage: "hi-IN",
  description:
    "राजस्थान की सभी मंडियों के आज के ताज़ा भाव और फसल मूल्य देखने के लिए विश्वसनीय वेबसाइट।",
  about: {
    "@type": "Thing",
    name: "Rajasthan APMC Mandi Rates",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
