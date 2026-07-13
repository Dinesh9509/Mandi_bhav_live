import TipDetail from "@/components/TipDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "भिंडी की फसल में फूलों की मात्रा कैसे बढ़ाएं",
  description:
    "भिंडी (LadyFinger) की फसल में फूलों की मात्रा बढ़ाने के लिए वैज्ञानिक सलाह व छिड़काव की पूरी विधि। पैदावार बढ़ाने के सरल उपाय।",
  path: "/LadyFinger",
  type: "article",
  image: "/images/Tips/lady-finger.jpg",
  keywords: ["भिंडी की खेती", "ladyfinger crop", "okra farming tips", "भिंडी फूल बढ़ाएं"],
});

export default function LadyFingerPage() {
  return (
    <TipDetail
      title="भिंडी में फूलों की मात्रा ऐसे बढ़ाएं"
      image="/images/Tips/lady-finger.jpg"
      shareTitle="LadyFinger Tips"
      shareText="भिंडी में फूलों की मात्रा ऐसे बढ़ाएं"
      paragraphs={[
        "भिंडी की फसल इस समय फल एवं फूलों की अवस्था में है। लेकिन अभी अधिक बारिश एवं कीटों के प्रकोप से फूल गिरने की समस्या आती है। इसके लिए खेत में पानी का भराव न होने दें। कीटों का समुचित प्रबंधन करें। एवं बोरॉन @ 1 ग्राम एवं सूक्ष्म पोषक तत्व @ 1 ग्राम प्रति लीटर के साथ छिड़काव करें।",
        "The ladyfinger crop is currently in a state of fruits and flowers. But still more rain and outbreak of pests causes the problem of flowers to fall. For this, do not let the water fill in the field. Properly manage pests. And spray with boron @ 1 gram and micronutrient @ 1 gram per liter.",
      ]}
    />
  );
}
