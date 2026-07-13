import AgaricultureNewsClient from "@/components/AgaricultureNewsClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "कृषि सूचना - राजस्थान सरकार की कृषि प्रेस रिलीज़",
  description:
    "राजस्थान कृषि विभाग द्वारा जारी सरकारी सूचनाएँ, सब्सिडी योजनाएँ, और कृषि से जुड़ी ताज़ा प्रेस रिलीज़ हिंदी में पढ़ें। किसानों के लिए महत्वपूर्ण समाचार।",
  path: "/AgaricultureNews",
  keywords: [
    "कृषि सूचना", "राजस्थान कृषि विभाग", "कृषि प्रेस रिलीज़", "Agriculture news Hindi",
    "किसान सब्सिडी", "सरकारी कृषि योजना", "Rajasthan agriculture news",
  ],
});

export default function AgaricultureNewsPage() {
  return <AgaricultureNewsClient />;
}
