import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions - उपयोग की शर्तें",
  description:
    "Mandi Bhav Jankari वेबसाइट के उपयोग की शर्तें (Terms & Conditions)। सेवा की सीमाएँ, उपयोगकर्ता दायित्व और कानूनी जानकारी।",
  path: "/TermsandConditions",
  keywords: ["Terms and Conditions", "उपयोग की शर्तें", "Mandi Bhav terms"],
});

export default function TermsandConditionsPage() {
  return (
    <div className="Policy termsandcondition">
      <div className="inner_banner">
        <div className="container">
          <h2>Terms and Conditions</h2>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <h4>Introduction</h4>
          <p>
            Welcome to <b>Mandi Bhav Jankari</b>. By using our website and services, you agree to abide by
            these terms and conditions. If you do not agree with any part of these terms, please discontinue
            using our services immediately.
          </p>
        </div>

        <div className="content">
          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing or using <b>Mandi Bhav Jankari</b>, you agree to be bound by these Terms and
            Conditions, as well as any future updates. These terms apply to all users, including farmers,
            traders, and businesses seeking real-time mandi prices.
          </p>
        </div>

        <div className="content">
          <h4>2. Services Provided</h4>
          <p>
            <b>Mandi Bhav Jankari</b> offers up-to-date information on mandi prices for various crops in
            real-time. The prices provided are based on available data from multiple sources, and while we
            strive for accuracy, we cannot guarantee the completeness or accuracy of all the information.
          </p>
        </div>

        <div className="content">
          <h4>3. User Responsibility</h4>
          <p>
            Users must use the information provided for personal or business purposes in compliance with
            local laws and regulations. Any misuse of data or unauthorized reproduction of the content
            without permission is strictly prohibited.
          </p>
        </div>

        <div className="content">
          <h4>4. Google Ads</h4>
          <p>
            <b>Mandi Bhav Jankari</b> uses Google Ads to monetize content and provide users with relevant
            advertisements. By using our site, you agree to the placement of advertisements on the platform.
            We do not endorse any product or service advertised through Google Ads.
          </p>
        </div>

        <div className="content">
          <h4>5. Limitation of Liability</h4>
          <p>
            <b>Mandi Bhav Jankari</b> will not be held liable for any inaccuracies in the mandi prices
            provided or any consequences arising from the use of this information. Users are encouraged to
            verify data before making any financial or trading decisions.
          </p>
        </div>

        <div className="content">
          <h4>6. Intellectual Property</h4>
          <p>
            All content on <b>Mandi Bhav Jankari</b>, including text, images, logos, and data, is the
            intellectual property of <b>Mandi Bhav Jankari</b>. Unauthorized use or distribution is
            prohibited.
          </p>
        </div>

        <div className="content">
          <h4>7. Modifications</h4>
          <p>
            We reserve the right to update or modify these terms at any time. Users are encouraged to review
            this page periodically to stay informed of any changes.
          </p>
        </div>

        <div className="content">
          <h4>8. Governing Law</h4>
          <p>
            These Terms and Conditions are governed by the laws of India. Any disputes arising from the use
            of this site will be handled in accordance with local legal processes.
          </p>
        </div>

        <div className="content">
          <h4>9. CONTACT US:</h4>
          <p>
            If you have any questions or concerns, please contact at help@Mandibhavjankari.com or at contact
            number: +91 9509609604, +91 7877384541. <br />
            <br />
            You can also write to us at: Makan number 5, kothun road near govt school Chaksu, Jaipur, 303901
            <br />
            <br />
            These Terms and Conditions were updated on 24/10/2024.
          </p>
        </div>
      </div>
    </div>
  );
}
