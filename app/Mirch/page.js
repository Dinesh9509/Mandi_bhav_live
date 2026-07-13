import TipDetail from "@/components/TipDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "मिर्च की फसल में फूलों की संख्या कैसे बढ़ाएं",
  description:
    "मिर्च (Chilli) की फसल में फूलों की संख्या बढ़ाने के लिए वैज्ञानिक छिड़काव और पोषण प्रबंधन की पूरी जानकारी। पैदावार बढ़ाने के सरल उपाय।",
  path: "/Mirch",
  type: "article",
  image: "/images/Tips/Mirch.jpg",
  keywords: ["मिर्च की खेती", "chilli farming", "मिर्च फूल बढ़ाएं", "chilli yield tips"],
});

export default function MirchPage() {
  return (
    <TipDetail
      title="मिर्च की फसल में फूलों की संख्या कैसे बढ़ाएं!"
      image="/images/Tips/Mirch.jpg"
      shareTitle="Mirch Tips"
      shareText="मिर्च की फसल में फूलों की संख्या कैसे बढ़ाएं!"
      paragraphs={[
        "मिर्च के पौधे इस समय फूल तथा वृद्धि-विकास की अवस्था में है। मिर्च के पौधों का उचित विकास हो तथा पौधों में फूल अधिक मात्रा में आएं इसके लिए खेत से अनावश्यक पानी को बहार निकल देना चाहिए। खेत में घूमकर कीटों एवं रोग का उचित निरीक्षण करके उनका नियंत्रण किया जाना चाहिए। उर्वरकों एवं खाद का उचित प्रबंधन करना चाहिए। तथा साथ ही अधिक फूल एवं वृद्धि विकास के लिए NPK 12:61:0 @ 75 ग्राम एवं सूक्ष्म पोषक तत्व @15 ग्राम प्रति पंप छिड़काव करें एवंजिबरैलिक एसिड 0.001% @ 30 मिली प्रति टंकी का छिड़काव करें।",
        "Development of chilli plants and flowers in more quantity, the unnecessary water should be removed from the field. Pests and diseases should be controlled by moving around in the field. Proper management of fertilizers and fertilizers should be done. Also, spray NPK 12: 61: 0 @ 75 g and micronutrient @ 15 g per pump and gibberlic acid 0.001% @ 30 ml per tank for more flower and growth development.",
      ]}
    />
  );
}
