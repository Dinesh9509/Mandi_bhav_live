import ContactForm from "@/components/ContactForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "संपर्क करें - Contact Mandi Bhav Jankari",
  description:
    "मंडी भाव जानकारी टीम से संपर्क करें। प्रश्न, सुझाव या भाव संबंधी फीडबैक के लिए हमें संदेश भेजें। हम जल्द से जल्द उत्तर देंगे।",
  path: "/ContactUs",
  keywords: ["Contact Mandi Bhav Jankari", "मंडी भाव संपर्क", "feedback mandi rates"],
});

export default function ContactUsPage() {
  return (
    <>
      <div className="inner_banner">
        <div className="container">
          <h2>Contact us</h2>
        </div>
      </div>
      <div className="ContactUs_main">
        <div className="container">
          <div className="form_and_data">
            <div className="form">
              <ContactForm />
            </div>
            <div className="data">
              <h2>Connect with us</h2>

              <span>
                Technical support <br />
                <a href="mailto:help@mandibhavjankari.com">Help@Mandibhavjankari.com</a>
              </span>
              <br />
              <br />

              <span>
                Join Our WhatsApp Group <br />
                <a
                  href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                  title="whatsapp Group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-1 md:px-3 py-2 text-xs md:text-sm font-medium text-center text-dark bg-gray-100 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Click For Join Group
                </a>
              </span>

              <br />
              <br />
              <span>
                Call to: <br />
                <a href="tel:+919509609604">+91 9509609604</a>
                <a href="tel:+917877384541"> | +91 7877384541</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
