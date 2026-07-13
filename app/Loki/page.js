import TipDetail from "@/components/TipDetail";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "लौकी की फसल में रस चूसक कीटों का उपचार",
  description:
    "लौकी (Bottle Gourd) की फसल में रस चूसक कीटों के प्रकोप से बचाव हेतु प्रभावी छिड़काव और उपचार की विधि। वैज्ञानिक कृषि सलाह।",
  path: "/Loki",
  type: "article",
  image: "/images/Tips/loki.jpg",
  keywords: ["लौकी की खेती", "bottle gourd farming", "लौकी कीट उपचार", "लौकी रस चूसक"],
});

export default function LokiPage() {
  return (
    <TipDetail
      title="लौकी की फसल में रस चूसक का प्रकोप!"
      image="/images/Tips/loki.jpg"
      shareTitle="Loki Tips"
      shareText="लौकी की फसल में रस चूसक का प्रकोप!"
      paragraphs={[
        "इस समय लौकी की फसल में रस चूसक कीटों का प्रभाव दिखाई दे रहा है। इसके कारण लौकी के पौधों की पत्तियां मुड़ने तथा मुरझाने लगती है तथा साथ ही पौधों में पीलापन भी आ जाता है। इसके प्रभाव से पौधों का बढ़ना भी रुक जाता है। फल एवं फूल भी कम लगने लगते है। इसके नियंत्रण के हेतु खेत में पीले चिपचिपे जाल 5 प्रति एक एकड़ लगाएं।",
        "The ladyfinger crop is currently in a state of fruits and flowers. But still more rain and outbreak of pests causes the problem of flowers to fall. For this, do not let the water fill in the field. Properly manage pests. And spray with boron @ 1 gram and micronutrient @ 1 gram per liter.",
      ]}
    />
  );
}
