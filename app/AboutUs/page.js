import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "हमारे बारे में - About Mandi Bhav Jankari",
  description:
    "Mandi Bhav Jankari राजस्थान की 150+ मंडियों के दैनिक भाव उपलब्ध कराने वाला विश्वसनीय प्लेटफ़ॉर्म है। हमारी टीम, मिशन और सेवाओं के बारे में जानें।",
  path: "/AboutUs",
  keywords: ["About Mandi Bhav Jankari", "मंडी भाव टीम", "Rajasthan mandi platform"],
});

export default function AboutUsPage() {
  return (
    <div className="About_main">
      <div className="inner_banner">
        <div className="container">
          <h2>
            About <br /> Welcome to MandiBhavJankari,
          </h2>
          <p>
            आप यहां आज के बाजार भाव और फसलों की कीमतों में उतार-चढ़ाव को देख सकते हैं।
            MandiBhavJanakri.com बाजार मूल्य वेबसाइट बाजार मूल्य जानने का एक बहुत ही विश्वसनीय स्रोत है, इस वेबसाइट के
            माध्यम से हम आपको बिल्कुल सटीक मूल्य की जानकारी देने की पूरी कोशिश करते हैं।
          </p>
          <strong>Founded in 2024 by: Ajay &amp; Dinesh</strong>
        </div>
      </div>

      <div className="container">
        <div className="who_we_are_main">
          <div className="who_we_are_inner">
            <div className="img">
              <img src="/images/Who_we_are.jpg" alt="Who we are" />
            </div>
            <div className="content">
              <div className="inner_content">
                <span>Who We Are</span>
                <h1>Currently We Are Informed Only Rajasthan Mandi Bhav</h1>
                <p>
                  We provide accurate and up-to-date information on crop prices from various mandis
                  across Rajasthan. Our platform serves as a reliable source for farmers, traders, and
                  businesses to stay informed about daily mandi rates, helping them make better
                  decisions for their agricultural produce.
                </p>
              </div>
              <div className="logo">
                <img src="/images/logo.png" alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="our_vision_mission_main">
        <div className="container">
          <div className="our_vision_mission_inner">
            <div className="same vision">
              <div className="img">
                <img src="/images/our-vision.avif" alt="Our Vision" />
              </div>
              <div className="contant">
                <h3>Our Vision</h3>
                <p>
                  We envision a future where every farmer has easy access to real-time mandi prices,
                  empowering them to make informed decisions that maximize profits and minimize
                  losses. By bridging the information gap, we aim to create transparency and fairness
                  in the agricultural markets.
                </p>
              </div>
            </div>

            <div className="same Mission">
              <div className="contant">
                <h3>Our Mission</h3>
                <p>
                  Our mission is to provide accurate, transparent, and timely mandi prices from
                  across Rajasthan to farmers, traders, and businesses. Through our platform, we
                  strive to empower the farming community with critical price data that helps them
                  get the best value for their crops. We are committed to supporting the growth of
                  agriculture by fostering informed decision-making and economic sustainability.
                </p>
              </div>
              <div className="img">
                <img src="/images/Our_mission.jpg" alt="Our Mission" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Our_team_main">
        <div className="container">
          {/* <div className="title">
            <h2>Our Team</h2>
          </div> */}
          <div className="Team">
            {/* <Member
              img="/images/Dinesh.jpg"
              name="Dinesh Kumar"
              role="Founder, MandiBhavJankari"
              text="Dinesh leads MandiBhavJankari with a vision to provide farmers with easy access to mandi prices, empowering them through transparent information."
            />
            <Member
              img="/images/Ajay.jpg"
              name="Ajay Kumar"
              role="Co-Founder, MandiBhavJankari"
              text="Ajay focuses on delivering accurate price data to farmers, helping them make informed decisions for better profitability."
            /> */}
            {/* <Member
              img="/images/Shashank.jpg"
              name="Shashank Pandey"
              role="Sourcing Head, MandiBhavJankari"
              text="Shashank is responsible for gathering and managing mandi price data from multiple reliable sources, ensuring that farmers receive accurate and up-to-date information on crop prices."
            />
            <Member
              img="/images/Narendra_sharma.png"
              name="Narendra Sharma"
              role="CTO, MandiBhavJankari"
              text="Narendra oversees the technology that powers MandiBhavJankari, ensuring the platform is reliable, scalable, and delivers real-time data to users."
            />
            <Member
              img="/images/Dheeraj.jpg"
              name="Dheeraj Gama"
              role="Marketing Head, MandiBhavJankari"
              text="Dheeraj drives our marketing efforts, ensuring that MandiBhavJankari reaches farmers and traders, providing them with essential price updates."
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Member({ img, name, role, text }) {
  return (
    <div className="member">
      <div className="img">
        <img src={img} alt={name} />
      </div>
      <div className="name_des">
        <h2>{name}</h2>
        <span style={{ display: "block" }} className="exrince">
          <b></b>
        </span>
        <span>{role}</span>
        <p>{text}</p>
      </div>
    </div>
  );
}
