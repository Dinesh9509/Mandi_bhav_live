import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://www.mandibhavjankari.com").replace(/\/$/, "");
const OG_IMAGE = "/images/main_home.jpg";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "आज के मंडी भाव - राजस्थान मंडी दरें | Mandi Bhav Jankari",
    template: "%s | Mandi Bhav Jankari",
  },
  description:
    "राजस्थान की 150+ मंडियों के आज के ताज़ा मंडी भाव। सरसों, गेहूं, चना, बाजरा, सोयाबीन, मूँग, मूँगफली व अन्य फसलों के दैनिक न्यूनतम/अधिकतम मूल्य जानें। Live Rajasthan APMC mandi rates updated daily.",
  applicationName: "Mandi Bhav Jankari",
  authors: [{ name: "Mandi Bhav Jankari Team" }],
  generator: "Next.js",
  keywords: [
    "आज के मंडी भाव", "राजस्थान मंडी भाव", "Rajasthan mandi bhav", "mandi rate today",
    "सरसों भाव", "गेहूं भाव", "चना भाव", "बाजरा भाव", "सोयाबीन भाव", "मूँग भाव",
    "Jaipur mandi bhav", "Kota mandi bhav", "Alwar mandi bhav", "Ajmer mandi bhav",
    "Sikar mandi bhav", "Bikaner mandi bhav", "Jodhpur mandi bhav", "Sri Ganganagar mandi bhav",
    "Bhilwara mandi bhav", "Dausa mandi bhav", "Nagaur mandi bhav", "Tonk mandi bhav",
    "Hanumangarh mandi bhav", "Bharatpur mandi bhav", "Pali mandi bhav",
    "fasal bhav", "APMC rate", "krishi bhav", "Mandi Bhav Jankari",
  ],
  alternates: { canonical: SITE_URL, languages: { "hi-IN": SITE_URL, "x-default": SITE_URL } },
  openGraph: {
    type: "website",
    siteName: "Mandi Bhav Jankari",
    locale: "hi_IN",
    url: SITE_URL,
    title: "आज के मंडी भाव - राजस्थान मंडी दरें | Mandi Bhav Jankari",
    description:
      "राजस्थान की 150+ मंडियों के आज के ताज़ा भाव। सरसों, गेहूं, चना, बाजरा, सोयाबीन व अन्य फसलों के दैनिक मूल्य।",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Mandi Bhav Jankari - आज के मंडी भाव" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "आज के मंडी भाव - राजस्थान मंडी दरें",
    description: "राजस्थान की 150+ मंडियों के आज के ताज़ा भाव।",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: { google: "notranslate" },
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico", apple: "/logo192.png" },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#239f2e",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mandi Bhav Jankari",
  alternateName: "मंडी भाव जानकारी",
  url: SITE_URL,
  logo: `${SITE_URL}/logo512.png`,
  description:
    "राजस्थान की मंडियों के आज के ताज़ा भाव और फसल मूल्य देखने के लिए विश्वसनीय वेबसाइट।",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mandi Bhav Jankari",
  url: SITE_URL,
  inLanguage: "hi-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/MandiBhav?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <ClientProviders>
          <div className="App">
            <Header />
            {children}
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}
