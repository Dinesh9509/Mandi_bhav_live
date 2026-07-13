import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "कृषि सलाह व उपाय - फसल सुधार के टिप्स",
  description:
    "भिंडी, लौकी, मिर्च, सोयाबीन, टमाटर इत्यादि की फसलों में रोग, कीट और पैदावार बढ़ाने के लिए कृषि वैज्ञानिक सलाह। प्रत्येक फसल के लिए विस्तृत उपचार जानकारी।",
  path: "/Tips",
  keywords: [
    "कृषि सलाह", "फसल टिप्स", "किसान सलाह", "Agricultural tips Hindi",
    "फसल रोग उपचार", "कीटनाशक छिड़काव", "crop care tips",
  ],
});

export default function TipsPage() {
  return (
    <>
      <div className="inner_banner">
        <div className="container">
          <h2>Welcome to Mandi Bahv Jankari</h2>
          <p>
            This website belongs to farming and farming machinary. Created and Managed by AD Group.
            Content owned and updated by Mandi Bhav Jankari Team.
          </p>
        </div>
      </div>

      <div className="tips">
        <div className="container">
          <div className="tips_list">
            <ul className="tips_main">
              <li>
                <Link href="/LadyFinger">
                  <img src="/images/Tips/lady-finger.jpg" alt="LadyFinger" />
                  <span>भिंडी में फूलों की मात्रा ऐसे बढ़ाएं</span>
                </Link>
              </li>
              <li>
                <Link href="/Loki">
                  <img src="/images/Tips/loki.jpg" alt="Loki" />
                  <span>लौकी की फसल में रस चूसक का प्रकोप!</span>
                </Link>
              </li>
              <li>
                <Link href="/Mirch">
                  <img src="/images/Tips/Mirch.jpg" alt="Mirch" />
                  <span>मिर्च की फसल में फूलों की संख्या कैसे बढ़ाएं!</span>
                </Link>
              </li>
              <li>
                <Link href="/SoyabeenPlague">
                  <img src="/images/Tips/plague.jpg" alt="Soyabeen plague" />
                  <span>सोयाबीन की फसल में तम्बाखू इल्ली का रोकथाम !</span>
                </Link>
              </li>
              <li>
                <Link href="/Soyabeen">
                  <img src="/images/Tips/Soyabeen.jpg" alt="Soyabeen" />
                  <span>सोयाबीन में इल्ली का संक्रमण !</span>
                </Link>
              </li>
              <li>
                <Link href="/Tomatoes">
                  <img src="/images/Tips/tomatoes.jpg" alt="Tomatoes" />
                  <span>टमाटर की फसल में फूल गिरने से ऐसे बचाये!</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
