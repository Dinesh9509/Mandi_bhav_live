import TipDetail from "@/components/TipDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "टमाटर की फसल में फूल गिरने से बचाव",
  description:
    "टमाटर (Tomato) की फसल में फूल गिरने की समस्या को रोकने हेतु अल्फा नेफ्थिल एसिटिक एसिड, बोरान व कैल्शियम के सही उपयोग की वैज्ञानिक जानकारी।",
  path: "/Tomatoes",
  type: "article",
  image: "/images/Tips/tomatoes.jpg",
  keywords: ["टमाटर की खेती", "tomato farming", "टमाटर फूल गिरना", "tomato yield tips"],
});

export default function TomatoesPage() {
  return (
    <TipDetail
      title="टमाटर की फसल में फूल गिरने से ऐसे बचाये!"
      image="/images/Tips/tomatoes.jpg"
      shareTitle="Tomato Tips"
      shareText="टमाटर की फसल में फूल गिरने से ऐसे बचाये!"
      paragraphs={[
        "टमाटर की फसल में फूल गिरने की समस्या को आमतौर लगभग सभी जगहों पर देखा जाता है इसके कारण टमाटर कि पैदावार पर बुरा प्रभाव देखनो को मिलता है तथा टमाटर फसल से उचित मुनाफ़ा भी प्राप्त नहीं हो पाता है इस समस्या के नियंत्रण के लिए अल्फा नेफ्थिल एसिटिक एसिड 4.5% एस.एल का 3.5 ml या बोरान 15 ग्राम तथा कैल्शियम 15 ग्राम प्रति 15 लीटर पानी में मिलाकर छिड़काव करें।",
        "The problem of flowering in tomato crop is usually seen in almost every place, due to which it is seen to have a bad effect on the tomato yield and even the proper profit is not obtained from the tomato crop to control this problem. Alpha naphthyl acetic Spray 4.5 ml of acid 4.5% SL or 15 grams of boron and 15 grams of calcium per 15 liters of water.",
      ]}
    />
  );
}
