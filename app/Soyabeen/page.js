import TipDetail from "@/components/TipDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "सोयाबीन में इल्ली के संक्रमण का उपचार",
  description:
    "सोयाबीन (Soyabean) की फसल में इल्ली के संक्रमण को रोकने के लिए लैम्डासायलोथ्रिन व थाइमेथोक्साम के प्रभावी छिड़काव की विधि।",
  path: "/Soyabeen",
  type: "article",
  image: "/images/Tips/Soyabeen.jpg",
  keywords: ["सोयाबीन की खेती", "soyabean farming", "सोयाबीन इल्ली उपचार", "soyabean pest control"],
});

export default function SoyabeenPage() {
  return (
    <TipDetail
      title="सोयाबीन में इल्ली का संक्रमण !"
      image="/images/Tips/Soyabeen.jpg"
      shareTitle="Soyabeen Tips"
      shareText="सोयाबीन में इल्ली का संक्रमण !"
      paragraphs={[
        "लैम्डासायलोथ्रिन 09 .50 % + थाइमेथोक्साम 12:60 % @ 8 ml प्रति 15 लीटर जल में मिलाकर इसका छिड़काव करें।",
        "Spray it by mixing lamdacylothrin 09 .50% + thymethoxam 12:60% @ 8ml per 15 liters of water.",
      ]}
    />
  );
}
