import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer - अस्वीकरण",
  description:
    "Mandi Bhav Jankari वेबसाइट पर प्रदर्शित मंडी भावों के संबंध में अस्वीकरण (Disclaimer)। डेटा स्रोत, सटीकता और उपयोग की शर्तों की जानकारी।",
  path: "/Disclaimer",
  keywords: ["Disclaimer", "अस्वीकरण", "Mandi Bhav disclaimer"],
});

export default function DisclaimerPage() {
  return (
    <div className="Policy Disclaimer">
      <div className="inner_banner">
        <div className="container">
          <h2>Disclaimer</h2>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <h4>General Information</h4>
          <p>
            The information provided by <b>Mandi Bhav Jankari</b> ("we," "us," or "our") on our platform is
            for general informational purposes only. While we strive to provide accurate and up-to-date data
            regarding mandi prices, we make no guarantees about the completeness, accuracy, reliability, or
            availability of this information.
          </p>
        </div>

        <div className="content">
          <h4>Accuracy of Information</h4>
          <p>
            <b>Mandi Bhav Jankari</b> collects mandi price data from multiple sources, including but not
            limited to government databases, market updates, and other third-party platforms. Despite our
            best efforts, real-time prices are subject to fluctuations, and the information on our platform
            may occasionally be outdated or inaccurate. Users are advised to verify mandi prices through
            additional resources before making any financial or trading decisions.
          </p>
        </div>

        <div className="content">
          <h4>No Professional Advice</h4>
          <p>
            The content on <b>Mandi Bhav Jankari</b> should not be considered professional, financial, or
            trading advice. We are not responsible for any loss or damage that may arise from reliance on
            the information provided. Users are encouraged to consult with professionals before making any
            decisions based on the data from our platform.
          </p>
        </div>

        <div className="content">
          <h4>Google Ads and Third-Party Content</h4>
          <p>
            Our platform uses <b>Google Ads</b> to generate revenue and display relevant advertisements. We
            do not endorse any products, services, or companies that appear in these ads. Clicking on any
            advertisements may redirect you to third-party websites, which operate under their own terms and
            privacy policies. <b>Mandi Bhav Jankari</b> is not responsible for the content or practices of
            any third-party sites.
          </p>
        </div>

        <div className="content">
          <h4>Limitation of Liability</h4>
          <p>
            Under no circumstances will <b>Mandi Bhav Jankari</b>, its owners, or affiliates be liable for
            any loss or damage, including but not limited to financial loss, resulting from the use of our
            platform, reliance on the provided mandi prices, or interactions with third-party advertisements.
          </p>
        </div>

        <div className="content">
          <h4>Changes to Information</h4>
          <p>
            We reserve the right to make changes or updates to the information on <b>Mandi Bhav Jankari</b>{" "}
            without prior notice. Users should check the site regularly for any updates or changes.
          </p>
        </div>

        <div className="content">
          <h4>Contact:</h4>
          <p>
            If you have any questions or concerns, please contact at help@Mandibhavjankari.com or at contact
            number: +91 9509609604, +91 7877384541. <br />
            <br />
            You can also write to us at: Makan number 5, kothun road near govt school Chaksu, Jaipur, 303901
            <br />
            <br />
            These Privacy Policy were updated on 24/10/2024.
          </p>
        </div>
      </div>
    </div>
  );
}
