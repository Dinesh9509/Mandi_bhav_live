import MandiBhavClient from "@/components/MandiBhavClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "राजस्थान मंडी सूची - सभी 150+ मंडियों के भाव",
  description:
    "राजस्थान की सभी APMC मंडियों की पूरी सूची। अजमेर, अलवर, जयपुर, जोधपुर, कोटा, सीकर, बीकानेर, श्रीगंगानगर सहित 150+ मंडियों के आज के ताज़ा भाव देखें।",
  path: "/MandiBhav",
  keywords: [
    "राजस्थान मंडी सूची", "Rajasthan mandi list", "all mandi rates", "APMC list Rajasthan",
    "मंडी भाव सूची", "Rajasthan APMC", "मंडी की लिस्ट",
  ],
});

export default function MandiBhavPage() {
  return <MandiBhavClient />;
}
