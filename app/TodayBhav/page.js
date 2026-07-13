import TodayBhavClient from "@/components/TodayBhavClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "आज के मंडी भाव - Today Mandi Rate Rajasthan",
  description:
    "राजस्थान की सभी मंडियों के आज के ताज़ा भाव एक ही जगह। सरसों, गेहूं, चना, बाजरा, सोयाबीन, मूँग, मूँगफली, ज्वार, मक्का इत्यादि के live दैनिक मूल्य।",
  path: "/TodayBhav",
  keywords: ["आज के मंडी भाव", "Today mandi rate", "Aaj ke bhav", "Rajasthan mandi today", "live mandi prices"],
});

export default function TodayBhavPage() {
  return <TodayBhavClient />;
}
