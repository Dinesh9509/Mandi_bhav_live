import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bottom_Menu">
        <div className="menu">
          <ul>
            <li>
              <Link href="/">
                <img src="/images/Menu_icon/home.png" alt="Home" />HOME
              </Link>
            </li>
            <li>
              <Link href="/MandiBhav">
                <img src="/images/Menu_icon/Mandi.png" alt="Mandi" />MANDI
              </Link>
            </li>
            <li>
              <Link href="/AgaricultureNews">
                <img src="/images/Menu_icon/Suchna.png" alt="News" />NEWS
              </Link>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/images/Menu_icon/whatsapp.png" alt="WhatsApp" />JOIN
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="site_footer hide_mobile">
        <div className="container">
          <div className="fooetr_contant">
            <div className="col-6">
              <div className="text">
                <h3>MandiBhavJankari.com Trusted By Millions of peoples every year.</h3>
                <p>
                  This website belongs to farming and farming machinary. Created and Managed by
                  Mandibhavjankari.com development team. Content owned and updated by
                  Mandibhavjankari.
                </p>
              </div>
            </div>

            <div className="col-3">
              <div className="text Menu">
                <h4>हमारी सेवाएँ</h4>
                <ul>
                  <li>
                    <Link href="/MandiBhav">मंडी भाव</Link>
                  </li>
                  <li>
                    <Link href="/Tips">कृषि सलाह</Link>
                  </li>
                  <li>
                    <Link href="/Technology">कृषि यंत्र</Link>
                  </li>
                  <li>
                    <Link href="/GovtWillGive15Lakh">सरकारी योज़नाए</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-3">
              <div className="text Menu">
                <h4>हमारे बारे में</h4>
                <ul>
                  <li>
                    <Link href="/AboutUs">About Us</Link>
                  </li>
                  <li>
                    <Link href="/ContactUs">Contact &amp; Support</Link>
                  </li>
                  <li>
                    <Link href="/Disclaimer">Disclaimer</Link>
                  </li>
                  <li>
                    <Link href="/PrivacyPolicy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/TermsandConditions">Terms &amp; Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer_bg">
          <img src="/images/fooetr_bg.png" alt="" />
        </div>
      </div>

      <div className="footer_copyright">
        <p>Copyright © MandiBhavJankari.com 2024 - All Rights Reserved.</p>
      </div>
    </footer>
  );
}
