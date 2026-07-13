import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy - गोपनीयता नीति",
  description:
    "Mandi Bhav Jankari की गोपनीयता नीति। हम आपकी व्यक्तिगत जानकारी कैसे संग्रहित, उपयोग और सुरक्षित करते हैं इसकी पूरी जानकारी।",
  path: "/PrivacyPolicy",
  keywords: ["Privacy Policy", "गोपनीयता नीति", "Mandi Bhav Jankari privacy"],
});

export default function PrivacyPolicyPage() {
  return (
    <div className="Policy PrivacyPolicy">
      <div className="inner_banner">
        <div className="container">
          <h2>Privacy Policy</h2>
        </div>
      </div>

      <div className="container">
        <div className="content">
          <h4>Introduction</h4>
          <p>
            At <b>Mandi Bhav Jankari</b>, we respect your privacy and are committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
          </p>
        </div>

        <div className="content">
          <h4>1. Information We Collect</h4>
          <p>
            When you use <b>Mandi Bhav Jankari</b>, we may collect the following information:
          </p>
          <ul>
            <li>Personal identification information (e.g., name, email, contact details)</li>
            <li>Browsing data (e.g., IP address, browser type, usage information)</li>
            <li>Location data for relevant mandi price updates</li>
          </ul>
        </div>

        <div className="content">
          <h4>2. How We Use Your Information</h4>
          <p>The data we collect is used for the following purposes:</p>
          <ul>
            <li>Providing real-time mandi price updates</li>
            <li>Improving user experience by analyzing site traffic and performance</li>
            <li>Displaying relevant ads via Google Ads</li>
          </ul>
        </div>

        <div className="content">
          <h4>3. Google Ads and Cookies</h4>
          <p>
            We use Google Ads to display advertisements on our platform. Google Ads may collect certain
            non-personally identifiable information to serve targeted ads. <b>Mandi Bhav Jankari</b> uses
            cookies to enhance user experience and track usage patterns. You can manage or disable cookies
            through your browser settings, but this may limit the functionality of our platform.
          </p>
        </div>

        <div className="content">
          <h4>4. Data Security</h4>
          <p>
            We take the protection of your data seriously. <b>Mandi Bhav Jankari</b> implements
            industry-standard security measures to safeguard your information. However, no method of
            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="content">
          <h4>5. Third-Party Links</h4>
          <p>
            Our platform may contain links to third-party websites. We are not responsible for the privacy
            practices of such websites. Users are encouraged to review the privacy policies of any
            third-party sites they visit.
          </p>
        </div>

        <div className="content">
          <h4>6. User Rights</h4>
          <p>You have the right to:</p>
          <ul>
            <li>Access, correct, or delete your personal information</li>
            <li>Opt-out of targeted advertising via Google Ads by adjusting your Google Ads settings</li>
          </ul>
        </div>

        <div className="content">
          <h4>7. Changes to This Policy</h4>
          <p>
            We may update our Privacy Policy periodically. Any changes will be posted on this page, and
            continued use of the site after updates constitutes acceptance of the new terms.
          </p>
        </div>

        <div className="content">
          <h4>8. Contact:</h4>
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
